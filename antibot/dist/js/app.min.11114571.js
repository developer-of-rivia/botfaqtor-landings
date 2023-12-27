// LIBS
/*
1. Они должны работать по клику
2. Они должны работать с клавиатуры (причем правильно - через клавиши стрелочек)
3. Нужно событие изменения, чтобы делать какие-то действия в момент переключения табов
4. Нужно событие переключения таба в любой момент времени
5. Проверки на различные условия, чтобы плагин корректно работал

*/

class GraphTabs {
  constructor(selector, options) {
    let defaultOptions = {
      isChanged: () => {}
    }
    this.options = Object.assign(defaultOptions, options);
    this.selector = selector;
    this.tabs = document.querySelector(`[data-tabs="${selector}"]`);
    if (this.tabs) {
      this.tabList = this.tabs.querySelector('.tabs__nav');
      this.tabsBtns = this.tabList.querySelectorAll('.tabs__nav-btn');
      this.tabsPanels = this.tabs.querySelectorAll('.tabs__panel');
    } else {
      console.error('Селектор data-tabs не существует!');
      return;
    }

    this.check();
    this.init();
    this.events();
  }

  check() {
    if (document.querySelectorAll(`[data-tabs="${this.selector}"]`).length > 1) {
      console.error('Количество элементов с одинаковым data-tabs больше одного!');
      return;
    }

    if (this.tabsBtns.length !== this.tabsPanels.length) {
      console.error('Количество кнопок и элементов табов не совпадает!');
      return;
    }
  }

  init() {
    this.tabList.setAttribute('role', 'tablist');

    this.tabsBtns.forEach((el, i) => {
      el.setAttribute('role', 'tab');
      el.setAttribute('tabindex', '-1');
      el.setAttribute('id', `${this.selector}${i + 1}`);
      el.classList.remove('tabs__nav-btn--active');
    });

    this.tabsPanels.forEach((el, i) => {
      el.setAttribute('role', 'tabpanel');
      el.setAttribute('tabindex', '-1');
      el.setAttribute('aria-labelledby', this.tabsBtns[i].id);
      el.classList.remove('tabs__panel--active');
    });

    this.tabsBtns[0].classList.add('tabs__nav-btn--active');
    this.tabsBtns[0].removeAttribute('tabindex');
    this.tabsBtns[0].setAttribute('aria-selected', 'true');
    this.tabsPanels[0].classList.add('tabs__panel--active');
  }

  events() {
    this.tabsBtns.forEach((el, i) => {
      el.addEventListener('click', (e) => {
        let currentTab = this.tabList.querySelector('[aria-selected]');

        if (e.currentTarget !== currentTab) {
          this.switchTabs(e.currentTarget, currentTab);
        }
      });

      el.addEventListener('keydown', (e) => {
        let index = Array.prototype.indexOf.call(this.tabsBtns, e.currentTarget);

        let dir = null;

        if (e.which === 37) {
          dir = index - 1;
        } else if (e.which === 39) {
          dir = index + 1;
        } else if (e.which === 40) {
          dir = 'down';
        } else {
          dir = null;
        }

        if (dir !== null) {
          if (dir === 'down') {
            this.tabsPanels[i].focus();
          } else if (this.tabsBtns[dir]) {
            this.switchTabs(this.tabsBtns[dir], e.currentTarget);
          }
        }
      });
    });
  }

