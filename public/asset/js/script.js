/* Template	:	ICO Crypto v1.2.2 */
(function($){
	'use strict';
	var $win = $(window), $body_m = $('body'), $navbar = $('.navbar');
	
	// Touch Class
	if (!("ontouchstart" in document.documentElement)) {
		$body_m.addClass("no-touch");
	}
	// Get Window Width
	function winwidth () {
		return $win.width();
	}
	var wwCurrent = winwidth();
	$win.on('resize', function () { 
		wwCurrent = winwidth(); 
	});

	// Sticky
	var $is_sticky = $('.is-sticky');
	if ($is_sticky.length > 0 ) {
		var $navm = $('#mainnav').offset();
		$win.scroll(function(){
			var $scroll = $win.scrollTop();
			if ($win.width() > 991) {
				if($scroll > $navm.top ){
					if(!$is_sticky.hasClass('has-fixed')) {$is_sticky.addClass('has-fixed');}
				} else {
					if($is_sticky.hasClass('has-fixed')) {$is_sticky.removeClass('has-fixed');}
				}
			} else {
				if($is_sticky.hasClass('has-fixed')) {$is_sticky.removeClass('has-fixed');}
			}
		});
	}
	
	// OnePage Scrolling
	$('a.menu-link[href*="#"]:not([href="#"])').on("click", function() {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var toHash = $(this.hash), toHashN = (this.hash.slice(1)) ? $('[name=' + this.hash.slice(1) + ']') : false, nbar = (wwCurrent >= 992) ? $navbar.height() - 1 : 0;

			toHash = toHash.length ? toHash : toHashN;
			if (toHash.length) {
				$('html, body').animate({
					scrollTop: (toHash.offset().top - nbar)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	
	// Active page menu when click
	var CurURL = window.location.href, urlSplit = CurURL.split("#");
	var $nav_link = $(".nav li a");
	if ($nav_link.length > 0) {
		$nav_link.each(function() {
			if (CurURL === (this.href) && (urlSplit[1]!=="")) {
				$(this).closest("li").addClass("active").parent().closest("li").addClass("active");
			}
		});
	}

	// Intro slider previous
	// jQuery(function () {
 //        var $els = $('div[id^=region]'),
 //            i = 0,
 //            len = $els.length;
 //        $els.slice(1).hide();
 //        setInterval(function () {
 //            $els.eq(i).fadeOut(function () {
 //                i = (i + 1) % len
 //                $els.eq(i).fadeIn();
 //            })
 //        }, 5500)
 //    });

	// Bootstrap Dropdown 
	var $dropdown_menu = $('.dropdown');	
	if ($dropdown_menu.length > 0 ) {
		$dropdown_menu.on("mouseover",function(){
			if ($win.width() > 991) {
				$('.dropdown-menu', this).not('.in .dropdown-menu').stop().fadeIn("400");
				$(this).addClass('open'); 
			}
		});
		$dropdown_menu.on("mouseleave",function(){
			if ($win.width() > 991) {
				$('.dropdown-menu', this).not('.in .dropdown-menu').stop().fadeOut("400");
				$(this).removeClass('open'); 
			}
		});
		$dropdown_menu.on("click",function(){
			if ($win.width() < 991) {
				$(this).children('.dropdown-menu').fadeToggle(400);
				$(this).toggleClass('open'); 
				return false;
			}
		});
		
	}
	$win.on('resize', function() {
		$('.navbar-collapse').removeClass('in');
		$dropdown_menu.children('.dropdown-menu').fadeOut("400");
	});

	// remove ani
	var $navtoggler = $('.navbar-toggler'), $trannav =$('.is-transparent');
	if ($navtoggler.length > 0) {
		$navtoggler.on("click",function(){
			$('.remove-animation').removeClass('animated');
			if (!$trannav.hasClass('active')) {
				$trannav.addClass('active');
			}else{
				$trannav.removeClass('active');
			}
		});
	}
	
	// Select
	var $selectbox = $('select');
	if ($selectbox.length > 0) {
		$selectbox.select2();
	}
	
	// Nav collapse
	$('.menu-link').on("click",function() {
		$('.navbar-collapse').collapse('hide');
		$trannav.removeClass('active');
	});
	$(document).on('mouseup', function(e){
		if (!$trannav.is(e.target) && $trannav.has(e.target).length===0) {
			$('.navbar-collapse').collapse('hide');
			$trannav.removeClass('active');
		}
	});
	
	//Carousel Time Line
	var $timeline_carousel = $('.timeline-carousel');
	if ($timeline_carousel.length > 0 ) {
		var c_rtl = ($body_m.hasClass('is-rtl')) ? true : false;
		$timeline_carousel.addClass('owl-carousel').owlCarousel({
			navText: ["<i class='ti ti-angle-left'></i>","<i class='ti ti-angle-right'></i>"],
			items:4,
			nav:true,
			margin:36,
			rtl: c_rtl,
			responsive:{
				0 : {
					items:1,
				},
				400 : {
					items:1,
					center:false,
				},
				599 : {
					items:2,
				},
				1024 : {
					items:3,
				},
				1170 : {
					items:4,
				}
			}
		});
	}
	
	//Carousel Roadmap
	var $roadmap_carousel = $('.roadmap-carousel');
	if ($roadmap_carousel.length > 0 ) {
		var c_rtl_r = ($body_m.hasClass('is-rtl')) ? true : false;
		$roadmap_carousel.addClass('owl-carousel').owlCarousel({
			items:4,
			nav:false,
			dost:true,
			margin:30,
			rtl: c_rtl_r,
			responsive:{
				0 : {
					items:1,
				},
				400 : {
					items:2,
					center:false,
				},
				599 : {
					items:3,
				},
				1024 : {
					items:4,
				},
				1170 : {
					items:5,
				}
			}
		});
	}	
	
	//Carousel Roadmap
	var $roadmap_carousel_withnav = $('.roadmap-carousel-withnav');
	if ($roadmap_carousel_withnav.length > 0 ) {
		var c_rtl_rn = ($body_m.hasClass('is-rtl')) ? true : false;
		$roadmap_carousel_withnav.addClass('owl-carousel').owlCarousel({
			navText: ["<i class='ti ti-angle-left'></i>","<i class='ti ti-angle-right'></i>"],
			items:4,
			nav:true,
			dost:false,
			margin:30,
			rtl: c_rtl_rn,
			responsive:{
				0 : {
					items:1,
				},
				400 : {
					items:2,
					center:false,
				},
				599 : {
					items:3,
				},
				1024 : {
					items:4,
				},
				1170 : {
					items:5,
				}
			}
		});
	}	

	//Carousel
	var $has_carousel = $('.has-carousel');
	if ($has_carousel.length > 0 ) {
		var c_rtl_c = ($body_m.hasClass('is-rtl')) ? true : false;
		$has_carousel.each(function(){
			var $self = $(this);
			var c_item = ($self.data('items')) ? $self.data('items') : 4;
			var c_item_t = (c_item >= 3) ? 2 : c_item;
			var c_item_m = (c_item_t >= 2) ? 1 : c_item_t;
			var c_delay =($self.data('delay')) ? $self.data('delay') : 6000;
			var c_auto =($self.data('auto')) ? true : false;
			var c_loop =($self.data('loop')) ? true : false;
			var c_dots = ($self.data('dots')) ? true : false;
			var c_navs = ($self.data('navs')) ? true : false;
			var c_ctr = ($self.data('center')) ? true : false;
			var c_mgn = ($self.data('margin')) ? $self.data('margin') : 30;
			$self.addClass('owl-carousel').owlCarousel({
				navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
				items: c_item, loop: c_loop, nav: c_navs, dots: c_dots, margin: c_mgn, center: c_ctr,
				autoplay: c_auto, autoplayTimeout: c_delay, autoplaySpeed: 300, rtl: c_rtl_c,
				responsive:{ 0:{ items:1 }, 480:{ items: c_item_m }, 768:{ items: c_item_t }, 1170:{ items: c_item } }
			});
		});
	}
	
	// Count Down
	var $count_token = $('.token-countdown');
	if ($count_token.length > 0 ) {
		$count_token.each(function() {
			var $self = $(this), datetime = $self.attr("data-date");
			$self.countdown(datetime).on('update.countdown', function(event) {
				$(this).html(event.strftime('' + '<div class="col"><span class="countdown-time countdown-time-first">%D</span><span class="countdown-text">Days</span></div>' + '<div class="col"><span class="countdown-time">%H</span><span class="countdown-text">Hours</span></div>' + '<div class="col"><span class="countdown-time">%M</span><span class="countdown-text">Minutes</span></div>' + '<div class="col"><span class="countdown-time countdown-time-last">%S</span><span class="countdown-text">Seconds</span></div>'));
			});
		});
		
	}
	
	// POPUP - Content
	var $content_popup = $('.content-popup');
	if ($content_popup.length > 0 ) {
		$content_popup.magnificPopup({
			type: 'inline',
			preloader: true,
			removalDelay: 400,
			mainClass: 'mfp-fade bg-team-exp'
		});
	}
	
	//POPUP - Video
	var $video_play = $('.video-play');
	if ($video_play.length > 0 ) {
		$video_play.magnificPopup({
			type: 'iframe',
			removalDelay: 160,
			preloader: true,
			fixedContentPos: false,
			callbacks: {
			beforeOpen: function() {
					this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
					this.st.mainClass = this.st.el.attr('data-effect');
				}
			},
		});
	}
	
	//ImageBG
	var $imageBG = $('.imagebg');
	if ($imageBG.length > 0) {
		$imageBG.each(function(){
			var $this = $(this), 
				$that = $this.parent(),
				overlay = $this.data('overlay'),
				image = $this.children('img').attr('src');
			var olaytyp = (typeof overlay!=='undefined' && overlay!=='') ? overlay.split('-') : false;
			
			// If image found
			if (typeof image!=='undefined' && image !==''){
				if (!$that.hasClass('has-bg-image')) {
					$that.addClass('has-bg-image');
				}
				if ( olaytyp!=='' && (olaytyp[0]==='dark') ) {
					if (!$that.hasClass('light')) {
						$that.addClass('light');
					}
				}
				$this.css("background-image", 'url("'+ image +'")').addClass('bg-image-loaded');
			}
		});
	}

	$('.image-popup-no-margins').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
      image: {
        verticalFit: true
      },
      zoom: {
        enabled: true,
        duration: 300 // don't foget to change the duration also in CSS
      }
    });
	// Mask Class add
	var $maskOV = $('[class*="mask-ov"]');
	if ($maskOV.length > 0) {
		$maskOV.each(function(){
			var $this = $(this), $that = $this.parent();
			if (!$that.hasClass('has-maskbg')) {
				$that.addClass('has-maskbg');
			}
		});
	}
	// Ajax Form Submission
	var contactForm = $('#contact-form'), subscribeForm = $('#subscribe-form');
	if (contactForm.length > 0 || subscribeForm.length > 0) {
		if( !$().validate || !$().ajaxSubmit ) {
			console.log('contactForm: jQuery Form or Form Validate not Defined.');
			return true;
		}
		// ContactForm
		if (contactForm.length > 0) {
			var selectRec = contactForm.find('select.required'), 
			qf_results = contactForm.find('.form-results');
			contactForm.validate({
			invalidHandler: function () { qf_results.slideUp(400); },
			submitHandler: function(form) {
				qf_results.slideUp(400);
				$(form).ajaxSubmit({
					target: qf_results, dataType: 'json',
					success: function(data) {
						var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
						qf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
						if (data.result !== 'error') { $(form).clearForm().find('.input-field').removeClass('input-focused'); }
					}
				});
				}
			});
			selectRec.on('change', function() { $(this).valid(); });
		}
		// SubscribeForm
		if (subscribeForm.length > 0) {
			var sf_results = subscribeForm.find('.subscribe-results');
			subscribeForm.validate({
			invalidHandler: function () { sf_results.slideUp(400); },
			submitHandler: function(form) {
				sf_results.slideUp(400);
				$(form).ajaxSubmit({
					target: sf_results, dataType: 'json',
					success: function(data) {
						var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
						sf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
						if (data.result !== 'error') { $(form).clearForm(); }
					}
				});
				}
			});
		}
	}
	
	// Input Animation
	var $inputline = $('.input-line');
	if ($inputline.length > 0) {
		$inputline.each(function(){
			var $this = $(this);
			var $thisval = $(this).val();
			if($thisval.length > 0) {
				$this.parent().addClass('input-focused');
			}
			$this.on('focus', function(){
				$this.parent().addClass('input-focused');
			});
			$this.on('blur', function(){
				$this.parent().removeClass('input-focused');
				var $afterblur = $(this).val();		
					if($afterblur.length > 0) {
					$this.parent().addClass('input-focused');
				}
			});
			
		});
	}
	
	// On Scroll Animation
	var $aniKey = $('.animated');
	if($().waypoint && $aniKey.length > 0){
		$win.on('load', function() {
			$aniKey.each(function(){
			var aniWay = $(this), typ = aniWay.data("animate"), dur = aniWay.data("duration"), dly = aniWay.data("delay");
			aniWay.waypoint(function(){
				aniWay.addClass("animated "+typ).css("visibility", "visible");
				if(dur){ 
					aniWay.css('animation-duration', dur+'s'); 
				}
				if(dly){ 
					aniWay.css('animation-delay', dly+'s'); 
				}
				}, { offset: '93%' });
			});
		});
	}
	
	// Preloader
	var $preload = $('#preloader'), $loader = $('#loader');
	if ($preload.length > 0) {
		$win.on('load', function() {
			$loader.fadeOut(300);
			$body_m.addClass("loaded");
			$preload.delay(700).fadeOut(300);
		});
	}
	
	/* @v1.2.0 */
	//Process Slider
	var slider_p = '.slider-pane', slider_n = '.slider-nav';
	if ($(slider_p).length > 0 ) {
		var c_rtl_s = ($body_m.hasClass('is-rtl')) ? true : false;
		$(slider_p).addClass('owl-carousel').owlCarousel({
		 	items:1,
			nav:false,
			dotsContainer:slider_n,
			margin:30,
			loop:true,
			autoplayTimeout:3000,
			rtl: c_rtl_s,
			autoplay:true,
			animateOut:'fadeOut',
			autoplayHoverPause:true
		});
	}
	
	// particlesJS
	var $particles_js = $('#particles-js');
	if ($particles_js.length > 0 ) {
		particlesJS('particles-js',
		// Update your personal code.
        {
		"particles": {
			"number": {
				"value": 50,
				"density": {
					"enable": true,
					"value_area": 800
				}
			},
			"color": {
				"value": "#00c0fa"
			},
			"shape": {
				"type": "circle",
				"opacity": 0.20,
				"stroke": {
					"width": 0,
					"color": "#2b56f5"
				},
				"polygon": {
					"nb_sides": 5
				},
				"image": {
					"src": "img/github.svg",
					"width": 100,
					"height": 100
				}
			},
			"opacity": {
				"value": 0.30,
				"random": false,
				"anim": {
					"enable": false,
					"speed": 1,
					"opacity_min": 0.12,
					"sync": false
				}
			},
			"size": {
				"value": 6,
				"random": true,
				"anim": {
					"enable": false,
					"speed": 40,
					"size_min": 0.08,
					"sync": false
				}
			},
			"line_linked": {
				"enable": true,
				"distance": 150,
				"color": "#2b56f5",
				"opacity": 0.50,
				"width": 1.3
			},
			"move": {
				"enable": true,
				"speed": 6,
				"direction": "none",
				"random": false,
				"straight": false,
				"out_mode": "out",
				"bounce": false,
				"attract": {
					"enable": false,
					"rotateX": 600,
					"rotateY": 1200
				}
			}
		},
		"interactivity": {
			"detect_on": "canvas",
			"events": {
				"onhover": {
					"enable": true,
					"mode": "repulse"
				},
				"onclick": {
					"enable": true,
					"mode": "push"
				},
				"resize": true
			},
			"modes": {
				"grab": {
				"distance": 400,
					"line_linked": {
						"opacity": 1
					}
				},
				"bubble": {
					"distance": 400,
					"size": 40,
					"duration": 2,
					"opacity": 8,
					"speed": 3
				},
				"repulse": {
					"distance": 200,
					"duration": 0.4
				},
				"push": {
					"particles_nb": 4
				},
				"remove": {
					"particles_nb": 2
				}
			}
		},
			"retina_detect": true
		}
		// Stop here.
      );
	}
	
})(jQuery);

//owl2row plugin
;(function ($, window, document, undefined) {
    Owl2row = function (scope) {
        this.owl = scope;
        this.owl.options = $.extend({}, Owl2row.Defaults, this.owl.options);
        //link callback events with owl carousel here

        this.handlers = {
            'initialize.owl.carousel': $.proxy(function (e) {
                if (this.owl.settings.owl2row) {
                    this.build2row(this);
                }
            }, this)
        };

        this.owl.$element.on(this.handlers);
    };

    Owl2row.Defaults = {
        owl2row: false,
        owl2rowTarget: 'item',
        owl2rowContainer: 'owl2row-item',
        owl2rowDirection: 'utd' // ltr
    };

    //mehtods:
    Owl2row.prototype.build2row = function(thisScope){
    
        var carousel = $(thisScope.owl.$element);
        var carouselItems = carousel.find('.' + thisScope.owl.options.owl2rowTarget);

        var aEvenElements = [];
        var aOddElements = [];

        $.each(carouselItems, function (index, item) {
            if ( index % 2 === 0 ) {
                aEvenElements.push(item);
            } else {
                aOddElements.push(item);
            }
        });

        carousel.empty();

        switch (thisScope.owl.options.owl2rowDirection) {
            case 'ltr':
                thisScope.leftToright(thisScope, carousel, carouselItems);
                break;

            default :
                thisScope.upTodown(thisScope, aEvenElements, aOddElements, carousel);
        }

    };

    Owl2row.prototype.leftToright = function(thisScope, carousel, carouselItems){

        var o2wContainerClass = thisScope.owl.options.owl2rowContainer;
        var owlMargin = thisScope.owl.options.margin;

        var carouselItemsLength = carouselItems.length;

        var firsArr = [];
        var secondArr = [];

        //console.log(carouselItemsLength);

        if (carouselItemsLength %2 === 1) {
            carouselItemsLength = ((carouselItemsLength - 1)/2) + 1;
        } else {
            carouselItemsLength = carouselItemsLength/2;
        }

        //console.log(carouselItemsLength);

        $.each(carouselItems, function (index, item) {


            if (index < carouselItemsLength) {
                firsArr.push(item);
            } else {
                secondArr.push(item);
            }
        });

        $.each(firsArr, function (index, item) {
            var rowContainer = $('<div class="' + o2wContainerClass + '"/>');

            var firstRowElement = firsArr[index];
                firstRowElement.style.marginBottom = owlMargin + 'px';

            rowContainer
                .append(firstRowElement)
                .append(secondArr[index]);

            carousel.append(rowContainer);
        });

    };

    Owl2row.prototype.upTodown = function(thisScope, aEvenElements, aOddElements, carousel){

        var o2wContainerClass = thisScope.owl.options.owl2rowContainer;
        var owlMargin = thisScope.owl.options.margin;

        $.each(aEvenElements, function (index, item) {

            var rowContainer = $('<div class="' + o2wContainerClass + '"/>');
            var evenElement = aEvenElements[index];

            evenElement.style.marginBottom = owlMargin + 'px';

            rowContainer
                .append(evenElement)
                .append(aOddElements[index]);

            carousel.append(rowContainer);
        });
    };

    /**
     * Destroys the plugin.
     */
    Owl2row.prototype.destroy = function() {
        var handler, property;

        for (handler in this.handlers) {
            this.owl.dom.$el.off(handler, this.handlers[handler]);
        }
        for (property in Object.getOwnPropertyNames(this)) {
            typeof this[property] !== 'function' && (this[property] = null);
        }
    };

    $.fn.owlCarousel.Constructor.Plugins['owl2row'] = Owl2row;
})( window.Zepto || window.jQuery, window,  document );
//end of owl2row plugin