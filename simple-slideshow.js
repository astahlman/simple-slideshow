(function ($) {

	function init(options) {

		var settings = $.extend({
			interval : 3000,
			maxStretchFactor : 2.5,
		}, options);

		return this.each(function() {
			var $frame = $(this);
			var data = $frame.data('simple-slideshow');
			if (!data) {
				$frame.data('simple-slideshow', {
					interval : settings.interval,
					images : $frame.children("img"),
					current : 0,
					count : $frame.children("img").length,
					$timer : $.timer(function() {
						transition.call($frame, 1);
					}),
				});
				data = $frame.data('simple-slideshow');
			}
			data.images.each(function() {
				var $img = $(this);
				var imgWidth = $img.width();
				var imgHeight = $img.height();
				var wRatio = $frame.width() / imgWidth;
				var hRatio = $frame.height() / imgHeight;
				var multiplier = Math.min(wRatio, hRatio, settings.maxStretchFactor);
				$img.width(multiplier * imgWidth);
				// NOTE: jQuery seems to preserve aspect ratio automagically...
				$img.height(multiplier * imgHeight);
				// Center vertically and horizontally
				$img.css('margin-left', $img.width() / -2);
				$img.css('margin-top', $img.height() / -2);
			});

			data.images.first().addClass('simple-slideshow-slide-visible');
			data.$timer.set({
					time : settings.interval,
					autostart : true,
			});
		});
	}

	function transition(step) {
		return this.each(function() {
			var $frame = $(this);
			var data = $frame.data('simple-slideshow');
			var $currentImg = $(data.images.get(data.current));
			$currentImg.toggleClass('simple-slideshow-slide-visible');
			data.current = (data.current + step) % data.count;
			$currentImg = $(data.images.get(data.current));
			$currentImg.toggleClass('simple-slideshow-slide-visible');
		});
	}

	var methods = {
		init : init,
		nextSlide: function() {
			transition.call(this, 1);
		},
		prevSlide: function() {
			transition.call(this, -1);
		},
		transition: transition,
	};

	$.fn.simpleSlideshow = function(method) {
		if (methods[method]) {
		  return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if (typeof method === 'object' || !method) {
		  return methods.init.apply( this, arguments );
		} else {
		  $.error('Method ' +  method + ' does not exist on jQuery.simpleSlideshow');
		}
	};
})(jQuery);
