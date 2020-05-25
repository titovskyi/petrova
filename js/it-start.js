$(document).ready(function () {
    // ########################################

    setInitState();

    chooserChange();

    // ########################################

    function setInitState() {
        const chooseButtons = $('.start-direction__button');
        const allRows = chooseButtons.parents('.position').children();

        $('.it-start__button').attr('disabled', true);
        $('.button__hint').show();

        for (let i = 0; chooseButtons.length > i; i++) {
            $(chooseButtons[i]).on('click', function () {
                findRowChildren(allRows, i);
            });
        }
    }

    function findRowChildren(allRows, buttonIndex) {
        for (let i = 0; allRows.length > i; i++) {
            const rowChildren = $(allRows[i]).children();

            highlightChild(rowChildren, buttonIndex);
        }
    }

    function highlightChild(rowChildren, columnIndex) {
        for (let i = 0; rowChildren.length > i; i++) {
            if (i === columnIndex) {
                $(rowChildren[i]).toggleClass('active');

                if($(rowChildren[i]).hasClass('active')) {
                    $('.it-start__button').attr('disabled', false);
                    $('.button__hint').hide();
                } else {
                    $('.it-start__button').attr('disabled', true);
                    $('.button__hint').show();
                }
            } else {
                $(rowChildren[i]).removeClass('active');
            }
        }

    }

    // ########################################

    function chooserChange() {
        $('.mobile-position-card').hide();
        $('.it-start__button_mobile').hide();

        $('#it-start-mobile__chooser').on('click', '.it-start-mobile__chooser-item_show', function () {
            $(this).closest('ul').children('.it-start-mobile__chooser-item_hidden').toggle();
        });

        let allOptions = $('#it-start-mobile__chooser').children('.it-start-mobile__chooser-item_hidden');
        $('#it-start-mobile__chooser').on('click', '.it-start-mobile__chooser-item_hidden', function () {
            allOptions.removeClass('selected');
            $(this).addClass('selected');
            $('#it-start-mobile__chooser').children('.it-start-mobile__chooser-item_show').html($(this).html());
            allOptions.toggle();

            $('.mobile-position-card').show();
            $('.it-start__button_mobile').show();
            $('.it-start__button_mobile').attr('disabled', false);
        });
    }

    // ########################################
});
