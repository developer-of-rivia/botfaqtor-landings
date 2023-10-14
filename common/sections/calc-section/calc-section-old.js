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
}));