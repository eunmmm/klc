$(function () {
  // fullpage scroll

  var total_slides = $("section").length;

  $("#fullpage").fullpage({
    autoScrolling: true,
    scrollHorizontally: true,
    verticalCentered: false,
    scrollOverflow: true,
    controlArrows: false,
    navigation: true,
    navigationTooltips: [
      "MAIN",
      "BUSINESS",
      "PRODUCT",
      "PARTNERSHIP",
      "CONSULTING",
      "NEWS",
    ],
    normalScrollElements: ".tab_wrap",
    afterRender: function () {
      // add navigation tooltip innter wrap
      $("#fp-nav .fp-tooltip").each(function () {
        var words = $(this).text();
        $(this).empty();
        $(this).append("<span>" + words + "</span>");
        $(this)
          .siblings("a")
          .empty()
          .append('<span><i  class="blind">' + words + "</i></span>");
      });
    },
    onLeave: function (a, i) {
      if (i == 7) {
        $("#fp-nav").addClass("hidden");
        $(".solution_wrap").addClass("hidden");
        $("#header").addClass("hidden");
        $(".progress_bar").addClass("hidden");
      } else {
        $("#fp-nav").removeClass("hidden");
        $(".solution_wrap").removeClass("hidden");
        $("#header").removeClass("hidden");
        $(".progress_bar").removeClass("hidden");
      }

      if ($(window).width() <= 1024) {
        var $scroll_percent = (i / total_slides) * 100;
        $(".progress_bar").css("width", $scroll_percent + "%");
      }
    },
  });

  // header
  $("#nav > li").hover(
    function () {
      sub_menu = $(this).find(".nav_item_depth1");

      $(".nav_bg").stop().slideDown();
      $(".sub_nav_container_outer").stop().slideDown();

      $("#header").addClass("active");
      $(".header_wrap .logo").addClass("active");
      $("#nav > li > a").addClass("active");
      $(".btn_insights_wrap .btn_insights").addClass("active");
      $(".smart_link_wrap").addClass("active");
      $(".btn_search").addClass("active");
      $(".btn_smart_link").addClass("active");

      $(this).find(".sub_nav_container_outer").addClass("on");
      $(this).addClass("active");

      $(".sub_nav_container").removeClass("active");
      $(this).find(".sub_nav_container").addClass("active");

      $(sub_menu).hover(
        function () {
          $(this).addClass("active").siblings().removeClass("active");
          // $(".sub_nav_container").removeClass("active");
          // $(this).find(".sub_nav_container").addClass("active");
        },
        function () {
          // out
        }
      );
    },
    function () {
      $(".sub_nav_container_outer").stop().slideUp();
      $(".nav_bg").stop().slideUp();
      $(".sub_nav_container_outer").removeClass("on");
      $("#header").removeClass("active");
      $(".header_wrap .logo").removeClass("active");
      $("#nav > li > a").removeClass("active");
      $(".btn_insights_wrap .btn_insights").removeClass("active");
      $(".smart_link_wrap").removeClass("active");
      $(".btn_search").removeClass("active");
      $(".btn_smart_link").removeClass("active");
      $(this).removeClass("active");
    }
  );

  // visual slide

  var $visual = $(".sc_visual");
  var $state = $visual.find(".swiper_play_state");
  var $slideList = $(".visual_slider");

  var visual_swiper = new Swiper(".sc_visual .visual_wrap", {
    // direction: "vertical",

    effect: "fade",
    fadeEffect: { crossFade: false },
    parallax: true,

    loop: true,
    speed: 1200,
    lazy: {
      loadOnTransitionStart: true,
    },
    navigation: {
      nextEl: ".visual_control .visual_next",
      prevEl: ".visual_control .visual_prev",
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".sc_visual .swiper_pagination",
      type: "fraction",
      renderFraction: function (currentClass, totalClass) {
        return (
          '<span class="swiper-pagination-current">' +
          currentClass +
          "</span>" +
          '<span class="swiper_progress_hidden_space">/</span>' +
          '<span class="swiper-pagination-total">' +
          totalClass +
          "</span>"
        );
      },
    },
  });
  // Play, Pause
  $(".swiper_play_state").click(function (e) {
    e.preventDefault();

    if ($(this).hasClass("play")) {
      visual_swiper.autoplay.stop();
      $(this).removeClass("play").addClass("pause");
      $state.find(".swiper_state_play").focus();
    } else {
      visual_swiper.autoplay.start();
      $(this).removeClass("pause").addClass("play");
      if ($(this).hasClass("progress_max")) {
        visual_swiper.slideNext();
      }
      $state.find(".swiper_state_pause").focus();
    }
  });
  visual_swiper.on("init", function () {
    //초기세팅!

    gsap.to($(".swiper-slide-active .hide"), 1, {
      y: 0,
      opacity: 1,
      stagger: 0.2,
    });
  });
  visual_swiper.on("slideChangeTransitionStart", function () {
    gsap.to(".swiper-slide .hide", 1, {
      y: 80,
    });

    gsap.to($(".swiper-slide-active .hide"), 1, {
      y: 0,
      opacity: 1,
      stagger: 0.2,
    });
  });
  // product slide

  $("#panel_slider .slider-single").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    adaptiveHeight: true,
    infinite: false,
    useTransform: true,
    speed: 400,
    // autoplay: true,
    // autoplaySpeed: 1000,
    cssEase: "cubic-bezier(0.77, 0, 0.18, 1)",
  });

  $("#panel_slider .slider-nav")
    .on("init", function (event, slick) {
      $(".slider-nav .slick-slide.slick-current").addClass("is-active");
    })
    .slick({
      slidesToShow: 5,
      slidesToScroll: 5,
      dots: false,
      focusOnSelect: false,
      infinite: false,
    });

  $(".slider-single").on("afterChange", function (event, slick, currentSlide) {
    $(".slider-nav").slick("slickGoTo", currentSlide);
    var currrentNavSlideElem =
      '.slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
    $(".slider-nav .slick-slide.is-active").removeClass("is-active");
    $(currrentNavSlideElem).addClass("is-active");
  });

  $(".slider-nav").on("click", ".slick-slide", function (event) {
    event.preventDefault();
    var goToSingleSlide = $(this).data("slick-index");

    $(".slider-single").slick("slickGoTo", goToSingleSlide);
  });

  // product tab - contents
  $(".tab_item").on("click", function (e) {
    e.preventDefault();

    var idx = $(this).index();

    $(this).addClass("active").siblings().removeClass("active");
    $(".panel_wrap .contents_wrap").show().eq(idx).siblings().hide();
  });
  // search slide
  $(".search_recommend_inner").each(function () {
    var $this = $(this);
    var $slider = $this.find(".search_recommend_slider");
    var $dot = $this.find(".search_recommend_control .slick_dots_wrap");

    if (!$slider.length) return;

    $slider.slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      speed: 1500,
      autoplay: false,
      arrows: false,
      infinite: true,
      dots: true,
      appendDots: $dot,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 540,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });

    // play on popup open
    $("#global_search_open_btn").on("click", function () {
      $slider.slick("slickPlay");
    });

    // pause on popup close
    $("#global_search_popup_close").on("click", function () {
      $slider.slick("slickPause");
      // focus restore
      $("html.desktop #global_search_open_btn").focus();
    });

    // play/pause setting
    $(this)
      .find(".search_recommend_control .slick_play_state")
      .on("click", function () {
        if ($(this).hasClass("play")) {
          $slider.slick("slickPause");
          $(this).removeClass("play").addClass("pause");
          $(this).find(".slick_state_play").focus();
        } else {
          $slider.slick("slickPlay");
          $(this).removeClass("pause").addClass("play");
          $(this).find(".slick_state_pause").focus();
        }
      });

    // arrows action
    $(this)
      .find(".search_recommend_control .btn_prev")
      .click(function (e) {
        e.preventDefault();
        $slider.slick("slickPrev");
      });
    $(this)
      .find(".search_recommend_control .btn_next")
      .click(function (e) {
        e.preventDefault();
        $slider.slick("slickNext");
      });
  });

  // search btn open close
  $("#global_search_open_btn, .m_menu_search").on("click", function () {
    $(".search_wrap").addClass("active");
    $("body").addClass("hidden");
    $(".progress_bar").addClass("hidden");
  });
  $("#global_search_popup_close").on("click", function () {
    $(".search_wrap").removeClass("active");
    $("body").removeClass("hidden");
    $(".progress_bar").removeClass("hidden");
  });

  // smart link open close
  $(".btn_smart_link").on("click", function (e) {
    e.preventDefault();

    $(".smart_link_contents").addClass("active");
    $("body").addClass("hidden");
    $(".solution_wrap").addClass("hidden");
    $("#fp-nav").addClass("hidden");
    $(".smart_link_overlay").addClass("open");
    $("body").on("scroll touchmove mousewheel", function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    });

    gsap.from($(".list_wrap > div > div,.list_wrap > div > ul > li"), {
      y: 60,
      autoAlpha: 0,
      stagger: 0.1,
    });
    gsap.to($(".list_wrap > div > div,.list_wrap > div > ul > li"), {
      y: 0,
      autoAlpha: 1,
      force3D: true,
      ease: Power3.easeOut,
      stagger: 0.1,
    });
  });
  $(".close_smart_link").on("click", function () {
    $(".smart_link_contents").removeClass("active");
    $("body").removeClass("hidden");
    $(".solution_wrap").removeClass("hidden");
    $("#fp-nav").removeClass("hidden");
    $(".smart_link_overlay").removeClass("open");
    $("body").off("scroll touchmove mousewheel");
  });

  // tab_wrap

  $(".tab_wrap").hover(
    function () {
      $.fn.fullpage.setMouseWheelScrolling(false);
    },
    function () {
      $.fn.fullpage.setMouseWheelScrolling(true);
    }
  );

  function nice() {
    ww = $(window).width();

    if (ww < 1024) {
      $(".tab_wrap").getNiceScroll().remove();
    } else {
      $(".tab_wrap").niceScroll(".tab_list", {
        autohidemode: false,
        railvalign: "right",
        bouncescroll: false,
        // touchbehavior      : touch_state ,
        // emulatetouch       : touch_state,
        cursorborder: "0px solid #f4f5f6",
        cursorcolor: "#1f2c5c",
        background: "#ddd",
        cursorwidth: 4,
        cursorborderradius: "0px",
        railoffset: { top: 0, left: 0 },
      });
    }
  }
  nice();

  // service swiper

  var ww = $(window).width();
  var businessSwiper = undefined;
  var partnershipSwiper = undefined;
  var tabScroll = undefined;

  function initBusinessSwiper() {
    if (ww < 768 && businessSwiper == undefined) {
      businessSwiper = new Swiper(".business_wrap", {
        slidesPerView: "auto",
        simulateTouch: true,
        pagination: {
          // 페이징 설정
          el: ".business_wrap .swiper-pagination",
          clickable: true, // 페이징을 클릭하면 해당 영역으로 이동, 필요시 지정해 줘야 기능 작동
        },
      });
    } else if (ww >= 768 && businessSwiper != undefined) {
      businessSwiper.destroy();
      businessSwiper == undefined;
    }
  }
  initBusinessSwiper();

  function initPartnershipSwiper() {
    if (ww < 768 && partnershipSwiper == undefined) {
      partnershipSwiper = new Swiper(".partnership_wrap", {
        slidesPerView: "auto",
        simulateTouch: true,
        pagination: {
          // 페이징 설정
          el: ".partnership_wrap .swiper-pagination",
          clickable: true, // 페이징을 클릭하면 해당 영역으로 이동, 필요시 지정해 줘야 기능 작동
        },
      });
    } else if (ww >= 768 && partnershipSwiper != undefined) {
      partnershipSwiper.destroy();
      partnershipSwiper == undefined;
    }
  }
  initPartnershipSwiper();

  $(window).on("resize", function () {
    ww = $(window).width();
    initBusinessSwiper();
    initPartnershipSwiper();
    nice();
  });
  $(window).trigger("resize"); // 첫로드시

  // mobile menu btn
  $("#header .m_menu_btn").on("click", function (e) {
    e.preventDefault();
    // $(this).addClass("on");
    $("#header .m_menu_wrap").addClass("open");
    $("#header .m_menu_overlay").fadeIn(300);
    $("body").addClass("hidden");
    $(".solution_wrap").addClass("hidden");
    $(".progress_bar").addClass("hidden");
  });

  // m_menu_close
  $("#header .m_menu_close").on("click", function (e) {
    e.preventDefault();

    $("#header .m_menu_wrap").removeClass("open");
    $("#header .m_menu_overlay").fadeOut(300);
    $("body").removeClass("hidden");
    $(".solution_wrap").removeClass("hidden");
    $(".progress_bar").removeClass("hidden");
  });

  // m_menu_wrap 클릭시 닫기
  $("#header .m_menu_overlay").on("click", function () {
    $("#header .m_menu_wrap").removeClass("open");
    // $("#header .m_search_wrap").slideUp(300);
    // $(".prod_search").slideUp(600);
    // $(".dimm_header").stop().fadeOut(300);
    $("#header .m_menu_overlay").fadeOut(300);
    $("body").removeClass("hidden");
  });

  // $(".m_nav .m_depth1>li").on("click", function (e) {
  //   e.preventDefault();

  //   $(this).toggleClass("on").siblings().removeClass("on");
  // });

  // m_gnb 아코디언
  $(".m_nav > li > a").on("click", function (e) {
    e.preventDefault();

    $(this)
      .addClass("active")
      .parent()
      .siblings()
      .find(">.m_more")
      .removeClass("active");
    $(this)
      .next()
      .stop()
      .slideToggle()
      .parent()
      .siblings()
      .find(".m_depth_1")
      .hide();
  });

  // m_depth3 열기
  $(".m_depth_1 > li > a").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    $(this)
      .toggleClass("active")
      .parent()
      .siblings()
      .find("> a")
      .removeClass("active");
    $(this)
      .next()
      .stop()
      .slideToggle()
      .parent()
      .siblings()
      .find(".m_depth_2")
      .hide();
  });

  // footer sitemap accordian
  $(".sitemap_item").on("click", function (e) {
    e.preventDefault();

    $(this).addClass("active").siblings().removeClass("active");
    $(this)
      .children(".sitemap_list")
      .stop()
      .slideToggle()
      .parent()
      .siblings()
      .find(".sitemap_list")
      .hide();
    // $(this).removeClass("active");
  });

  // address btn
  $(".address_btn").on("click", function (e) {
    e.preventDefault();

    $(this).toggleClass("on").siblings().toggleClass("on");
  });

  $(".m_footer_mark_btn").on("click", function (e) {
    $(".mark").slideToggle(function () {
      $.fn.fullpage.reBuild();
    });
  });
});
