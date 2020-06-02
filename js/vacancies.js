$(document).ready(function() {
    // Typed

let typedArr = [{ element: $('.typed-slide-1'),
    data: [
`"M2E": {
    "company_type"  : "product",
    "regions"       : ["UK", "UA"],
    "high_priority" : "quality",
    "cooperation"   : "longterm",
    "bureaucracy"   : null
}`]}, { element: $('.typed-slide-2'), data: [`"M2E": {
    "work_hours"    : "flexible",
    "vacation_days" : 15,
    "days_off"      : 5,
    "sick_leave"    : "paid"
}`]}, { element: $('.typed-slide-3'), data: [`"M2E": {
    "education": {
        "mentoring"     :  "full",
        "code_review"   :  "regular",
        "conferences"   :  "included",
        "extra_courses" :  "enabled"
    }
}`]}, { element: $('.typed-slide-4'), data: [`"M2E": {
    "benefits": {
        "english_classes"  :  "free",
        "medicine_package" :  "optional",
        "massage_hours"    :  "healthful",
        "sport_activities" :  "supported"
    }
}`]}, { element: $('.typed-slide-5'), data: [`"M2E": {
    "entertainment": {
        "team_buildings"   :  "usual",
        "corporates_count" :  4,
        "office_parties"   :  "often",
        "happiness_level"  :  "high"
    }
}`]}];

    $('.vacancies-slider').on("init", function() {
        initTyped(0)
    })

    let vacSlide = $('.vacancies-slider').slick({
        slidesToShow: 1,
        arrows: false,
        fade: true,
        cssEase: 'linear',
        dots: true,

    })

    vacSlide.on("beforeChange", function (){
        removeTypeds();
    });

    vacSlide.on("afterChange", function (){
        let index = vacSlide.slick('slickCurrentSlide');

        initTyped(index);
    });

    let interval;

    function initTyped(index) {
        let config = typedArr[index];
        let spanElement = $(document.createElement('span'));
        let parentElement = config.element;

        parentElement.append(spanElement);

        let typedElement = config.element.children();

        typedElement.typed({
            strings: config.data,
            typeSpeed: 35,
            startDelay: 0,
            callback: function () {
                $(typedElement).html(parseJsonToHtml(typedElement.text()));

                interval = setTimeout(function() {
                    vacSlide.slick('slickNext');
                }, 2600);
            }
        });
    }

    function removeTypeds() {
        clearTimeout(interval);

        typedArr.forEach((item) => {
            item.element.children().typed('reset');
            item.element.children().remove()
        })
    }

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
