let folderName = 'yandex';

let preprocessor = 'less', // Preprocessor (sass, less, styl); 'sass' also work with the Scss syntax in blocks/ folder.
	fileswatch   = 'html,htm,txt,json,md,woff2' // List of files extensions for watching & hard reload

import pkg from 'gulp'
const { gulp, src, dest, parallel, series, watch, task } = pkg

import browserSync   from 'browser-sync'
import bssi          from 'browsersync-ssi'
import ssi           from 'ssi'
import jsImport from 'gulp-js-import'
import webpackStream from 'webpack-stream'
import webpack       from 'webpack'
import TerserPlugin  from 'terser-webpack-plugin'
import gulpSass      from 'gulp-sass'
import htmlreplace from 'gulp-html-replace'
import dartSass      from 'sass'
import sassglob      from 'gulp-sass-glob'
const  sass          = gulpSass(dartSass)
import less          from 'gulp-less'
import lessglob      from 'gulp-less-glob'
import styl          from 'gulp-stylus'
import stylglob      from 'gulp-noop'
import newer 		 from 'gulp-newer';
import webpConv		 from 'gulp-webp'
import postCss       from 'gulp-postcss'
import cssnano       from 'cssnano'
import autoprefixer  from 'autoprefixer'
import imagemin      from 'gulp-imagemin'
import changed       from 'gulp-changed'
import concat        from 'gulp-concat'
import rsync         from 'gulp-rsync'
import {deleteAsync} from 'del'



// function browsersync() {
// 	browserSync.init({
// 		server: {
// 			baseDir: `${folderName}/app/`,
// 			middleware: bssi({ baseDir: `${folderName}/app/`, ext: '.html' }),
// 		},
// 		ghostMode: { clicks: false },
// 		notify: false,
// 		online: true,
// 		// tunnel: 'yousutename', // Attempt to use the URL https://yousutename.loca.lt
// 	})
// }



function browsersync() {
	browserSync.init({
		server: {
			baseDir: '.',
			middleware: bssi({ baseDir: '.', ext: '.html' }),
		},
		ghostMode: { clicks: false },
		notify: false,
		online: true,
		// tunnel: 'yousutename', // Attempt to use the URL https://yousutename.loca.lt
	})
}


// function scripts() {
// 	return src([`${folderName}/app/js/*.js`, `!${folderName}/app/js/*.min.js`])
// 		.pipe(webpackStream({
// 			mode: 'production',
// 			performance: { hints: false },
// 			// plugins: [
// 			// 	new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' }), // jQuery (npm i jquery)
// 			// ],
// 			module: {
// 				rules: [
// 					{
// 						test: /\.m?js$/,
// 						exclude: /(node_modules)/,
// 						use: {
// 							loader: 'babel-loader',
// 							options: {
// 								presets: ['@babel/preset-env'],
// 								plugins: ['babel-plugin-root-import']
// 							}
// 						}
// 					}
// 				]
// 			},
// 			optimization: {
// 				minimize: true,
// 				minimizer: [
// 					new TerserPlugin({
// 						terserOptions: { format: { comments: false } },
// 						extractComments: false
// 					})
// 				]
// 			},
// 		}, webpack)).on('error', (err) => {
// 			this.emit('end')
// 		})
// 		.pipe(concat('app.min.js'))
// 		.pipe(dest(`${folderName}/app/js`))
// 		.pipe(browserSync.stream())
// }

function scripts() {
	return src([`${folderName}/app/js/*.js`, `!${folderName}/app/js/*.min.js`])
		.pipe(jsImport({hideConsole: true}))
		.pipe(concat('app.min.js'))
		.pipe(dest(`${folderName}/app/js`))
		.pipe(browserSync.stream())
}

function styles() {
	return src([`${folderName}/app/styles/${preprocessor}/*.*`, `!${folderName}/app/styles/${preprocessor}/_*.*`])
		.pipe(eval(`${preprocessor}glob`)())
		.pipe(eval(preprocessor)({ 'include css': true }))
		.pipe(postCss([
			// autoprefixer({ grid: 'autoplace' }),
			cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })
		]))
		.pipe(concat('app.min.css'))
		.pipe(dest(`${folderName}/app/css`))
		.pipe(browserSync.stream())
}


// var imgSrc = `${folderName}/app/images/src/**/*`;
// var imgDest = `${folderName}/app/images/dist/**/*`;


function images() {
	return src([`${folderName}/app/images/src/**/*`])
		.pipe(changed(`${folderName}/app/images/dist`))
		// .pipe(imagemin())
		.pipe(dest(`${folderName}/app/images/dist`))
		.pipe(webpConv())
		.pipe(dest(`${folderName}/app/images/dist`))
		.pipe(browserSync.stream())
}

