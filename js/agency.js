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


$( document ).ready(function(){
    background_pool = ["./img/header-bg.jpg","./img/header-bg4.jpg"];
    var background_img = background_pool[Math.floor(Math.random() * background_pool.length)];
    $('header').css("background-image", "url("+background_img+")");  

    // Initial transitions    
    $('.profile-pic img').addClass("animated fadeInDown");
    $('.profile-pic ul i').addClass("animated zoomInDown");
    var delay = 1000;
    setTimeout(function() {
        $('.profile-pic img').removeClass("animated fadeInDown");
        $('.profile-pic ul i').removeClass("animated zoomInDown");
    }, delay);
});