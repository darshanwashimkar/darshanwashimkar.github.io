/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});


// Sharing icon animation
$('.profile-pic .fa').mouseover(function(){
    $(this).addClass("animated tada");
});

$('.profile-pic .fa').mouseout(function(){
    $(this).removeClass("animated tada");
});

// Initial transitions
$( document ).ready(function(){
    $('.profile-pic img').addClass("animated slideInDown");
    $('.profile-pic .fa').addClass("animated zoomInDown");
    var delay = 1000;
    setTimeout(function() {
        $('.profile-pic img').removeClass("animated slideInDown");
        $('.profile-pic .fa').removeClass("animated zoomInDown");
    }, delay);
});