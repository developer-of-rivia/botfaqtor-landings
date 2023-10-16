$(".years").html("2017-2023");

// Результат замера источников трафика
$.getJSON("/landing/json/sources-check.json", function (data) {
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


// Наши исследования и новости

$.getJSON("/data_news.json", function (data_news) {
    $.each(data_news, function (i, item_news) {

        $(".news .row").append('<div class="col-6"><div class="news-item">'
        + '<a href="https://botfaqtor.ru' + item_news['post_name'] + '" target="blank"><img alt=""src="https://botfaqtor.ru' + item_news['img'] + '" width="176" height="98"></a>'
        +'<div class="newsBlock">'
        +'<div class="date">' + item_news['date'] + '</div>'
        +'<a href="https://botfaqtor.ru'+ item_news['post_name'] + '/" target="blank">' + item_news['post_title'] + '</a>'
        +'<p>'+ item_news['post_excerpt'] +'</p>'
        +'<a href="https://botfaqtor.ru'+ item_news['post_name'] +'/" target="blank" class="btn more">Подробнее</a>'
        + '</div>'
        + '</div></div>');
        
    });
});


$("#close-banner").click(function () {
    $(".header").css('');
    $("#banner-top").html('');
    $("section.first-screen").css('margin-top', '70px');
    return false;
});


$(".cl1").click(function () {
    $("li").removeClass("active");
    $(".tab").removeClass("active");
    $(this).addClass("active");
    $(".tb1").addClass("active");
});

$(".cl2").click(function () {
    $("li").removeClass("active");
    $(".tab").removeClass("active");
    $(this).addClass("active");
    $(".tb2").addClass("active");
});

$(".cl3").click(function () {
    $("li").removeClass("active");
    $(".tab").removeClass("active");
    $(this).addClass("active");
    $(".tb3").addClass("active");
});

$(".cl4").click(function () {
    $("li").removeClass("active");
    $(".tab").removeClass("active");
    $(this).addClass("active");
    $(".tb4").addClass("active");
});

$(".nav-menu .close").click(function () {
    $(".nav-menu").removeClass("active");
});

$(".menu-burger").click(function () {
    $(".nav-menu").toggleClass("active");
});


if (getGet('ref')) {
    var ref = getGet('ref');
    Cookies.set('ref', ref, {
        domain: '.botfaqtor.ru',
        expires: 30
    });
}

var cookiesRef = Cookies.get('ref');


$(".clicklogin").click(function () {
    if (cookiesRef) {
        location.href = 'https://botfaqtor.ru/signin';
        //location.href='https://botfaqtor.ru/signin?ref='+cookiesRef;
    } else {
        location.href = 'https://botfaqtor.ru/signin';
    }
    return false;
});


$(".click-project").click(function () {
    var click = "1";
    $(".project-title").toggleClass("is-open");
});

$(document).mouseup(function (e) {
    var div = $(".project-title");
    if (!div.is(e.target) && div.has(e.target).length === 0) {
        div.removeClass("is-open");
    }
});

$(".priceClick").click(function () {
    $(".nav-menu").removeClass("active");

    $('html,body').animate({
        scrollTop: $(".price").offset().top - 60
    }, 500);
    return false;
});

$(".projectClick").click(function () {
    $('html,body').animate({
        scrollTop: $(".project-screen").offset().top - 20
    }, 500);
    return false;
});





var kop = " коп";
var rub = " руб";

var antibotPriceB = "1.5";
var bannerPriceB = "1.5";
var antibotPriceV = "1";
var bannerPriceV = "1";

var directPriceB = "100";
var directPriceV = "70";

var adsPriceB = "100";
var adsPriceV = "70";



function ceilB(n) {
    hh = Math.ceil((n) * 100) / 100;
    return hh;
}




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
};





$(".project .item").click(function () {
    classProj = $(this).attr("class");
    classProj = classProj.replace('item ', '');

    if (classProj == 'p01') {
        PriceB = antibotPriceB;
        PriceV = antibotPriceV;
        $(".baseTar .prcOP").html(PriceB + " " + kop);
        $(".vipTar .prcOP").html(PriceV + " " + kop);
    }

    if (classProj == 'p02') {
        PriceB = bannerPriceB;
        PriceV = bannerPriceV;
        $(".baseTar .prcOP").html(PriceB + " " + kop);
        $(".vipTar .prcOP").html(PriceV + " " + kop);

    }

    if (classProj == 'p03') {
        PriceB = directPriceB;
        PriceV = directPriceV;
        $(".baseTar .prcOP").html(PriceB / 100 + " " + rub);
        $(".vipTar .prcOP").html(PriceV + " " + kop);

    }

    if (classProj == 'p04') {
        PriceB = adsPriceB;
        PriceV = adsPriceV;
        $(".baseTar .prcOP").html(PriceB / 100 + " " + rub);
        $(".vipTar .prcOP").html(PriceV + " " + kop);
    }

    $(".calc-block .sum").removeClass("active");
    $(".project .item").removeClass("active");
    $("input[name='calc']").val(null);

    $(this).addClass("active");
    setTimeout($(".calc-block .calcu").addClass("active"), 400);
    return false;
});
$("input[name='calc']").keyup(function () {
    $(this).val(thousandSeparator($(this).val().replace(/[^0-9]/g, "")));
    $(".calc-block .sum").addClass("active");
    var value = $(this).val().replace(/\s/g, '');
    var sumBAse = value * PriceB;
    var sumVip = value * PriceV;
    if (sumBAse >= 100) {
        sumBAse = value * PriceB;
        r = rub;
        $(".baseTar .prcOkl").html(thousandSeparator(sumBAse / 100) + "" + r);
    } else {
        sumBAse = value * PriceB;
        r = kop;
        $(".baseTar .prcOkl").html(thousandSeparator(sumBAse) + "" + r);
    }
    if (sumVip >= 100) {
        sumVip = value * PriceV;
        r = rub;
        $(".vipTar .prcOkl").html(thousandSeparator(sumVip / 100) + "" + r);
        $(".vipTar .prcOklss").html(thousandSeparator((sumBAse - sumVip) / 100) + "" + r);
    } else {
        sumVip = value * PriceV;
        r = kop;
        $(".vipTar .prcOkl").html(thousandSeparator(sumVip) + "" + r);
        $(".vipTar .prcOklss").html(thousandSeparator(sumBAse - sumVip) + "" + r);
    }
});




//Получаем GET
function getGet(name) {
    var s = window.location.search;
    s = s.match(new RegExp(name + '=([^&=]+)'));
    return s ? s[1] : false;
}

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
            iconImageHref: 'landing/img/map.webp',
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