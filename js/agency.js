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

// To detect visibility
;(function(e){e.fn.visible=function(t,n,r){var i=e(this).eq(0),s=i.get(0),o=e(window),u=o.scrollTop(),a=u+o.height(),f=o.scrollLeft(),l=f+o.width(),c=i.offset().top,h=c+i.height(),p=i.offset().left,d=p+i.width(),v=t===true?h:c,m=t===true?c:h,g=t===true?d:p,y=t===true?p:d,b=n===true?s.offsetWidth*s.offsetHeight:true,r=r?r:"both";if(r==="both")return!!b&&m<=a&&v>=u&&y<=l&&g>=f;else if(r==="vertical")return!!b&&m<=a&&v>=u;else if(r==="horizontal")return!!b&&y<=l&&g>=f}})(jQuery);


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
           
    $('.timeline .timeline-image').waypoint(function(){
        $(this).toggleClass('active');
        $(this).toggleClass('animated bounceIn');
    },{offset:'90%'});

    $('.timeline li:not(.timeline-inverted) .timeline-panel').waypoint(function(){
        $(this).toggleClass('active');
        $(this).toggleClass('animated bounceInLeft');
    },{offset:'90%'});

    $('.timeline-inverted .timeline-panel').waypoint(function(){
        $(this).toggleClass('active');
        $(this).toggleClass('animated bounceInRight');
    },{offset:'90%'});
});



    

