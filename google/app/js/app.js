// LIBS
@import 'common/plugins/graph-tabs/script.js';




document.addEventListener('DOMContentLoaded', () => {
	// menu
	let burgerIcon = document.querySelector('.header__toggle-burger');
	let closeIcon = document.querySelector('.header__toggle-close');
	let menu = document.querySelector('.header__panel');
	let scrollObject = document.querySelector('.header__panel');
	burgerIcon.addEventListener('click', function(){
		closeIcon.classList.remove('hidden');
		burgerIcon.classList.add('hidden');
		menu.classList.add('header__panel--open');
		// scrollLock.disablePageScroll(scrollObject);
	})
	closeIcon.addEventListener('click', function(){
		closeIcon.classList.add('hidden');
		burgerIcon.classList.remove('hidden');
		menu.classList.remove('header__panel--open');
		// scrollLock.enablePageScroll(scrollObject);
	})


	// dropdown
	let dropdowns = document.querySelectorAll('.nav__dropdown');
	dropdowns.forEach(dropdown => {
		document.addEventListener('click', (e) => {
			if(!e.composedPath().includes(dropdown)){
				dropdown.classList.remove('nav__dropdown--open');
			}
		});
		dropdown.addEventListener('click', function(){
			dropdown.classList.toggle('nav__dropdown--open');
		});
	});


	// accordion
	const accordions = document.querySelectorAll('.accordion');
	accordions.forEach(el => {
		el.addEventListener('click', (e) => {
			const self = e.currentTarget;
			const control = self.querySelector('.accordion__control');
			const content = self.querySelector('.accordion__content');

			self.classList.toggle('open');

			// если открыт аккордеон
			if (self.classList.contains('open')) {
				control.setAttribute('aria-expanded', true);
				content.setAttribute('aria-hidden', false);
				content.style.maxHeight = content.scrollHeight + 'px';
			} else {
				control.setAttribute('aria-expanded', false);
				content.setAttribute('aria-hidden', true);
				content.style.maxHeight = null;
			}
		});
	});



	// lazymap
	function lazyScroll() {
		loadMapBlock.classList.contains("_loaded") || getMap()
	}
	window.addEventListener("scroll", lazyScroll);
	const windowHeight = document.documentElement.clientHeight,
		loadMapBlock = document.querySelector(".lazy-iframe");
	
	function getMap() {
		const e = loadMapBlock.getBoundingClientRect().top + window.pageYOffset;
		if (window.pageYOffset > e - windowHeight) {
			const e = loadMapBlock.dataset.map;
			loadMapBlock.insertAdjacentHTML("beforeend", `<iframe src="${e}" style="border: 0" allowfullscreen=""></iframe>`), loadMapBlock.classList.add("_loaded")
		}
	}
	loadMapBlock.classList.contains("_loaded") || getMap();




	const tabs1 = new GraphTabs('tab', {
		isChanged: (tabs) => {
		  console.log(tabs);
		}
	});


	const tabsService = new GraphTabs('service-tab', {
		isChanged: (tabs) => {
		  console.log(tabs);
		}
	});


	// graphmodal
	// let $modalScroll = document.querySelector('.graph-modal');
	// const modal = new GraphModal({
	// 	isOpen: (modal) => {
	// 		scrollLock.disablePageScroll($modalScroll);
	// 	},
	// 	isClose: () => {
	// 		scrollLock.enablePageScroll($modalScroll);
	// 	}
	// });

	// $('.vacancy__button').on('click', function(){
	// 	$('.tyformail-modal').removeClass('graph-modal-open fadeInUp animate-open');
	// })

	// vlist
	// let vlistContent = document.querySelectorAll('.vlist__content');

	// vlistContent.forEach(vlistContent => {

	// 	let vlistText = vlistContent.querySelector('.vlist__text');
	// 	let vlistShowmore = vlistContent.querySelector('.vlist__showmore');
	// 	let vlistSalary = vlistContent.querySelector('.vlist__salary');

	// 	vlistShowmore.addEventListener('click', function() {
	// 		vlistText.classList.toggle('vlist__text_expand');
	// 		vlistSalary.classList.toggle('vlist__salary_open');

	// 		if(vlistShowmore.innerText == 'Показать описание полностью'){
	// 			vlistShowmore.innerText = 'Скрыть описание';
	// 		}
	// 		else if(vlistShowmore.innerText == 'Скрыть описание'){
	// 			vlistShowmore.innerText = 'Показать описание полностью';
	// 		}
	// 	});
	// });
})




@import 'common/sections/calc-section/calc-section2.js';




$( document ).ready(function() {
	// Результат замера источников трафика
	$.getJSON("common/sections/sites/sources-check.json", function (data) {
		$.each(data, function (i, item) {
	
			var str = item['CheckDate'];
			var res = str.split("-", 2);
			var res = str.split("T", 1);
			var temp = res;
	
			$(".jsGetSourcesChecks").append('<tr>'
				+ '<td>' + temp + '</td>'
				+ '<td><div class="lable"><label class="checkbox favicon"><img alt=""src="https://s2.googleusercontent.com/s2/favicons?domain_url=' + item['Source'] + '"></label></div><label class="text-labl">' + item['Source'] + '</label></td>'
				+ '<td class="text-center">' + item['TrafficTypeName'] + '</td>'
				+ '<td class="text-center">' + item['TotalRounding'] + 'К</td>'
				+ '<td class="text-center">' + item['TargetedPercent'] + '%</td>'
				+ '<td class="text-center">' + item['UntargetedPercent'] + '%</td>'
				+ '<td class="text-center">' + item['BotsPercent'] + '%</td>'
				+ '<td class="text-center">' + item['ComparisonBotParameter'] + '%</td>'
				+ '</tr>');
		});
	});
});
