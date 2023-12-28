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
})





$( document ).ready(function() {
	// Результат замера источников трафика
	$.getJSON("json/top-direct-platforms.json", function (data) {
		$.each(data.Items, function (i, Items) {
			var i = i+1;

			var HumanPercent = Items.HumanPercent;
			var UntargetedPercent = Items.UntargetedPercent;
			var BotPercent = Items.BotPercent;
			var FraudPercent = Items.FraudPercent;
			

			$(".jsplatforms").append('<tr>'
			+ '<td>'+i+'</td>'
			+ '<td><div class="lable"><label class="checkbox favicon"><img alt=""src="https://s2.googleusercontent.com/s2/favicons?domain_url=' + Items.UtmKey + '"></label></div><label class="text-labl">' + Items.UtmKey + '</label></td>'
			+ '<td class="text-center">' + Math.round(HumanPercent) + '%</td>'
			+ '<td class="text-center">' + Math.round(UntargetedPercent) + '%</td>'
			+ '<td class="text-center">' + Math.round(FraudPercent) + '%</td>'
			+ '<td class="text-center">' + Math.round(BotPercent) + '%</td>'
			+ '</tr>');
		});
	});
});




@import 'common/sections/calc-section/calc-section2.js';