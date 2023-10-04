/* libs */
// import '../../../common/components/jquery/jquery-3.6.4.min.js';
// import '../../../common/components/scroll-lock/scroll-lock.js';
import '../../../common/external-scripts/roll-network/roll-network.js';



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

});









$(document).ready((function() {
    const e = document.querySelectorAll(".select__item");
    for (let d = 0; d < e.length; d++) {
        const m = e[d],
            p = m.querySelectorAll("option"),
            _ = document.createElement("div"),
            g = document.createElement("div"),
            v = document.createElement("div");
        v.setAttribute("tabindex", "0"), m.setAttribute("tabindex", "-1"), _.className = "custom-select", g.className = "custom-select__list", v.className = "custom-select__current", v.setAttribute("type", "button"), _.append(v, g), m.after(_);
        const h = function(e, t) {
                let c = "";
                for (var l = 0; l < p.length; l++) c += '<button type="button" class="custom-select__item" data-value="' + p[l].value + '">' + p[l].text + "</button>";
                g.innerHTML = c, e(), t()
            },
            f = () => {
                _.classList.toggle("custom-select--show")
            },
            x = () => {
                v.addEventListener("click", f), v.addEventListener("keydown", (e => {
                    "Enter" != e.code && "Escape" != e.code || f()
                }))
            },
            y = () => {
                for (let t = 0; t < e.length; t++) {
                    let c = e[t];
                    c.classList.add("select__item--mobile"), c.addEventListener("change", (() => {
                        c.nextElementSibling.querySelector(".custom-select__current").textContent = c.value
                    }))
                }
            };

        function t(e, t) {
            t()
        }
        h((() => v.textContent = g.children[0].textContent), (() => {
            const e = g.children;
            for (var t = 0; t < e.length; t++) {
                let c = e[t].getAttribute("data-value"),
                    l = e[t].textContent;
                e[t].addEventListener("click", (() => {
                    _.classList.remove("custom-select--show"), v.textContent = l, m.value = c
                }))
            }
        })), document.addEventListener("mouseup", (e => {
            _.contains(e.target) || _.classList.remove("custom-select--show")
        })), t(y, x)
    }
    $(".calculator__group input").keyup((function() {
        $(this).val(c($(this).val().replace(/[^0-9]/g, "")));
        var e = $("[name='yandex']").val().replace(/\s/g, ""),
            t = $("[name='google']").val().replace(/\s/g, ""),
            l = $("[name='priceyandex']").val().replace(/\s/g, ""),
            o = $("[name='pricegoogle']").val().replace(/\s/g, ""),
            n = "";
        $(".calculator__group select option:selected").each((function() {
            n += $(this).attr("data") + " "
        })), resultyandex = "" == l ? null == n ? e / 100 * n * 50 : e / 100 * 25 * 50 : null == n ? e / 100 * n * l : e / 100 * 25 * l, resultgoogle = "" == o ? null == n ? t / 100 * n * 50 : t / 100 * 25 * 50 : null == n ? t / 100 * n * o : t / 100 * 25 * o, resultSUM = resultyandex + resultgoogle;
        var a = 12 * resultSUM;
        a || resultSUM ? ($(".year span").text(c(Math.ceil(a))), $(".month span").text(c(Math.ceil(resultSUM)))) : ($(".year span").text("0"), $(".month span").text("0"))
    })), $(".calculator__group select").change((function() {
        var e = $("[name='yandex']").val().replace(/\s/g, ""),
            t = $("[name='google']").val().replace(/\s/g, ""),
            l = $("[name='priceyandex']").val().replace(/\s/g, ""),
            o = $("[name='pricegoogle']").val().replace(/\s/g, ""),
            n = "";
        $(".calculator__group select option:selected").each((function() {
            n += $(this).attr("data") + " "
        })), resultyandex = "" == l ? e / 100 * n * 50 : e / 100 * n * l, resultgoogle = "" == o ? t / 100 * n * 50 : t / 100 * n * o, resultSUM = resultyandex + resultgoogle;
        var a = 12 * resultSUM;
        a || resultSUM ? ($(".year span").text(c(Math.ceil(a))), $(".month span").text(c(Math.ceil(resultSUM)))) : ($(".year span").text("0"), $(".month span").text("0"))
    }));
    var c = function(e) {
        for (var t = (e + "").split("."), c = t[0], l = c.length, o = "", n = l - 1; n >= 0;) o = c.charAt(n) + o, (l - n) % 3 == 0 && n > 0 && (o = " " + o), --n;
        return t.length > 1 && (o += "." + t[1]), o
    };
    $(".custom-select__item").on("click", (function() {
        "Выберите тематику сайта" == $(this).data("value") ? $(".custom-select__current").removeClass("custom-select__current--notdef") : $(".custom-select__current").addClass("custom-select__current--notdef")
    })), $('.custom-select__item[data-value="Выберите тематику сайта"]').on("click", (function() {
        $(".calopt0").prop("selected", !0)
    })), $('.custom-select__item[data-value="Реклама"]').on("click", (function() {
        $(".calopt1").prop("selected", !0)
    })), $('.custom-select__item[data-value="Услуги"]').on("click", (function() {
        $(".calopt2").prop("selected", !0)
    })), $('.custom-select__item[data-value="Ecommerce / online retail"]').on("click", (function() {
        $(".calopt3").prop("selected", !0)
    })), $('.custom-select__item[data-value="Образование"]').on("click", (function() {
        $(".calopt4").prop("selected", !0)
    })), $('.custom-select__item[data-value="Финансы"]').on("click", (function() {
        $(".calopt5").prop("selected", !0)
    })), $('.custom-select__item[data-value="Юриспруденция"]').on("click", (function() {
        $(".calopt6").prop("selected", !0)
    })), $('.custom-select__item[data-value="Медицина"]').on("click", (function() {
        $(".calopt7").prop("selected", !0)
    })), $('.custom-select__item[data-value="Онлайн сервисы"]').on("click", (function() {
        $(".calopt8").prop("selected", !0)
    })), $('.custom-select__item[data-value="Медицина"]').on("click", (function() {
        $(".calopt7").prop("selected", !0)
    })), $('.custom-select__item[data-value="Онлайн сервисы"]').on("click", (function() {
        $(".calopt8").prop("selected", !0)
    })), $('.custom-select__item[data-value="Программное обеспечение / IT"]').on("click", (function() {
        $(".calopt9").prop("selected", !0)
    })), $('.custom-select__item[data-value="Телеком"]').on("click", (function() {
        $(".calopt10").prop("selected", !0)
    })), $('.custom-select__item[data-value="Туризм"]').on("click", (function() {
        $(".calopt11").prop("selected", !0)
    })), $('.custom-select__item[data-value="Недвижимость"]').on("click", (function() {
        $(".calopt12").prop("selected", !0)
    })), $('.custom-select__item[data-value="Авто"]').on("click", (function() {
        $(".calopt13").prop("selected", !0)
    })), $(".custom-select__item").on("click", (function() {
        var e = $("[name='yandex']").val().replace(/\s/g, ""),
            t = $("[name='google']").val().replace(/\s/g, ""),
            l = $("[name='priceyandex']").val().replace(/\s/g, ""),
            o = $("[name='pricegoogle']").val().replace(/\s/g, ""),
            n = "";
        $(".calculator__group select option:selected").each((function() {
            n += $(this).attr("data") + " "
        })), resultyandex = "" == l ? e / 100 * n * 50 : e / 100 * n * l, resultgoogle = "" == o ? t / 100 * n * 50 : t / 100 * n * o, resultSUM = resultyandex + resultgoogle;
        var a = 12 * resultSUM;
        a || resultSUM ? ($(".year span").text(c(Math.ceil(a))), $(".month span").text(c(Math.ceil(resultSUM)))) : ($(".year span").text("0"), $(".month span").text("0"))
    }))
}));