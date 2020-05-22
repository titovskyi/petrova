$(document).ready(function() {
    // ########################################

    $('.lead-slider').slick({
        centerMode: true,
        centerPadding: '10%',
        slidesToShow: 3,
        infinite: true,
        arrows: false,
        focusOnSelect:true,
        asNavFor: '.nav-slider'
    });
    $('.nav-slider').slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.lead-slider',
        focusOnSelect: true,
        infinite: true,
        prevArrow: '.prev-arrow',
        nextArrow: '.next-arrow'
    });

    // ########################################

    $('.mobile-slider').slick({
        dots: true,
        arrows: false,
        infinite: true,
        appendDots: '.mobile-slider__dots',
        adaptiveHeight: true
    });

    // ########################################
});
