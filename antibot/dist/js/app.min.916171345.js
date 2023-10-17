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
})
$(".years").html("2017-2023");

$.get('/landing/json/yandex-shared-info.json', function(data) {
    var Checks = data["Checks"];
    var BotsCount = data["BotsCount"];
    var CampaignsCount = data["CampaignsCount"];
    var SitesCount = data["SitesCount"];

    $("#Checks").text(new Intl.NumberFormat('ru-RU').format(Checks));
    $("#BotsCount").text(new Intl.NumberFormat('ru-RU').format(BotsCount));
    $("#CampaignsCount").text(new Intl.NumberFormat('ru-RU').format(CampaignsCount));
    $("#SitesCount").text(new Intl.NumberFormat('ru-RU').format(SitesCount));

    var date = new Date();
    $("#dateCount").text(date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear()+"г. ("+date.getHours()+":"+date.getMinutes()+")");
});

$("[data-bem]").click(function (e) {
    return false;
});
$("[data-bem]").hover(function (e) {
    var bottom = $(window).height() - $(this).height();
    var X = $(this).position().left + 200; // Р С—Р С•Р В»Р С•Р В¶Р ВµР Р…Р С‘РЎРЏ Р С—Р С• Р С•РЎРѓР С‘ X
    var XTail = 100; // Р С—Р С•Р В»Р С•Р В¶Р ВµР Р…Р С‘РЎРЏ Р С—Р С• Р С•РЎРѓР С‘ X
    var Y = bottom - $(this).offset().top - 120; // Р С—Р С•Р В»Р С•Р В¶Р ВµР Р…Р С‘РЎРЏ Р С—Р С• Р С•РЎРѓР С‘ Y
    var T = $(this).attr("data-bem");
    $(".popup__content__quest .popup__content").html(T);
    $(".popup__content__quest").addClass("open");
    var width_popup = $(".popup__content__quest").width();
    $(".popup__tail").css("left", +$(this).attr("data-left") + "px");
    $(".popup__content__quest").css("bottom", Y + "px");
    return false;
});

$("#close-banner").click(function(){
    $(".header").css('');
    $("#banner-top").html('');
    $("section.first").css('margin-top','70px');
    return false;
});

$("[data-bem]").click(function (e) {
    var bottom = $(window).height() - $(this).height();
    var X = $(this).position().left + 200; // Р С—Р С•Р В»Р С•Р В¶Р ВµР Р…Р С‘РЎРЏ Р С—Р С• Р С•РЎРѓР С‘ X
    var XTail = 100; // Р С—Р С•Р В»Р С•Р В¶Р ВµР Р…Р С‘РЎРЏ Р С—Р С• Р С•РЎРѓР С‘ X
    var Y = bottom - $(this).offset().top - 120; // Р С—Р С•Р В»Р С•Р В¶Р ВµР Р…Р С‘РЎРЏ Р С—Р С• Р С•РЎРѓР С‘ Y
    var T = $(this).attr("data-bem");
    $(".popup__content__quest .popup__content").html(T);
    $(".popup__content__quest").addClass("open");
    var width_popup = $(".popup__content__quest").width();
    $(".popup__tail").css("left", +$(this).attr("data-left") + "px");
    $(".popup__content__quest").css("bottom", Y + "px");
    return false;
});


$(".popup__content__quest").hover(function (e) {
    return false;
}, function () {
    $(".popup__tail").removeAttr('style');
    $(".popup__content__quest .popup__content").html('');
    $(".popup__content__quest").removeClass("open");
    $(".popup__content__quest").css("bottom", "0px");
    //$(".popup__content__quest .popup__content").html(false);

    $(this).hasClass("tooltip").removeClass("active");
    return false;
});


$(document).mouseup(function (e) {
    var div = $(".popup__content__quest");
    if (!div.is(e.target) && div.has(e.target).length === 0) {
        div.removeClass("open").removeAttr('style');
        //$(".popup__content__quest .popup__content").html(false);
        $("[data-bem]").removeClass("active");
    }
});


$(".nav-menu .close").click(function () {
    $(".nav-menu").removeClass("active");
});


$(".menu-burger").click(function () {
    $(".nav-menu").toggleClass("active");
});


$(".clicklogin").click(function () {
    location.href = 'https://botfaqtor.ru/signin';
    return false;
});


$(".click-project").click(function () {
    $(".project-title").toggleClass("is-open");
});

$(document).mouseup(function (e) {
    var div = $(".project-title");
    if (!div.is(e.target) && div.has(e.target).length === 0) {
        div.removeClass("is-open");
    }
});


