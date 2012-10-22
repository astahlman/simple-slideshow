simple-slideshow
================

jQuery plugin to transform a &lt;div> containing images into a slideshow with fade transitions.

example.html demonstrates the functionality of the plugin. Simply add the CSS class 'simple-slideshow-slide' to a div full of <img>'s marked with the 'simple-slideshow-slide' class. Then on $(window).load call simpleSlideshow() and pass it an object filled with optional configuration settings.

*	interval: in milliseconds, the time between transitions
*	maxStretchFactor: the maximum multiplier that an image will be stretched to fill the screen.

Images are automatically resized to the maximum possible size while still preserving their aspect ratio. The size is limited by the size of the frame div or the maxStretchFactor, whichever is more prohibitive. 
