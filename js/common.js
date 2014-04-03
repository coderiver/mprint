$(document).ready(function() {

	function parallax() {
		var scrolled = $(window).scrollTop();
		$('#parallax-bg').css('top',-(scrolled*0.08)+'px');
	}

	function fixNavbar() {
		var el = $('.js-navbar'),
				el_top = ($('.page').offset().top),
				el_bottom = ($('.page').offset().top);

		if($(window).scrollTop() > el_top){
				el.addClass('is-fixed');
		}
		if($(window).scrollTop() < el_bottom){
			el.removeClass('is-fixed');
		}
	}

	function workLoad() {
		$('.has-loadbtn').on('click', function() {
			$(this).siblings().removeClass('is-preload');
			$(this).siblings().removeClass('is-hidden');
			$(this).remove();
			return false;
		});
	} workLoad();

	function posSidebar() {

		var el = $('.js-sidebar'),
				el_top = ($('.page').offset().top),
				el_bottom = ($('.page').offset().top),
				// top = $('.js-navbar').outerHeight(),
				rt = ($(window).width() - ($('.page').offset().left + $('.page').outerWidth()));
				el_height = $('.js-sidebar').outerHeight();

		$('.has-fixedsidebar .l-main').css("min-height", el_height);

		if($(window).scrollTop() > el_top){
				el.addClass('is-fixed');
				el.css({"right": rt});
		}
		if($(window).scrollTop() < el_bottom){
			el.removeClass('is-fixed');
			el.css({"right": "auto"});
		}
	} posSidebar();

	function sideAccord() {
		$('.js-sidenav .sidenav__head').on('click', function() {
			// alert('gogogo');
			$('.js-sidenav').children('li').removeClass('is-active');
			$(this).parent().addClass('is-active');
		});
		// return false;
	} sideAccord();

	function searchSuggest() {
		var el = $('.js-searchsuggest'),
				el_drop = ('.search__dropdown');

		el.on('click', function() {
			$(this).find(el_drop).addClass('is-open').slideDown('fast');
		});

		//click document
		$(document).click(function(event) {
			if($(event.target).parents().index( el ) == -1) {
				el.find( el_drop ).removeClass('is-open').slideUp('fast');
			}
		});
	} searchSuggest();

	$(window).scroll(function() {
		if ($('.js-navbar').length) {
			fixNavbar();
		}
		parallax();
		posSidebar();

	});
	$(window).resize(function() {
		posSidebar();
	});

	// skrollr.init({
	//	forceHeight: false
	// });

});
