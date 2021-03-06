$(document).ready(() => {
	let sliderContainerWidth = $('.slider-container').width();
	let itemsCount = $('.slider .item').length;
	let slider = $('.slider');

	let item = $('.slider-container .slider .item');
	let itemWidth = item.width();

	let marginLeft = parseInt(item.css('margin-left').replace('px', ''));
	let marginRight = parseInt(item.css('margin-right').replace('px', ''));

	let wholeItem = itemWidth + marginLeft + marginRight;
	let nextSlideButton = $('#next-slide');
	let prevSlideButton = $('#previous-slide');

	let nextCount = 1;

	// SET SLIDER WIDTH
	slider.css('width', `${itemsCount * wholeItem}px`);

	let sliderWidth = slider.outerWidth() + marginLeft + marginRight;

	let maxSlide = Math.round((sliderWidth - sliderContainerWidth) / wholeItem);

	// NEXT SLIDE
	nextSlideButton.click(() => {
		if (nextCount - 1 < maxSlide) {
			slider.css('margin-left', `-${nextCount * wholeItem}px`);
			showHideButton(prevSlideButton, 'lte', 0);
			nextCount++;

			if (nextCount - 1 === maxSlide) {
				showHideButton(nextSlideButton, 'lte', `-${maxSlide * wholeItem}`);
			}
		}
	});

	// PREVIOUS SLIDE
	prevSlideButton.click(() => {
		if (nextCount > 1) {
			slider.css(
				'margin-left',
				`${(nextCount - 1) * -wholeItem + wholeItem}px`
			);
			nextCount--;

			if (nextCount <= 1) {
				prevSlideButton.css('display', 'none');
			}

			nextSlideButton.css('display', 'block');
		}
	});

	// GET CURRENT MARGIN-LEFT VALUE OF THE SLIDER
	function getSliderMargin() {
		return parseInt(slider.css('margin-left').replace('px', ''));
	}

	// SHOW / HIDE SLIDE BUTTON
	function showHideButton(button, comparison, value) {
		if (comparison === 'lte') {
			if (getSliderMargin() <= value) {
				button.css('display', 'block');
			} else {
				button.css('display', 'none');
			}
		} else if (comparison === 'gte') {
			if (getSliderMargin() >= value) {
				button.css('display', 'none');
			} else {
				button.css('display', 'block');
			}
		}
	}
});

// RECALCULATE ON WINDOW RESIZE

let resizeTimer;

$(window).on('resize', () => {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function() {
		let sliderContainerWidth = $('.slider-container').width();
		let itemsCount = $('.slider .item').length;
		let slider = $('.slider');

		let item = $('.slider-container .slider .item');
		let itemWidth = item.width();

		let marginLeft = parseInt(item.css('margin-left').replace('px', ''));
		let marginRight = parseInt(item.css('margin-right').replace('px', ''));

		let wholeItem = itemWidth + marginLeft + marginRight;
		let nextSlideButton = $('#next-slide');
		let prevSlideButton = $('#previous-slide');

		let nextCount = 1;

		// SET SLIDER WIDTH
		slider.css('width', `${itemsCount * wholeItem}px`);

		let sliderWidth = slider.outerWidth() + marginLeft + marginRight;

		let maxSlide = Math.round((sliderWidth - sliderContainerWidth) / wholeItem);

		slider.css('margin-left', '0');
		$('.slider-container').animate({ scrollLeft: 0 });
		prevSlideButton.css('display', 'none');

		if ($(window).width() <= 850) {
			nextSlideButton.css('display', 'none');
		} else {
			slider.css('margin-left', '0');
			nextSlideButton.css('display', 'block');
		}
	}, 500);
});

//
