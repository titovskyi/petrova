(function f() {
    $(document).ready(function () {
        let tempScrollTop, currentScrollTop = 0;
        let rocketBlock = $('.md-rocket');
        let rocketContainer = $('.md-rocket-container');
        let startsBtn = $('.on-start-rocket');
        let init = false;
        let startTimeout;
        let endTimeout;
        let checkInterval;

        startsBtn.on("click", function () {
            if (!rocketBlock.hasClass('on-start-animate') && startsBtn.parent().hasClass('active')) {
                onStart();
            } else if (rocketBlock.hasClass('on-start-animate') && !startsBtn.parent().hasClass('active')) {
                onEnd();
            }
        })

        function onStart() {
            clearTimeout(endTimeout);
            rocketBlock.removeClass('on-end-animate');
            rocketBlock.addClass('active');
            rocketBlock.addClass('on-start-animate');
            rocketContainer.removeClass('rotate-top');

            startTimeout = setTimeout(function () {
                rocketBlock.removeClass('active');
                init = true;

                runCheckInterval();
            }, 1500);
        }

        function onEnd() {
            clearTimeout(startTimeout);
            rocketBlock.addClass('active');
            rocketBlock.removeClass('on-start-animate');
            rocketBlock.addClass('on-end-animate');
            clearInterval(checkInterval);

            endTimeout = setTimeout(function () {
                rocketBlock.removeClass('active');
                init = false;
            }, 1500);
        }

        $('.app-container').mCustomScrollbar({
            theme: 'minimal',
            mouseWheelPixels: 100,
            scrollInertia: 0,
            callbacks: {
                whileScrolling: function() {
                    if (!rocketBlock.hasClass('active')) {
                        rocketBlock.addClass('active');
                    }

                    currentScrollTop = $('#app-container')[0].mcs.top;

                    if (tempScrollTop > currentScrollTop ) {
                        rocketContainer.removeClass('rotate-top');
                    } else if (tempScrollTop < currentScrollTop ) {
                        rocketContainer.addClass('rotate-top');
                    }

                    // if ($("html")[0].scrollHeight - $("html")[0].scrollTop === $("html")[0].clientHeight) {
                    //     rocketContainer.addClass('rotate-top');
                    // }

                    if (currentScrollTop === 0) {
                        rocketContainer.removeClass('rotate-top');
                    }

                    tempScrollTop = currentScrollTop;
                }
            }
        });

        // $(window).on("scroll", function() {
        //     if (!rocketBlock.hasClass('active')) {
        //         rocketBlock.addClass('active');
        //     }
        //
        //     currentScrollTop = $(window).scrollTop();
        //
        //     if (tempScrollTop < currentScrollTop ) {
        //         rocketContainer.removeClass('rotate-top');
        //     } else if (tempScrollTop > currentScrollTop ) {
        //         rocketContainer.addClass('rotate-top');
        //     }
        //
        //     // if ($("html")[0].scrollHeight - $("html")[0].scrollTop === $("html")[0].clientHeight) {
        //     //     rocketContainer.addClass('rotate-top');
        //     // }
        //
        //     if (currentScrollTop === 0) {
        //         rocketContainer.removeClass('rotate-top');
        //     }
        //
        //     tempScrollTop = currentScrollTop;
        // });

        function runCheckInterval() {
            checkInterval = setInterval(function () {
                if (rocketBlock.hasClass('active')) {
                    rocketBlock.removeClass('active');
                }
            }, 600);
        }
    })
})();
