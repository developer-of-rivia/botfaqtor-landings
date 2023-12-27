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


	// roll-network
let icoRollNetwork = document.querySelector('.ico-roll-network');
let blockRoll = document.querySelector('.block-roll');
let messageList = document.querySelector('.message-list');
let chatChatIcon = document.querySelector('.chat-chat-icon');

icoRollNetwork.addEventListener('click', function () {
    blockRoll.classList.toggle("open-is");
    return false;
});
messageList.addEventListener('click', function () {
    blockRoll.classList.remove("open-is");
    return false;
});
chatChatIcon.addEventListener('click', function () {
    blockRoll.classList.remove("open-is");
    return false;
});

let rollNetwork = document.querySelector('.roll-network');
function getScrollPercentage() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    let documentHeight = Math.max(
        document.body.scrollHeight, document.body.offsetHeight, document.body.clientHeight,
        document.documentElement.scrollHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight
    );
    return ((scrollTop / (documentHeight - windowHeight)) * 100);
}
document.addEventListener("DOMContentLoaded", function() {
    window.onscroll = function() {
        if(getScrollPercentage() > 97){
            rollNetwork.classList.add('roll-network_scrollbottom');
        }
        if(getScrollPercentage() < 97){
            rollNetwork.classList.remove('roll-network_scrollbottom');
        }
    };
});


// Begin Verbox {literal}
(function (d, w, m) {
    window.supportAPIMethod = m;
    var s = d.createElement("script");
    s.type = "text/javascript";
    s.id = "supportScript";
    s.charset = "utf-8";
    s.async = true;
    var id = "fa8d6ba2fa033b89a545e3d9db332dae";
    s.src = "https://admin.verbox.ru/support/support.js?h=" + id;
    var sc = d.getElementsByTagName("script")[0];
    w[m] =
        w[m] ||
        function () {
            (w[m].q = w[m].q || []).push(arguments);
        };
    if (sc) sc.parentNode.insertBefore(s, sc);
    else d.documentElement.firstChild.appendChild(s);
})(document, window, "Verbox");
// {/literal} End Verbox;
})