// webp
// gulp.task('webp', function (done) {
// 	return gulp.src('app/img/dist/*.+(png|jpg|jpeg)')
// 		.pipe(plumber())
// 		.pipe(changed('app/img/dist', {
// 		  extension: '.webp'
// 		}))
// 		.pipe(webpConv())
// 		.pipe(multiDest(['app/img/src', 'app/img/dist']))
// })



function buildcopy() {
	return src([
		`{${folderName}/app/js,${folderName}/app/css}/*.min.*`,
		`${folderName}/app/images/**/*.*`,
		`!${folderName}/app/images/src/**/*`,
		`${folderName}/app/fonts/**/*`
	], { base: `${folderName}/app/` })
	.pipe(dest(`${folderName}/dist`))
}

async function buildhtml() {
	let includes = new ssi(`${folderName}/app/`, `${folderName}/dist/`, '/**/*.html')
	includes.compile()
	await deleteAsync(`${folderName}/dist/parts`, { force: true })
}



/* неумело сделанное версионирование файлов */
function cssFileVersion(){
	let versionNum = new Date(),
	versionNumMonth = versionNum.getMonth(),
	versionNumDay = versionNum.getDate(),
	versionNumHours = versionNum.getHours(),
	versionNumMin = versionNum.getMinutes(),
	versionNumSec = versionNum.getSeconds();
	versionNum = versionNumMonth.toString() + versionNumDay.toString() + versionNumHours.toString() + versionNumMin.toString() + versionNumSec.toString();

	return src(`${folderName}/dist/css/app.min.css`)
	.pipe(concat(`app.min.${versionNum}.css`))
	.pipe(dest(`${folderName}/dist/css`))
}
function jsFileVersion(){
	let versionNum = new Date(),
	versionNumMonth = versionNum.getMonth(),
	versionNumDay = versionNum.getDate(),
	versionNumHours = versionNum.getHours(),
	versionNumMin = versionNum.getMinutes(),
	versionNumSec = versionNum.getSeconds();
	versionNum = versionNumMonth.toString() + versionNumDay.toString() + versionNumHours.toString() + versionNumMin.toString() + versionNumSec.toString();

	return src(`${folderName}/dist/js/app.min.js`)
	.pipe(concat(`app.min.${versionNum}.js`))
	.pipe(dest(`${folderName}/dist/js`))
}
function filesVersionHtml(){
	let versionNum = new Date(),
	versionNumMonth = versionNum.getMonth(),
	versionNumDay = versionNum.getDate(),
	versionNumHours = versionNum.getHours(),
	versionNumMin = versionNum.getMinutes(),
	versionNumSec = versionNum.getSeconds();
	versionNum = versionNumMonth.toString() + versionNumDay.toString() + versionNumHours.toString() + versionNumMin.toString() + versionNumSec.toString();

	return src(`${folderName}/dist/index.html`)
    .pipe(htmlreplace({
        'css': `css/app.min.${versionNum}.css`,
		'js': `js/app.min.${versionNum}.js`
    }))
    .pipe(dest(`${folderName}/dist/`));
};
async function deleteOldCss() {
	await deleteAsync(`${folderName}/dist/css/app.min.css`, { force: true })
}
async function deleteOldJs() {
	await deleteAsync(`${folderName}/dist/js/app.min.js`, { force: true })
}
/**/



async function cleandist() {
	await deleteAsync(`${folderName}/dist/**/*`, { force: true })
}

function deploy() {
	return src(`${folderName}/dist/`)
		.pipe(rsync({
			root: `${folderName}/dist/`,
			hostname: 'username@yousite.com',
			destination: 'yousite/public_html/',
			// clean: true, // Mirror copy with file deletion
			include: [/* '*.htaccess' */], // Included files to deploy,
			exclude: [ '**/Thumbs.db', '**/*.DS_Store' ],
			recursive: true,
			archive: true,
			silent: false,
			compress: true
		}))
}

function startwatch() {
	watch(`${folderName}/app/styles/${preprocessor}/**/*`, { usePolling: true }, styles)
	watch([`${folderName}/app/js/**/*.js`, `!${folderName}/app/js/**/*.min.js`], { usePolling: true }, scripts)
	watch(`${folderName}/app/images/src/**/*`, { usePolling: true }, images)
	watch(`${folderName}/app/**/*.{${fileswatch}}`, { usePolling: true }).on('change', browserSync.reload)
}

export { scripts, styles, images, deploy }
export let assets = series(scripts, styles, images)
export let build = series(cleandist, images, scripts, styles, buildcopy, buildhtml, cssFileVersion, jsFileVersion, filesVersionHtml, deleteOldCss, deleteOldJs)

export default series(scripts, styles, images, parallel(browsersync, startwatch))
