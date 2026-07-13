!(function (e, t) {
    "use strict";
    let o = {
        init: function () {
            var t, i;
            let r = {
                "xpro-advance-gallery.default": o.AdvanceGallery,
                "xpro-text-marquee.default": o.TextMarquee,
                "xpro-advance-portfolio.default": o.AdvancePortfolio,
                "xpro-carousel-gallery.default": o.CarouselGallery,
                "xpro-carousel-portfolio.default": o.CarouselPortfolio,
                "xpro-list-portfolio.default": o.ListPortfolio,
                "xpro-animated-heading.default": o.AnimatedHeading,
                "xpro-advance-tabs.default": o.AdvanceTabs,
                "xpro-pricing-carousel.default": o.PricingCarousel,
                "xpro-pricing-matrix.default": o.PricingMatrix,
                "xpro-vertical-menu.default": o.VerticalMenu,
                "xpro-hamburger.default": o.Hamburger,
                "xpro-peel-card.default": o.PeelCard,
                "xpro-scratch-card.default": o.ScratchCard,
                "xpro-bar-chart.default": o.BarChart,
                "xpro-donut-chart.default": o.DonutChart,
                "xpro-polar-chart.default": o.PolarChart,
                "xpro-radar-chart.default": o.RadarChart,
                "xpro-woo-product-filters.default": o.WooFilters,
                "xpro-product-view-360.default": o.ProductView360,
                "xpro-slider.default": o.Slider,
                "xpro-team-carousel.default": o.TeamCarousel,
                "xpro-testimonial-carousel.default": o.TestimonialCarousel,
                "xpro-logo-carousel.default": o.LogoCarousel,
                "xpro-hover-card.default": o.HoverCard,
                "xpro-advance-accordion.default": o.AdvanceAccordion,
                "xpro-countdown.default": o.Countdown,
                "xpro-post-carousel.default": o.PostCarousel,
                "xpro-draw-svg.default": o.DrawSVG,
                "xpro-modal-popup.default": o.ModalPopup,
                "xpro-image-accordion.default": o.ImageAccordion,
                "xpro-device-slider.default": o.DeviceSlider,
                "xpro-google-map.default": o.GoogleMap,
                "xpro-street-map.default": o.StreetMap,
                "xpro-vertical-timeline.default": o.VerticalTimeline,
                "xpro-unfold.default": o.Unfold,
                "xpro-cookies.default": o.Cookies,
                "xpro-alert-box.default": o.AlertBox,
                "xpro-preloader.default": o.Preloader,
                "xpro-video.default": o.Video,
                "xpro-flip-box.default": o.FlipBox,
                "xpro-mouse-cursor.default": o.MouseCursor,
                "xpro-one-page-navigation.default": o.OnePageNavigation,
                "xpro-ajax-live-search.default": o.AjaxSearch,
                "xpro-source-code.default": o.SourceCode,
                "xpro-image-magnify.default": o.ImageMagnify,
                "xpro-instagram-feed.default": o.InstagramFeed,
                "xpro-slide-anything.default": o.SlideAnything,
                "xpro-scroll-to-top.default": o.ScrollToTop,
                "xpro-split-slider.default": o.SplitSlider,
                "xpro-audio-player.default": o.AudioPlayer,
                "xpro-coupon-code.default": o.CouponCode,
                "xpro-loop-builder.default": o.LoopBuilder,
                "xpro-loop-carousel.default": o.LoopCarousel,
                "xpro-mailchimp.default": o.MailChimp,
                "xpro-mega-menu.default": o.MegaMenu,
                "xpro-advanced-posts.default": o.AdvancedPosts,
                "xpro-remote-arrows.default": o.RemoteArrows,
                "xpro-video-gallery.default": o.VideoGallery,
                "xpro-video-carousel.default": o.VideoCarousel,
                "xpro-flip-book-3d.default": o.FlipBook3D,
            };
            e.each(r, function (e, t) {
                elementorFrontend.hooks.addAction("frontend/element_ready/" + e, t);
            }),
                (t = e.fn.addClass),
                (e.fn.addClass = function () {
                    return t.apply(this, arguments), this.trigger("XproClassChanged"), this;
                }),
                (i = e.fn.removeClass),
                (e.fn.removeClass = function () {
                    return i.apply(this, arguments), this.trigger("XproClassChanged"), this;
                }),
                (e.fn.removeClassRegex = function (t) {
                    return e(this).removeClass(function (e, o) {
                        return o
                            .split(/\s+/)
                            .filter(function (e) {
                                return t.test(e);
                            })
                            .join(" ");
                    });
                }),
                e("[data-fancybox]").length && e("[data-fancybox]").data().fancybox && Fancybox.bind("[data-fancybox]", { Hash: !0, Thumbs: !1, Toolbar: !0 });
        },
        getElementSettings: function (e, t) {
            var i = {},
                r = e.data("model-cid");
            if (elementorFrontend.isEditMode() && r) {
                var a = elementorFrontend.config.elements.data[r],
                    n = a.attributes.widgetType || a.attributes.elType,
                    l = elementorFrontend.config.elements.keys[n];
                l ||
                    ((l = elementorFrontend.config.elements.keys[n] = []),
                    jQuery.each(a.controls, function (e, t) {
                        t.frontend_available && l.push(e);
                    })),
                    jQuery.each(a.getActiveControls(), function (e) {
                        -1 !== l.indexOf(e) && (i[e] = a.attributes[e]);
                    });
            } else i = e.data("settings") || {};
            return o.getItems(i, t);
        },
        getItems: function (e, t) {
            if (t) {
                var o = t.split("."),
                    i = o.splice(0, 1);
                if (!o.length) return e[i];
                if (!e[i]) return;
                return this.getItems(e[i], o.join("."));
            }
            return e;
        },
        AdvanceGallery: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-elementor-gallery-wrapper"),
                a = t.find(".xpro-elementor-gallery-item"),
                n = t.find(".xpro-elementor-gallery-filter > ul"),
                l = t.find(".xpro-gallery-elementor-loadmore"),
                s = t.find(".xpro-elementor-gallery-filter > ul").attr("data-default-filter"),
                p = "masonry" === i.gallery_style ? "grid" : i.gallery_style;
            function d() {
                if (
                    "none" !== i.popup &&
                    (a.lightGallery({
                        pager: !0,
                        addClass: "xpro-gallery-popup-style-" + i.popup,
                        selector: "[data-xpro-lightbox]",
                        thumbnail: "yes" === i.thumbnail,
                        exThumbImage: "data-src",
                        thumbWidth: 130,
                        thumbMargin: 15,
                        closable: !1,
                        showThumbByDefault: "yes" === i.thumbnail_by_default,
                        thumbContHeight: 150,
                        subHtmlSelectorRelative: !0,
                        hideBarsDelay: 99999999,
                        share: "yes" === i.share,
                        download: "yes" === i.download,
                    }),
                    "3" === i.popup || "4" === i.popup)
                ) {
                    var t = null;
                    a.on("onBeforeSlide.lg", function (o, r, n) {
                        (t = a.data("lightGallery").$items.eq(n).attr("data-src")),
                            "album" === i.gallery_type && (t = n > 0 ? e(this).find(".xpro-elementor-gallery-preview").eq(n).attr("data-src") : e(this).find(".cbp-l-caption-alignCenter").data("src")),
                            e(".lg-backdrop").addClass("xpro-popup-blur"),
                            e(".lg-backdrop").css({ "background-image": "url(" + t + ")" });
                    });
                }
            }
            "simple" === i.gallery_type && (a = r),
                setTimeout(function () {
                    r.cubeportfolio({
                        filters: n,
                        layoutMode: p,
                        defaultFilter: s,
                        animationType: i.filter_animation,
                        gridAdjustment: "responsive",
                        lightboxGallery: !1,
                        mediaQueries: [
                            { width: elementorFrontend.config.breakpoints.lg, cols: i.item_per_row || 3, options: { gapHorizontal: i.margin.size || 0, gapVertical: i.margin.size || 0 } },
                            { width: elementorFrontend.config.breakpoints.md, cols: i.item_per_row_tablet || 2, options: { gapHorizontal: i.margin_tablet.size || 0, gapVertical: i.margin_tablet.size || 0 } },
                            { width: 0, cols: i.item_per_row_mobile || 1, options: { gapHorizontal: i.margin_mobile.size || 0, gapVertical: i.margin_mobile.size || 0 } },
                        ],
                        caption: i.hover_effect || "zoom",
                        displayType: "sequentially",
                        displayTypeSpeed: 80,
                        plugins: { loadMore: { element: t.find(".cbp-l-loadMore-button"), action: i.load_more || "click", loadItems: i.item_on_load || 3 }, sort: { element: t.find(".cbp-loadMore-block1") } },
                    });
                }, 500),
                l.on("XproClassChanged", function () {
                    a.data("lightGallery") &&
                        "none" !== i.popup &&
                        setTimeout(function () {
                            a.data("lightGallery").destroy(!0), d();
                        }, 1e3);
                }),
                d();
            let c = t.find(".xpro-filter-dropdown-tablet,.xpro-filter-dropdown-mobile"),
                u = t.find('[data-filter="' + s + '"]'),
                m = c.find("li.cbp-filter-item-active").text();
            c.find(".xpro-select-content").text(m || u.text()),
                c.on("click", function () {
                    e(this).toggleClass("active");
                }),
                c.find(".cbp-l-filters-button > li").on("click", function () {
                    c.find(".xpro-select-content").text(e(this).text());
                });
        },
        CarouselGallery: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-elementor-carousel-gallery"),
                a = t.find(".xpro-elementor-carousel-gallery-item"),
                n;
            if (
                (e(".e-route-panel-editor-content").length && (n = ".elementor-preview-responsive-wrapper"),
                r.owlCarousel({
                    loop: "yes" === i.loop,
                    nav: "yes" === i.nav,
                    navText: ["", ""],
                    rtl: "yes" === i.rtl,
                    dots: "yes" === i.dots,
                    mouseDrag: "yes" === i.mouse_drag,
                    responsiveBaseElement: n,
                    autoplay: "yes" === i.autoplay,
                    autoplayTimeout: "yes" === i.autoplay ? 1e3 * i.autoplay_timeout.size : 3e3,
                    autoplayHoverPause: !0,
                    smartSpeed: 1e3,
                    autoHeight: "yes" !== i.item_custom_height,
                    responsive: {
                        0: { items: i.item_per_row_mobile || 1, margin: i.margin_mobile.size || 0, stagePadding: (i.margin_mobile.size || 0) / 2 },
                        768: { items: i.item_per_row_tablet || 2, margin: i.margin_tablet.size || 0, stagePadding: (i.margin_tablet.size || 0) / 2 },
                        1024: { items: i.item_per_row || 3, margin: i.margin.size || 0, stagePadding: (i.margin.size || 0) / 2 },
                    },
                }),
                "simple" === i.gallery_type && (a = t.find(".xpro-elementor-carousel-gallery")),
                "none" !== i.popup &&
                    (a.lightGallery({
                        pager: !0,
                        addClass: "xpro-gallery-popup-style-" + i.popup,
                        selector: "[data-xpro-lightbox]",
                        thumbnail: "yes" === i.thumbnail,
                        exThumbImage: "data-src",
                        thumbWidth: 130,
                        thumbMargin: 15,
                        closable: !1,
                        showThumbByDefault: "yes" === i.thumbnail_by_default,
                        thumbContHeight: 150,
                        subHtmlSelectorRelative: !0,
                        hideBarsDelay: 99999999,
                        share: "yes" === i.share,
                        download: "yes" === i.download,
                    }),
                    "3" === i.popup || "4" === i.popup))
            ) {
                var l = null;
                a.on("onBeforeSlide.lg", function (t, o, r) {
                    (l = a.data("lightGallery").$items.eq(r).attr("data-src")),
                        "album" === i.gallery_type && (l = r > 0 ? e(this).find(".xpro-elementor-gallery-preview").eq(r).attr("data-src") : e(this).find(".xpro-elementor-carousel-gallery-item-inner").data("src")),
                        e(".lg-backdrop").addClass("xpro-popup-blur"),
                        e(".lg-backdrop").css({ "background-image": "url(" + l + ")" });
                });
            }
        },
        AdvancePortfolio: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-elementor-gallery-wrapper"),
                a = t.find(".xpro-elementor-gallery-filter > ul"),
                n = t.find(".xpro-elementor-gallery-filter > ul").attr("data-default-filter"),
                l = "masonry" === i.gallery_style ? "grid" : i.gallery_style;
            f(),
                setTimeout(function () {
                    r.cubeportfolio({
                        filters: a,
                        layoutMode: l,
                        defaultFilter: n,
                        animationType: i.filter_animation,
                        gridAdjustment: "responsive",
                        lightboxGallery: !1,
                        mediaQueries: [
                            { width: elementorFrontend.config.breakpoints.lg, cols: i.item_per_row || 3, options: { gapHorizontal: i.margin.size || 0, gapVertical: i.margin.size || 0 } },
                            { width: elementorFrontend.config.breakpoints.md, cols: i.item_per_row_tablet || 2, options: { gapHorizontal: i.margin_tablet.size || 0, gapVertical: i.margin_tablet.size || 0 } },
                            { width: 0, cols: i.item_per_row_mobile || 1, options: { gapHorizontal: i.margin_mobile.size || 0, gapVertical: i.margin_mobile.size || 0 } },
                        ],
                        caption: i.hover_effect || "zoom",
                        displayType: "sequentially",
                        displayTypeSpeed: 80,
                        plugins: { loadMore: { element: t.find(".cbp-l-loadMore-button"), action: i.load_more || "click", loadItems: i.item_per_row || 3 }, sort: { element: t.find(".cbp-loadMore-block1") } },
                    });
                }, 500);
            let s = t.find(".xpro-filter-dropdown-tablet,.xpro-filter-dropdown-mobile"),
                p = t.find('[data-filter="' + n + '"]'),
                d = s.find("li.cbp-filter-item-active").text();
            s.find(".xpro-select-content").text(d || p.text()),
                s.on("click", function () {
                    e(this).toggleClass("active");
                }),
                s.find(".cbp-l-filters-button > li").on("click", function () {
                    s.find(".xpro-select-content").text(e(this).text());
                });
            var c = null;
            let u = new TimelineLite();
            function m(o, r) {
                let a = e(o).data("title");
                if ("false" === (c = e(o).data("src-preview"))) return;
                e(o).siblings().removeClass("xpro-preview-demo-item-open"),
                    e(o).addClass("xpro-preview-demo-item-open"),
                    t.find(".xpro-preview").find(".xpro-preview-prev-demo, .xpro-preview-next-demo").removeClass("xpro-preview-inactive"),
                    t.find(".xpro-preview").find(".xpro-preview-prev-thumb, .xpro-preview-next-thumb").removeClass("xpro-preview-inactive");
                let n = e(o).prev("[data-src-preview]");
                n.length <= 0 && (t.find(".xpro-preview .xpro-preview-prev-demo").addClass("xpro-preview-inactive"), t.find(".xpro-preview .xpro-preview-prev-thumb").addClass("xpro-preview-inactive"));
                let l = e(o).next("[data-src-preview]");
                if (
                    (l.length <= 0 && (t.find(".xpro-preview .xpro-preview-next-demo").addClass("xpro-preview-inactive"), t.find(".xpro-preview .xpro-preview-next-thumb").addClass("xpro-preview-inactive")),
                    "layout-5" === i.popup_layout || "layout-6" === i.popup_layout)
                ) {
                    let s = n.find(".cbp-caption-defaultWrap").attr("data-xpro-thumb"),
                        p = l.find(".cbp-caption-defaultWrap").attr("data-xpro-thumb");
                    s && t.find(".xpro-preview-prev-demo .xpro-preview-nav-img").css("background-image", "url(" + s + ")"), p && t.find(".xpro-preview-next-demo .xpro-preview-nav-img").css("background-image", "url(" + p + ")");
                }
                if ("layout-10" === i.popup_layout) {
                    let d = n.find(".cbp-caption-defaultWrap").attr("data-xpro-thumb"),
                        u = e(o).find(".cbp-caption-defaultWrap").attr("data-xpro-thumb"),
                        m = l.find(".cbp-caption-defaultWrap").attr("data-xpro-thumb");
                    d && t.find(".xpro-preview-thumbnails .xpro-preview-prev-thumb").css("background-image", "url(" + d + ")"),
                        u && t.find(".xpro-preview-thumbnails .xpro-preview-current-thumb").css("background-image", "url(" + u + ")"),
                        m && t.find(".xpro-preview-thumbnails .xpro-preview-next-thumb").css("background-image", "url(" + m + ")");
                }
                t.find(".xpro-preview .xpro-preview-header-info").html(""),
                    a && t.find(".xpro-preview .xpro-preview-header-info").append(`<div class="xpro-preview-demo-name">${a}</div>`),
                    t.find(".xpro-preview .xpro-preview-iframe").attr("src", c),
                    e("body").addClass("xpro-preview-active"),
                    t.find(".xpro-preview").addClass("active");
            }
            function f() {
                t.find(".xpro-preview-demo-item").removeClass("xpro-preview-demo-item-open"),
                    t.find(".xpro-preview .xpro-preview-iframe").removeAttr("src"),
                    e("body").removeClass("xpro-preview-active"),
                    t.find(".xpro-preview").removeClass("active");
            }
            function g() {
                "1" === i.popup_animation && u.to(t.find(".xpro-portfolio-loader-style-1 li"), { duration: 0.4, scaleX: 1, transformOrigin: "bottom right" }),
                    "2" === i.popup_animation && u.to(t.find(".xpro-portfolio-loader-style-2 li"), { duration: 0.4, scaleX: 1, transformOrigin: "bottom left" }),
                    "3" === i.popup_animation && u.to(t.find(".xpro-portfolio-loader-style-3 li"), { duration: 0.4, scaleY: 1, transformOrigin: "top left", stagger: 0.2 }),
                    "4" === i.popup_animation && u.to(t.find(".xpro-portfolio-loader-style-4 li"), { duration: 0.4, scaleY: 1, transformOrigin: "bottom left", stagger: 0.2 }),
                    "5" === i.popup_animation && u.to(t.find(".xpro-portfolio-loader-style-5 li"), { duration: 0.4, scaleX: 1, transformOrigin: "bottom right" }),
                    "6" === i.popup_animation && u.to(t.find(".xpro-portfolio-loader-style-6 li"), { duration: 0.4, scaleX: 1, transformOrigin: "bottom left" }),
                    "7" === i.popup_animation && u.to(t.find(".xpro-portfolio-loader-style-7 li"), { duration: 0.4, scaleY: 1, transformOrigin: "top right" }),
                    "8" === i.popup_animation && u.to(t.find(".xpro-portfolio-loader-style-8 li"), { duration: 0.4, scaleY: 1, transformOrigin: "bottom right" }),
                    setTimeout(function () {
                        "1" === i.popup_animation && u.to(t.find(".xpro-portfolio-loader-style-1 li"), { duration: 0.4, scaleX: 0, transformOrigin: "bottom left" }),
                            "2" === i.popup_animation && u.to(t.find(".xpro-portfolio-loader-style-2 li"), { duration: 0.4, scaleX: 0, transformOrigin: "bottom right" }),
                            "3" === i.popup_animation && u.to(t.find(".xpro-portfolio-loader-style-3 li"), { duration: 0.4, scaleY: 0, transformOrigin: "bottom left", stagger: 0.2 }),
                            "4" === i.popup_animation && u.to(t.find(".xpro-portfolio-loader-style-4 li"), { duration: 0.4, scaleY: 0, transformOrigin: "top left", stagger: 0.2 }),
                            "5" === i.popup_animation && u.to(t.find(".xpro-portfolio-loader-style-5 li"), { duration: 0.4, scaleX: 0, transformOrigin: "bottom left" }),
                            "6" === i.popup_animation && u.to(t.find(".xpro-portfolio-loader-style-6 li"), { duration: 0.4, scaleX: 0, transformOrigin: "bottom right" }),
                            "7" === i.popup_animation && u.to(t.find(".xpro-portfolio-loader-style-7 li"), { duration: 0.4, scaleY: 0, transformOrigin: "bottom right" }),
                            "8" === i.popup_animation && u.to(t.find(".xpro-portfolio-loader-style-8 li"), { duration: 0.4, scaleY: 0, transformOrigin: "top right" });
                    }, 2500);
            }
            u.seek(0).clear(),
                (u = new TimelineLite()),
                t.find(".xpro-preview-iframe").on("load", function () {
                    e(this).addClass("loaded"), e(this).contents().find("html").attr("id", "xpro-portfolio-html-main");
                }),
                f(),
                t.on("click", ".xpro-preview-type-popup", function (t) {
                    e(t.target).is(".xpro-preview-demo-import-open") || (g(), m(this, t));
                }),
                t.on("click", ".xpro-preview-type-link", function (t) {
                    let o = "";
                    return "" !== (o = e(this).data("src-preview")) && window.open(o, i.preview_target), !1;
                }),
                t.on("click", ".xpro-preview-type-none", function (e) {
                    return !1;
                }),
                t.on("click", ".xpro-preview-prev-demo", function (e) {
                    var o = t.find(".xpro-preview-demo-item-open").prev("[data-src-preview]");
                    o.length > 0 && (g(), m(o, e)), e.preventDefault();
                }),
                t.on("click", ".xpro-preview-next-demo", function (e) {
                    var o = t.find(".xpro-preview-demo-item-open").next("[data-src-preview]");
                    o.length > 0 && (g(), m(o, e)), e.preventDefault();
                }),
                t.on("click", ".xpro-preview-close", function (e) {
                    g(),
                        e.preventDefault(),
                        setTimeout(function () {
                            f();
                        }, 2e3);
                });
        },
        CarouselPortfolio: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-elementor-carousel-gallery"),
                a;
            e(".e-route-panel-editor-content").length && (a = ".elementor-preview-responsive-wrapper"),
                p(),
                ("simple" === i.carousel_layout || "creative" === i.carousel_layout) &&
                    r.owlCarousel({
                        loop: "yes" === i.loop,
                        lazyLoad: "yes" === i.lazyload,
                        center: "yes" === i.center,
                        nav: "yes" === i.nav,
                        navText: ["", ""],
                        rtl: "yes" === i.rtl,
                        dots: "yes" === i.dots,
                        mouseDrag: "yes" === i.mouse_drag,
                        autoWidth: "yes" === i.custom_width,
                        responsiveBaseElement: a,
                        itemClass: "owl-item xpro-preview-type-" + i.preview_type,
                        autoplay: "yes" === i.autoplay,
                        autoplayTimeout: "yes" === i.autoplay ? 1e3 * i.autoplay_timeout.size : 3e3,
                        autoplayHoverPause: !0,
                        autoHeight: i.item_custom_height && "yes" !== i.item_custom_height,
                        smartSpeed: 1e3,
                        responsive: {
                            0: { items: i.item_per_row_mobile || 1, margin: i.margin_mobile.size || 0, stagePadding: (i.margin_mobile.size || 0) / 2 },
                            768: { items: i.item_per_row_tablet || 2, margin: i.margin_tablet.size || 0, stagePadding: (i.margin_tablet.size || 0) / 2 },
                            1024: { items: i.item_per_row || 3, margin: i.margin.size || 0, stagePadding: (i.margin.size || 0) / 2 },
                        },
                    }),
                "unique" === i.carousel_layout &&
                    (t
                        .find(".xpro-slider-slick-content")
                        .slick({ infinite: "yes" === i.loop, pauseOnHover: !0, slidesToShow: 1, slidesToScroll: 1, arrows: !1, active: !0, dots: !1, swipe: "yes" === i.mouse_drag, asNavFor: t.find(".xpro-slider-slick-image") }),
                    t
                        .find(".xpro-slider-slick-image")
                        .slick({
                            infinite: "yes" === i.loop,
                            lazyLoad: "yes" === i.loop && "ondemand",
                            pauseOnHover: !0,
                            autoplay: "yes" === i.autoplay,
                            autoplaySpeed: "yes" === i.autoplay ? 1e3 * i.autoplay_timeout.size : 3e3,
                            vertical: !0,
                            verticalSwiping: !0,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            swipe: "yes" === i.mouse_drag,
                            asNavFor: t.find(".xpro-slider-slick-content"),
                            dots: !1,
                            arrows: "yes" === i.nav,
                            nextArrow: t.find(".slick-nav-next"),
                            prevArrow: t.find(".slick-nav-prev"),
                        }));
            var n = null;
            let l = new TimelineLite();
            function s(o, r) {
                let a = e(o).find(".xpro-elementor-carousel-gallery-item").data("title");
                if (((n = e(o).find(".xpro-elementor-carousel-gallery-item").data("src-preview")), "unique" === i.carousel_layout && ((n = e(o).data("src-preview")), (a = e(o).data("title"))), "false" === n)) return;
                e(o).siblings().removeClass("xpro-preview-demo-item-open"),
                    e(o).addClass("xpro-preview-demo-item-open"),
                    t.find(".xpro-preview").find(".xpro-preview-prev-demo, .xpro-preview-next-demo").removeClass("xpro-preview-inactive"),
                    t.find(".xpro-preview").find(".xpro-preview-prev-thumb, .xpro-preview-next-thumb").removeClass("xpro-preview-inactive");
                let l = e(o).prev(".xpro-preview-type-popup");
                l.length <= 0 && (t.find(".xpro-preview .xpro-preview-prev-demo").addClass("xpro-preview-inactive"), t.find(".xpro-preview .xpro-preview-prev-thumb").addClass("xpro-preview-inactive"));
                let s = e(o).next(".xpro-preview-type-popup");
                if (
                    (s.length <= 0 && (t.find(".xpro-preview .xpro-preview-next-demo").addClass("xpro-preview-inactive"), t.find(".xpro-preview .xpro-preview-next-thumb").addClass("xpro-preview-inactive")),
                    "layout-5" === i.popup_layout || "layout-6" === i.popup_layout)
                ) {
                    let p = l.find(".xpro-item-img").attr("data-xpro-thumb"),
                        d = s.find(".xpro-item-img").attr("data-xpro-thumb");
                    "unique" === i.carousel_layout && ((p = l.attr("data-xpro-thumb")), (d = s.attr("data-xpro-thumb"))),
                        p && t.find(".xpro-preview-prev-demo .xpro-preview-nav-img").css("background-image", "url(" + p + ")"),
                        d && t.find(".xpro-preview-next-demo .xpro-preview-nav-img").css("background-image", "url(" + d + ")");
                }
                if ("layout-10" === i.popup_layout) {
                    let c = l.find(".xpro-item-img").attr("data-xpro-thumb"),
                        u = e(o).find(".xpro-item-img").attr("data-xpro-thumb"),
                        m = s.find(".xpro-item-img").attr("data-xpro-thumb");
                    "unique" === i.carousel_layout && ((c = l.attr("data-xpro-thumb")), (u = e(o).attr("data-xpro-thumb")), (m = s.attr("data-xpro-thumb"))),
                        c && t.find(".xpro-preview-thumbnails .xpro-preview-prev-thumb").css("background-image", "url(" + c + ")"),
                        u && t.find(".xpro-preview-thumbnails .xpro-preview-current-thumb").css("background-image", "url(" + u + ")"),
                        m && t.find(".xpro-preview-thumbnails .xpro-preview-next-thumb").css("background-image", "url(" + m + ")");
                }
                t.find(".xpro-preview .xpro-preview-header-info").html(""),
                    a && t.find(".xpro-preview .xpro-preview-header-info").append(`<div class="xpro-preview-demo-name">${a}</div>`),
                    t.find(".xpro-preview .xpro-preview-iframe").attr("src", n),
                    e("body").addClass("xpro-preview-active"),
                    t.find(".xpro-preview").addClass("active");
            }
            function p() {
                t.find(".xpro-preview-demo-item").removeClass("xpro-preview-demo-item-open"),
                    t.find(".xpro-preview .xpro-preview-iframe").removeAttr("src"),
                    e("body").removeClass("xpro-preview-active"),
                    t.find(".xpro-preview").removeClass("active");
            }
            function d() {
                "1" === i.popup_animation && l.to(t.find(".xpro-portfolio-loader-style-1 li"), { duration: 0.4, scaleX: 1, transformOrigin: "bottom right" }),
                    "2" === i.popup_animation && l.to(t.find(".xpro-portfolio-loader-style-2 li"), { duration: 0.4, scaleX: 1, transformOrigin: "bottom left" }),
                    "3" === i.popup_animation && l.to(t.find(".xpro-portfolio-loader-style-3 li"), { duration: 0.4, scaleY: 1, transformOrigin: "top left", stagger: 0.2 }),
                    "4" === i.popup_animation && l.to(t.find(".xpro-portfolio-loader-style-4 li"), { duration: 0.4, scaleY: 1, transformOrigin: "bottom left", stagger: 0.2 }),
                    "5" === i.popup_animation && l.to(t.find(".xpro-portfolio-loader-style-5 li"), { duration: 0.4, scaleX: 1, transformOrigin: "bottom right" }),
                    "6" === i.popup_animation && l.to(t.find(".xpro-portfolio-loader-style-6 li"), { duration: 0.4, scaleX: 1, transformOrigin: "bottom left" }),
                    "7" === i.popup_animation && l.to(t.find(".xpro-portfolio-loader-style-7 li"), { duration: 0.4, scaleY: 1, transformOrigin: "top right" }),
                    "8" === i.popup_animation && l.to(t.find(".xpro-portfolio-loader-style-8 li"), { duration: 0.4, scaleY: 1, transformOrigin: "bottom right" }),
                    setTimeout(function () {
                        "1" === i.popup_animation && l.to(t.find(".xpro-portfolio-loader-style-1 li"), { duration: 0.4, scaleX: 0, transformOrigin: "bottom left" }),
                            "2" === i.popup_animation && l.to(t.find(".xpro-portfolio-loader-style-2 li"), { duration: 0.4, scaleX: 0, transformOrigin: "bottom right" }),
                            "3" === i.popup_animation && l.to(t.find(".xpro-portfolio-loader-style-3 li"), { duration: 0.4, scaleY: 0, transformOrigin: "bottom left", stagger: 0.2 }),
                            "4" === i.popup_animation && l.to(t.find(".xpro-portfolio-loader-style-4 li"), { duration: 0.4, scaleY: 0, transformOrigin: "top left", stagger: 0.2 }),
                            "5" === i.popup_animation && l.to(t.find(".xpro-portfolio-loader-style-5 li"), { duration: 0.4, scaleX: 0, transformOrigin: "bottom left" }),
                            "6" === i.popup_animation && l.to(t.find(".xpro-portfolio-loader-style-6 li"), { duration: 0.4, scaleX: 0, transformOrigin: "bottom right" }),
                            "7" === i.popup_animation && l.to(t.find(".xpro-portfolio-loader-style-7 li"), { duration: 0.4, scaleY: 0, transformOrigin: "bottom right" }),
                            "8" === i.popup_animation && l.to(t.find(".xpro-portfolio-loader-style-8 li"), { duration: 0.4, scaleY: 0, transformOrigin: "top right" });
                    }, 2500);
            }
            l.seek(0).clear(),
                (l = new TimelineLite()),
                t.find(".xpro-preview-iframe").on("load", function () {
                    e(this).addClass("loaded"), e(this).contents().find("html").attr("id", "xpro-portfolio-html-main");
                }),
                t.on("click", ".xpro-preview-type-popup", function (t) {
                    e(t.target).is(".xpro-preview-demo-import-open") || (d(), s(this, t));
                }),
                t.on("click", ".xpro-preview-type-link", function (t) {
                    let o = "";
                    if ("unique" === i.carousel_layout) {
                        return "" === (o = e(this).data("src-preview")) || elementorFrontend.isEditMode() || window.open(o, i.preview_target), !1;
                    } else {
                        return "" === (o = e(this).find(".xpro-elementor-carousel-gallery-item").data("src-preview")) || elementorFrontend.isEditMode() || window.open(o, i.preview_target), !1;
                    }
                }),
                t.on("click", ".xpro-preview-type-none", function (e) {
                    return !1;
                }),
                t.on("click", ".xpro-preview-prev-demo", function (e) {
                    var o = t.find(".xpro-preview-demo-item-open").prev(".xpro-preview-type-popup");
                    o.length > 0 && (d(), s(o, e)), e.preventDefault();
                }),
                t.on("click", ".xpro-preview-next-demo", function (e) {
                    var o = t.find(".xpro-preview-demo-item-open").next(".xpro-preview-type-popup");
                    o.length > 0 && (d(), s(o, e)), e.preventDefault();
                }),
                t.on("click", ".xpro-preview-close", function (e) {
                    d(),
                        e.preventDefault(),
                        setTimeout(function () {
                            p();
                        }, 2e3);
                });
        },
        ListPortfolio: function (t) {
            let i = o.getElementSettings(t);
            t.find(".xpro-list-portfolio-half .xpro-list-portfolio-items > li").hover(function () {
                e(this).addClass("active").siblings().removeClass("active");
                let o = e(this).attr("data-xpro-image-id");
                t.find(".xpro-list-portfolio-image-wrapper > figure").removeClass("active"), t.find("." + o).addClass("active");
            }),
                t.find(".xpro-list-portfolio-full .xpro-list-portfolio-items > li").hover(
                    function () {
                        e(this).addClass("active").siblings().removeClass("active");
                        let o = e(this).attr("data-xpro-image-id"),
                            i = t.find("." + o + " img").attr("src");
                        t.find(".xpro-list-portfolio-full").addClass("active");
                        let r = t.find(".xpro-list-portfolio-full .xpro-list-portfolio-image-wrapper");
                        r.fadeOut(200, function () {
                            r.css("background-image", "url(" + i + ")"), r.css({ "background-image": "url(" + i + ")", "z-index": "3" }), r.fadeIn(300);
                        });
                    },
                    function () {
                        t.find(".xpro-list-portfolio-full").removeClass("active"),
                            t.find(".xpro-list-portfolio-full .xpro-list-portfolio-items > li").removeClass("active"),
                            t.find(".xpro-list-portfolio-full .xpro-list-portfolio-image-wrapper").css({ "background-image": "none", "z-index": "1" });
                    }
                );
            var r = null;
            let a = new TimelineLite();
            function n(o, a) {
                let n = e(o).data("xpro-title");
                if ("false" === (r = e(o).data("src-preview"))) return;
                e(o).siblings().removeClass("xpro-preview-demo-item-open"),
                    e(o).addClass("xpro-preview-demo-item-open"),
                    t.find(".xpro-preview .xpro-preview-prev-demo, .xpro-preview-next-demo").removeClass("xpro-preview-inactive"),
                    t.find(".xpro-preview .xpro-preview-prev-thumb, .xpro-preview-next-thumb").removeClass("xpro-preview-inactive");
                let l = e(o).prev(".xpro-preview-type-popup");
                l.length <= 0 && (t.find(".xpro-preview .xpro-preview-prev-demo").addClass("xpro-preview-inactive"), t.find(".xpro-preview .xpro-preview-prev-thumb").addClass("xpro-preview-inactive"));
                let s = e(o).next(".xpro-preview-type-popup");
                if (
                    (s.length <= 0 && (t.find(".xpro-preview .xpro-preview-next-demo").addClass("xpro-preview-inactive"), t.find(".xpro-preview .xpro-preview-next-thumb").addClass("xpro-preview-inactive")),
                    "layout-5" === i.popup_layout || "layout-6" === i.popup_layout)
                ) {
                    let p = l.attr("data-xpro-thumb"),
                        d = s.attr("data-xpro-thumb");
                    p && t.find(".xpro-preview-prev-demo .xpro-preview-nav-img").css("background-image", "url(" + p + ")"), d && t.find(".xpro-preview-next-demo .xpro-preview-nav-img").css("background-image", "url(" + d + ")");
                }
                if ("layout-10" === i.popup_layout) {
                    let c = l.attr("data-xpro-thumb"),
                        u = e(o).attr("data-xpro-thumb"),
                        m = s.attr("data-xpro-thumb");
                    c && t.find(".xpro-preview-thumbnails .xpro-preview-prev-thumb").css("background-image", "url(" + c + ")"),
                        u && t.find(".xpro-preview-thumbnails .xpro-preview-current-thumb").css("background-image", "url(" + u + ")"),
                        m && t.find(".xpro-preview-thumbnails .xpro-preview-next-thumb").css("background-image", "url(" + m + ")");
                }
                t.find(".xpro-preview .xpro-preview-header-info").html(""),
                    n && t.find(".xpro-preview .xpro-preview-header-info").append(`<div class="xpro-preview-demo-name">${n}</div>`),
                    t.find(".xpro-preview .xpro-preview-iframe").attr("src", r),
                    e("body").addClass("xpro-preview-active"),
                    t.find(".xpro-preview").addClass("active");
            }
            function l() {
                t.find(".xpro-preview-demo-item").removeClass("xpro-preview-demo-item-open"),
                    t.find(".xpro-preview .xpro-preview-iframe").removeAttr("src"),
                    e("body").removeClass("xpro-preview-active"),
                    t.find(".xpro-preview").removeClass("active");
            }
            function s() {
                "1" === i.popup_animation && a.to(t.find(".xpro-portfolio-loader-style-1 li"), { duration: 0.4, scaleX: 1, transformOrigin: "bottom right" }),
                    "2" === i.popup_animation && a.to(t.find(".xpro-portfolio-loader-style-2 li"), { duration: 0.4, scaleX: 1, transformOrigin: "bottom left" }),
                    "3" === i.popup_animation && a.to(t.find(".xpro-portfolio-loader-style-3 li"), { duration: 0.4, scaleY: 1, transformOrigin: "top left", stagger: 0.2 }),
                    "4" === i.popup_animation && a.to(t.find(".xpro-portfolio-loader-style-4 li"), { duration: 0.4, scaleY: 1, transformOrigin: "bottom left", stagger: 0.2 }),
                    "5" === i.popup_animation && a.to(t.find(".xpro-portfolio-loader-style-5 li"), { duration: 0.4, scaleX: 1, transformOrigin: "bottom right" }),
                    "6" === i.popup_animation && a.to(t.find(".xpro-portfolio-loader-style-6 li"), { duration: 0.4, scaleX: 1, transformOrigin: "bottom left" }),
                    "7" === i.popup_animation && a.to(t.find(".xpro-portfolio-loader-style-7 li"), { duration: 0.4, scaleY: 1, transformOrigin: "top right" }),
                    "8" === i.popup_animation && a.to(t.find(".xpro-portfolio-loader-style-8 li"), { duration: 0.4, scaleY: 1, transformOrigin: "bottom right" }),
                    setTimeout(function () {
                        "1" === i.popup_animation && a.to(t.find(".xpro-portfolio-loader-style-1 li"), { duration: 0.4, scaleX: 0, transformOrigin: "bottom left" }),
                            "2" === i.popup_animation && a.to(t.find(".xpro-portfolio-loader-style-2 li"), { duration: 0.4, scaleX: 0, transformOrigin: "bottom right" }),
                            "3" === i.popup_animation && a.to(t.find(".xpro-portfolio-loader-style-3 li"), { duration: 0.4, scaleY: 0, transformOrigin: "bottom left", stagger: 0.2 }),
                            "4" === i.popup_animation && a.to(t.find(".xpro-portfolio-loader-style-4 li"), { duration: 0.4, scaleY: 0, transformOrigin: "top left", stagger: 0.2 }),
                            "5" === i.popup_animation && a.to(t.find(".xpro-portfolio-loader-style-5 li"), { duration: 0.4, scaleX: 0, transformOrigin: "bottom left" }),
                            "6" === i.popup_animation && a.to(t.find(".xpro-portfolio-loader-style-6 li"), { duration: 0.4, scaleX: 0, transformOrigin: "bottom right" }),
                            "7" === i.popup_animation && a.to(t.find(".xpro-portfolio-loader-style-7 li"), { duration: 0.4, scaleY: 0, transformOrigin: "bottom right" }),
                            "8" === i.popup_animation && a.to(t.find(".xpro-portfolio-loader-style-8 li"), { duration: 0.4, scaleY: 0, transformOrigin: "top right" });
                    }, 2500);
            }
            a.seek(0).clear(),
                (a = new TimelineLite()),
                t.find(".xpro-preview-iframe").on("load", function () {
                    e(this).addClass("loaded"), e(this).contents().find("html").attr("id", "xpro-portfolio-html-main");
                }),
                l(),
                t.on("click", ".xpro-preview-type-popup", function (t) {
                    e(t.target).is(".xpro-preview-demo-import-open") || (s(), n(this, t));
                }),
                t.on("click", ".xpro-preview-type-link", function (t) {
                    let o = "";
                    return "" !== (o = e(this).data("src-preview")) && window.open(o, i.preview_target), !1;
                }),
                t.on("click", ".xpro-preview-type-none", function (e) {
                    return !1;
                }),
                t.on("click", ".xpro-preview-prev-demo", function (t) {
                    var o = e(".xpro-preview-demo-item-open").prev(".xpro-preview-type-popup");
                    o.length > 0 && (s(), n(o, t)), t.preventDefault();
                }),
                t.on("click", ".xpro-preview-next-demo", function (t) {
                    var o = e(".xpro-preview-demo-item-open").next(".xpro-preview-type-popup");
                    o.length > 0 && (s(), n(o, t)), t.preventDefault();
                }),
                t.on("click", ".xpro-preview-close", function (e) {
                    s(),
                        e.preventDefault(),
                        setTimeout(function () {
                            l();
                        }, 2e3);
                });
        },
        AnimatedHeading: function (e) {
            let t = o.getElementSettings(e),
                i = e.find(".xpro-title-focus"),
                r = e.find(".xpro-title-focus > span");
            t.center_title_animation.includes("typed") ||
                t.center_title_animation.includes("svg") ||
                i.Morphext({ animation: t.center_title_animation, separator: ",", speed: 1e3 * t.center_title_animation_speed.size, complete: function () {} }),
                t.center_title_animation.includes("typed") &&
                    r.typed({
                        strings: i.text().split(","),
                        stringsElement: null,
                        typeSpeed: 10 * t.center_title_animation_speed.size,
                        backSpeed: 20,
                        backDelay: 500,
                        loop: !0,
                        loopCount: !1,
                        showCursor: !!t.center_title_animation_cursor,
                        cursorChar: t.center_title_animation_cursor ? t.center_title_animation_cursor : "",
                        attr: null,
                        contentType: "html",
                        callback: function () {},
                        preStringTyped: function () {},
                        onStringTyped: function () {},
                        resetCallback: function () {},
                    });
        },
        AdvanceTabs: function (t) {
            o.getElementSettings(t);
            let i = t.find(".xpro-tab-main").attr("id"),
                r = e(".xpro-tab-content-wrapper .xpro-tab-content");
            r.each(function (t, o) {
                e(o).addClass("active");
            }),''
                setTimeout(() => {
                    r.each(function (t, o) {
                        e(o).removeClass("active");
                    }),
                        e(r[0]).addClass("active");
                        t.find("#" + i + " > .xpro-tab-list-wrapper > .xpro-tab-list > li:first-child > a").trigger("click");
                }, 500),
                e("#" + i + " > .xpro-tab-list-wrapper > .xpro-tab-select-option > .xpro-tab-select-content").each(function () {
                    e(this).text(t.find("#" + i + " > .xpro-tab-list-wrapper > .xpro-tab-list > li.active > a > span").text());
                }),
                e("#" + i + " > .xpro-tab-list-wrapper > .xpro-tab-list > li > a").on("click", function (o) {
                    e(this).parent().addClass("active").siblings().removeClass("active");
                    let r = e(this).attr("href");
                    return (
                        t.find("#" + i + " > .xpro-tab-content-wrapper > .tab-accordion-label").removeClass("active"),
                        t.find("#" + i + " > .xpro-tab-content-wrapper > .tab-accordion-label[href$=" + r + "]").addClass("active"),
                        t.find("#" + i + " > .xpro-tab-content-wrapper > .xpro-tab-content.active").removeClass("active"),
                        t.find("#" + i + " " + r).addClass("active"),
                        t.find("#" + i + " >  .xpro-tab-list-wrapper > .xpro-tab-select-option > .xpro-tab-select-content").text(e(this).find("span").text()),
                        t.find("#" + i + " > .xpro-tab-list-wrapper").removeClass("active"),
                        !1
                    );
                }),
                e("#" + i + " > .xpro-tab-list-wrapper > .xpro-tab-select-option").on("click", function () {
                    t.find("#" + i + " > .xpro-tab-list-wrapper").toggleClass("active");
                }),
                t.find("#" + i + " > .xpro-tab-content-wrapper > .tab-accordion-label").on("click", function (o) {
                    e(this).addClass("active").siblings().removeClass("active");
                    let r = e(this).attr("href");
                    return (
                        t.find("#" + i + " > .xpro-tab-list-wrapper > .xpro-tab-list > li").removeClass("active"),
                        t
                            .find("#" + i + " > .xpro-tab-list-wrapper > .xpro-tab-list > li > a[href$=" + r + "]")
                            .parent()
                            .addClass("active"),
                        t.find("#" + i + " > .xpro-tab-content-wrapper > .xpro-tab-content.active").removeClass("active"),
                        t.find("#" + i + " " + r).addClass("active"),
                        t.find("#" + i + " > .xpro-tab-list-wrapper > .xpro-tab-select-content").text(e(this).find("span").text()),
                        t.find("#" + i + " > .xpro-tab-list-wrapper").removeClass("active"),
                        !1
                    );
                });
        },
        PricingCarousel: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-pricing-carousel"),
                a;
            e(".e-route-panel-editor-content").length && (a = ".elementor-preview-responsive-wrapper"),
                r.owlCarousel({
                    loop: "yes" === i.loop,
                    lazyLoad: "yes" === i.lazyload,
                    center: "yes" === i.center,
                    nav: "yes" === i.nav,
                    navText: ["", ""],
                    rtl: "yes" === i.rtl,
                    dots: "yes" === i.dots,
                    mouseDrag: "yes" === i.mouse_drag,
                    autoWidth: "yes" === i.custom_width,
                    responsiveBaseElement: a,
                    itemClass: "owl-item xpro-preview-type-" + i.preview_type,
                    autoplay: "yes" === i.autoplay,
                    autoplayTimeout: "yes" === i.autoplay ? 1e3 * i.autoplay_timeout.size : 3e3,
                    autoplayHoverPause: !0,
                    smartSpeed: 1e3,
                    responsive: {
                        0: { items: i.item_per_row_mobile || 1, margin: i.margin_mobile.size || 0, stagePadding: (i.margin_mobile.size || 0) / 2 },
                        768: { items: i.item_per_row_tablet || 2, margin: i.margin_tablet.size || 0, stagePadding: (i.margin_tablet.size || 0) / 2 },
                        1024: { items: i.item_per_row || 3, margin: i.margin.size || 0, stagePadding: (i.margin.size || 0) / 2 },
                    },
                });
        },
        PricingMatrix: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-matrix-slider-wrapper"),
                a;
            e(".e-route-panel-editor-content").length && (a = ".elementor-preview-responsive-wrapper");
            let n = r.owlCarousel({
                loop: "yes" === i.loop,
                navText: ["", ""],
                rtl: "yes" === i.rtl,
                dotsData: !0,
                dotsContainer: ".xpro-matrix-dots",
                mouseDrag: "yes" === i.mouse_drag,
                responsiveBaseElement: a,
                autoplay: "yes" === i.autoplay,
                autoplayTimeout: "yes" === i.autoplay ? 1e3 * i.autoplay_timeout.size : 3e3,
                autoplayHoverPause: !0,
                smartSpeed: 1e3,
                autoHeight: !0,
                responsive: {
                    0: { nav: -1 !== jQuery.inArray("mobile", i.show_nav_on), dots: -1 !== jQuery.inArray("mobile", i.show_dots_on), items: i.item_per_row_mobile || 1 },
                    768: { nav: -1 !== jQuery.inArray("tablet", i.show_nav_on), dots: -1 !== jQuery.inArray("tablet", i.show_dots_on), items: i.item_per_row_tablet || 2 },
                    1024: { nav: -1 !== jQuery.inArray("desktop", i.show_nav_on), dots: -1 !== jQuery.inArray("desktop", i.show_dots_on), items: i.item_per_row || 3 },
                },
            });
            t.find(".owl-dot").on("click", function () {
                n.trigger("to.owl.carousel", [e(this).index(), 800]);
            });
        },
        VerticalMenu: function (t) {
            let i = o.getElementSettings(t);
            if (
                ("sliding" === i.layout && (t.find(".xpro-elementor-vertical-menu-layout-sliding .xpro-elementor-vertical-navbar").menu(), t.find(".sliding-menu li a.nav").parent("li").addClass("submen-dec")),
                "accordion" === i.layout &&
                    t.find(".xpro-elementor-vertical-menu-layout-accordion li.dropdown > a").on("mouseenter", function (t) {
                        t.preventDefault(), t.stopPropagation(), e(this).toggleClass("active"), e(this).next(".xpro-elementor-dropdown-menu").slideToggle();
                    }),
                t.find(".xpro-elementor-vertical-menu-layout-accordion li.dropdown").on("mouseleave", function () {
                    e(this).find("a").toggleClass("active"), e(this).find(".xpro-elementor-dropdown-menu").slideToggle();
                }),
                "default" === i.layout &&
                    t.find(".dropdown li").each(function (t) {
                        if (e("ul", this).length) {
                            let o = e("ul:first", this),
                                i = o.offset().left,
                                r = o.width(),
                                a = e(window).width();
                            i + r <= a ? e(this).removeClass("xpro-edge") : e(this).addClass("xpro-edge");
                        }
                    }),
                "yes" === i.one_page_navigation)
            ) {
                function r(o = !1) {
                    var r = e(document).scrollTop(),
                        a = i.scroll_offset.size || 100;
                    t.find(".xpro-elementor-vertical-navbar-nav li").each(function () {
                        let i = e(this),
                            n = i.find(".xpro-elementor-nav-link").attr("href"),
                            l = n.indexOf("#");
                        if (-1 !== l) {
                            let s = e(n.substring(l));
                            o && s.length && t.find(".xpro-elementor-vertical-navbar-nav li:not(:first-child)").removeClass("current_page_item"),
                                s.length && s.position().top - a <= r && s.position().top + s.height() > r && (t.find(".xpro-elementor-vertical-navbar-nav li").removeClass("current_page_item"), i.addClass("current_page_item"));
                        }
                    });
                }
                t.find(".xpro-elementor-vertical-navbar-nav li a").on("click", function (t) {
                    e(".xpro-elementor-hamburger-wrapper").removeClass("active"), e("body").removeClassRegex(/^xpro-hamburger-/);
                }),
                    r(!0),
                    e(document).on("scroll", function () {
                        r();
                    });
            }
        },
        Hamburger: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-elementor-hamburger-toggle"),
                a = t.find(".xpro-elementor-hamburger-close-btn"),
                n = t.find(".xpro-elementor-hamburger-overlay"),
                l = (t.find(".xpro-elementor-hamburger-inner"), t.find(".xpro-elementor-hamburger-wrapper"));
            e("body").addClass("xpro-elementor-hamburger"),
                e("body").removeClass("xpro-hamburger-" + i.layout),
                r.on("click", function () {
                    l.toggleClass("active"), e("body").toggleClass("xpro-hamburger-" + i.layout);
                }),
                a.on("click", function () {
                    l.removeClass("active"), e("body").removeClass("xpro-hamburger-" + i.layout);
                }),
                n.on("click", function () {
                    l.removeClass("active"), e("body").removeClass("xpro-hamburger-" + i.layout);
                });
        },

        PeelCard: function (t) {
                const i = o.getElementSettings(t);
                const peelElement = t.find(".xpro-peel-card");
                const r = peelElement.attr('id');

               
                            
                if (!e('body').hasClass('elementor-editor-active')) {
                    e('.elementor-widget-xpro-peel-card').closest('.e-con, .e-parent').css({'position': 'static'});
                }
                
                e('.elementor-widget-xpro-peel-card')
                .closest('.e-con, .e-parent')
                .css({'position': 'static'});
                // Sound initialization
                let peelSoundInstance = null;
                let peelTimeout = null;
                const soundKey = 'peelSound-' + r; // Unique key per instance
                
                if (i.enable_peel_sound === 'yes') {
                    createjs.Sound.registerSound(i.peel_sound.url, soundKey);
                }
            
                function handleSound(play) {
                    if (i.enable_peel_sound !== 'yes') return;
                    
                    if (play) {
                        if (!peelSoundInstance || peelSoundInstance.playState !== createjs.Sound.PLAY_SUCCEEDED) {
                            peelSoundInstance = createjs.Sound.play(soundKey, {
                                loop: 0, // Play once
                                volume: i.sound_volume || 0.5
                            });
                            clearTimeout(peelTimeout);
                            peelTimeout = setTimeout(() => {
                                if (peelSoundInstance) {
                                    peelSoundInstance.stop();
                                    peelSoundInstance = null;
                                }
                            }, 300);
                        }
                    }
                }
            
                // Peel configuration
                const p = new Peel(`#${r}`, {
                    corner: i.peel_type === "book" ? Peel.Corners[i.corner_book] : Peel.Corners[i.corner],
                    topShadow: i.top_shadow,
                    topShadowBlur: i.top_shadow_blur,
                    topShadowOffsetX: i.top_shadow_offset_x,
                    topShadowOffsetY: i.top_shadow_offset_y,
                    backShadow: i.back_shadow,
                    backShadowSize: i.back_shadow_size,
                    backShadowOffset: i.back_shadow_offset, // Fixed typo
                    backShadowDistribute: i.back_shadow_distribute,
                    backReflection: i.back_reflection,
                    backReflectionSize: i.back_reflection_size,
                    backReflectionOffset: i.back_reflection_offset,
                    backReflectionDistribute: i.back_reflection_distribute,
                    bottomShadow: i.bottom_shadow,
                    bottomShadowSize: i.bottom_shadow_size,
                    bottomShadowOffset: i.bottom_shadow_offset,
                    bottomShadowDistribute: i.bottom_shadow_distribute,
                    circle: i.peel_type === "circle" ? {
                        cx: (i.image_width?.size ?? 0) / 2,
                        cy: (i.image_height?.size ?? 0) / 2,
                        r: Math.min(
                            i.image_width?.size ?? 100,
                            i.image_height?.size ?? 100
                        ) / 2,
                    } : null,
                });
            
                // Initial peel position
                if (i.enable_init_peel === "yes") {
                    p.setPeelPosition(
                        parseFloat(i.set_peel_on_initx),
                        parseFloat(i.set_peel_on_inity)
                    );
                }
            
                // Generic drag handler
                const handleDrag = (evt, x, y) => {
                    const rect = peelElement[0].getBoundingClientRect();

                    // Convert global mouse to local coordinates
                    const localX = evt.clientX - rect.left;
                    const localY = evt.clientY - rect.top;

                    p.setPeelPosition(localX, localY);
                    handleSound(true);

                    if (i.stop_on_clipped === 'yes' && p.getAmountClipped() === 1) {
                        p.removeEvents();
                        handleSound(false);
                    }
                };
            
                // Peel type handling
                switch (i.peel_type) {
                    case 'simple':
                    case 'dragging':
                    case 'fade-threshold':
                        p.setFadeThreshold(i.fade_threshold);
                        p.handleDrag(handleDrag);
                        break;
            
                    case 'constraining':
                        p.setFadeThreshold(i.fade_threshold);
                        p.addPeelConstraint(Peel.Corners[i.constraining_corner]);
                        p.handleDrag(handleDrag);
                        break;
            
                    case 'book':
                        p.setMode('book');
                        p.setFadeThreshold(i.fade_threshold);
                        p.handleDrag(handleDrag);
                        break;
            
                    case 'circle':
                        p.setFadeThreshold(i.fade_threshold);
                        p.handleDrag(handleDrag);
                        break;
            
                    case 'peel-path':
                        p.setFadeThreshold(i.fade_threshold);
                        const pathRatios = {
                             x: (i.image_width?.size ?? 0) / 200,
                            y: (i.image_height?.size ?? 0) / 200
                        };
                        p.setPeelPath(
                            200 * pathRatios.x,
                            200 * pathRatios.y,
                            -200 * pathRatios.x,
                            -200 * pathRatios.y
                        );
                        p.handleDrag((evt, x) => {
                            p.setTimeAlongPath((x - p.width) / -p.width);
                            handleSound(true);
                        });
                        break;
            
                    case 'peel-curve':
                        p.setMode('book');
                        p.setFadeThreshold(i.fade_threshold);
                        const curveRatios = {
                            x: (i.image_width?.size ?? 0) / 130,
                            y: (i.image_height?.size ?? 0) / 160
                        };
                        p.setPeelPath(
                            130 * curveRatios.x,
                            160 * curveRatios.y,
                            50 * curveRatios.x,
                            60 * curveRatios.y,
                            -70 * curveRatios.x,
                            210 * curveRatios.y,
                            -130 * curveRatios.x,
                            160 * curveRatios.y
                        );
                        p.handleDrag((evt, x) => {
                            p.setTimeAlongPath((x - p.width) / (-p.width * 2));
                            handleSound(true);
                        });
                        break;
            
                    case 'peel-press':
                        p.setMode('book');
                        const pressRatios = {
                             x: (i.image_width?.size ?? 0) / 130,
                             y: (i.image_height?.size ?? 0) / 160
                        };
                        p.setPeelPath(
                            130 * pressRatios.x,
                            160 * pressRatios.y,
                            50 * pressRatios.x,
                            60 * pressRatios.y,
                            -70 * pressRatios.x,
                            210 * pressRatios.y,
                            -130 * pressRatios.x,
                            160 * pressRatios.y
                        );
                        p.t = 0;
                        const tween = new TweenLite(p, i.peel_press_duration, {
                            t: 1,
                            paused: i.peel_press_paused,
                            ease: Power2.easeOut,
                            onUpdate: () => p.setTimeAlongPath(p.t),
                            onComplete: () => handleSound(false)
                        });
                        p.handlePress(() => {
                            tween.reversed() ? tween.play() : tween.reverse();
                            handleSound(true);
                        });
                        break;
            
                    case 'peel-fade-path':
                        const fadeRatios = {
                            x: (i.image_width?.size ?? 0) / 170,
                             y: (i.image_height?.size ?? 0) / 170
                        };
                        p.setPeelPath(
                            170 * fadeRatios.x,
                            170 * fadeRatios.y,
                            50 * fadeRatios.x,
                            170 * fadeRatios.y,
                            0 * fadeRatios.x,
                            0 * fadeRatios.y,
                            170 * fadeRatios.x,
                            -170 * fadeRatios.y
                        );
                        p.setFadeThreshold(i.fade_threshold);
                        p.t = 0;
                        const fadeTween = new TweenLite(p, i.peel_press_duration, {
                            t: 1,
                            paused: i.peel_press_paused,
                            ease: Power2.easeIn,
                            onUpdate: () => p.setTimeAlongPath(p.t),
                            onComplete: () => handleSound(false)
                        });
                        p.handlePress(() => {
                            fadeTween.seek(0).play();
                            handleSound(true);
                        });
                        break;
                }
            
        },

        ScratchCard: function (t) {
            let i = o.getElementSettings(t),
         
                r = t.find(".xpro-scratch-card").attr('id');
            if (i.enable_scratch_sound === 'yes') {
                createjs.Sound.registerSound(i.scratch_sound.url, "scratchSound");
            }
                let brush_pattern;
                if (typeof i.brush_pattern !== "undefined") {
                    brush_pattern = (i.scratch_type === 'BRUSH' && i.brush_pattern) ? i.brush_pattern : null;
                } else {
                    brush_pattern = (i.scratch_type === 'BRUSH' && i.brush_src.url) ? i.brush_src.url : null;
                }
        
                const sc = new ScratchCard("#" + r, {
                    scratchType: SCRATCH_TYPE[i.scratch_type || "SPRAY"],
                    containerWidth: i.image_width.size|| 300,
                    containerHeight: i.image_height.size|| 300,
                    brushSrc: brush_pattern,
                    imageForwardSrc: i.forward_image.url,
                    imageBackgroundSrc: i.enable_template === 'yes' ? '' : i.background_image.url,
                    clearZoneRadius: i.clear_zone_radius,
                    nPoints: i.number_of_points,
                    pointSize: i.point_size,
                    percentToFinish: i.percent_to_finish,
                    callback: function () {
                        if (i.discount_code && i.discount_code.trim().length > 0) {
                            navigator.clipboard.writeText(i.discount_code).then(() => {
                                Swal.fire({
                                    toast: i.notification === 'true',
                                    position: i.notic_position,
                                    showConfirmButton: i.notification === 'false',
                                    title: `${i.title_before} "${i.discount_code}" ${i.title_after}`,
                                    timer: i.timer,
                                });
                            }).catch(err => {
                                console.error('Failed to copy: ', err);
                            });
                        }
                    },
                });
        
                sc.init().then(() => {
                    let scratchTimeout;
                    let scratchInstance;
                    sc.canvas.addEventListener('scratch.move', function () {
                        if (!scratchInstance || scratchInstance.playState !== createjs.Sound.PLAY_SUCCEEDED) {
                            scratchInstance = createjs.Sound.play("scratchSound", { loop: -1, volume: i.sound_volume || 0.5 });
                        }
                        clearTimeout(scratchTimeout);
                        scratchTimeout = setTimeout(function () {
                            if (scratchInstance) {
                                scratchInstance.stop();
                            }
                        }, 300);
                    });
                    sc.canvas.addEventListener('mouseup', function () {
                        if (scratchInstance) {
                            scratchInstance.stop();
                            clearTimeout(scratchTimeout);
                        }
                    });
                });
        },

        BarChart: function (t) {
            const $canvas = t.find('.xpro-bar-chart-js');
            if (!$canvas.length) {
                return;
            }
            const canvas = $canvas[0];
            if (canvas.xproChart instanceof Chart) {
                canvas.xproChart.destroy();
            }
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                return;
            }
            let settings = $canvas.data('settings');

            if (typeof settings === 'string') {
                try {
                    settings = JSON.parse(settings);
                } catch (error) {
                    console.error('Bar Chart JSON Parse Error:', error);
                    return;
                }
            }
            if (
                !settings ||
                !settings.data ||
                !settings.data.datasets ||
                settings.data.datasets.length === 0
            ) {
                return;
            }
            if (settings.options && settings.options.plugins && settings.options.plugins.tooltip) {
                // Ensure tooltip title and body font settings are properly applied
                Chart.defaults.set('bar', {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                title: function(context) {
                                    return context[0].dataset.label + ': ' + context[0].parsed.y;
                                }
                            }
                        }
                    }
                });
            }
            try {
                canvas.xproChart = new Chart(ctx, settings);
            } catch (error) {
                console.error('Bar Chart Creation Error:', error);
            }
        },

        DonutChart: function (t) {
            const $canvas = t.find('.xpro-doughnut-chart-js');
            if (!$canvas.length) {
                return;
            }
            const canvas = $canvas[0];
            if (canvas.xproChart instanceof Chart) {
                canvas.xproChart.destroy();
            }
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return;
            }
            let settings = $canvas.data('settings');
            if (typeof settings === 'string') {
                try {
                    settings = JSON.parse(settings);
                } catch (error) {
                    console.error('Doughnut Chart JSON Parse Error:', error);
                    return;
                }
            }
            if (
                !settings ||
                !settings.data ||
                !settings.data.datasets ||
                settings.data.datasets.length === 0 ||
                settings.data.datasets[0].data.length === 0
            ) {
                console.warn('No data available for doughnut chart');
                return;
            }
            try {
                canvas.xproChart = new Chart(ctx, settings);
            } catch (error) {
                console.error('Doughnut Chart Creation Error:', error);
            }
        },

        PolarChart: function (t) {
            const $canvas = t.find('.xpro-polar-chart-js');
            if (!$canvas.length) {
                return;
            }
            const canvas = $canvas[0];
            if (canvas.xproChart instanceof Chart) {
                canvas.xproChart.destroy();
            }
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return;
            }
            let settings = $canvas.data('settings');
            if (typeof settings === 'string') {
                try {
                    settings = JSON.parse(settings);
                } catch (error) {
                    console.error('Polar Chart JSON Parse Error:', error);
                    return;
                }
            }
            if (
                !settings ||
                !settings.data ||
                !settings.data.datasets ||
                settings.data.datasets.length === 0 ||
                settings.data.datasets[0].data.length === 0
            ) {
                console.warn('No data available for polar chart');
                return;
            }
            try {
                canvas.xproChart = new Chart(ctx, settings);
            } catch (error) {
                console.error('Polar Chart Creation Error:', error);
            }
        },

        RadarChart: function (t) {
            const $canvas = t.find('.xpro-radar-chart-js');
            if (!$canvas.length) {
                return;
            }
            const canvas = $canvas[0];
            if (canvas.xproChart instanceof Chart) {
                canvas.xproChart.destroy();
            }
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                return;
            }
            let settings = $canvas.data('settings');
            if (typeof settings === 'string') {
                try {
                    settings = JSON.parse(settings);
                } catch (error) {
                    console.error('Radar Chart JSON Parse Error:', error);
                    return;
                }
            }
            if (
                !settings ||
                !settings.data ||
                !settings.data.datasets ||
                settings.data.datasets.length === 0
            ) {
                console.warn('No data available for radar chart');
                return;
            }
            try {
                canvas.xproChart = new Chart(ctx, settings);
            } catch (error) {
                console.error('Radar Chart Creation Error:', error);
            }
        },

        WooFilters: function (t) {
            let i = o.getElementSettings(t),
                speed = (i.toggle_speed && i.toggle_speed.size) ? 100 * i.toggle_speed.size : 300,
                r = t.find(".xpro-elementor-hamburger-toggle"),
                a = t.find(".xpro-elementor-hamburger-close-btn"),
                n = t.find(".xpro-elementor-hamburger-overlay"),
                l = (t.find(".xpro-elementor-hamburger-inner"), t.find(".xpro-elementor-hamburger-wrapper"));
            e("body").addClass("xpro-elementor-hamburger"),
                e("body").removeClass("xpro-hamburger-" + i.layout),
                r.on("click", function () {
                    l.toggleClass("active"), e("body").toggleClass("xpro-hamburger-" + i.layout);
                }),
                a.on("click", function () {
                    l.removeClass("active"), e("body").removeClass("xpro-hamburger-" + i.layout);
                }),
                n.on("click", function () {
                    l.removeClass("active"), e("body").removeClass("xpro-hamburger-" + i.layout);
                });
               var $filters = t.find('.xpro-filter');
               $filters.removeClass('active').find('.xpro-accordion-content').hide();
                var $first = $filters.first();
                $first.addClass('active').find('.xpro-accordion-content').show();
                t.find('.xpro-accordion-header').on('click', function (ev) {
                    ev.preventDefault();
                    var $header = e(this);
                    var $filter = $header.closest('.xpro-filter');       
                    var $content = $filter.find('.xpro-accordion-content');
                    if (i.accordion_type === 'toggle') {
                        if (!$filter.hasClass('active')) {
                            $filters.not($filter).removeClass('active').find('.xpro-accordion-content').slideUp(speed);
                            $filter.addClass('active');
                            $content.slideDown(speed);
                        } else {
                            $filter.removeClass('active');
                            $content.slideUp(speed);
                        }
                    } else {
                        $filter.toggleClass('active');
                        $content.slideToggle(speed);
                    }
                    
                });
        },
        ProductView360: function (t) {
            o.getElementSettings(t);
            let i = t.find(".xpro-porduct-view-360-wrapper"),
                r = t.find(".xpro-product-360-inner"),
                a = i.data("settings");
            if (!a) return !1;
            if ("remote" === a.source_type) {
                var n = a.source.split(",").map(function (e) {
                    return e.trim();
                });
                a.source = SpriteSpin.sourceArray(1 === n.length ? n[0] : n, { frame: a.frame_limit, digits: a.image_digits });
            }
            r.waypoint(
                function () {
                    e(this.element).spritespin(a);
                },
                { offset: "bottom-in-view" }
            );
        },
        Slider: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-slider"),
                a = t.find(".xpro-slider-thumbs");
            var n = r.slick({
                speed: i.duration.size || 400,
                infinite: "yes" === i.loop,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: !0,
                touchThreshold: 100,
                asNavFor: "yes" === i.thumbs && a,
                draggable: "yes" === i.mouse_drag,
                fade: "fade" === i.slide_animation,
                cssEase: "linear",
                pauseOnHover: !1,
                autoplay: "yes" === i.autoplay,
                autoplaySpeed: "yes" === i.autoplay ? 1e3 * i.autoplay_timeout.size : 3e3,
                rtl: "vertical" !== i.orientation && "yes" === i.rtl,
                dots: "yes" === i.dots,
                vertical: "vertical" === i.orientation,
                verticalSwiping: "vertical" === i.orientation,
                customPaging: function (e, t) {
                    return '<span class="slick-dot"></span>';
                },
                arrows: "yes" === i.nav,
                appendArrows: t.find(".xpro-slider-navigation"),
                prevArrow: '<button type="button" class="slick-nav-prev"></button>',
                nextArrow: '<button type="button" class="slick-nav-next"></button>',
            });
            if (
                ("yes" === i.thumbs &&
                    a.slick({
                        slidesToShow: i.thumbs_per_row.size || 2,
                        slidesToScroll: 1,
                        asNavFor: n,
                        dots: !1,
                        pauseOnHover: !1,
                        focusOnSelect: !0,
                        arrows: !1,
                        vertical: "vertical" === i.thumbs_orientation,
                        verticalSwiping: "vertical" === i.thumbs_orientation,
                    }),
                "yes" === i.mouse_wheel)
            ) {
                let l = !1,
                    s = r.find(".slick-slide").length,
                    p = 1;
                r.on("wheel", function (t) {
                    if (t.originalEvent.deltaY < 0) {
                        if (((l = !1), 1 === (p = e(this).slick("slickCurrentSlide") + 1))) {
                            l = !0;
                            return;
                        }
                        t.preventDefault(), e(this).slick("slickPrev");
                    } else {
                        if (((l = !1), (p = e(this).slick("slickCurrentSlide") + 1) === s)) {
                            l = !0;
                            return;
                        }
                        t.preventDefault(), e(this).slick("slickNext");
                    }
                });
            }
            n.on("beforeChange", function (o, i, r) {
                t.find(".slick-slide:not(.slick-current)")
                    .find("[data-settings]")
                    .each(function () {
                        var t = e(this);
                        let o = e(this).data("settings")._animation;
                        o && (t.removeClass("animated"), t.removeClass(o), t.css("visibility", "hidden"));
                    });
            }),
                n.on("afterChange", function (t, o, i) {
                    e(o.$slides[i])
                        .find("[data-settings]")
                        .each(function () {
                            var t = e(this),
                                o = e(this).data("settings")._animation,
                                i = e(this).data("settings")._animation_delay || 0;
                            if (o) {
                                var r = "animated " + o;
                                t.css({ "animation-delay": i, "-webkit-animation-delay": i, visibility: "visible" }),
                                    t.addClass(r).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                        t.removeClass(r);
                                    });
                            }
                        });
                });
        },
        TeamCarousel: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-team-wrapper"),
                a;
            if (
                (e(".e-route-panel-editor-content").length && (a = ".elementor-preview-responsive-wrapper"),
                r.owlCarousel({
                    loop: "yes" === i.loop,
                    nav: "yes" === i.nav,
                    navText: ["", ""],
                    rtl: "yes" === i.rtl,
                    dots: "yes" === i.dots,
                    mouseDrag: "yes" === i.mouse_drag,
                    responsiveBaseElement: a,
                    autoplay: "yes" === i.autoplay,
                    autoplayTimeout: "yes" === i.autoplay ? 1e3 * i.autoplay_timeout.size : 3e3,
                    autoplayHoverPause: !0,
                    smartSpeed: 1e3,
                    responsive: {
                        0: { items: i.item_per_row_mobile || 1, margin: i.margin_mobile.size || 0, stagePadding: (i.margin_mobile.size || 0) / 2 },
                        768: { items: i.item_per_row_tablet || 2, margin: i.margin_tablet.size || 0, stagePadding: (i.margin_tablet.size || 0) / 2 },
                        1024: { items: i.item_per_row || 3, margin: i.margin.size || 0, stagePadding: (i.margin.size || 0) / 2 },
                    },
                }),
                "3" === i.layout &&
                    t.find(".xpro-team-layout-3").hover(
                        function () {
                            e(this).find(".xpro-team-description").slideDown(300);
                        },
                        function () {
                            e(this).find(".xpro-team-description").slideUp(300);
                        }
                    ),
                "7" === i.layout &&
                    t.find(".xpro-team-layout-7").hover(
                        function () {
                            e(this).find(".xpro-team-description").slideDown(300), e(this).find(".xpro-team-social-list").slideDown(500);
                        },
                        function () {
                            e(this).find(".xpro-team-description").slideUp(300), e(this).find(".xpro-team-social-list").slideUp(500);
                        }
                    ),
                "8" === i.layout &&
                    t.find(".xpro-team-layout-8").hover(
                        function () {
                            e(this).find(".xpro-team-content").slideDown(300);
                        },
                        function () {
                            e(this).find(".xpro-team-content").slideUp(300);
                        }
                    ),
                "9" === i.layout)
            ) {
                let n = t.find(".xpro-team-image > img").height(),
                    l = t.find(".xpro-team-inner-content").height();
                t.find(".xpro-team-inner-content").width(n), t.find(".xpro-team-inner-content").css("left", l + "px");
            }
            "14" === i.layout &&
                t.find(".xpro-team-layout-14").hover(
                    function () {
                        e(this).find(".xpro-team-description").slideDown(300), e(this).find(".xpro-team-social-list").slideDown(500);
                    },
                    function () {
                        e(this).find(".xpro-team-description").slideUp(300), e(this).find(".xpro-team-social-list").slideUp(500);
                    }
                );
        },
        TestimonialCarousel: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-testimonial-slider"),
                a = t.find(".xpro-testimonial-thumbs"),
                n = "window";
            e(".e-route-panel-editor-content").length && (n = ".elementor-preview-responsive-wrapper");
            let l = new Swiper(r[0], {
                direction: "horizontal",
                breakpointsBase: n,
                autoHeight: "yes" === i.auto_height,
                allowTouchMove: "yes" === i.mouse_drag,
                loop: "yes" === i.loop,
                autoplay: "yes" === i.autoplay && { delay: 1e3 * i.autoplay_timeout.size },
                pagination: { el: t.find(".swiper-pagination")[0], clickable: !0 },
                navigation: { nextEl: t.find(".swiper-button-next")[0], prevEl: t.find(".swiper-button-prev")[0] },
                breakpoints:
                    i.layout <= 10
                        ? {
                              320: { slidesPerView: i.item_per_row_mobile || 1, spaceBetween: i.margin_mobile.size || 15 },
                              768: { slidesPerView: i.item_per_row_tablet || 2, spaceBetween: i.margin.size || 15 },
                              1024: { slidesPerView: i.item_per_row || 2, spaceBetween: i.margin.size || 15 },
                          }
                        : { 320: { loop: !0, loopedSlides: 3, loopAdditionalSlides: 3, slidesPerView: 1, spaceBetween: i.margin.size || 15 } },
            });
            if ("11" === i.layout || "12" === i.layout) {
                let s = new Swiper(a[0], { spaceBetween: 10, centeredSlides: !0, slidesPerView: 3, touchRatio: 0.2, slideToClickedSlide: !0, loop: !0, loopedSlides: 3, loopAdditionalSlides: 3 });
                (l.controller.control = s), (s.controller.control = l);
            }
        },
        LogoCarousel: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-logo-carousel"),
                a;
            e(".e-route-panel-editor-content").length && (a = ".elementor-preview-responsive-wrapper"),
                r.owlCarousel({
                    loop: "yes" === i.loop,
                    nav: "yes" === i.nav,
                    navText: ["", ""],
                    rtl: "yes" === i.rtl,
                    dots: "yes" === i.dots,
                    mouseDrag: "yes" === i.mouse_drag,
                    responsiveBaseElement: a,
                    autoplay: "yes" === i.autoplay,
                    autoplayTimeout: "yes" === i.autoplay ? 1e3 * i.autoplay_timeout.size : 3e3,
                    autoplayHoverPause: !0,
                    smartSpeed: 1e3,
                    responsive: {
                        0: { items: i.item_per_row_mobile || 1, margin: i.margin_mobile.size || 0, stagePadding: (i.margin_mobile.size || 0) / 2 },
                        768: { items: i.item_per_row_tablet || 2, margin: i.margin_tablet.size || 0, stagePadding: (i.margin_tablet.size || 0) / 2 },
                        1024: { items: i.item_per_row || 3, margin: i.margin.size || 0, stagePadding: (i.margin.size || 0) / 2 },
                    },
                });
        },
        HoverCard: function (t) {
            let i = o.getElementSettings(t);
            ("1" === i.layout || "2" === i.layout || "3" === i.layout) &&
                t.find(".xpro-hover-card-item-1,.xpro-hover-card-item-2,.xpro-hover-card-item-3").hover(
                    function () {
                        e(this).find(".xpro-hover-card-description").slideDown(300);
                    },
                    function () {
                        e(this).find(".xpro-hover-card-description").slideUp(300);
                    }
                ),
                ("4" === i.layout || "6" === i.layout) &&
                    t.find(".xpro-hover-card-item-4,.xpro-hover-card-item-6").hover(
                        function () {
                            e(this).find(".xpro-hover-card-sub-title").slideDown(300), e(this).find(".xpro-hover-card-description").slideDown(400);
                        },
                        function () {
                            e(this).find(".xpro-hover-card-description").slideUp(400), e(this).find(".xpro-hover-card-sub-title").slideUp(300);
                        }
                    );
        },
        AdvanceAccordion: function (t) {
            let i = o.getElementSettings(t),
                r = 100 * i.toggle_speed.size || 100;
            t.find(".xpro-accordion-list.active .xpro-accordion-content").slideDown(r),
                t.find(".xpro-accordion-header").on("click", function (t) {
                    t.preventDefault(),
                        "toggle" === i.accordion_type && (e(this).parent().siblings().find(".xpro-accordion-content").slideUp(r), e(this).parent().siblings().removeClass("active")),
                        e(this).parent().find(".xpro-accordion-content").slideToggle(r),
                        e(this).parent().toggleClass("active");
                });
        },
        Countdown: function (e) {
            let t = o.getElementSettings(e),
                i = e.find(".xpro-countdown"),
                r = e.find(".xpro-countdown-content"),
                f = e.find('.xpro-flipClock-countDown'),
                j = e.find('.xpro-countdown-end-message'),
                a = e.hasClass("elementor-element-edit-mode"),
                n = new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1],
                l = "https:" === document.location.protocol ? "secure" : "";
            document.cookie = "XproLocalTimeZone=" + n + ";SameSite=Strict;" + l;        
            if (t.show_flip_clock === 'yes') {
                var futureDate = new Date(t.due_date).getTime(); 
                var now = new Date().getTime();
                var seconds = Math.floor((futureDate - now) / 1000);
                if (seconds < 0) seconds = 0; 
                 j.hide();
                var clock = new FlipClock(f[0], seconds, {
                    clockFace:'DailyCounter',
                    countdown: true,
                    language: 'Custom',
                    autoStart: true,
                    callbacks: {
                        stop: function () {
                            if ("message" === t.end_action_type || "template" === t.end_action_type) {
                                f.hide();
                                j.show();
                            } else if ("url" === t.end_action_type && t.end_redirect_link) {
                                window.location.replace(t.end_redirect_link);
                            }
                        }
                    }
                }); 
            } else {
                i.countdown({
                    end: function () {
                        if ("message" === t.end_action_type || "template" === t.end_action_type) {
                            i.css("display", "none");
                            r.css("display", "block");
                        } else if ("url" === t.end_action_type && void 0 !== t.end_redirect_link && !0 !== a) {
                            window.location.replace(t.end_redirect_link);
                        }
                    }
                });
            }      
        },
        PostCarousel: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-post-grid-main"),
                a;
            e(".e-route-panel-editor-content").length && (a = ".elementor-preview-responsive-wrapper"),
                r.owlCarousel({
                    loop: "yes" === i.loop,
                    nav: "yes" === i.nav,
                    navText: ["", ""],
                    rtl: "yes" === i.rtl,
                    dots: "yes" === i.dots,
                    mouseDrag: "yes" === i.mouse_drag,
                    responsiveBaseElement: a,
                    autoplay: "yes" === i.autoplay,
                    autoplayTimeout: "yes" === i.autoplay ? 1e3 * i.autoplay_timeout.size : 3e3,
                    autoplayHoverPause: !0,
                    smartSpeed: 1e3,
                    autoHeight: "yes" === i.autoheight,
                    responsive: {
                        0: { items: i.item_per_row_mobile || 1, margin: i.margin_mobile.size || 0, stagePadding: (i.margin_mobile.size || 0) / 2 },
                        768: { items: i.item_per_row_tablet || 2, margin: i.margin_tablet.size || 0, stagePadding: (i.margin_tablet.size || 0) / 2 },
                        1024: { items: i.item_per_row || 3, margin: i.margin.size || 15, stagePadding: (i.margin.size || 15) / 2 },
                    },
                });
        },
        DrawSVG: function (e) {
            let t = o.getElementSettings(e),
                i = e.find(".xpro-draw-svg-wrapper svg");
            var r = i.drawsvg({
                duration: 1e3 * t.duration.size || 1e3,
                stagger: 100 * t.stagger.size || 100,
                easing: "swing",
                reverse: "yes" === t.reverse,
                callback: function () {
                    "yes" !== t.hover &&
                        "yes" === t.loop &&
                        setTimeout(function () {
                            r.drawsvg("animate");
                        }, 6e3);
                },
            });
            i.elementorWaypoint(
                function () {
                    r.drawsvg("animate");
                },
                { offset: "100%" }
            ),
                "yes" === t.hover &&
                    e.find(".xpro-draw-svg-wrapper").mouseenter(function () {
                        r.drawsvg("animate");
                    });
        },
        ModalPopup: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-elementor-modal-popup-toggle"),
                a = t.find(".xpro-elementor-modal-popup-close-btn"),
                n = t.find(".xpro-elementor-modal-popup-overlay"),
                l = t.find(".xpro-elementor-modal-popup-wrapper");
                const splashDelay = (i.due_date && i.due_date.size) ? i.due_date.size * 1000 : 1000;
                a.on("click", function () {
                    l.removeClass("active");
                });
            if (
                (r.on("click", function () {
                    l.toggleClass("active");
                }),
                a.on("click", function () {
                    l.removeClass("active"), l.addClass("closed");
                }),
                "yes" === i.overlay_exit &&
                    n.on("click", function () {
                        l.removeClass("active"), l.addClass("closed");
                    }),
                "yes" === i.esc_exit &&
                    e(document).keyup(function (e) {
                        "Escape" === e.key && (l.removeClass("active"), l.addClass("closed"));
                    }),
                "intent" === i.layout &&
                    e(document).on("mouseleave", function (e) {
                        (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) && !l.hasClass("closed") && l.addClass("active");
                    }),
                "on_scroll" === i.layout &&
                    e(window).scroll(function () {
                        e(this).scrollTop() > (i.scroll_offset.size || 100) && !l.hasClass("closed") && l.addClass("active");
                    }),
                "user_inactive" === i.layout)
            ) {
                var s = 0;
                e(window).mousemove(function (e) {
                    s = 0;
                });
                var p = setInterval(function () {
                    ++s > (i.user_inactive_duration.size || 3) && !l.hasClass("closed") && (l.addClass("active"), (s = 0), clearInterval(p));
                }, 1e3);
            }
            if (i.layout === "on_days") {
                const today = new Date().getDay().toString();

                if (i.selected_days && i.selected_days.includes(today)) {
                    setTimeout(function () {
                        l.addClass("active");
                    }, splashDelay);

                    if (i.due_date > 0 && !elementorFrontend.isEditMode()) {
                        a.on("click", function () {
                            let o = new Date();
                            o.setTime(o.getTime() + 3600000 * i.due_time);
                            e.cookie(`xpro-modal-popup-cookies-${t.data("id")}`, "valid", { expires: o });
                        });
                    } else {
                        e.removeCookie(`xpro-modal-popup-cookies-${t.data("id")}`);
                    }
                }
            }
            if ("on_date" === i.layout) {
                let d = new Date(i.date).toDateString();
                new Date().toDateString() !== d ||
                    l.hasClass("closed") ||
                    setTimeout(function () {
                        l.addClass("active");
                    }, 1e3 * i.splash_after.size || 1e3);
            }
            if (
                ("splash" === i.layout &&
                    setTimeout(function () {
                        l.addClass("active");
                    }, 1e3 * i.splash_after.size || 1e3),
                "custom" === i.layout &&
                    "" !== i.modal_custom_class &&
                    (e("#" + i.modal_custom_class).on("click", function (e) {
                        e.preventDefault(), l.toggleClass("active");
                    }),
                    e("." + i.modal_custom_class).on("click", function (e) {
                        e.preventDefault(), l.toggleClass("active");
                    })),
                "scroll_to_element" === i.layout && "" !== i.modal_scroll_selector)
            ) {
                var c = e("#" + i.modal_scroll_selector) || e("." + i.modal_scroll_selector);
                if (c.length) {
                    var u = c.first().offset().top;
                    e(window).on("scroll", function () {
                        e(document).scrollTop() > u && !l.hasClass("closed") && l.addClass("active");
                    });
                }
            }
            "inline" === i.layout &&
                a.on("click", function () {
                    e(this).parents(".elementor-widget-xpro-modal-popup").fadeOut(300);
                }),
                i.due_date > 0 && !elementorFrontend.isEditMode()
                    ? a.on("click", function () {
                          let o = new Date();
                          o.setTime(o.getTime() + 864e5 * i.due_date), e.cookie(`xpro-modal-popup-cookies-${t.data("id")}`, "valid", { expires: o });
                      })
                    : e.removeCookie(`xpro-modal-popup-cookies-${t.data("id")}`);
        },
        ImageAccordion: function (t) {
            o.getElementSettings(t),
                t.find(".xpro-image-accordion-wrapper"),
                t.find(".xpro-image-accordion-click").on("click", function (t) {
                    e(this).addClass("active").siblings().removeClass("active");
                });
        },
        DeviceSlider: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-device-slider"),
                a;
            e(".e-route-panel-editor-content").length && (a = ".elementor-preview-responsive-wrapper"),
                r.owlCarousel({
                    loop: "yes" === i.loop,
                    nav: "yes" === i.nav,
                    navText: ["", ""],
                    dots: "yes" === i.dots,
                    mouseDrag: "yes" === i.mouse_drag,
                    responsiveBaseElement: a,
                    autoplay: "yes" === i.autoplay,
                    autoplayTimeout: "yes" === i.autoplay ? 1e3 * i.autoplay_timeout.size : 3e3,
                    autoplayHoverPause: !0,
                    smartSpeed: 1e3,
                    responsive: { 0: { items: i.item_per_row_mobile || 1 }, 768: { items: i.item_per_row_tablet || 1 }, 1024: { items: i.item_per_row || 1 } },
                });
            let n = t.find(".xpro-device-slider-item > video"),
                l = 0,
                s = 0;
            n.each(function () {
                (l = e(this).parent().height()), (s = e(this).parent().width()), n.width(s), n.height(l);
            });
        },
        GoogleMap: function (e) {
            o.getElementSettings(e);
            let t = e.find(".xpro-google-map"),
                i = t.data("map_settings"),
                r = t.data("map_markers");
            if (t.length) {
                var a = new GMaps(i);
                for (var n in r) a.addMarker(r[n]);
                t.data("map_style") && (a.addStyle({ styledMapName: "Custom Map", styles: t.data("map_style"), mapTypeId: "map_style" }), a.setStyle("map_style"));
            }
        },
        StreetMap: function (e) {
            o.getElementSettings(e);
            let t = e.find(".xpro-open-street-map"),
                i = t.data("settings"),
                r = t.data("map_markers"),
                a = "";
            if (t.length) {
                var n = L.map(t[0], { zoomControl: i.zoomControl, scrollWheelZoom: !1 }).setView([i.lat, i.lng], i.zoom);
                for (var l in ("" !== i.mapboxToken
                    ? ((a = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" + i.mapboxToken),
                      L.tileLayer(a, {
                          maxZoom: 18,
                          attribution:
                              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
                          id: "mapbox/streets-v11",
                          tileSize: 512,
                          zoomOffset: -1,
                      }).addTo(n))
                    : L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(n),
                r))
                    if (r[l].iconUrl.length) {
                        var s = new (L.Icon.extend({ options: { iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [2, -41] } }))({ iconUrl: r[l].iconUrl });
                        L.marker([r[l].lat, r[l].lng], { icon: s }).bindPopup(r[l].infoWindow).addTo(n);
                    } else L.marker([r[l].lat, r[l].lng]).bindPopup(r[l].infoWindow).addTo(n);
            }
        },
        VerticalTimeline: function (t) {
            function i() {
                let o = t.find(".xpro-vertical-timeline-date > div"),
                    i = 0;
                o.each(function () {
                    i = Math.max(i, e(this).outerWidth());
                }),
                    o.parent().css({ minWidth: i + "px" });
            }
            o.getElementSettings(t),
                i(),
                e(window).on("resize", function () {
                    setTimeout(function () {
                        i();
                    }, 500);
                });
                if (typeof AOS !== 'undefined') {
                        AOS.init();
                }
                function checkTimelineItems() {
                    var windowHeight = e(window).height();
                    var scrollTop = e(window).scrollTop();

                    e(".xpro-vertical-timeline-inner").each(function () {
                        var $this = e(this);
                        var itemTop = $this.offset().top;
                        var itemHeight = $this.outerHeight();

                        if (scrollTop + windowHeight > itemTop + itemHeight / 4 &&
                            scrollTop < itemTop + itemHeight) {
                            $this.addClass("xpro-vertical-active");
                        } else {
                            $this.removeClass("xpro-vertical-active");
                        }
                    });
                }
                e(window).on('scroll resize', function () {
                  
                    checkTimelineItems();
                });
        },
        Unfold: function (t) {
            let i = o.getElementSettings(t);
            t.find("xpro-unfold-wrapper"),
                t.find(".xpro-unfold-hover .xpro-unfold-content").hover(
                    function () {
                        let o = e(this).find(".xpro-unfold-content-inner").outerHeight();
                        e(this).css({ height: o + "px" }), t.find(".xpro-unfold-btn").addClass("active");
                    },
                    function () {
                        e(this).css({ height: i.unfold_height.size || 100 + i.unfold_height.unit || "px" }), t.find(".xpro-unfold-btn").removeClass("active");
                    }
                ),
                t.find(".xpro-unfold-click .xpro-unfold-btn").data("clicks", 0),
                t.find(".xpro-unfold-click .xpro-unfold-btn").on("click", function (o) {
                    o.preventDefault();
                    let r = +e(this).data("clicks"),
                        a = t.find(".xpro-unfold-content-inner").outerHeight();
                    r % 2 == 0
                        ? (t
                              .find(".xpro-unfold-content")
                              .addClass("active")
                              .css({ height: a + "px" }),
                          e(this).addClass("active"))
                        : (t
                              .find(".xpro-unfold-content")
                              .removeClass("active")
                              .css({ height: i.unfold_height.size || 100 + i.unfold_height.unit || "px" }),
                          e(this).removeClass("active")),
                        e(this).data("clicks", r + 1);
                });
        },
        Cookies: function (e) {
            let t = o.getElementSettings(e).expiry_days.size,
                i = e.find(".xpro-cookies-wrapper"),
                r = e.find(".xpro-cookies-btn");
            function a(e, t, o) {
                var i = new Date();
                i.setTime(i.getTime() + 864e5 * o);
                var r = "expires=" + i.toUTCString();
                document.cookie = e + "=" + t + ";" + r + ";path=/";
            }
            elementorFrontend.isEditMode() &&
                (function e() {
                    for (var t = document.cookie.split(";"), o = 0; o < t.length; o++) a(t[o].split("=")[0], "", -1);
                })(),
                i.offsetHeight,
                !(function e(t) {
                    for (var o = t + "=", i = decodeURIComponent(document.cookie).split(";"), r = 0; r < i.length; r++) {
                        for (var a = i[r]; " " === a.charAt(0); ) a = a.substring(1);
                        if (0 === a.indexOf(o)) return a.substring(o.length, a.length);
                    }
                    return "";
                })("XproCookies") && i.addClass("active"),
                r.on("click", function (e) {
                    e.preventDefault(), a("XproCookies", !0, t), i.removeClass("active");
                });
        },
        AlertBox: function (e) {
            let t = o.getElementSettings(e);
            o.getElementSettings(e),
                e.find(".xpro-alert-box-wrapper"),
                e.find(".xpro-alert-box-btn").click(function () {
                    e.find(".xpro-alert-box-wrapper").fadeOut("slow");
                });
                
               let r = "";
               let a = e.find("#xpro-alert-box-lottie");
                t.lottie_url ? (r = t.lottie_url.url) : t.svg_upload && (r = t.svg_upload.url),
                lottie.loadAnimation({ container: a[0], renderer: "svg", loop: t.loop || !0, autoplay: t.autoplay || !0, path: r });
        },
        Preloader: function (t) {
            let i = o.getElementSettings(t),
                r = 1e3 * i.preloader_animate_timeout.size || 1e3;
            (elementorFrontend.isEditMode() && "yes" === i.show_editor) ||
                setTimeout(function () {
                    t.find(".xpro-preloader").fadeOut(),
                        t
                            .find(".xpro-preloader-ink")
                            .addClass("closing")
                            .delay(r)
                            .queue(function () {
                                e(this).removeClass("visible closing opening").dequeue();
                            });
                }, r);
        },
        Video: function (t) {
            let i = o.getElementSettings(t);
            t.find("xpro-video-wrapper");
            let r = new Plyr(t.find(".xpro-player"), {
                controls: "yes" === i.controls && ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"],
                youtube: { noCookie: !1, autoplay: "yes" === i.autoplay },
                vimeo: { autoplay: "yes" === i.autoplay },
                muted: "yes" === i.muted ? 1 : 0,
                loop: "yes" === i.loop ? { active: !0 } : { active: !1 },
            });
            if (
                (t.find(".xpro-sticky-video-overlay-media").on(
                    "click",
                    function () {
                        r.pause(), t.find(".xpro-sticky-video-overlay").removeClass("active").fadeOut();
                    },
                    function () {
                        r.play(), t.find(".xpro-sticky-video-overlay").addClass("active").fadeIn();
                    }
                ),
                "yes" === i.show_sticky)
            ) {
                let a = i.sticky_video_scroll_height.size || 100;
                r.on("play", function () {
                    e(window).scroll(function () {
                        e(this).scrollTop() > a ? t.find(".xpro-video-box:not(.closed)").addClass("sticky") : t.find(".xpro-video-box").removeClass("sticky");
                    });
                });
            }
            t.find(".sticky-cross-btn").click(function () {
                t.find(".xpro-video-box").removeClass("sticky"), t.find(".xpro-video-box").addClass("closed");
            });
        },
    FlipBox: function (t) {
            let m = o.getElementSettings(t);
            let n1 = "";
            let n2 = "";
            let a1 = t.find("#xpro-flip-box-lottie-front");
            let a2 = t.find("#xpro-flip-box-lottie-back");
            if (m.lottie_url && m.lottie_url.url) {
                n1 = m.lottie_url.url;
            } else if (m.svg_upload && m.svg_upload.url) {
                n1 = m.svg_upload.url;
            }
            if (m.lottie_url_back_media_type && m.lottie_url_back_media_type.url) {
                n2 = m.lottie_url_back_media_type.url;
            } else if (m.svg_upload_back_media_type && m.svg_upload_back_media_type.url) {
                n2 = m.svg_upload_back_media_type.url;
            }
            if (a1.length && n1) {
                lottie.loadAnimation({
                    container: a1.get(0),
                    renderer: "svg",
                    loop: m.loop !== undefined ? m.loop : true,
                    autoplay: m.autoplay !== undefined ? m.autoplay : true,
                    path: n1,
                });
            } 
            else {
                console.error("Front Lottie container not found or invalid path")
            }
            if (a2.length && n2) {
                lottie.loadAnimation({
                    container: a2.get(0),
                    renderer: "svg",
                    loop: m.loop !== undefined ? m.loop : true,
                    autoplay: m.autoplay !== undefined ? m.autoplay : true,
                    path: n2,
                });
            } else {
                console.error("Back Lottie container not found or invalid path", {
                });
            }           
 
             t.find("xpro-flip-box-wrapper"),
             t.find(".xpro-flip-box-wrapper").on("click", function (t) {
                 t.preventDefault(),
                 e(window).width() <= elementorFrontend.config.breakpoints.lg &&
                     (e(this).hasClass("xpro-animate-up") && e(this).toggleClass("xpro-custom-animate-up"),
                     e(this).hasClass("xpro-animate-down") && e(this).toggleClass("xpro-custom-animate-down"),
                     e(this).hasClass("xpro-animate-left") && e(this).toggleClass("xpro-custom-animate-left"),
                     e(this).hasClass("xpro-animate-right") && e(this).toggleClass("xpro-custom-animate-right"),
                     e(this).hasClass("xpro-animate-zoom-in") && e(this).toggleClass("xpro-custom-animate-zoom-in"),
                     e(this).hasClass("xpro-animate-zoom-out") && e(this).toggleClass("xpro-custom-animate-zoom-out"),
                     e(this).hasClass("xpro-animate-skewUp") && e(this).toggleClass("xpro-custom-animate-skewUp"),
                     e(this).hasClass("xpro-animate-fade") && e(this).toggleClass("xpro-custom-animate-fade"),
                     e(this).hasClass("xpro-animate-rotate-right") && e(this).toggleClass("xpro-custom-animate-rotate-right"),
                     e(this).hasClass("xpro-animate-rotate-left") && e(this).toggleClass("xpro-custom-animate-rotate-left"),
                     e(this).hasClass("xpro-animate-slide-right") && e(this).toggleClass("xpro-custom-animate-slide-right"),
                     e(this).hasClass("xpro-animate-slide-left") && e(this).toggleClass("xpro-custom-animate-slide-left"),
                     e(this).hasClass("xpro-animate-slide-top") && e(this).toggleClass("xpro-custom-animate-slide-top"),
                     e(this).hasClass("xpro-animate-slide-bottom") && e(this).toggleClass("xpro-custom-animate-slide-bottom"));
             });   
        },
        TextMarquee: function (t) {
            let i = o.getElementSettings(t),
                b = t.find(".xpro-text-marquee-inner").get(0);
                if(i.text_marquee_direction =='up' || i.text_marquee_direction=='down'){
                    b.style.height = i.box_height.size+i.box_height.unit;
                }
        }, 
        MouseCursor: function (t) {
            let i = o.getElementSettings(t),
                r = e("body");
            t.find(".xpro-mouse-cursor-wrapper"),
                ("1" === i.cursor_layout || "3" === i.cursor_layout) &&
                    (e("div.xpro-mouse-cursor-wrapper").remove(),
                    r.append('<div class="xpro-mouse-cursor-wrapper"><div class="xpro-mouse-cursor-layout-' + i.cursor_layout + ' "><div class="xpro-cursor-dot xpro-cursor-dot-outline"></div></div></div>'),
                    r.css({ cursor: "auto" })),
                "1" !== i.cursor_layout &&
                    "3" !== i.cursor_layout &&
                    (e("div.xpro-mouse-cursor-wrapper").remove(),
                    r.append('<div class="xpro-mouse-cursor-wrapper"><div class="xpro-mouse-cursor-layout-' + i.cursor_layout + ' "><div class="xpro-cursor-dot-outline"></div><div class="xpro-cursor-dot"></div></div></div>'),
                    r.css({ cursor: "none" })),
                {
                    delay: 8,
                    _x: 0,
                    _y: 0,
                    endX: window.innerWidth / 2,
                    endY: window.innerHeight / 2,
                    cursorVisible: !0,
                    cursorEnlarged: !1,
                    $dot: document.querySelector(".xpro-cursor-dot"),
                    $outline: document.querySelector(".xpro-cursor-dot-outline"),
                    init: function () {
                        (this.dotSize = this.$dot.offsetWidth), (this.outlineSize = this.$outline.offsetWidth), this.setupEventListeners(), this.animateDotOutline();
                    },
                    setupEventListeners: function () {
                        var e = this;
                        document.querySelectorAll("a").forEach(function (t) {
                            t.addEventListener("mouseover", function () {
                                (e.cursorEnlarged = !0), e.toggleCursorSize();
                            }),
                                t.addEventListener("mouseout", function () {
                                    (e.cursorEnlarged = !1), e.toggleCursorSize();
                                });
                        }),
                            document.addEventListener("mousedown", function () {
                                (e.cursorEnlarged = !0), e.toggleCursorSize();
                            }),
                            document.addEventListener("mouseup", function () {
                                (e.cursorEnlarged = !1), e.toggleCursorSize();
                            }),
                            document.addEventListener("mousemove", function (t) {
                                (e.cursorVisible = !0), e.toggleCursorVisibility(), (e.endX = t.pageX), (e.endY = t.pageY), (e.$dot.style.top = e.endY + "px"), (e.$dot.style.left = e.endX + "px");
                            }),
                            document.addEventListener("mouseenter", function (t) {
                                (e.cursorVisible = !0), e.toggleCursorVisibility(), (e.$dot.style.opacity = 1), (e.$outline.style.opacity = 1);
                            }),
                            document.addEventListener("mouseleave", function (t) {
                                (e.cursorVisible = !0), e.toggleCursorVisibility(), (e.$dot.style.opacity = 0), (e.$outline.style.opacity = 0);
                            });
                    },
                    animateDotOutline: function () {
                        var e = this;
                        (e._x += (e.endX - e._x) / e.delay), (e._y += (e.endY - e._y) / e.delay), (e.$outline.style.top = e._y + "px"), (e.$outline.style.left = e._x + "px"), requestAnimationFrame(this.animateDotOutline.bind(e));
                    },
                    toggleCursorSize: function () {
                        var e = this;
                        e.cursorEnlarged
                            ? ((e.$dot.style.transform = "translate(-50%, -50%) scale(1.5)"), (e.$outline.style.transform = "translate(-50%, -50%) scale(1.5)"))
                            : ((e.$dot.style.transform = "translate(-50%, -50%) scale(1)"), (e.$outline.style.transform = "translate(-50%, -50%) scale(1)"));
                    },
                    toggleCursorVisibility: function () {
                        var e = this;
                        e.cursorVisible ? ((e.$dot.style.opacity = 1), (e.$outline.style.opacity = 1)) : ((e.$dot.style.opacity = 0), (e.$outline.style.opacity = 0));
                    },
                }.init();
        },
        OnePageNavigation: function (t) {
            let i = o.getElementSettings(t),
                r = (t.find(".xpro-one-page-nav-wrapper"), i.scroll_height_page_nav.size || 20),
                a = 1e3 * i.transition_duration_page_nav.size || 1e3;
            e(document).ready(function () {
                e(".xpro-one-page-nav li:first-child a").addClass("active"),
                    e(".xpro-one-page-nav li a").on("click", function (t) {
                        t.preventDefault();
                        var o = this,
                            i = this.hash,
                            n = e(i);
                        e("html, body")
                            .stop()
                            .animate({ scrollTop: n.offset().top + r }, a, "swing", function () {
                                (window.location.hash = i), e(".xpro-one-page-nav li a").removeClass("active"), e(o).addClass("active");
                            });
                    }),
                    e(window).scroll(function (t) {
                        var o = e(document).scrollTop();
                        if (0 === o) {
                            e(".xpro-one-page-nav li:first-child a").addClass("active");
                            return;
                        }
                        e(".xpro-one-page-nav li a").each(function () {
                            var t = e(this),
                                i = e(t.attr("href"));
                            (i.position().top <= o && i.position().top + i.height()) || 0 > o ? (e(".xpro-one-page-nav li a").removeClass("active"), t.addClass("active")) : t.removeClass("active");
                        });
                    });
            });
        },
        AjaxSearch: function (t) {
            let i = o.getElementSettings(t),
                r = Array.isArray(i.post_type) ? i.post_type.join(',') : i.post_type,
                ex = Array.isArray(i.exclude_posts) ? i.exclude_posts.join(',') : i.exclude_posts,
                a = i.posts_per_page,
                n = i.order,
                l = i.show_img,
                s = i.show_title,
                p = i.show_desc,
                d = i.search_redirect,
                c = "",
                u = t.find("form").attr("data-ajaxURL"),
                m = t.find("form").attr("data-nonce");
            c = "yes" === d ? "yes" : "no";
            let f;
            function g() {
                let o = { action: "xpro_elementor_live_search_data_fetch", keyword: t.find(".xpro-search-keyword-cls").val(), nonce: m, post_type: r, exclude_posts: ex, posts_per_page: a, order: n, display_img: l, display_title: s, display_content: p, };
                e.ajax({
                    url: u,
                    type: "post",
                    data: o,
                    beforeSend: function () {
                        t.find(".xpro-elementor-serch-input-group").addClass("xpro-loading-spinner"), t.find(".xpro-ajax-data-fetch-wrapper").css("display", "none");
                    },
                    complete: function () {
                        t.find(".xpro-elementor-search-input-group").removeClass("xpro-loading-spinner");
                    },
                    success: function (e) {
                        e && (t.find("#xpro_elementor_live_search_data_fetch").html(e), t.find(".xpro-ajax-data-fetch-wrapper").css("display", "block"));
                    },
                    error: function (e, t) {
                        var o = "";
                        (o =
                            0 === e.status
                                ? "Not connect.\n Verify Network."
                                : 404 == e.status
                                ? "Requested page not found. [404]"
                                : 500 == e.status
                                ? "Internal Server Error [500]."
                                : "parsererror" === t
                                ? "Requested JSON parse failed."
                                : "timeout" === t
                                ? "Time out error."
                                : "abort" === t
                                ? "Ajax request aborted."
                                : "Uncaught Error.\n" + e.responseText),
                            console.log(o);
                    },
                });
            }
            t.find(".xpro-search-keyword-cls").keyup(function () {
                clearTimeout(f), t.find(".xpro-search-keyword-cls").val() && (f = setTimeout(g, 800));
            }),
                "no" == c &&
                    t.find("#searchsubmit").on("click", function (e) {
                        e.preventDefault(), g();
                    }),
                "no" == c &&
                    e(document).ready(function () {
                        e(window).keydown(function (e) {
                            if (13 == e.keyCode) return e.preventDefault(), !1;
                        });
                    }),
                e("body").click(function () {
                    t.find(".xpro-ajax-data-fetch-wrapper").css("display", "none");
                }),
                ("4" === i.layout || "5" === i.layout) &&
                    (t.find(".xpro-elementor-search-button").on("click", function (e) {
                        e.preventDefault(), e.stopPropagation(), t.find(".xpro-elementor-search-layout-4 .xpro-elementor-search-inner").fadeIn(400), t.find(".xpro-elementor-search-layout-5 .xpro-elementor-search-inner").slideDown(400);
                    }),
                    t.find(".xpro-elementor-search-button-close").on("click", function (e) {
                        e.preventDefault(), e.stopPropagation(), t.find(".xpro-elementor-search-layout-4 .xpro-elementor-search-inner").fadeOut(400), t.find(".xpro-elementor-search-layout-5 .xpro-elementor-search-inner").slideUp(400);
                    }));
        },
        SourceCode: function (t) {
            o.getElementSettings(t);
            let i = t.find(".xpro-source-code"),
                r = i.data("language-type"),
                a = i.data("after-copy"),
                n = i.find("code.language-" + r);
            t.find(".xpro-source-code-btn").on("click", function () {
                var t = e("<textarea>");
                e(this).append(t), t.val(n.text()).select(), document.execCommand("copy"), t.remove(), a.length && e(this).text(a);
            }),
                void 0 !== r && void 0 !== n && Prism.highlightElement(n.get(0));
        },
        ImageMagnify: function (e) {
            let t = o.getElementSettings(e);
            e.find(".xpro-image-magnify"),
                "default" === t.zoomType &&
                    e
                        .find(".xpro-image-magnify-img")
                        .elevateZoom({
                            scrollZoom: t.scrollZoom,
                            zoomWindowWidth: t.zoomWindowSize.size,
                            zoomWindowHeight: t.zoomWindowSize.size,
                            zoomWindowOffetx: t.zoomWindowOffetx.size,
                            zoomWindowOffety: t.zoomWindowOffety.size,
                            zoomWindowPosition: Number(t.zoomWindowPosition) || 1,
                            cursor: "crosshair",
                            lensFadeIn: 500,
                            lensFadeOut: 500,
                            zoomWindowFadeIn: 500,
                            zoomWindowFadeOut: 500,
                            borderSize: 0,
                            easing: !0,
                        }),
                "default" !== t.zoomType &&
                    e
                        .find(".xpro-image-magnify-img")
                        .elevateZoom({
                            zoomType: t.zoomType,
                            lensShape: "lens" === t.zoomType ? t.lensShape : "",
                            lensSize: "lens" === t.zoomType ? t.lensSize.size : "",
                            cursor: "crosshair",
                            zoomWindowFadeIn: 500,
                            zoomWindowFadeOut: 500,
                            lensFadeIn: 500,
                            lensFadeOut: 500,
                            easing: !0,
                        });
        },
        InstagramFeed: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-elementor-gallery-wrapper"),
                a = (t.find(".xpro-elementor-gallery-item"), t.find(".xpro-gallery-elementor-loadmore")),
                n = "masonry" === i.gallery_style ? "grid" : i.gallery_style;
            function l() {
                if (
                    "none" !== i.popup &&
                    (r.lightGallery({
                        pager: !0,
                        addClass: "xpro-gallery-popup-style-" + i.popup,
                        selector: "[data-xpro-lightbox]",
                        thumbnail: "yes" === i.thumbnail,
                        exThumbImage: "data-src",
                        thumbWidth: 130,
                        thumbMargin: 15,
                        closable: !1,
                        showThumbByDefault: "yes" === i.thumbnail_by_default,
                        thumbContHeight: 150,
                        subHtmlSelectorRelative: !0,
                        hideBarsDelay: 99999999,
                        share: "yes" === i.share,
                        download: "yes" === i.download,
                    }),
                    "3" === i.popup || "4" === i.popup)
                ) {
                    var t = null;
                    r.on("onBeforeSlide.lg", function (o, a, n) {
                        (t = r.data("lightGallery").$items.eq(n).attr("data-src")),
                            "album" === i.gallery_type && (t = n > 0 ? e(this).find(".xpro-elementor-gallery-preview").eq(n).attr("data-src") : e(this).find(".cbp-l-caption-alignCenter").data("src")),
                            e(".lg-backdrop").addClass("xpro-popup-blur"),
                            e(".lg-backdrop").css({ "background-image": "url(" + t + ")" });
                    });
                }
            }
            r.cubeportfolio({
                layoutMode: n,
                gridAdjustment: "responsive",
                lightboxGallery: !1,
                mediaQueries: [
                    { width: elementorFrontend.config.breakpoints.lg, cols: i.item_per_row || 3, options: { gapHorizontal: i.margin.size || 0, gapVertical: i.margin.size || 0 } },
                    { width: elementorFrontend.config.breakpoints.md, cols: i.item_per_row_tablet || 2, options: { gapHorizontal: i.margin_tablet.size || 0, gapVertical: i.margin_tablet.size || 0 } },
                    { width: 0, cols: i.item_per_row_mobile || 1, options: { gapHorizontal: i.margin_mobile.size || 0, gapVertical: i.margin_mobile.size || 0 } },
                ],
                caption: i.hover_effect || "zoom",
                displayType: "sequentially",
                displayTypeSpeed: 80,
                plugins: { loadMore: { element: t.find(".cbp-l-loadMore-button"), action: i.load_more || "click", loadItems: i.item_per_row || 3 }, sort: { element: t.find(".cbp-loadMore-block1") } },
            }),
                a.on("XproClassChanged", function () {
                    r.data("lightGallery") &&
                        "none" !== i.popup &&
                        setTimeout(function () {
                            r.data("lightGallery").destroy(!0), l();
                        }, 1e3);
                }),
                l();
        },
        SlideAnything: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-slide-anything"),
                a;
            e(".e-route-panel-editor-content").length && (a = ".elementor-preview-responsive-wrapper"),
                r.owlCarousel({
                    loop: "yes" === i.loop,
                    center: "yes" === i.center,
                    startPosition: "yes" === i.center && i.start_position ? i.start_position : 0,
                    nav: "yes" === i.nav,
                    navText: ["", ""],
                    rtl: "yes" === i.rtl,
                    dots: "yes" === i.dots,
                    mouseDrag: "yes" === i.mouse_drag,
                    touchDrag: !0,
                    autoHeight: !1,
                    autoWidth: "yes" === i.custom_width,
                    responsiveBaseElement: a,
                    autoplay: "yes" === i.autoplay,
                    autoplayTimeout: "yes" === i.autoplay ? 1e3 * i.autoplay_timeout.size : 3e3,
                    autoplayHoverPause: !0,
                    smartSpeed: 500,
                    responsive: {
                        0: { items: i.item_per_row_mobile || 1, margin: i.margin_mobile.size || 0, stagePadding: (i.margin_mobile.size || 0) / 2 },
                        768: { items: i.item_per_row_tablet || 1, margin: i.margin_tablet.size || 0, stagePadding: (i.margin_tablet.size || 0) / 2 },
                        1024: { items: i.item_per_row || 2, margin: i.margin.size || 15, stagePadding: (i.margin.size || 0) / 2 },
                    },
                });
        },
        ScrollToTop: function (t) {
            let i = o.getElementSettings(t),
                r = (t.find(".xpro-elementor-scroll-top-btn"), ("fixed" === i.layout && i.scroll_top_offset.size) || 150),
                a = 100 * i.animated_duration.size || 100;
            e(window).scroll(function () {
                e(this).scrollTop() > r ? t.find(".xpro-elementor-scroll-top-btn-fixed").show() : t.find(".xpro-elementor-scroll-top-btn-fixed").hide();
            }),
                t.find(".xpro-elementor-scroll-top-btn").click(function () {
                    e("html, body").animate({ scrollTop: "0" }, a);
                });
        },
        SplitSlider: function (t) {
            let i = o.getElementSettings(t);
            if (
                (t.find(".xpro-split-slider-1").slick({
                    vertical: "vertical" === i.slider_orientation_1,
                    verticalSwiping: "vertical" === i.slider_orientation_1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: !1,
                    autoplay: "yes" === i.autoplay,
                    autoplaySpeed: "yes" === i.autoplay ? 1e3 * i.autoplay_timeout.size : 3e3,
                    draggable: "yes" === i.mouse_drag,
                    dots: !0,
                    speed: 100 * i.speed.size,
                    appendDots: t.find(".slider-dots-box"),
                    dotsClass: "slick-dots",
                    arrows: !1,
                    asNavFor: t.find(".xpro-split-slider-2"),
                    verticalReverse: !1,
                    customPaging: function (e, t) {
                        return '<span class="slick-dot"></span>';
                    },
                }),
                t
                    .find(".xpro-split-slider-2")
                    .slick({
                        vertical: "vertical" === i.slider_orientation_2,
                        verticalSwiping: "vertical" === i.slider_orientation_2,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: !1,
                        autoplay: "yes" === i.autoplay,
                        autoplaySpeed: "yes" === i.autoplay ? 1e3 * i.autoplay_timeout.size : 3e3,
                        draggable: "yes" === i.mouse_drag,
                        asNavFor: t.find(".xpro-split-slider-1"),
                        arrows: !1,
                        speed: 100 * i.speed.size,
                        verticalReverse: !1,
                    }),
                t.find(".slick-nav-prev").click(function () {
                    t.find(".xpro-split-slider-2").slick("slickPrev");
                }),
                t.find(".slick-nav-next").click(function () {
                    t.find(".xpro-split-slider-2").slick("slickNext");
                }),
                "yes" === i.mouse_wheel)
            ) {
                let r = !1,
                    a = t.find(".xpro-split-slider-inner").find(".slick-slide").length,
                    n = 1;
                t.find(".xpro-split-slider-inner").on("wheel", function (t) {
                    if (t.originalEvent.deltaY < 0) {
                        if (((r = !1), 1 === (n = e(this).slick("slickCurrentSlide") + 1))) {
                            r = !0;
                            return;
                        }
                        t.preventDefault(), e(this).slick("slickPrev");
                    } else {
                        if (((r = !1), (n = e(this).slick("slickCurrentSlide") + 1) === a)) {
                            r = !0;
                            return;
                        }
                        t.preventDefault(), e(this).slick("slickNext");
                    }
                });
            }
        },
        AudioPlayer: function (t) {
            var o = t.find(".xpro-audio-player > .jp-jplayer"),
                i = o.next(".jp-audio").attr("id"),
                r = o.data("settings");
            o.length &&
                e(o).jPlayer({
                    ready: function (t) {
                        e(this).jPlayer("setMedia", { mp3: r.audio_source }), r.autoplay && e(this).jPlayer("play", 1);
                    },
                    play: function () {
                        e(this).next(".jp-audio").removeClass("xpro-player-played"), e(this).jPlayer("pauseOthers");
                    },
                    ended: function () {
                        e(this).next(".jp-audio").addClass("xpro-player-played");
                    },
                    timeupdate: function (t) {
                        r.time_restrict && t.jPlayer.status.currentTime > r.restrict_duration && e(this).jPlayer("stop");
                    },
                    cssSelectorAncestor: "#" + i,
                    useStateClassSkin: !0,
                    autoBlur: r.smooth_show,
                    smoothPlayBar: !0,
                    keyEnabled: r.keyboard_enable,
                    remainingDuration: !0,
                    toggleDuration: !0,
                    volume: r.volume_level,
                    loop: r.loop,
                });
        },
        CouponCode: function (t) {
            var o = t.find(".xpro-coupon-code");
            if (o.length) {
                var i = o.data("settings");
                new ClipboardJS(i.couponMsgId, {
                    target: function (e) {
                        return e.nextElementSibling;
                    },
                }).on("success", function (t) {
                    e(t.trigger).addClass("active"),
                        t.clearSelection(),
                        setTimeout(function () {
                            e(t.trigger).removeClass("active");
                        }, 3e3);
                }),
                    !1 === i.triggerURL ||
                        Boolean(elementorFrontend.isEditMode()) ||
                        o.on("click", function () {
                            setTimeout(function () {
                                "" !== i.triggerURL && window.open(i.triggerURL, !1 !== i.triggerTarget ? "_blank" : "_self");
                            }, 1e3);
                        });
            }
        },
        LoopBuilder: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-loop-builder-main"),
                a = t.find(".xpro-elementor-gallery-filter > ul"),
                n = (t.find(".xpro-elementor-gallery-filter > ul").attr("data-default-filter"), a.find("li.cbp-filter-item").first().attr("data-filter"));
            setTimeout(function () {
                r.cubeportfolio({
                    filters: a,
                    layoutMode: "grid",
                    defaultFilter: n,
                    animationType: i.filter_animation,
                    gridAdjustment: "responsive",
                    lightboxGallery: !1,
                    mediaQueries: [
                        { width: elementorFrontend.config.breakpoints.lg, cols: i.column_grid || 3, options: { gapHorizontal: i.space_between.size || 0, gapVertical: i.space_between.size || 0 } },
                        { width: elementorFrontend.config.breakpoints.md, cols: i.column_grid_tablet || 2, options: { gapHorizontal: i.space_between_tablet.size || 0, gapVertical: i.space_between_tablet.size || 0 } },
                        { width: 0, cols: i.column_grid_mobile || 1, options: { gapHorizontal: i.space_between_mobile.size || 0, gapVertical: i.space_between_mobile.size || 0 } },
                    ],
                    caption: i.hover_effect || "zoom",
                    displayType: "sequentially",
                    displayTypeSpeed: 80,
                    plugins: { loadMore: { element: t.find(".cbp-l-loadMore-button"), action: i.load_more || "click", loadItems: Number(i.column_grid || 3) }, sort: { element: t.find(".cbp-loadMore-block1") } },
                });
            }, 500);
            let l = t.find(".xpro-filter-dropdown-tablet,.xpro-filter-dropdown-mobile"),
                s = t.find('[data-filter="' + n + '"]'),
                p = l.find("li.cbp-filter-item-active").text();
            l.find(".xpro-select-content").text(p || s.text()),
                l.on("click", function () {
                    e(this).toggleClass("active");
                }),
                l.find(".cbp-l-filters-button > li").on("click", function () {
                    l.find(".xpro-select-content").text(e(this).text());
                });
        },
        LoopCarousel: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-loop-builder-main"),
                a;
            e(".e-route-panel-editor-content").length && (a = ".elementor-preview-responsive-wrapper"),
                r.owlCarousel({
                    loop: "yes" === i.loop,
                    nav: "yes" === i.nav,
                    navText: ["", ""],
                    rtl: "yes" === i.rtl,
                    dots: "yes" === i.dots,
                    mouseDrag: "yes" === i.mouse_drag,
                    responsiveBaseElement: a,
                    autoplay: "yes" === i.autoplay,
                    autoplayTimeout: "yes" === i.autoplay ? 1e3 * i.autoplay_timeout.size : 3e3,
                    autoplayHoverPause: !0,
                    smartSpeed: 1e3,
                    autoHeight: "yes" === i.autoheight,
                    responsive: {
                        0: { items: i.item_per_row_mobile || 1, margin: i.margin_mobile.size || 0, stagePadding: (i.margin_mobile.size || 0) / 2 },
                        768: { items: i.item_per_row_tablet || 2, margin: i.margin_tablet.size || 0, stagePadding: (i.margin_tablet.size || 0) / 2 },
                        1024: { items: i.item_per_row || 3, margin: i.margin.size || 0, stagePadding: (i.margin.size || 0) / 2 },
                    },
                });
        },
        MailChimp: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-mailchimp-form"),
                a = t.find(".xpro-mailchimp-subscribe-btn > i"),
                n = r.attr("action");
            r.on("submit", function (o) {
                o.preventDefault(), a.show();
                let l = !0,
                    s = null;
                if (
                    (t.find('.xpro-mailchimp-fields [required="required"]').each(function (t) {
                        "" === e(this).val() && (l = !1);
                    }),
                    !l)
                ) {
                    (s = '<div class="xpro-alert xpro-alert-danger">' + i.required_field_message + "</div>"), t.find(".xpro-mailchimp-subscribe-message").hide().html(s).slideDown(), a.hide();
                    return;
                }
                if (i.recaptcha && !captcha) {
                    (s = '<div class="xpro-alert xpro-alert-danger">' + i.captcha_message + "</div>"), t.find(".xpro-mailchimp-subscribe-message").hide().html(s).slideDown(), a.hide();
                    return;
                }
                t.find(".xpro-mailchimp-subscribe-message").slideUp(),
                    e.ajax({ method: "POST", url: n, data: { fields: e(this).serialize(), apiKey: r.data("api-key"), listId: r.data("list-id") } }).done(function (e) {
                        e.success
                            ? ((s = '<div class="xpro-alert xpro-alert-success">' + i.success_message + "</div>"), t.find(".xpro-mailchimp-subscribe-message").hide().html(s).slideDown())
                            : ((s = '<div class="xpro-alert xpro-alert-danger">' + i.error_message + "</div>"), t.find(".xpro-mailchimp-subscribe-message").hide().html(s).slideDown()),
                            a.hide();
                    });
            });
        },
        MegaMenu: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-mega-menu-toggle-btn"),
                a = t.find(".xpro-mega-menu-closed-btn"),
                n = t.find(".xpro-mega-menu-overlay"),
                l = t.find(".xpro-submenu-indicator-wrap"),
                s = t.find(".xpro-menu-dropdown-toggle,.dropdown-item,.xpro-menu-has-megamenu > a");
            if (
                (t.find(".xpro-mega-menu-layout-horizontal .xpro-megamenu-panel").each(function (t) {
                    e(this).parents("li").hasClass("xpro-dropdown-menu-full_width")
                        ? e(this).css({ width: e(window).width(), left: Math.floor(e(this).position().left - e(this).offset().left) })
                        : e(this).css({ maxWidth: e(window).width() });
                }),
                e(window).resize(function () {
                    t.find(".xpro-mega-menu-layout-horizontal li.xpro-dropdown-menu-full_width .xpro-megamenu-panel").each(function (t) {
                        e(this).parents("li").hasClass("xpro-dropdown-menu-full_width")
                            ? e(this).css({ width: e(window).width(), left: Math.floor(e(this).position().left - e(this).offset().left) })
                            : e(this).css({ maxWidth: e(window).width() });
                    });
                }),
                t.find(".xpro-submenu-panel > li").each(function (t) {
                    if (e("ul", this).length) {
                        let o = e("ul:first", this),
                            i = o.offset().left,
                            r = o.width(),
                            a = e(window).width();
                        i + r <= a ? e(this).removeClass("xpro-edge") : e(this).addClass("xpro-edge");
                    }
                }),
                "none" !== i.responsive_show)
            ) {
                let p = "tablet" === i.responsive_breakpoint ? 1025 : 768;
                r.on("click", function (e) {
                    e.preventDefault(), t.find(".xpro-mega-menu-inner").toggleClass("active"), t.find(".xpro-mega-menu-overlay").toggleClass("active");
                }),
                    a.on("click", function (e) {
                        e.preventDefault(), t.find(".xpro-mega-menu-inner").removeClass("active"), t.find(".xpro-mega-menu-overlay").removeClass("active");
                    }),
                    n.on("click", function (o) {
                        o.preventDefault(), t.find(".xpro-mega-menu-inner").removeClass("active"), e(this).removeClass("active");
                    }),
                    "submenu" === i.action_on_click
                        ? s.on("click", function (t) {
                              e(window).width() < p &&
                                  (t.preventDefault(),
                                  t.stopPropagation(),
                                  e(this).toggleClass("active"),
                                  e(this).parents(".xpro-menu-has-dropdown").hasClass("xpro-mobile-builder-content")
                                      ? e(this).next().next(".xpro-megamenu-panel").slideToggle()
                                      : e(this).parent().hasClass("xpro-mobile-builder-content")
                                      ? e(this).parents(".xpro-mobile-builder-content").find(".xpro-megamenu-panel").slideToggle()
                                      : e(this).next(".xpro-submenu-panel").slideToggle());
                          })
                        : l.on("click", function (t) {
                              e(window).width() < p &&
                                  (t.preventDefault(),
                                  t.stopPropagation(),
                                  e(this).parent().toggleClass("active"),
                                  e(this).parents(".xpro-menu-has-dropdown").hasClass("xpro-mobile-builder-content")
                                      ? e(this).parent().next().next(".xpro-megamenu-panel").slideToggle()
                                      : e(this).parents(".xpro-menu-has-megamenu").hasClass("xpro-mobile-builder-content")
                                      ? e(this).parents(".xpro-mobile-builder-content").find(".xpro-megamenu-panel").slideToggle()
                                      : e(this).parent().next(".xpro-submenu-panel").slideToggle());
                          }),
                    e(window).resize(function () {
                        t.find(".xpro-submenu-panel").css("display", ""),
                            t.find(".xpro-megamenu-panel").css("display", ""),
                            t.find(".xpro-menu-nav-link").removeClass("active"),
                            t.find(".xpro-mega-menu-inner").removeClass("active"),
                            t.find(".xpro-mega-menu-overlay").removeClass("active");
                    });
            }
        },
        AdvancedPosts: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-post-grid-main"),
                a = t.find(".xpro-elementor-gallery-filter > ul"),
                n = t.find(".xpro-elementor-gallery-filter > ul").attr("data-default-filter");
            setTimeout(function () {
                r.cubeportfolio({
                    filters: a,
                    layoutMode: "grid",
                    defaultFilter: n,
                    animationType: i.filter_animation,
                    gridAdjustment: "responsive",
                    lightboxGallery: !1,
                    mediaQueries: [
                        { width: elementorFrontend.config.breakpoints.lg, cols: i.column_grid || 3, options: { gapHorizontal: i.space_between.size || 0, gapVertical: i.space_between.size || 0 } },
                        { width: elementorFrontend.config.breakpoints.md, cols: i.column_grid_tablet || 2, options: { gapHorizontal: i.space_between_tablet.size || 0, gapVertical: i.space_between_tablet.size || 0 } },
                        { width: 0, cols: i.column_grid_mobile || 1, options: { gapHorizontal: i.space_between_mobile.size || 0, gapVertical: i.space_between_mobile.size || 0 } },
                    ],
                    caption: i.hover_effect || "zoom",
                    displayType: "sequentially",
                    displayTypeSpeed: 80,
                    plugins: { loadMore: { element: t.find(".cbp-l-loadMore-button"), action: i.load_more || "click", loadItems: Number(i.column_grid || 3) }, sort: { element: t.find(".cbp-loadMore-block1") } },
                });
            }, 500);
            let l = t.find(".xpro-filter-dropdown-tablet,.xpro-filter-dropdown-mobile"),
                s = t.find('[data-filter="' + n + '"]'),
                p = l.find("li.cbp-filter-item-active").text();
            l.find(".xpro-select-content").text(p || s.text()),
                l.on("click", function () {
                    e(this).toggleClass("active");
                }),
                l.find(".cbp-l-filters-button > li").on("click", function () {
                    l.find(".xpro-select-content").text(e(this).text());
                });
        },
        RemoteArrows: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-remote-arrow-prev"),
                a = t.find(".xpro-remote-arrow-next"),
                n = t.parents(".elementor-section").find(".owl-carousel").first() || t.parents(".elementor-section:not(.elementor-inner-section)").find(".owl-carousel").first(),
                l = t.parents(".elementor-section").find(".slick-slider").first() || t.parents(".elementor-section:not(.elementor-inner-section)").find(".slick-slider").first(),
                s = t.parents(".elementor-section").find(".swiper-container").first() || t.parents(".elementor-section:not(.elementor-inner-section)").find(".swiper-container").first();
            n.length || (n = t.parents(".elementor-element").find(".owl-carousel").first()),
                l.length || (l = t.parents(".elementor-element").find(".slick-slider").first()),
                s.length || (s = t.parents(".elementor-element").find(".swiper-container").first()),
                r.on("click", function (o) {
                    if ((o.preventDefault(), i.remote_selector && "" !== i.remote_selector)) {
                        let r = e(i.remote_selector);
                        r.hasClass("owl-carousel") && r.owlCarousel().trigger("prev.owl.carousel"),
                            r.find(".owl-carousel").length && r.find(".owl-carousel").first().owlCarousel().trigger("prev.owl.carousel"),
                            r.hasClass("swiper-container") && r[0].swiper.slidePrev(),
                            r.find(".swiper-container").length && r.find(".swiper-container").first()[0].swiper.slidePrev(),
                            r.hasClass("slick-slider") && r.slick("slickPrev"),
                            r.find(".slick-slider").length && r.find(".slick-slider").first().slick("slickPrev");
                    } else console.log(t.parents(".elementor-element").find(".owl-carousel").first()), n.length && n.owlCarousel().trigger("prev.owl.carousel"), s.length && s[0].swiper.slidePrev(), l.length && l.slick("slickPrev");
                }),
                a.on("click", function (t) {
                    if ((t.preventDefault(), i.remote_selector && "" !== i.remote_selector)) {
                        let o = e(i.remote_selector);
                        o.hasClass("owl-carousel") && o.owlCarousel().trigger("next.owl.carousel"),
                            o.find(".owl-carousel").length && o.find(".owl-carousel").first().owlCarousel().trigger("next.owl.carousel"),
                            o.hasClass("swiper-container") && o[0].swiper.slideNext(),
                            o.find(".swiper-container").length && o.find(".swiper-container").first()[0].swiper.slideNext(),
                            o.hasClass("slick-slider") && o.slick("slickNext"),
                            o.find(".slick-slider").length && o.find(".slick-slider").first().slick("slickNext");
                    } else n.length && n.owlCarousel().trigger("next.owl.carousel"), s.length && s[0].swiper.slideNext(), l.length && l.slick("slickNext");
                });
        },
        VideoGallery: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-elementor-gallery-wrapper"),
                a = t.find(".xpro-elementor-gallery-filter > ul"),
                n = t.find(".xpro-elementor-gallery-filter > ul").attr("data-default-filter"),
                l = "masonry" === i.gallery_style ? "grid" : i.gallery_style;
            setTimeout(function () {
                r.cubeportfolio({
                    filters: a,
                    layoutMode: l,
                    defaultFilter: n,
                    animationType: i.filter_animation,
                    gridAdjustment: "responsive",
                    lightboxGallery: !1,
                    mediaQueries: [
                        { width: elementorFrontend.config.breakpoints.lg, cols: i.item_per_row || 3, options: { gapHorizontal: i.margin.size || 0, gapVertical: i.margin.size || 0 } },
                        { width: elementorFrontend.config.breakpoints.md, cols: i.item_per_row_tablet || 2, options: { gapHorizontal: i.margin_tablet.size || 0, gapVertical: i.margin_tablet.size || 0 } },
                        { width: 0, cols: i.item_per_row_mobile || 1, options: { gapHorizontal: i.margin_mobile.size || 0, gapVertical: i.margin_mobile.size || 0 } },
                    ],
                    caption: i.hover_effect || "zoom",
                    displayType: "sequentially",
                    displayTypeSpeed: 80,
                    plugins: { loadMore: { element: t.find(".cbp-l-loadMore-button"), action: i.load_more || "click", loadItems: i.item_on_load || 3 }, sort: { element: t.find(".cbp-loadMore-block1") } },
                });
            }, 500);
            let s = t.find(".xpro-filter-dropdown-tablet,.xpro-filter-dropdown-mobile"),
                p = t.find('[data-filter="' + n + '"]'),
                d = s.find("li.cbp-filter-item-active").text();
            s.find(".xpro-select-content").text(d || p.text()),
                s.on("click", function () {
                    e(this).toggleClass("active");
                }),
                s.find(".cbp-l-filters-button > li").on("click", function () {
                    s.find(".xpro-select-content").text(e(this).text());
                });
        },
        VideoCarousel: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-elementor-carousel-gallery");
            t.find(".xpro-elementor-carousel-gallery-item");
            let a;
            e(".e-route-panel-editor-content").length && (a = ".elementor-preview-responsive-wrapper"),
                r.owlCarousel({
                    loop: "yes" === i.loop,
                    nav: "yes" === i.nav,
                    navText: ["", ""],
                    rtl: "yes" === i.rtl,
                    dots: "yes" === i.dots,
                    mouseDrag: "yes" === i.mouse_drag,
                    responsiveBaseElement: a,
                    autoplay: "yes" === i.autoplay,
                    autoplayTimeout: "yes" === i.autoplay ? 1e3 * i.autoplay_timeout.size : 3e3,
                    autoplayHoverPause: !0,
                    smartSpeed: 1e3,
                    autoHeight: "yes" !== i.item_custom_height,
                    responsive: {
                        0: { items: i.item_per_row_mobile || 1, margin: i.margin_mobile.size || 0, stagePadding: (i.margin_mobile.size || 0) / 2 },
                        768: { items: i.item_per_row_tablet || 2, margin: i.margin_tablet.size || 0, stagePadding: (i.margin_tablet.size || 0) / 2 },
                        1024: { items: i.item_per_row || 3, margin: i.margin.size || 0, stagePadding: (i.margin.size || 0) / 2 },
                    },
                });
        },
        FlipBook3D: function (t) {
            let i = o.getElementSettings(t),
                r = t.find(".xpro-flip-book-3d"),
                a = t.find(".xpro-flip-book-3d-toggle"),
                n = t.find(".xpro-flip-book-poupup-close-btn");
            r.FlipBook({
                pdf: r.data("file"),
                template: {
                    html: r.data("widget") + "template/default-book-view.html",
                    styles: [r.data("widget") + "css/short-" + i.book_skin + "-book-view.css"],
                    links: [{ rel: "stylesheet", href: r.data("fontawesome") }],
                    script: r.data("widget") + "js/default-book-view.js",
                    sounds: { startFlip: r.data("widget") + "sound/start-flip.mp3", endFlip: r.data("widget") + "sound/end-flip.mp3" },
                },
            }),
                a.on("click", function (t) {
                    t.preventDefault(), e(".xpro-flip-book-layout-popup").toggleClass("active");
                }),
                n.on("click", function (t) {
                    t.preventDefault(), e(".xpro-flip-book-layout-popup").removeClass("active");
                });
        },
    };
    e(window).on("elementor/frontend/init", o.init);
})(jQuery, window.elementorFrontend);
