$(document).ready(function() {
    // Typed

    let typedArr = [{ element: $('.typed-slide-1'), data: [`"M2E": {
    "company_type"  : "product",
    "regions"       : ["UK", "UA"],
    "high_priority" : "quality",
    "cooperation"   : "longterm",
    "bureaucracy"   : null,
}`]}, { element: $('.typed-slide-2'), data: [`"M2E": {
    "company_type"  : "product",
    "regions"       : ["UK", "UA"],
    "high_priority" : "quality",
    "cooperation"   : "longterm",
    "bureaucracy"   : null,
}`]}];

    $('.vacancies-slider').on("init", function() {
        setTypedByIndexSlide(0);
    })

    let vacSlide = $('.vacancies-slider').slick({
        slidesToShow: 1,
        arrows: false,
        // fade: true,
        cssEase: 'linear',
        // autoplay: true,
        autoplaySpeed: 2000,
        dots: true
    })

    vacSlide.on("beforeChange", function (){
        allTypedReset();
        // console.log(vacSlide.slick('slickCurrentSlide'));
    });

    vacSlide.on("afterChange", function (){
        let index = vacSlide.slick('slickCurrentSlide');

        setTypedByIndexSlide(index);
    });






    function allTypedReset() {
        typedArr.forEach((item) => {
            item.element.data('typed', null);
        })
    }

    function setTypedByIndexSlide(index) {
        let typedObj = typedArr[index];

        if (typedObj) {
            typedObj.element.typed({
                strings: typedObj.data,
                typeSpeed: 0,
                startDelay: 0,
                callback: function () {
                    $(typedObj.element + 'span').hide();

                    let text = $(typedObj.element[index]).text();

                    $(typedObj.element[index]).html(parseJsonToHtml(text));
                }
            })
        }
    }

//     $('.typed-slide-1').typed({
//         strings: [`"M2E": {
//     "company_type"  : "product",
//     "regions"       : ["UK", "UA"],
//     "high_priority" : "quality",
//     "cooperation"   : "longterm",
//     "bureaucracy"   : null,
// }`],
//         typeSpeed: 0,
//         showCursor: true,
//         startDelay: 0,
//         callback: function () {
//             $('.typed-slide-1 + span').hide();
//
//             let text = $($('.typed-slide-1')[0]).text();
//
//             $($('.typed-slide-1')[0]).html(parseJsonToHtml(text));
//         }
//     });

    console.log();

    // setTimeout(() => {
    //     console.log('reset work')
    //     $('.typed-slide-1').removeData('typed')
    // }, 7000)

    // ########################################

    $('.typed-slide-2').typed({
        strings: [`"M2E": {
    "company_type"  : "product",
    "regions"       : ["UK", "UA"],
    "high_priority" : "quality",
    "cooperation"   : "longterm",
    "bureaucracy"   : null,
}`],
        typeSpeed: 0,
        showCursor: true,
        startDelay: 0,
        callback: function () {
            $('.typed-slide-2 + span').hide();
            let text = $($('.typed-slide-2')[1]).text();

            $($('.typed-slide-2')[1]).html(parseJsonToHtml(text));
        }
    });





    function parseJsonToHtml(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 4);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            function (match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            }
        );
    }
})
