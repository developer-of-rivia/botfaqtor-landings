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