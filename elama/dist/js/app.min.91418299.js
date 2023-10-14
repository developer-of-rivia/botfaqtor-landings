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
        "Р’С‹Р±РµСЂРёС‚Рµ С‚РµРјР°С‚РёРєСѓ СЃР°Р№С‚Р°" == $(this).data("value") ? $(".custom-select__current").removeClass("custom-select__current--notdef") : $(".custom-select__current").addClass("custom-select__current--notdef")
    })), $('.custom-select__item[data-value="Р’С‹Р±РµСЂРёС‚Рµ С‚РµРјР°С‚РёРєСѓ СЃР°Р№С‚Р°"]').on("click", (function() {
        $(".calopt0").prop("selected", !0)
    })), $('.custom-select__item[data-value="Р РµРєР»Р°РјР°"]').on("click", (function() {
        $(".calopt1").prop("selected", !0)
    })), $('.custom-select__item[data-value="РЈСЃР»СѓРіРё"]').on("click", (function() {
        $(".calopt2").prop("selected", !0)
    })), $('.custom-select__item[data-value="Ecommerce / online retail"]').on("click", (function() {
        $(".calopt3").prop("selected", !0)
    })), $('.custom-select__item[data-value="РћР±СЂР°Р·РѕРІР°РЅРёРµ"]').on("click", (function() {
        $(".calopt4").prop("selected", !0)
    })), $('.custom-select__item[data-value="Р¤РёРЅР°РЅСЃС‹"]').on("click", (function() {
        $(".calopt5").prop("selected", !0)
    })), $('.custom-select__item[data-value="Р®СЂРёСЃРїСЂСѓРґРµРЅС†РёСЏ"]').on("click", (function() {
        $(".calopt6").prop("selected", !0)
    })), $('.custom-select__item[data-value="РњРµРґРёС†РёРЅР°"]').on("click", (function() {
        $(".calopt7").prop("selected", !0)
    })), $('.custom-select__item[data-value="РћРЅР»Р°Р№РЅ СЃРµСЂРІРёСЃС‹"]').on("click", (function() {
        $(".calopt8").prop("selected", !0)
    })), $('.custom-select__item[data-value="РњРµРґРёС†РёРЅР°"]').on("click", (function() {
        $(".calopt7").prop("selected", !0)
    })), $('.custom-select__item[data-value="РћРЅР»Р°Р№РЅ СЃРµСЂРІРёСЃС‹"]').on("click", (function() {
        $(".calopt8").prop("selected", !0)
    })), $('.custom-select__item[data-value="РџСЂРѕРіСЂР°РјРјРЅРѕРµ РѕР±РµСЃРїРµС‡РµРЅРёРµ / IT"]').on("click", (function() {
        $(".calopt9").prop("selected", !0)
    })), $('.custom-select__item[data-value="РўРµР»РµРєРѕРј"]').on("click", (function() {
        $(".calopt10").prop("selected", !0)
    })), $('.custom-select__item[data-value="РўСѓСЂРёР·Рј"]').on("click", (function() {
        $(".calopt11").prop("selected", !0)
    })), $('.custom-select__item[data-value="РќРµРґРІРёР¶РёРјРѕСЃС‚СЊ"]').on("click", (function() {
        $(".calopt12").prop("selected", !0)
    })), $('.custom-select__item[data-value="РђРІС‚Рѕ"]').on("click", (function() {
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
    })), document.querySelectorAll(".nav__dropdown").forEach((e => {
        document.addEventListener("click", (t => {
            t.composedPath().includes(e) || e.classList.remove("nav__dropdown--open")
        })), e.addEventListener("click", (function() {
            e.classList.toggle("nav__dropdown--open")
        }))
    }));
    let l = document.querySelector(".header__toggle-burger"),
        o = document.querySelector(".header__toggle-close"),
        n = document.querySelector(".header__panel"),
        a = document.querySelector(".header__panel");
    l.addEventListener("click", (function() {
        o.classList.remove("hidden"), l.classList.add("hidden"), n.classList.add("header__panel--open"), scrollLock.disablePageScroll(a)
    })), o.addEventListener("click", (function() {
        o.classList.add("hidden"), l.classList.remove("hidden"), n.classList.remove("header__panel--open"), scrollLock.enablePageScroll(a)
    })), window.onscroll = function() {
        var e = document.querySelector(".header");
        window.pageYOffset > 100 ? e.classList.add("header_fixed") : e.classList.remove("header_fixed")
    };
    let s = document.querySelectorAll(".tabs__head"),
        r = document.querySelectorAll(".tabs__item");

    function i() {
        s.forEach((e => {
            e.classList.remove("tabs__item--show")
        })), r.forEach((e => {
            e.classList.remove("tabs__item--show")
        }))
    }
    s.forEach((function(e, t) {
        e.addEventListener("click", (function() {
            i(), this.classList.add("tabs__item--show"), r[t].classList.add("tabs__item--show")
        }))
    }));
    document.querySelectorAll(".accordion").forEach((e => {
        e.addEventListener("click", (e => {
            const t = e.currentTarget,
                c = t.querySelector(".accordion__control"),
                l = t.querySelector(".accordion__content");
            t.classList.toggle("open"), t.classList.contains("open") ? (c.setAttribute("aria-expanded", !0), l.setAttribute("aria-hidden", !1), l.style.maxHeight = l.scrollHeight + "px") : (c.setAttribute("aria-expanded", !1), l.setAttribute("aria-hidden", !0), l.style.maxHeight = null)
        }))
    }));
    let u = !1;
    $(window).on("scroll", (function() {
        $(".numbers__box").hasClass("animated") && 0 == u && (u = !0, $(".numbers__item-count").each((function() {
            function e(e, t) {
                return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, t || " ")
            }
            const t = $(this);
            $({
                Count: t.text()
            }).animate({
                Count: t.parent().attr("data-count")
            }, {
                duration: 1500,
                easing: "linear",
                step: function() {
                    t.text(Math.floor(this.Count))
                },
                complete: function() {
                    t.text(this.Count).css({
                        color: "red"
                    }), document.querySelector(".numbers__item-count--a").innerHTML = e(982600637), document.querySelector(".numbers__item-count--b").innerHTML = e(39163000), document.querySelector(".numbers__item-count--c").innerHTML = e(11198), document.querySelector(".numbers__item-count--d").innerHTML = e(51211)
                }
            })
        })))
    }))
}));;


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


	const tabs1 = new GraphTabs('tab', {
		isChanged: (tabs) => {
		  console.log(tabs);
		}
	});


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
});