  switchTabs(newTab, oldTab = this.tabs.querySelector('[aria-selected]')) {
    newTab.focus();
    newTab.removeAttribute('tabindex');
    newTab.setAttribute('aria-selected', 'true');

    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1');

    let index = Array.prototype.indexOf.call(this.tabsBtns, newTab);
    let oldIndex = Array.prototype.indexOf.call(this.tabsBtns, oldTab);

    this.tabsPanels[oldIndex].classList.remove('tabs__panel--active');
    this.tabsPanels[index].classList.add('tabs__panel--active');

    this.tabsBtns[oldIndex].classList.remove('tabs__nav-btn--active');
    this.tabsBtns[index].classList.add('tabs__nav-btn--active');

    this.options.isChanged(this);
  }
};
$(".calculator input").keyup(function () {
    $(this).val(thousandSeparator($(this).val().replace(/[^0-9]/g, "")));
    var yandex = $("[name='yandex']").val().replace(/\s/g, '');
    var google = $("[name='google']").val().replace(/\s/g, '');
    var vk = $("[name='vk']").val().replace(/\s/g, '');
    var priceyandex = $("[name='priceyandex']").val().replace(/\s/g, '');
    var pricegoogle = $("[name='pricegoogle']").val().replace(/\s/g, '');
    var pricevk = $("[name='pricevk']").val().replace(/\s/g, '');
    //var theme = $(".theme option").prop('selected', true).change().attr('data');
    var theme = "";

    $( ".calculator select option:selected" ).each(function() {
        theme += $( this ).attr('data') + " ";
    });



    if(priceyandex == ''){
        if(theme == undefined){
            resultyandex = (yandex / 100 * theme)*50;
        }else{
            resultyandex = (yandex / 100 * 25)*50;
        }
    }else{
        if(theme == undefined){
            resultyandex = (yandex / 100 * theme)*priceyandex;
        }else{
            resultyandex = (yandex / 100 * 25)*priceyandex;
        }
    }

    if(pricegoogle == ''){
        if(theme == undefined){
            resultgoogle = (google / 100 * theme)*50;
        }else{
            resultgoogle = (google / 100 * 25)*50;
        }
    }else{
        if(theme == undefined){
            resultgoogle = (google / 100 * theme)*pricegoogle;
        }else{
            resultgoogle = (google / 100 * 25)*pricegoogle;
        }
    }

    if(pricevk == ''){
        if(theme == undefined){
            resultvk = (vk / 100 * theme)*50;
        }else{
            resultvk = (vk / 100 * 25)*50;
        }
    }else{
        if(theme == undefined){
            resultvk = (vk / 100 * theme)*pricevk;
        }else{
            resultvk = (vk / 100 * 25)*pricevk;
        }
    }



    resultSUM = resultyandex+resultgoogle+resultvk;
    var sumyear = resultSUM*12

    
    if(sumyear || resultSUM){
        $('.year span').text(thousandSeparator(Math.ceil(sumyear)));
        $('.month span').text(thousandSeparator(Math.ceil(resultSUM)));
    }else{
        $('.year span').text('0');
        $('.month span').text('0');
    }
    
});




$(".calculator select").change(function(){
    var yandex = $("[name='yandex']").val().replace(/\s/g, '');
    var google = $("[name='google']").val().replace(/\s/g, '');
    var vk = $("[name='vk']").val().replace(/\s/g, '');

    var priceyandex = $("[name='priceyandex']").val().replace(/\s/g, '');
    var pricegoogle = $("[name='pricegoogle']").val().replace(/\s/g, '');
    var pricevk = $("[name='pricevk']").val().replace(/\s/g, '');

    var theme = "";
    $( ".calculator select option:selected" ).each(function() {
        theme += $( this ).attr('data') + " ";
    });


    if(priceyandex == ''){
        resultyandex = (yandex / 100 * theme)*50;
    }else{
        resultyandex = (yandex / 100 * theme)*priceyandex;
    }

    if(pricegoogle == ''){
        resultgoogle = (google / 100 * theme)*50;
    }else{
        resultgoogle = (google / 100 * theme)*pricegoogle  
    }


    if(pricevk == ''){
        resultvk = (vk / 100 * theme)*50;
    }else{
        resultvk = (vk / 100 * theme)*pricevk
    }


    resultSUM = resultyandex+resultgoogle+resultvk;
    var sumyear = resultSUM*12

    
    if(sumyear || resultSUM){
        $('.year span').text(thousandSeparator(Math.ceil(sumyear)));
        $('.month span').text(thousandSeparator(Math.ceil(resultSUM)));
    }else{
        $('.year span').text('0');
        $('.month span').text('0');
    }

});

var thousandSeparator = function (str) {
var parts = (str + '').split('.'),
    main = parts[0],
    len = main.length,
    output = '',
    i = len - 1;

while (i >= 0) {
    output = main.charAt(i) + output;
    if ((len - i) % 3 === 0 && i > 0) {
        output = ' ' + output;
    }
    --i;
}

if (parts.length > 1) {
    output += '.' + parts[1];
}
return output;
};;



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



	// tabs
	const tabsService = new GraphTabs('service-tab', {
		isChanged: (tabs) => {
		  console.log(tabs);
		}
	});


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