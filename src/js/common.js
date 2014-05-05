$(document).ready(function() {
	$(".itogo").sticky({topSpacing:110});
	$('.js-zoomout').click(function(event) {
		n = parseInt($(".draggable").attr('data-zoom'));
		if(n>1 && n<10){
			n = n - 1;
			$(".draggable").removeClass('is-size1 is-size2 is-size3 is-size4 is-size5 is-size6 is-size7 is-size8 is-size9 is-size10')
			$(".draggable").addClass('is-size'+n);
			$(".draggable").attr('data-zoom', n);
		}
		return false;
	});
	$('.js-zoomin').click(function(event) {
		n = parseInt($(".draggable").attr('data-zoom'));
		if(n>1 && n<10){
			n = n + 1;
			$(".draggable").removeClass('is-size1 is-size2 is-size3 is-size4 is-size5 is-size6 is-size7 is-size8 is-size9 is-size10')
			$(".draggable").addClass('is-size'+n);
			$(".draggable").attr('data-zoom', n);
		}
		return false;
	});
	// $(window).scroll(function(event) {
	// 	ft = $('.itogo')[0].getBoundingClientRect().top;
	// 	if(ft>110){
	// 		$('.itogo').removeClass('is-fixed');
	// 	}
	// 	else{
	// 		$('.itogo').addClass('is-fixed');
	// 	}
	// });
	$('.draggable').draggable();
	$('.js-briefbtn').on('click', function() {
		$(this).toggleClass('is-active');
		$('.kitchenform').slideToggle('fast');
	});

	$('.js-glazingbead li').on('click', function() {
		$('.js-glazingbead li').removeClass('is-active');
		$(this).addClass('is-active');
	});

	$('.js-sliderbox').each(function(){
		var p = this.parentNode;

		$(this).cycle({
			fx: "fade",
			timeout:  0,
			carouselVisible: 1,
			slideActiveClass: "is-active",
			pagerActiveClass: "is-active",
			disabledClass: "is-disabled",
			slideClass: "sliderbox__slide",
			allowWrap: "false",
			carouselFluid: "true",
			slides: $('.sliderbox__slide', p),
			prev:   $('.sliderbox__prev', p),
			next:   $('.sliderbox__next', p),
		});

	});

	// $('.icon-zoom').on('click', function() {
	// 	$('.popup').addClass('is-open');
	// });
	$('.popup__close').parent().removeClass('is-open');
	// $('.popup__close').on('click', function() {
	// 	$(this).parent().removeClass('is-open');
	// });


	$('.js-newsloader').on('click', function() {
		$(this).parent().find('.item').removeClass('is-preload');
		return false;
	});

	$('.js-contact-form').on('click', function() {
		$(this).parent().find('.contact__form').addClass('is-open');
		$(this).remove();
		$('#mapframe').height($('.content').height());
		return false;
	});

	$('.js-subscribe').on('click', function() {
		$(this).parent().find('.subscribe__form').toggle("slide", { direction: "left" }, 300);
	});

	$('.js-teaser-slider').cycle({
		fx: "scrollHorz",
		timeout: 2000,
		log: false,
		slideActiveClass: "is-active",
		pagerActiveClass: "is-active",
		disabledClass: "is-disabled",
		slideClass: "teaser__slider-item",
		// allowWrap: "true",
		pager: ".teaser__pager",
		pagerTemplate: "<span>•</span>",
		slides: ".teaser__slide",
	});

	function formBlocks() {
		$('.js-params input').on('click', function() {
			if ($(this).parent().parent().hasClass('is-active')) {
				$(this).parent().parent().removeClass('is-active');
			}
			else {
				$(this).parent().parent().parent().find('.js-params').removeClass('is-active');
				$(this).parent().parent().addClass('is-active');
			}
		});
	} formBlocks();

	function navRequest() {
		$('.js-request').on('click', function() {
			$(this).parent().toggleClass('is-active');
			// $(this).parent().find('.request__dropdown').slideDown('fast');
		});
	} navRequest();


	function request() {
		$('.js-request-trigger').on('click', function() {
			$(this).parent()
				.find('.b-request__content')
					.addClass('is-open');
			$(this).remove();
			return false;
		});
	} request();

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
			if ($(this).parent('li').children('ul').hasClass('sidenav__sub')){
				$('.js-sidenav').children('li').removeClass('is-active');
				$(this).parent().addClass('is-active');
			}
		});
		// return false;
	} sideAccord();
	
	function sideAccordPort() {
		$('.js-sidenav .sidenav__head').on('click', function() {
			var selected_id = $(this).attr('attr-id');
			$("html, body").animate({ scrollTop: ($("#"+selected_id).offset().top-68) }, 1000);
			$('.js-sidenav').children('li').removeClass('is-active');
			$(this).parent().addClass('is-active');
		});
		// return false;
	} sideAccordPort();

	function searchSuggest() {
		var el = $('.js-searchsuggest'),
				el_drop = ('.search__dropdown');

		$("#s").on('keyup', function(e) {
			
			var data = {
				action: 'search_auto',
				str: $(this).val()
			};
			
			var ajaxurl = $("#ajax_path").val();
			
			if ($(this).val().length > 2){
				$("#search_results_loader").show();
				el.find(el_drop).addClass('is-open').slideDown('fast');
				jQuery.post(ajaxurl, data, function(response) {
					if (response){
						$("#search_results").html('').html(response);
						el.find(el_drop).addClass('is-open').slideDown('fast');
					}else{
						el.find( el_drop ).removeClass('is-open').slideUp('fast');
					}
					$("#search_results_loader").hide();
				});
			}else{
				$("#search_results").html('');
				el.find( el_drop ).removeClass('is-open').slideUp('fast');
				$("#search_results_loader").hide();
			}
			
			
		});

		//click document
		$(document).click(function(event) {
			if($(event.target).parents().index( el ) == -1) {
				el.find( el_drop ).removeClass('is-open').slideUp('fast');
			}
		});
	} searchSuggest();

	//select
	function select() {
		var el = $('.js-select');
		var el_title = el.children("span");
		var item = el.find('li');
		var input = el.find(".js-select-input");
		var el_text = el.find(".js-select-text");
		var checkbox = el.find(".checkbox");
		var list = el.find('.js-select-drop');
		el_title.click(function(event){
			if ($(this).parent().hasClass('is-open')) {
				$(this).parent().removeClass('is-open');
			}
			else {
				el.removeClass('is-open');
				$(this).parent().addClass('is-open');
			}
			event.stopPropagation();
		});
		checkbox.click(function(event){
			event.stopPropagation();
		});
		item.bind("click",function(){
			item.removeClass("is-selected");
			$(this).addClass("is-selected");
			var text = $(this).text();
			var id = $(this).attr("data-id");
			$(this).parents(".js-select").find(".js-select-text").text(text);
			$(this).parents(".js-select").find(".js-select-input").val(id);
		});
	} select();

	//click document
	$(document).click(function() {
		$('.js-select').removeClass('is-open');
	});

	//scroll document
	$(window).scroll(function() {
		if ($('.js-navbar').length) {
			fixNavbar();
		}
		parallax();
		posSidebar();

	});

	//resize document
	$(window).resize(function() {
		posSidebar();
	});
	
	$('.request__dropdown').find('form').submit(function(){ // Andrei added
		// get all files and save to hidden field
		var file_urls = '';
		$(".download_div").each(function(index, element) {
			var c_url = $(this).children("div").children('a').attr('href');
           	file_urls += c_url+'&nbsp;<br>';
        });
		$("#uploaded_files").val(file_urls);
	});
	
$('.fancybox').fancybox();

$(".controls__aspect").click(function(event) {
	$(this).toggleClass('is-checked');
});

});

function clearFields(form_el){
	
	$(form_el).find('input[type=text]').each(function(index, element) {
        $(this).val('');
    });
	$(form_el).find('input[type=tel]').each(function(index, element) {
        $(this).val('');
    });
	$(form_el).find('input[type=email]').each(function(index, element) {
        $(this).val('');
    });
	$(form_el).find('textarea').each(function(index, element) {
        $(this).val('');
    });
	
	$(".download_div").each(function(index, element) {
		$(this).remove();
	});
}