$(document).ready(function(){
	$(window).on("scroll", (function() {
		if($(".numbers__box").hasClass("animated") && !$(".numbers__box").hasClass("numEnd")) {
			$(".numbers__item-count").each((function() {
				function e(e, t) {
					return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, t || " ")
				}
				const t = $(this);
				$({
					Count: t.text()
				}).animate({
					Count: t.parent().attr("data-count")
				}, {
					duration: 1500,
					easing: "linear",
					step: function() {
						t.text(Math.floor(this.Count))
					},
					complete: function() {
						t.text(this.Count).css({
							color: "red"
						}), document.querySelector(".numbers__item-count--a").innerHTML = e(982600637),
							document.querySelector(".numbers__item-count--b").innerHTML = e(39163000),
							document.querySelector(".numbers__item-count--c").innerHTML = e(11198),
							document.querySelector(".numbers__item-count--d").innerHTML = e(51211);
						$(".numbers__box").addClass('numEnd');
					}
				})
			}));
		}
	}))
});





/*! WOW - v1.1.2 - 2015-08-19
 * Copyright (c) 2015 Matthieu Aussaguel; Licensed MIT */
(function() {
    var t, e, n, i, o, r = function(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        },
        s = [].indexOf || function(t) {
            for (var e = 0, n = this.length; n > e; e++)
                if (e in this && this[e] === t) return e;
            return -1
        };
    e = function() {
        function t() {}
        return t.prototype.extend = function(t, e) {
            var n, i;
            for (n in e) i = e[n], null == t[n] && (t[n] = i);
            return t
        }, t.prototype.isMobile = function(t) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
        }, t.prototype.createEvent = function(t, e, n, i) {
            var o;
            return null == e && (e = !1), null == n && (n = !1), null == i && (i = null), null != document.createEvent ? (o = document.createEvent("CustomEvent")).initCustomEvent(t, e, n, i) : null != document.createEventObject ? (o = document.createEventObject()).eventType = t : o.eventName = t, o
        }, t.prototype.emitEvent = function(t, e) {
            return null != t.dispatchEvent ? t.dispatchEvent(e) : e in (null != t) ? t[e]() : "on" + e in (null != t) ? t["on" + e]() : void 0
        }, t.prototype.addEvent = function(t, e, n) {
            return null != t.addEventListener ? t.addEventListener(e, n, !1) : null != t.attachEvent ? t.attachEvent("on" + e, n) : t[e] = n
        }, t.prototype.removeEvent = function(t, e, n) {
            return null != t.removeEventListener ? t.removeEventListener(e, n, !1) : null != t.detachEvent ? t.detachEvent("on" + e, n) : delete t[e]
        }, t.prototype.innerHeight = function() {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, t
    }(), n = this.WeakMap || this.MozWeakMap || (n = function() {
        function t() {
            this.keys = [], this.values = []
        }
        return t.prototype.get = function(t) {
            var e, n, i, o;
            for (e = n = 0, i = (o = this.keys).length; i > n; e = ++n)
                if (o[e] === t) return this.values[e]
        }, t.prototype.set = function(t, e) {
            var n, i, o, r;
            for (n = i = 0, o = (r = this.keys).length; o > i; n = ++i)
                if (r[n] === t) return void(this.values[n] = e);
            return this.keys.push(t), this.values.push(e)
        }, t
    }()), t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function() {
        function t() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return t.notSupported = !0, t.prototype.observe = function() {}, t
    }()), i = this.getComputedStyle || function(t) {
        return this.getPropertyValue = function(e) {
            var n;
            return "float" === e && (e = "styleFloat"), o.test(e) && e.replace(o, (function(t, e) {
                return e.toUpperCase()
            })), (null != (n = t.currentStyle) ? n[e] : void 0) || null
        }, this
    }, o = /(\-([a-z]){1})/g, this.WOW = function() {
        function o(t) {
            null == t && (t = {}), this.scrollCallback = r(this.scrollCallback, this), this.scrollHandler = r(this.scrollHandler, this), this.resetAnimation = r(this.resetAnimation, this), this.start = r(this.start, this), this.scrolled = !0, this.config = this.util().extend(t, this.defaults), null != t.scrollContainer && (this.config.scrollContainer = document.querySelector(t.scrollContainer)), this.animationNameCache = new n, this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        return o.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 150,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        }, o.prototype.init = function() {
            var t;
            return this.element = window.document.documentElement, "interactive" === (t = document.readyState) || "complete" === t ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, o.prototype.start = function() {
            var e, n, i, o;
            if (this.stopped = !1, this.boxes = function() {
                    var t, n, i, o;
                    for (o = [], t = 0, n = (i = this.element.querySelectorAll("." + this.config.boxClass)).length; n > t; t++) e = i[t], o.push(e);
                    return o
                }.call(this), this.all = function() {
                    var t, n, i, o;
                    for (o = [], t = 0, n = (i = this.boxes).length; n > t; t++) e = i[t], o.push(e);
                    return o
                }.call(this), this.boxes.length)
                if (this.disabled()) this.resetStyle();
                else
                    for (n = 0, i = (o = this.boxes).length; i > n; n++) e = o[n], this.applyStyle(e, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new t(function(t) {
                return function(e) {
                    var n, i, o, r, s;
                    for (s = [], n = 0, i = e.length; i > n; n++) r = e[n], s.push(function() {
                        var t, e, n, i;
                        for (i = [], t = 0, e = (n = r.addedNodes || []).length; e > t; t++) o = n[t], i.push(this.doSync(o));
                        return i
                    }.call(t));
                    return s
                }
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }, o.prototype.stop = function() {
            return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, o.prototype.sync = function() {
            return t.notSupported ? this.doSync(this.element) : void 0
        }, o.prototype.doSync = function(t) {
            var e, n, i, o, r;
            if (null == t && (t = this.element), 1 === t.nodeType) {
                for (r = [], n = 0, i = (o = (t = t.parentNode || t).querySelectorAll("." + this.config.boxClass)).length; i > n; n++) e = o[n], s.call(this.all, e) < 0 ? (this.boxes.push(e), this.all.push(e), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0), r.push(this.scrolled = !0)) : r.push(void 0);
                return r
            }
        }, o.prototype.show = function(t) {
            return this.applyStyle(t), t.className = t.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(t), this.util().emitEvent(t, this.wowEvent), this.util().addEvent(t, "animationend", this.resetAnimation), this.util().addEvent(t, "oanimationend", this.resetAnimation), this.util().addEvent(t, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(t, "MSAnimationEnd", this.resetAnimation), t
        }, o.prototype.applyStyle = function(t, e) {
            var n, i, o;
            return i = t.getAttribute("data-wow-duration"), n = t.getAttribute("data-wow-delay"), o = t.getAttribute("data-wow-iteration"), this.animate(function(r) {
                return function() {
                    return r.customStyle(t, e, i, n, o)
                }
            }(this))
        }, o.prototype.animate = "requestAnimationFrame" in window ? function(t) {
            return window.requestAnimationFrame(t)
        } : function(t) {
            return t()
        }, o.prototype.resetStyle = function() {
            var t, e, n, i, o;
            for (o = [], e = 0, n = (i = this.boxes).length; n > e; e++) t = i[e], o.push(t.style.visibility = "visible");
            return o
        }, o.prototype.resetAnimation = function(t) {
            var e;
            return t.type.toLowerCase().indexOf("animationend") >= 0 ? (e = t.target || t.srcElement).className = e.className.replace(this.config.animateClass, "").trim() : void 0
        }, o.prototype.customStyle = function(t, e, n, i, o) {
            return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", n && this.vendorSet(t.style, {
                animationDuration: n
            }), i && this.vendorSet(t.style, {
                animationDelay: i
            }), o && this.vendorSet(t.style, {
                animationIterationCount: o
            }), this.vendorSet(t.style, {
                animationName: e ? "none" : this.cachedAnimationName(t)
            }), t
        }, o.prototype.vendors = ["moz", "webkit"], o.prototype.vendorSet = function(t, e) {
            var n, i, o, r;
            for (n in i = [], e) o = e[n], t["" + n] = o, i.push(function() {
                var e, i, s, l;
                for (l = [], e = 0, i = (s = this.vendors).length; i > e; e++) r = s[e], l.push(t["" + r + n.charAt(0).toUpperCase() + n.substr(1)] = o);
                return l
            }.call(this));
            return i
        }, o.prototype.vendorCSS = function(t, e) {
            var n, o, r, s, l, a;
            for (s = (l = i(t)).getPropertyCSSValue(e), n = 0, o = (r = this.vendors).length; o > n; n++) a = r[n], s = s || l.getPropertyCSSValue("-" + a + "-" + e);
            return s
        }, o.prototype.animationName = function(t) {
            var e;
            try {
                e = this.vendorCSS(t, "animation-name").cssText
            } catch (n) {
                e = i(t).getPropertyValue("animation-name")
            }
            return "none" === e ? "" : e
        }, o.prototype.cacheAnimationName = function(t) {
            return this.animationNameCache.set(t, this.animationName(t))
        }, o.prototype.cachedAnimationName = function(t) {
            return this.animationNameCache.get(t)
        }, o.prototype.scrollHandler = function() {
            return this.scrolled = !0
        }, o.prototype.scrollCallback = function() {
            var t;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
                var e, n, i, o;
                for (o = [], e = 0, n = (i = this.boxes).length; n > e; e++)(t = i[e]) && (this.isVisible(t) ? this.show(t) : o.push(t));
                return o
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, o.prototype.offsetTop = function(t) {
            for (var e; void 0 === t.offsetTop;) t = t.parentNode;
            for (e = t.offsetTop; t = t.offsetParent;) e += t.offsetTop;
            return e
        }, o.prototype.isVisible = function(t) {
            var e, n, i, o, r;
            return n = t.getAttribute("data-wow-offset") || this.config.offset, o = (r = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset) + Math.min(this.element.clientHeight, this.util().innerHeight()) - n, e = (i = this.offsetTop(t)) + t.clientHeight, o >= i && e >= r
        }, o.prototype.util = function() {
            return null != this._util ? this._util : this._util = new e
        }, o.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, o
    }()
}).call(this);