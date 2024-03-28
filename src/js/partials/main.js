$(document).ready(function() {
	var users__swiper = new Swiper(".other-users__swiper", {
		navigation: {
			prevEl: ".other-users .swiper-arrow-prev",
			nextEl: ".other-users .swiper-arrow-next",
		},
		slidesPerView: 1,
		spaceBetween: 65,
		breakpoints: {
			801: {
				slidesPerView: 3
			}
		}
	});


	function toggleSwiper() {
		if ($(window).width() > 800) {
			if (typeof choice__items !== 'undefined' && choice__items !== null) {
				choice__items.destroy(true, true);
			}
		} else {
			var choice__items = new Swiper('.swiper-recipe', {
					navigation: {
						prevEl: ".swiper-recipe .swiper-arrow-prev",
						nextEl: ".swiper-recipe .swiper-arrow-next",
					},
					slidesPerView: 1,
			});
			var choice__items = new Swiper('.swiper-style', {
					navigation: {
						prevEl: ".swiper-style .swiper-arrow-prev",
						nextEl: ".swiper-style .swiper-arrow-next",
					},
					slidesPerView: 1,
			});
			var choice__items = new Swiper('.swiper-extra', {
					navigation: {
						prevEl: ".swiper-extra .swiper-arrow-prev",
						nextEl: ".swiper-extra .swiper-arrow-next",
					},
					slidesPerView: 1,
			});
		}
	}

	toggleSwiper();

	$(window).resize(function() {
		toggleSwiper();
	});
})