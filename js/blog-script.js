$(document).ready(function () {
    $('.blog-card-slider').slick({
        dots: true,
        arrows: true,
        prevArrow: '.blog-card-slider__arrow_prev',
        nextArrow: '.blog-card-slider__arrow_next',
        appendDots: '.blog-card-slider__dots',
        adaptiveHeight: true,
        centerPadding: '19px'
    });

    filterChange();

    addPlayStopActins();

    addCollapseEvent();

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

    function addExpandEvent() {
        const textBlocks = $('.blog-card__info-wrapper');

        for (let i = 0; textBlocks.length > i; i++) {
            const currentTextBlock = $(textBlocks[i]);

            onExpand(currentTextBlock[0]);
        }
    }

    function addCollapseEvent () {
        const textBlocks = $('.blog-card__info-wrapper');
        for (let i = 0; textBlocks.length > i; i++) {
            const currentTextBlock = $(textBlocks[i]);

            onCollapse(currentTextBlock[0]);
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

    function onExpand(textBlock) {

        console.log($(textBlock));
        textBlock.addEventListener('click', function () {
            $(textBlock).css('height', 'auto');
            $(textBlock).children()[1].hide();
            console.log();

            // onCollapse(textBlock);
        });

        // $(textBlock)
        //     .children()[1]
        //     .addEventListener('click', function () {
        //         $(this).hide();
        //         $(textBlock).css('height', 'auto');
        //     });
    }

    // function onCollapse(textBlock) {
    //     // const moreButton = $(textBlock.children()[1]);
    //     textBlock.removeEventListener('click', function () {
    //         // $(textBlock).children()[1].show();
    //
    //         $(textBlock).css('height', '70px');
    //     });
    //     textBlock.addEventListener('click', function () {
    //         // $(textBlock).children()[1].show();
    //
    //         $(textBlock).css('height', '70px');
    //     });
    //
    //     // $(textBlock)
    //     //     .children()[2]
    //     //     .addEventListener('click', function () {
    //     //         moreButton.show();
    //     //         textBlock.css('height', '70px');
    //     //     });
    // }
});
