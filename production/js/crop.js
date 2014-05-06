// BlaMaker profile image crop
// alex@visionbreeze.com

/* HTML structure
			
	<img id="bc-faded-image" src=""/>
	<div id="bc-crop-area">
		<img id="bc-croped-image" src=""/>
	</div>

*/

(function( $, window, document, undefined ) {
	var methods = {
		init: function( image, options ) {
			var self = this;
			
			self.reset();
			
			self.options = $.extend(false, $.fn.BlaCrop.options, options);
			
			self.fadedImage = image.clone().attr('id','bc-faded-image');
			self.cropedImage = image.clone().attr('id','bc-croped-image');
			self.cropArea = $('<div id="bc-crop-area"></div>');
			
			self.container = image.parent().css('cursor', 'move');
			self.orgImage = image.hide();
			
			self.ipos = {ratio: self.options.init_setup.ratio, oldRatio:0, fadedX: self.options.init_setup.initX, fadedY:self.options.init_setup.initY, cropedX:0, cropedY:0, moveX:0, moveY:0, centerX: (self.container.width() / 2), centerY: (self.container.height() / 2)};
			self.mouse = {startX:0, startY:0};
			
			self.result = {};
			
			self.disabled = false;
			self.block = $(self.options.block).hide();
			
			// build work area
			self.build();
			
			if(!this.exists){
				self.exists = true;
				
				// add handling
				self.handling();
			}
		},
		
		build: function(){
			var self = this;
			
			// faded image
			self.fadedImage.css({'position':'absolute'}).fadeTo(0, self.options.crop_alpha);
			self.container.append(self.fadedImage);
			
			// crop area
			self.cropArea.css({'position':'absolute', 
								'overflow': 'hidden',
								'width': self.options.area_width, 
								'height' : self.options.area_height,
								'border' : self.options.border});
			self.container.append(self.cropArea);
			self.center_crop_area();
			
			// croped image
			self.cropedImage.css({'position':'absolute', 'display': 'inherit'});
			self.cropArea.append(self.cropedImage);
			if(self.options.init_setup.ratio > 0){
				self.position();
				self.options.init_setup.ratio = 0;
				self.options.init_setup.initX = 0;
				self.options.init_setup.initY = 0;
			}else self.position('reset'); // if init_setup
			self.update_result();
		},
		
		center_crop_area: function(){
			var self = this,
				c_width = self.container.width(),
				c_height = self.container.height();
			
			self.cropArea
				.css('left', (c_width - self.options.area_width) / 2)
				.css('top', (c_height - self.options.area_height) / 2);
		},
		
		position: function(opt){
			var self = this,
				
				o_width = self.orgImage.width(),
				o_height = self.orgImage.height(),
				
				ca_x = parseInt(self.cropArea.css('left')) + 1, // 1 = border!!! NADO SDELAT!!!
				ca_y = parseInt(self.cropArea.css('top')) + 1,
				
				bottomLimit = 0,
				rightLimit = 0,
				
				speed = 0,
				ratio_change = 0;
				
			
			// CALCULATE POSITIONS
			if(opt === 'reset'){
				var c_width = self.container.width() - self.options.container_padding * 2;
				var c_height = self.container.height()- self.options.container_padding * 2;
				
				self.ipos.ratio = Math.max((c_width / o_width), (c_height / o_height));
				self.ipos.fadedX = ((c_width - self.ipos.ratio * o_width) / 2) + self.options.container_padding;
				self.ipos.fadedY = ((c_height - self.ipos.ratio * o_height) / 2) + self.options.container_padding;
				
			}else if(opt === 'move'){
				self.ipos.fadedX = self.ipos.moveX + self.ipos.startX;
				self.ipos.fadedY = self.ipos.moveY + self.ipos.startY;
			}else if(opt === 'zoom'){
				speed = self.options.zoom_anim_speed;
				
				if(self.ipos.ratio * o_width < self.options.area_width){
					self.ipos.ratio = self.options.area_width / o_width;
				}
				if(self.ipos.ratio * o_height < self.options.area_height){
					self.ipos.ratio = self.options.area_height / o_height;
				}
				
				ratio_change = self.ipos.ratio / self.ipos.oldRatio;
				
				self.ipos.fadedX = self.ipos.centerX - (self.ipos.centerX - self.ipos.fadedX) * ratio_change;
				self.ipos.fadedY = self.ipos.centerY - (self.ipos.centerY - self.ipos.fadedY) * ratio_change;
			}
			
			self.ipos.cropedX =  self.ipos.fadedX - ca_x;
			self.ipos.cropedY =  self.ipos.fadedY - ca_y;
			
			// CHECK FOR LIMITS
			if(self.ipos.cropedX > 0){ self.ipos.cropedX = 0; self.ipos.fadedX = ca_x;} // left limit
			if(self.ipos.cropedY > 0){ self.ipos.cropedY = 0; self.ipos.fadedY = ca_y;} // top limit
			
			rightLimit = -(self.ipos.ratio * o_width) + self.options.area_width;
			bottomLimit = -(self.ipos.ratio * o_height) + self.options.area_height;
			
			if(self.ipos.cropedX < rightLimit){ self.ipos.cropedX = rightLimit; self.ipos.fadedX = (ca_x + self.options.area_width) - (self.ipos.ratio * o_width);} // right limit
			if(self.ipos.cropedY < bottomLimit){ self.ipos.cropedY = bottomLimit; self.ipos.fadedY = (ca_y + self.options.area_height) - (self.ipos.ratio * o_height);} // bottom limit
			
			
			// SET ZOOM & POSITIONS
			var cal_width = self.ipos.ratio * o_width;
			var cal_height = self.ipos.ratio * o_height;
			
			self.fadedImage.animate({width: cal_width, height: cal_height, left: self.ipos.fadedX, top: self.ipos.fadedY},{queue:false, duration:speed});
			self.cropedImage.animate({width: cal_width, height: cal_height, left: self.ipos.cropedX, top: self.ipos.cropedY},{queue:false, duration:speed});
		},
		
		handling: function(){
			var self = this;
			
			// MOVE
			function startDrag(e){
				if(!self.disabled){
					self.mouse.startX = e.pageX;
					self.mouse.startY = e.pageY;
					self.ipos.startX = self.ipos.fadedX;
					self.ipos.startY = self.ipos.fadedY;
					
					$(document).on('mousemove', drag);
					$(document).on('mouseup', stopDrag);
				}
				
				e.preventDefault();
			}
			
			function drag(e){
				self.ipos.moveX = e.pageX - self.mouse.startX;
				self.ipos.moveY = e.pageY - self.mouse.startY;
				
				self.position('move');
				
				return false;
			}
			
			function stopDrag(e){
				self.update_result();
				
				$(document).off('mousemove', drag);
				$(document).off('mouseup', stopDrag);
			}
			
			self.container.on('mousedown', startDrag);
			
			// ZOOM
			function zoom(dir){
				if(!self.disabled){
					self.ipos.zoom_step = self.ipos.ratio / self.options.zoom_ratio;
					self.ipos.oldRatio = self.ipos.ratio;
					if(dir === 1){
						self.ipos.ratio += self.ipos.zoom_step;
					}else if(dir === -1){
						self.ipos.ratio -= self.ipos.zoom_step;
					}
					self.position('zoom');
					self.update_result();
				}
			}
			
			$(self.options.zoom_in_button).on('click', function(e){zoom(1); e.preventDefault();});
			$(self.options.zoom_out_button).on('click', function(e){zoom(-1); e.preventDefault();});
			$(self.container).on('mousewheel', function(e, delta){zoom(delta); e.preventDefault();});
			
			
			// SEND RESULTS
			$(self.options.save_button).on('click', function(e){ 
				if(!self.disabled) self.send_result(); 
				
				e.preventDefault();
			});
		},
		
		update_result:function(){
			var self = this;
			
			self.result.startX = -Math.round(self.ipos.cropedX / self.ipos.ratio);
			self.result.startY = -Math.round(self.ipos.cropedY / self.ipos.ratio);
			self.result.width = Math.round(self.options.area_width / self.ipos.ratio);
			self.result.height = Math.round(self.options.area_height / self.ipos.ratio);
			self.result.area_width = Math.round(self.options.area_width);
			self.result.area_height = Math.round(self.options.area_height);
			
			self.result.initX = Math.round(self.ipos.fadedX);
			self.result.initY = Math.round(self.ipos.fadedY);
			self.result.ratio = self.ipos.ratio;
		},
		
		send_result: function(){
			var self = this;
			
			self.disable();
			
			$.ajax({
				url:self.options.crop_result,
				type: 'POST',
				data: self.result,
				complete: function(){
					self.enable();
				},
				success: function(response){
					checkProfileForm();
				},
				error: function(){
					self.show_message(self.options.error_msg);
				}
			});
		},
		
		reset: function(){
			var self = this;
			if(self.exists){
				self.fadedImage.remove();
				self.cropedImage.remove();
				self.cropArea.remove();
			}
		},
		
		disable: function(){
			var self = this;
			
			self.container.css('cursor', 'default');
			self.disabled = true;
			self.block.show();
		},
		
		enable: function(){
			var self = this;
			
			self.container.css('cursor', 'move');
			self.disabled = false;
			self.block.hide();
		},
		
		show_message: function(msg, timeOut){
			var tm = (timeOut) ? timeOut: 0;
			$($.fn.BlaCrop.options.message).html('<i>' + msg + '</i>').fadeIn(200);
			if(tm) $($.fn.BlaCrop.options.message).delay(tm).fadeOut(200);
		},
		
		hide_message: function(){
			$($.fn.BlaCrop.options.message).fadeOut(200);
		}
		
	};




	$.fn.BlaCrop = function( options ) {
		if( typeof options === 'object' || !options){
			methods.init(this, options);
			return this;
		} else {
			$.error('Wrong arguments passed '+ options );
		}
	}
	
	$.fn.BlaCrop.enable = function(){
		methods.enable();
	}
	
	$.fn.BlaCrop.disable = function(){
		methods.disable();
	}
	
	$.fn.BlaCrop.showMessage = function(msg, timeOut){
		methods.show_message(msg, timeOut);
	}
	$.fn.BlaCrop.hideMessage = function(){
		methods.hide_message();
	}
	
	$.fn.BlaCrop.init = function(options){
		methods.options = $.extend(true, $.fn.BlaCrop.options, options);
	}
	$.fn.BlaCrop.reset = function(options){
		methods.reset();
	}

	$.fn.BlaCrop.options = {
		area_width: 150,
		area_height: 150,
		crop_alpha: 0.3,
		border: '#999999 1px dotted',
		container_padding: 0,
		zoom_anim_speed: 200,
		zoom_ratio: 10,
		crop_result: null,
		zoom_in_button: '#zoomin',
		zoom_out_button: '#zoomout',
		save_button: '#iu-save',
		block: '#iu-block',
		message: '#iu-message',
		error_msg: 'Error',
		init_setup: {ratio: 0, initX: 0, initY: 0}
	};

})( jQuery, window, document );
