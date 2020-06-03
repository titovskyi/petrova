$(document).ready(function () {
    $('.app-container').mCustomScrollbar({
        theme: 'minimal',
        mouseWheelPixels: 100,
        scrollInertia: 0
    });

    // ########################################

    $('.blog-card-slider').slick({
        dots: true,
        arrows: true,
        // prevArrow: '.blog-card-slider__arrow_prev',
        // nextArrow: '.blog-card-slider__arrow_next',
        // appendDots: '.blog-card-slider__dots',
        adaptiveHeight: true,
        centerPadding: '19px'
    });

    // ########################################

    filterChange();

    addPlayStopActins();

    addCollapseEvent();

    // ########################################

    function filterChange() {
        $('#filter-mobile').on('click', '.filter-mobile__item_show', function () {
            $(this).closest('ul').children('.filter-mobile__item_hidden').toggle();
        });

        let allOptions = $('#filter-mobile').children('.filter-mobile__item_hidden');
        $('#filter-mobile').on('click', '.filter-mobile__item_hidden', function () {
            allOptions.removeClass('selected');
            $(this).addClass('selected');
            $('#filter-mobile').children('.filter-mobile__item_show').html($(this).html());
            allOptions.toggle();
        });
    }

    // ########################################

    function addPlayStopActins() {
        const players = $('.blog-card-video');

        for (let i = 0; players.length > i; i++) {
            const video = $(players[i]).children()[0];
            const playButton = $(players[i]).children()[1];

            onPlayButtonClick(video, playButton);
            onVideoClick(video, playButton);
        }
    }

    function onPlayButtonClick(video, button) {
        button.addEventListener('click', function () {
            if (video.paused === true) {
                button.style.display = 'none';
                video.play();
            }
        });
    }

    function onVideoClick(video, button) {
        video.addEventListener('click', function () {
            if (video.paused === true) {
                button.style.display = 'none';
                video.play();
            } else {
                button.style.display = 'block';
                video.pause();
            }
        });
    }

    // ########################################

    function addCollapseEvent () {
        const textBlocks = $('.blog-card__info-wrapper');
        for (let i = 0; textBlocks.length > i; i++) {
            const currentTextBlock = $(textBlocks[i]);

            if(currentTextBlock.height() > 66) {
                $(currentTextBlock).addClass('blog-card__info-less');
                onCollapse(currentTextBlock[0]);
            } else {
                $(currentTextBlock).children().eq(1).hide();
                $(currentTextBlock).children().eq(2).hide();
            }
        }
    }

    function onCollapse(textBlock) {
        textBlock.addEventListener('click', function() {
            textBlock.classList.forEach((className) => {
                if(className === 'blog-card__info-less') {
                    $(textBlock).removeClass('blog-card__info-less');
                    $(textBlock).children().eq(1).hide();
                } else {
                    $(textBlock).addClass('blog-card__info-less');
                    $(textBlock).children().eq(1).show();
                }
            })
        })
    }

    // ########################################

    (function () {
        const viberLinks = document.getElementsByClassName('viber-link');
        const tgLinks = document.getElementsByClassName('tg-link');
        const instaLinks = document.getElementsByClassName('insta-link');
        const facebookLinks = document.getElementsByClassName('facebook-link');
        const linkedInLinks = document.getElementsByClassName('linkedin-link');

        for(let i = 0; viberLinks.length > i; i++) {
            viberLinks[i].addEventListener('click', () => {
                viberLink();
            });
        }

        for(let i = 0; tgLinks.length > i; i++) {
            tgLinks[i].addEventListener('click', () => {
                tgLink();
            });
        }

        for(let i = 0; instaLinks.length > i; i++) {
            instaLinks[i].addEventListener('click', () => {
                instaLink();
            });
        }

        for(let i = 0; facebookLinks.length > i; i++) {
            facebookLinks[i].addEventListener('click', () => {
                facebookLink();
            });
        }

        for(let i = 0; linkedInLinks.length > i; i++) {
            linkedInLinks[i].addEventListener('click', () => {
                linkedInLink();
            });
        }

    })();

    function viberLink() {
        const system = getMobileOperatingSystem();

        if (system === 'unknown') {
            window.location = 'viber://chat?number=+380986088008';
        } else {
            window.open('viber://add?number=380986088008', '_blank');
        }
    };

    function tgLink() {
        const system = getMobileOperatingSystem();

        if (system === 'unknown') {
            window.open('https://t.me/m2e_team', '_blank');
        } else {
            window.open('tg://resolve?domain=m2e_team', '_blank');
        }
    };

    function instaLink() {
        const system = getMobileOperatingSystem();

        if (system === 'unknown') {
            window.open('http://instagram.com/_u/m2e_team/', '_blank');
        } else {
            window.open('instagram://user?username=m2e_team', '_blank');
        }
    };

    function facebookLink() {
        const system = getMobileOperatingSystem();

        if (system === 'unknown') {
            window.open('https://www.facebook.com//m2eteam/', '_blank');
        } else {
            window.open('fb://profile/m2e_team', '_blank');
        }
    };

    function linkedInLink() {
        const system = getMobileOperatingSystem();

        if (system === 'unknown') {
            window.open('https://www.linkedin.com/company/m2ecompany', '_blank');
        } else {
            window.open('linkedin://company/m2e_team', '_blank');
        }
    };

    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return 'Windows Phone';
        }

        if (/android/i.test(userAgent)) {
            return 'Android';
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return 'iOS';
        }
        return 'unknown';
    };

    // ########################################

    (function () {
        let sliders = $('.slick-track');

        sliders.each(function(index, slider) {
            if($(slider).children().length === 1) {
                $(this).closest('.blog-slider').addClass('remove-dots');
            }
        })
    })()

    // ########################################
});
