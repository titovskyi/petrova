$(document).ready(function(){

	$('.lead-slider').slick({
		centerMode: true,
		centerPadding: '20%',
		slidesToShow: 1,
		infinite: true,
		arrows: false,
		asNavFor: '.nav-slider',
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

	initCounter(1000, '.count-num', '.statistics');

	function runCounter(items, options) {
		items.forEach((item) => {
			runInterval(item, options);
		})
	}

	function getCurrentIntervalOptions(items, timerInterval) {
		let minItem = items[0];

		items.forEach((item) => {
			if (minItem.value > item.value) {
				minItem = item;
			}
		})

		return {
			optimalInterval: timerInterval / minItem.value,
			iterations: minItem.value,
			counter: 1
		}
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

		}, options.optimalInterval)
	}

	function initItems(items) {
		let countItems = document.querySelectorAll(items);
		let initItems = [];

		countItems.forEach((item) => {
			let tmp = {
				source: item,
				value: +item.innerText
			}

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
		let options = getCurrentIntervalOptions(initialItems, interval)

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

	particlesJS('particles-js', {
		"particles": {
			"number": {
				"value": 150,
				"density": {
					"enable": true,
					"value_area": 800
				}
			},
			"color": {
				"value": "#ffffff"
			},
			"shape": {
				"type": "circle",
				"stroke": {
					"width": 0,
					"color": "#000000"
				},
				"polygon": {
					"nb_sides": 5
				},
				"image": {
					"src": "img/github.svg",
					"width": 100,
					"height": 100
				}
			},
			"opacity": {
				"value": 0.5,
				"random": false,
				"anim": {
					"enable": false,
					"speed": 1,
					"opacity_min": 0.1,
					"sync": false
				}
			},
			"size": {
				"value": 3,
				"random": true,
				"anim": {
					"enable": false,
					"speed": 40,
					"size_min": 0.1,
					"sync": false
				}
			},
			"line_linked": {
				"enable": true,
				"distance": 150,
				"color": "#ffffff",
				"opacity": 0.4,
				"width": 1
			},
			"move": {
				"enable": true,
				"speed": 6,
				"direction": "none",
				"random": false,
				"straight": false,
				"out_mode": "out",
				"bounce": false,
				"attract": {
					"enable": false,
					"rotateX": 600,
					"rotateY": 1200
				}
			}
		},
		"interactivity": {
			"detect_on": "canvas",
			"events": {
				"onhover": {
					"enable": true,
					"mode": "grab"
				},
				"onclick": {
					"enable": true,
					"mode": "push"
				},
				"resize": true
			},
			"modes": {
				"grab": {
					"distance": 140,
					"line_linked": {
						"opacity": 1
					}
				},
				"bubble": {
					"distance": 400,
					"size": 40,
					"duration": 2,
					"opacity": 8,
					"speed": 3
				},
				"repulse": {
					"distance": 200,
					"duration": 0.4
				},
				"push": {
					"particles_nb": 1
				},
				"remove": {
					"particles_nb": 2
				}
			}
		},
		"retina_detect": true
	});
});

