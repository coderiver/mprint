$(document).ready(function() {

if($('html').hasClass('touch')){
	$('.preview').each(function() {
		$(this).append('<div class="touch-overlay"></div>');
	});
	$('.preview').on('click', function() {
		if($(this).hasClass('is-clicked')){
			$('.preview').removeClass('is-clicked');
			$(this).removeClass('is-clicked');
		}
		else{
			$('.preview').removeClass('is-clicked');
			$(this).addClass('is-clicked');
		}
	});
}


if($('.k').length>0){

	function preload(arrayOfImages) {
		$(arrayOfImages).each(function(index){
				$('<img />')
				.attr('src', arrayOfImages[index])
				.load(function(){
						$('div.preload').append( $(this) );
						// Your other custom code
				});
		});
		//alert("Done Preloading...");
		$('.k__preload').fadeOut('slow');
}

// Usage:

preload([
		'img/k1-beige.png',
	'img/k1-black.png',
	'img/k1-white.png',
	'img/k1-wood.png',
	'img/k1r-beige.png',
	'img/k1r-black.png',
	'img/k1r-white.png',
	'img/k1r-wood.png',
	'img/k2-beige.png',
	'img/k2-black.png',
	'img/k2-color1.png',
	'img/k2-color2.png',
	'img/k2-white.png',
	'img/k2-wood.png',
	'img/k2.png',
	'img/k3-beige.png',
	'img/k3-black.png',
	'img/k3-white.png',
	'img/k3-wood.png',
	'img/k3r-beige.png',
	'img/k3r-black.png',
	'img/k3r-white.png',
	'img/k3r-wood.png',
	'img/kitchenbg.jpg'
]);

}




	$('.scroll-pane').jScrollPane({
		autoReinitialise: true
	});
	$('.controls__aspect').click(function(event) {
		$('.k__proportions').toggle();
	});

	$('.footer__social-title a').on('click', function() {
		$(this).parent().find('.footer__subscribe').toggleClass('is-active');
		return false;
	});

	$('.controls__colorwrap div').click(function(event) {
		$('.controls__colorwrap div').removeClass('is-active');
		val = $(this).attr('data-class');
		$(this).addClass('is-active')
		$('.k__content').removeClass('c1 c2 c3 c4').addClass(val);
	});
	$('.k__rotate').click(function(event) {
		$('.k__content').toggleClass('is-rotated');
	});

	$("#wall").one('load', function(){
		$(this).show().BlaCrop({
			area_width: 602, 
			area_height: 142,
			crop_result: "/user_image_resize.php",
			error_msg: 'Error',
			zoom_in_button: '#zoomin',
			zoom_out_button: '#zoomout',
			save_button: '#iu-save-pr',
			block: '#iu-block-pr',
			message: '#iu-message-pr'
		});
	}).attr('src', 'http://placekitten.com/800/800');
	$('.controls__type div').click(function(event) {
		val = $(this).attr('data-type');
		$(this).siblings().removeClass('is-active');
		$(this).addClass('is-active');
		$('.k__content').removeClass('k1 k2 k3 is-rotated').addClass('k'+val);
		$('#bc-crop-area,#bc-faded-image').remove();
		$('#wall').attr('src', '');
		 if(val=='2'){
			//alert('go1')
			$("#wall").one('load', function(){
				$(this).show().BlaCrop({
					area_width: 602, 
					area_height: 142,
					crop_result: "/user_image_resize.php",
					error_msg: 'Error',
					zoom_in_button: '#zoomin',
					zoom_out_button: '#zoomout',
					save_button: '#iu-save-pr',
					block: '#iu-block-pr',
					message: '#iu-message-pr'
				});
			}).attr('src', 'http://placekitten.com/800/800');
		 }
		else{
			//alert('go2');
			$("#wall").one('load', function(){
				$(this).show().BlaCrop({
					area_width: 638,
					area_height: 165,
					crop_result: "/user_image_resize.php",
					error_msg: 'Error',
					zoom_in_button: '#zoomin',
					zoom_out_button: '#zoomout',
					save_button: '#iu-save-pr',
					block: '#iu-block-pr',
					message: '#iu-message-pr'
				});
			}).attr('src', 'http://placekitten.com/800/800');
		}
		
	});
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
	if(!iOS){
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
	}

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
	//var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
	var iOS = 'ontouchstart' in document.documentElement;
	//scroll document
	$(window).scroll(function() {
		if ($('.js-navbar').length && !iOS) {
			fixNavbar();
		}
		parallax();
		if(!iOS){posSidebar();}

	});
	if(iOS){
		//$('.element').on('tap', onTapHandler);
		$('.has-dropdown').on('click', function(){

			if($(this).hasClass('is-touched')){
				$(this).toggleClass('is-touched');
			}
			else{
				$(this).toggleClass('is-touched');
				return false;
			}
			//alert('a');
		});
		$('.dropdown li').on('click', function(){

			if($(this).hasClass('is-touched2')){
				$(this).toggleClass('is-touched2');
			}
			else{
				$(this).toggleClass('is-touched2');
				return false;
			}
			//alert('a');
		});

	}
	
	//resize document
	$(window).resize(function() {
		if(!iOS) {posSidebar();}
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

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	  $('body').addClass('mobile-device');
	};

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

!function(a,b){"use strict";var c,d,e,f="._tap",g="._tapActive",h="tap",i="clientX clientY screenX screenY pageX pageY".split(" "),j={count:0,event:0},k=function(a,c){var d=c.originalEvent,e=b.Event(d);e.type=a;for(var f=0,g=i.length;g>f;f++)e[i[f]]=c[i[f]];return e},l=function(a){if(a.isTrigger)return!1;var c=j.event,d=Math.abs(a.pageX-c.pageX),e=Math.abs(a.pageY-c.pageY),f=Math.max(d,e);return a.timeStamp-c.timeStamp<b.tap.TIME_DELTA&&f<b.tap.POSITION_DELTA&&(!c.touches||1===j.count)&&o.isTracking},m=function(a){if(!e)return!1;var c=Math.abs(a.pageX-e.pageX),d=Math.abs(a.pageY-e.pageY),f=Math.max(c,d);return Math.abs(a.timeStamp-e.timeStamp)<750&&f<b.tap.POSITION_DELTA},n=function(a){if(0===a.type.indexOf("touch")){a.touches=a.originalEvent.changedTouches;for(var b=a.touches[0],c=0,d=i.length;d>c;c++)a[i[c]]=b[i[c]]}a.timeStamp=Date.now?Date.now():+new Date},o={isEnabled:!1,isTracking:!1,enable:function(){o.isEnabled||(o.isEnabled=!0,c=b(a.body).on("touchstart"+f,o.onStart).on("mousedown"+f,o.onStart).on("click"+f,o.onClick))},disable:function(){o.isEnabled&&(o.isEnabled=!1,c.off(f))},onStart:function(a){a.isTrigger||(n(a),(!b.tap.LEFT_BUTTON_ONLY||a.touches||1===a.which)&&(a.touches&&(j.count=a.touches.length),o.isTracking||(a.touches||!m(a))&&(o.isTracking=!0,j.event=a,a.touches?(e=a,c.on("touchend"+f+g,o.onEnd).on("touchcancel"+f+g,o.onCancel)):c.on("mouseup"+f+g,o.onEnd))))},onEnd:function(a){var c;a.isTrigger||(n(a),l(a)&&(c=k(h,a),d=c,b(j.event.target).trigger(c)),o.onCancel(a))},onCancel:function(a){a&&"touchcancel"===a.type&&a.preventDefault(),o.isTracking=!1,c.off(g)},onClick:function(a){return!a.isTrigger&&d&&d.isDefaultPrevented()&&d.target===a.target&&d.pageX===a.pageX&&d.pageY===a.pageY&&a.timeStamp-d.timeStamp<750?(d=null,!1):void 0}};b(a).ready(o.enable),b.tap={POSITION_DELTA:10,TIME_DELTA:400,LEFT_BUTTON_ONLY:!0}}(document,jQuery);
