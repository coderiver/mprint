$(document).ready(function() {

	function parallax() {
		var scrolled = $(window).scrollTop();
		$('.bg').css('top',-(scrolled*0.02)+'px');
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
	});

	// skrollr.init({
	//	forceHeight: false
	// });

});
