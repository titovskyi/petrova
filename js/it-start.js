$(document).ready(function () {
    // ########################################

    // $('.app-container').mCustomScrollbar({
    //     theme: 'minimal',
    //     mouseWheelPixels: 100,
    //     scrollInertia: 0,
    //     callback: {
    //         whileScrolling: function() {
    //
    //         }
    //     }
    // });

    if ($('.popup__wrapper_vacancy')) {
        $('.popup__wrapper_vacancy').mCustomScrollbar({
            theme: 'minimal',
            mouseWheelPixels: 100,
            scrollInertia: 0
        });
    }

    (function setInitState() {
        const chooseButtons = $('.start-direction__button');
        const allRows = chooseButtons.parents('.position').children();

        $('.it-start__button').attr('disabled', true);
        $('.button__hint').show();

        for (let i = 0; chooseButtons.length > i; i++) {
            $(chooseButtons[i]).on('click', function () {
                findRowChildren(allRows, i);
            });
        }
    })();

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

                if ($(rowChildren[i]).hasClass('active')) {
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

    (function chooserChange() {
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
    })();

    (function () {
        $('#send-question').attr('disabled', true);

        $('.it-start__button').on('click', function () {
            $('body').addClass('body_overflow-hidden');

            if ($('.popup__wrapper_vacancy').height() > $(window).height()) {
                $('.popup__wrapper_vacancy').addClass('scrollable-popup');
            } else {
                $('.popup__wrapper_vacancy').removeClass('scrollable-popup');
            }

            $('.app-container').addClass('blur-block');
            $('.it-start__popup-overlay').addClass('show-overlay');
            $('.popup__wrapper_vacancy').addClass('popup__wrapper_show');

            checkItStartPopupInputValid();
        });

        if ($('.button_add-file')) {
            const addFileButton = $('.button_add-file');
            const addFileInput = addFileButton.prev();

            addFileButton.on('click', function () {
                addFileInput.click();
            });

            addFileInput.on('input', function (e) {
                if (addFileInput.val()) {
                    addFileButton.addClass('file-dirty');
                    let name = e.target.value.substring(e.target.value.lastIndexOf('\\') + 1);
                    if(name.length > 24) {
                        name = name.slice(0, 24) + '...';
                    }
                    addFileButton[0].innerHTML = `<span>${name}</span><img class="remove-file_button" src="./img/popup-close.svg" alt="" />`;

                    $('.remove-file_button').on('click', function(e) {
                        e.stopPropagation();
                        addFileButton.removeClass('file-dirty');
                        addFileButton[0].innerHTML = `<img src="./img/clip.svg" /><span>Прикрепить CV</span>`;

                        addFileButton.prev().val(null);

                        $('#send-question').attr('disabled', true);
                        checkItStartPopupInputValid();
                    });
                    checkItStartPopupInputValid();
                } else {
                    addFileButton.removeClass('file-dirty');
                    addFileButton[0].innerHTML = `<img src="./img/clip.svg" /><span>Прикрепить CV</span>`;
                }
            });
        }

        $('.it-start__popup-overlay').on('click', function () {
            $('body').removeClass('body_overflow-hidden');
            $('.popup__wrapper_vacancy').removeClass('popup__wrapper_show scrollable-popup');

            $('.app-container').removeClass('blur-block');
            $('.it-start__popup-overlay').removeClass('show-overlay');
        });

        $('.popup-close__button_it-start').on('click', function () {
            $('body').removeClass('body_overflow-hidden');
            $('.popup__wrapper_vacancy').removeClass('popup__wrapper_show scrollable-popup');

            $('.app-container').removeClass('blur-block');
            $('.it-start__popup-overlay').removeClass('show-overlay');
        });
    })();

    function checkItStartPopupInputValid() {
        const nameReg = /^[a-zA-Z\u0400-\u04FF\s]*$/;
        const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        const phoneReg = /^\+?3?8?(0\d{9})$/;
        const messageReg = /^.{1,2800}$/;
        const notEmpty = /.{1,}/;

        const regexpArray = [nameReg, emailReg, phoneReg, messageReg, notEmpty];
        const inputArray = [$('#name-input'), $('#email-input'), $('#phone-input'), $('#text-textarea'), $('#file-input')];

        for (let i = 0; inputArray.length > i; i++) {
            inputArray[i].on('blur', function () {
                const inputValue = inputArray[i].val();

                if (inputValue && regexpArray[i].test(inputValue)) {
                    inputArray[i].parent().removeClass('invalid').addClass('valid');
                } else {
                    inputArray[i].parent().removeClass('valid').addClass('invalid');
                }

                checkItStartFormValid(regexpArray, inputArray);
            });
        }

        checkItStartFormValid(regexpArray, inputArray);
    }

    function checkItStartFormValid(regexpArray, inputArray) {
        let validForm = false;
        const CVindex = inputArray.length - 1;

        validForm = regexpArray[CVindex].test(inputArray[CVindex].val());

        if (validForm === false) {
            for (let i = 0; inputArray.length > i; i++) {
                if (i != CVindex) {
                    if (regexpArray[i].test(inputArray[i].val())) {
                        validForm = true;
                    } else {
                        validForm = false;

                        break;
                    }
                }
            }
        }

        if (validForm) {
            $('#send-question').attr('disabled', false);
        } else {
            $('#send-question').attr('disabled', true);
        }
    }

    function clearForm(withFile) {
        let inputArray = [];

        if (withFile) {
            inputArray = [$('#name-input'), $('#email-input'), $('#phone-input'), $('#text-textarea'), $('#file-input')];
        } else {
            inputArray = [$('#name-input'), $('#email-input'), $('#phone-input'), $('#text-textarea')];
        }

        inputArray.forEach((input) => {
            input.val('');
        });

        resetForm(inputArray);
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

        $('#vacancy-select').prop('selectedIndex', 0);
    }

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

    // Custom select

    (function () {
        var x, i, j, selElmnt, a, b, c;
        /* Look for any elements with the class "custom-select": */
        x = document.getElementsByClassName('it-start-select');
        for (i = 0; i < x.length; i++) {
            selElmnt = x[i].getElementsByTagName('select')[0];
            /* For each element, create a new DIV that will act as the selected item: */
            a = document.createElement('DIV');
            a.setAttribute('class', 'select-selected');
            a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
            x[i].appendChild(a);
            /* For each element, create a new DIV that will contain the option list: */
            b = document.createElement('DIV');
            b.setAttribute('class', 'select-items select-hide');
            for (j = 1; j < selElmnt.length; j++) {
                /* For each option in the original select element,
                create a new DIV that will act as an option item: */
                c = document.createElement('DIV');
                c.innerHTML = selElmnt.options[j].innerHTML;
                c.addEventListener('click', function (e) {
                    /* When an item is clicked, update the original select box,
                    and the selected item: */
                    var y, i, k, s, h;
                    s = this.parentNode.parentNode.getElementsByTagName('select')[0];
                    h = this.parentNode.previousSibling;
                    for (i = 0; i < s.length; i++) {
                        if (s.options[i].innerHTML == this.innerHTML) {
                            s.selectedIndex = i;
                            h.innerHTML = this.innerHTML;
                            y = this.parentNode.getElementsByClassName('same-as-selected');
                            for (k = 0; k < y.length; k++) {
                                y[k].removeAttribute('class');

                                $('.mobile-position-card').removeClass('show-mobile-element');
                                $('.it-start__button_mobile').removeClass('show-mobile-element');
                            }

                            this.setAttribute('class', 'same-as-selected');
                            $('.mobile-position-card').addClass('show-mobile-element');
                            $('.it-start__button_mobile').addClass('show-mobile-element');
                            $('.it-start__button_mobile').attr('disabled', false);
                            break;
                        }
                    }
                    h.click();
                });
                b.appendChild(c);
            }
            x[i].appendChild(b);
            a.addEventListener('click', function (e) {
                /* When the select box is clicked, close any other select boxes,
                and open/close the current select box: */
                e.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle('select-hide');
                this.classList.toggle('select-arrow-active');
            });
        }
    })();

    function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        var x,
            y,
            i,
            arrNo = [];
        x = document.getElementsByClassName('select-items');
        y = document.getElementsByClassName('select-selected');
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i);
            } else {
                y[i].classList.remove('select-arrow-active');
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add('select-hide');
            }
        }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener('click', closeAllSelect);
    // ########################################
});
