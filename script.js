$(document).ready(function () {
    $('.lead-slider').slick({
        centerMode: true,
        centerPadding: '20%',
        slidesToShow: 1,
        infinite: true,
        arrows: false,
        asNavFor: '.nav-slider'
    });
    $('.nav-slider').slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.lead-slider',
        focusOnSelect: true,
        infinite: true,
        prevArrow: '.prev-arrow',
        nextArrow: '.next-arrow'
    });

    // Counter

    let hasElement = document.querySelector('.count-num');

    if (hasElement) {
        initCounter(1000, '.count-num', '.statistics');
    }

    // ########################################

    initPopupListeners();

    checkInputValid();

    // ########################################

    function runCounter(items, options) {
        items.forEach((item) => {
            runInterval(item, options);
        });
    }

    function getCurrentIntervalOptions(items, timerInterval) {
        let minItem = items[0];

        items.forEach((item) => {
            if (minItem.value > item.value) {
                minItem = item;
            }
        });

        return {
            optimalInterval: timerInterval / minItem.value,
            iterations: minItem.value,
            counter: 1
        };
    }

    function runInterval(item, options) {
        let counter = 0;
        let currentNum = Math.ceil(item.value / options.iterations);

        let interval = setInterval(() => {
            counter = counter + currentNum;

            item.source.innerText = counter;

            if (counter >= item.value) {
                item.source.innerText = item.value;

                clearInterval(interval);
            }
        }, options.optimalInterval);
    }

    function initItems(items) {
        let countItems = document.querySelectorAll(items);
        let initItems = [];

        countItems.forEach((item) => {
            let tmp = {
                source: item,
                value: +item.innerText
            };

            initItems.push(tmp);

            item.innerText = 0;
        });

        return initItems;
    }

    function initCounter(interval, items, container) {
        let initialItems = initItems(items);
        let containerPosition = $(container).offset().top;
        let windowHeight = $(window).height() - 100;
        let isRunCounter = false;
        let options = getCurrentIntervalOptions(initialItems, interval);

        $(window).on('scroll', function () {
            if (isRunCounter) {
                return;
            }

            let scroll = $(window).scrollTop();

            if (scroll + windowHeight >= containerPosition) {
                runCounter(initialItems, options);

                isRunCounter = true;

                $(window).off('scroll');
            }
        });
    }

    // ########################################

    function initPopupListeners() {
        const inputArray = [$('#name-input'), $('#email-input'), $('#phone-input'), $('#text-textarea')];

        $('#send-question').attr('disabled', true);

        $('.open-popup-button').each(function () {
            this.addEventListener('click', function () {
                $('.app-container').addClass('blur-block');
                $('.popup__wrapper').addClass('contacts-popup__wrapper_show');

                inputArray.forEach((input) => {
                    input.val('');
                });

                $('.popup-close__button').on('click', function () {
                    resetForm(inputArray);

                    $('.popup__wrapper').removeClass('contacts-popup__wrapper_show');
                    $('.app-container').removeClass('blur-block');
                });

                if($('.button_add-file')) {

                    const addFileButton = $('.button_add-file');
                    const addFileInput = addFileButton.prev();

                    addFileButton.on('click', function() {
                        addFileInput.click();
                    })
                }
            });
        });
    }

    function checkInputValid() {
        const nameReg = /^[a-zA-Z\u0400-\u04FF\s]*$/;
        const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        const phoneReg = /^\+?3?8?(0\d{9})$/;
        const messageReg = /^.{1,2800}$/;
        const notEmpty = /.{1,}/;

        const regexpArray = [nameReg, emailReg, phoneReg, messageReg, notEmpty];
        const inputArray = [$('#name-input'), $('#email-input'), $('#phone-input'), $('#text-textarea'), $('#file-input')];

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

        checkFormValid(regexpArray, inputArray);
    }

    function checkFormValid(regexpArray, inputArray) {
        let validForm = false;
        const CVindex = inputArray.length - 1;
        const vacancyChoosed = !!Number($('#vacancy-select').val());

        validForm = regexpArray[CVindex].test(inputArray[CVindex].val());

        if(validForm === false) {
            for (let i = 0; inputArray.length > i; i++) {
                if(i != CVindex) {
                    if (regexpArray[i].test(inputArray[i].val())) {
                        validForm = true;
                    } else {
                        validForm = false;

                        break;
                    }
                }
            }
        }


        if (validForm && vacancyChoosed) {
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

        $('#vacancy-select').prop('selectedIndex',0);
    }

    // ########################################

    function trancateText() {
        if(($('#vacancy-card-content__about').height() > 64)) {
            $('.vacancy-trancate-points').addClass('vacancy-trancate-points_show');
        }
    }

    // ########################################

    // Vacancy Select

    customizeVacancySelect();

    function customizeVacancySelect() {
        var x, i, j, selElmnt, a, b, c;
        /* Look for any elements with the class "custom-select": */
        x = document.getElementsByClassName('vacancy-custom-select');
        for (i = 0; i < x.length; i++) {
            selElmnt = x[i].getElementsByTagName('select')[0];
            /* For each element, create a new DIV that will act as the selected item: */
            a = document.createElement('DIV');
            a.setAttribute('class', 'vacancy-select-selected');
            a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
            x[i].appendChild(a);
            /* For each element, create a new DIV that will contain the option list: */
            b = document.createElement('DIV');
            b.setAttribute('class', 'vacancy-select-items vacancy-select-hide');
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

                        if (s.options[i].innerHTML === this.innerHTML) {
                            s.selectedIndex = i;
                            $(a).addClass('vacancy-select-selected_white');
                            h.innerHTML = this.innerHTML;
                            y = this.parentNode.getElementsByClassName('vacancy-same-as-selected');
                            for (k = 0; k < y.length; k++) {
                                y[k].removeAttribute('class');
                            }
                            this.setAttribute('class', 'vacancy-same-as-selected');

                            $(this).closest('.vacancy-card').addClass('active');
                            trancateText();

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
                checkInputValid();
                this.nextSibling.classList.toggle('vacancy-select-hide');
                this.classList.toggle('vacancy-select-arrow-active');
            });
        }

    }

    // ########################################



    // Custom select

    var x, i, j, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName('custom-select');
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
                        }
                        this.setAttribute('class', 'same-as-selected');
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

    let particlesContainer = document.querySelector('#particles-js');

    if (particlesContainer) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 150,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    },
                    image: {
                        src: 'img/github.svg',
                        width: 100,
                        height: 100
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 1
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // $('.typed-slide-str1').typed({
    //     strings: ['"M2E" : {'],
    //     typeSpeed: 20,
    //     showCursor: true,
    //     startDelay: 0,
    //     callback: function () {
    //         $('.typed-slide-str1 + span').hide();
    //
    //         $('.typed-slide-str2').typed({
    //             strings: [`"company_type"  : "product"`],
    //             typeSpeed: 20,
    //             startDelay: 100,
    //             callback: function () {
    //                 $('.typed-slide-str2 + span').hide();
    //
    //                 $('.typed-slide-str3').typed({
    //                     strings: [`"regions"       : ["UK", "UA"]`],
    //                     typeSpeed: 20,
    //                     startDelay: 100,
    //                     callback: function () {
    //                         $('.typed-slide-str3 + span').hide();
    //
    //                         $('.typed-slide-str4').typed({
    //                             strings: [`"high_priority" : "quality"`],
    //                             typeSpeed: 20,
    //                             startDelay: 100,
    //                             callback: function () {
    //                                 $('.typed-slide-str4 + span').hide();
    //
    //                                 $('.typed-slide-str5').typed({
    //                                     strings: [`"cooperation"   : "longterm"`],
    //                                     typeSpeed: 20,
    //                                     startDelay: 100,
    //                                     callback: function () {
    //                                         $('.typed-slide-str5 + span').hide();
    //
    //                                         $('.typed-slide-str6').typed({
    //                                             strings: [`"bureaucracy"   : null`],
    //                                             typeSpeed: 20,
    //                                             startDelay: 100,
    //                                             callback: function () {
    //                                                 $('.typed-slide-str6 + span').hide();
    //
    //                                                 $('.typed-slide-str7').typed({
    //                                                     strings: [`}`],
    //                                                     typeSpeed: 20,
    //                                                     startDelay: 100,
    //                                                     callback: function () {
    //                                                         $('.typed-slide-str7 + span').hide();
    //
    //                                                         parseJsonToHtml();
    //                                                     }
    //                                                 });
    //                                             }
    //                                         });
    //                                     }
    //                                 });
    //                             }
    //                         });
    //                     }
    //                 });
    //             }
    //         });
    //     }
    // });

    // $(".typed-slide-str2").typed({
    // 	strings: [`"company_type"  : "product"`], typeSpeed: 500, showCursor
    // });
    //
    // $(".typed-slide-str3").typed({
    // 	strings: [`"regions"       : ["UK", "UA"]`], typeSpeed: 1000
    // });
    //
    // $(".typed-slide-str4").typed({
    // 	strings: [`"high_priority" : "quality"`], typeSpeed: 1500
    // });
    //
    // $(".typed-slide-str5").typed({
    // 	strings: [`"cooperation"   : "longterm"`], typeSpeed: 2000
    // });
    //
    // $(".typed-slide-str6").typed({
    // 	strings: [`"bureaucracy"   : null`], typeSpeed: 0,startDelay: 2500
    // });
});
