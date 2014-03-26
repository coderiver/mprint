$(document).ready(function() {

	function fixedSidenav() {
		var top = ($('.page').offset().top - 20);
		var bottom = ($('.page').offset().top - 20);

		if($(window).scrollTop() > top){
				$(".js-navbar").addClass('is-fixed');
		}
		if($(window).scrollTop() < bottom){
			$(".js-navbar").removeClass('is-fixed');
		}
	}

	$(window).scroll(function() {
			if ($('.js-navbar').length) {
				fixedSidenav();
			}
		});

});