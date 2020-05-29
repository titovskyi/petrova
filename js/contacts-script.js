$(document).ready(function () {
    // ########################################

    $('.lead-slider_contacts').slick({
        centerMode: true,
        centerPadding: '10%',
        slidesToShow: 3,
        infinite: true,
        arrows: false,
        focusOnSelect: true,
        asNavFor: '.nav-slider_contacts'
    });
    $('.nav-slider_contacts').slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.lead-slider_contacts',
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

    // initContactsPage();

    checkInputValid();

    // ########################################

    (function initContactsPage() {
        const inputArray = [$('#name-input'), $('#email-input'), $('#phone-input'), $('#text-textarea')];

        $('#send-question').attr('disabled', true);
        $('.open-popup-button').each(function () {
            this.addEventListener('click', function () {

                $('.app-container').addClass('blur-block')
                $('.popup__wrapper').addClass('contacts-popup__wrapper_show');

                inputArray.forEach((input) => {
                    input.val('');
                });
            });
        });
        $('.popup-close__button')[0].addEventListener('click', function () {
            resetForm(inputArray);
            $('.popup__wrapper').removeClass('contacts-popup__wrapper_show');
            $('.app-container').removeClass('blur-block');
        });
    })();

    // ########################################

    function checkInputValid() {
        const nameReg = /^[a-zA-Z\u0400-\u04FF\s]*$/;
        const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        const phoneReg = /^\+?3?8?(0\d{9})$/;
        const messageReg = /^.{1,2800}$/;

        const regexpArray = [nameReg, emailReg, phoneReg, messageReg];
        const inputArray = [$('#name-input'), $('#email-input'), $('#phone-input'), $('#text-textarea')];

        for (let i = 0; inputArray.length > i; i++) {
            inputArray[i].on('input', function () {
                const inputValue = inputArray[i].val();

                if (inputValue && regexpArray[i].test(inputValue)) {
                    inputArray[i].parent().removeClass('invalid').addClass('valid');
                } else {
                    inputArray[i].parent().removeClass('valid').addClass('invalid');
                }

                checkFormValid(regexpArray, inputArray);
            });
        }
    }

    function checkFormValid(regexpArray, inputArray) {
        let validForm = false;

        for (let i = 0; inputArray.length > i; i++) {
            if (regexpArray[i].test(inputArray[i].val())) {
                validForm = true;
            } else {
                validForm = false;

                break;
            }
        }

        if (validForm) {
            $('#send-question').attr('disabled', false);
        } else {
            $('#send-question').attr('disabled', true);
        }
    }

    function resetForm(inputArray) {
        inputArray.forEach((input) => {
            if (input.parent().hasClass('invalid')) {
                input.parent().removeClass('invalid');
            } else if (input.parent().hasClass('valid')) {
                input.parent().removeClass('valid');
            }
        });

        $('#send-question').attr('disabled', true);
    }

    // ########################################
});