$(".accordeon dd").prev().click(function () {
    $(this).parents(".accordeon").find("dd").not(this).slideUp().prev().removeClass("active").parents("dl").removeClass("bg");

    $(this).next().not(":visible").slideDown().prev().addClass("active").parents("dl").addClass("bg");
});

//Ymap start
var spinner = $('.ymap-container').children('.loader');
var check_if_load = 0;
var myMap, myPlacemark;

function init() {
    myMap = new ymaps.Map('map', {
        center: [55.779003, 37.629475],
        zoom: 16,
        controls: []
    });
    // myMap.behaviors.disable('scrollZoom');
    // myMap.behaviors.disable('drag');
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),
        myPlacemark = new ymaps.Placemark([55.779003, 37.629475], {
            hintContent: 'г. Москва, ул. Щепкина, д.28, офис 413',
            balloonContent: 'г. Москва, ул. Щепкина, д.28, офис 413'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/map.png',
            iconImageSize: [62, 62],
            iconImageOffset: [-15, -42]
        });
    var zoomControl = new ymaps.control.ZoomControl({
        options: {
            size: "auto",
            position: {
                top: 120,
                left: 15
            }
        }
    });
    myMap.controls.add(zoomControl);
    myMap.geoObjects.add(myPlacemark);

    //Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
    var layer = myMap.layers.get(0).get(0);
    //Решение по callback-у для определния полной загрузки карты: http://ru.stackoverflow.com/questions/463638/callback-загрузки-карты-yandex-map
    waitForTilesLoad(layer).then(function () {
        //Скрываем
        spinner.removeClass('is-active')
    });
};

function waitForTilesLoad(layer) {
    return new ymaps.vow.Promise(function (resolve, reject) {
        var tc = getTileContainer(layer),
            readyAll = true;
        tc.tiles.each(function (tile, number) {
            if (!tile.isReady()) {
                readyAll = false;
            }
        });
        if (readyAll) {
            resolve();
        } else {
            tc.events.once("ready", function () {
                resolve();
            });
        }
    });
}

function getTileContainer(layer) {
    for (var k in layer) {
        if (layer.hasOwnProperty(k)) {
            if (
                layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer ||
                layer[k] instanceof ymaps.layer.tileContainer.DomContainer
            ) {
                return layer[k];
            }
        }
    }
    return null;
}

function loadScript(url, callback) {
    var script = document.createElement("script");
    if (script.readyState) { //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" ||
                script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Другие браузеры
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

var ymap = function () {
    $('.ymap-container').mouseenter(function () {
        if (check_if_load == 0) {
            check_if_load = 1;
            spinner.addClass('is-active');
            loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1",
                function () {
                    ymaps.load(init);
                });
        }
    });
}

$(function () {
    //Map Yandex
    ymap();
});

$(".ico-roll-network").click(function () {
    $(".block-roll").toggleClass("open-is");
    return false;
});

$(".message-list, .chat-chat-icon").click(function () {
    $(".block-roll").removeClass("open-is");
    return false;
});

$(".ordForm").click(function () {
    $("body").addClass("form-modal");
    $(".modal-wind").addClass("open");
    $("html, body").animate({
        scrollTop: 0
    }, "slow");

    return false;
});

$(".modal-wind .close-modal").click(function () {
    $("body").removeClass("form-modal");
    $(".modal-wind").removeClass("open");
    return false;
});


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function getFormData($form) {
    var config = {};
    $form.serializeArray().map(function (item) {
        if (config[item.name]) {
            if (typeof (config[item.name]) === "string") {
                config[item.name] = [config[item.name]];
            }
            config[item.name].push(item.value);
        } else {
            config[item.name] = item.value;
        }
    });
    var Id = getUrlParameter("id");
    config["Id"] = Id;
    var Id = getUrlParameter("h");
    config["Href"] = Id;
    var Id = getUrlParameter("r");
    config["Ref"] = Id;
    return config;
}

$('#mailer').submit(function (e) {
    $form = $(this);
    var formData = JSON.stringify(getFormData($form));

    $.ajax({
        type: 'POST',
        url: 'https://server.botfaqtor.ru/api/Account/send-job-request',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: formData,
        success: function () {
            // $('.wrtt').html("<div class='ok'>Ваша заявка успешно отправлена! В ближайшее время с вами свяжется наш специалист для уточнения необходимой информации.</div>");
            $('.response-modal').removeClass('graph-modal-open fadeInUp animate-open');
            $('.tyformail-modal').addClass('graph-modal-open fadeInUp animate-open');
            $form[0].reset();
            ym(49731991,'reachGoal','bfqt20');

        }
    });
    e.preventDefault();
});