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

/*
$(document).ready(function() {

	$('.js-recipe-items [data-recipe]').click(function(){

		$(".js-recipe-items [data-recipe]").removeClass( 'active' );
		$(this).addClass( 'active' );

		submitActiveCheck();
	});
	$('.js-author-items [data-author]').click(function(){

		$('.js-author-items [data-author]').removeClass( 'active' );
		$(this).addClass( 'active' );

		submitActiveCheck();
	});

	$('.js-toppings-items [data-topping]').click(function(){
		$(this).toggleClass( 'active' );
	});

	//CHECK ACTIVE ITEMS
	function submitActiveCheck(){

		let recipeItem = $('.js-recipe-items [data-recipe].active').length;
		let authorItem = $('.js-author-items [data-author].active').length;

		if( recipeItem && authorItem ){
			$('.js-recipe-submit').removeClass( 'button-disabled' );
		} else {
			$('.js-recipe-submit').addClass( 'button-disabled' );
		}
	}

	//SUBMIT
	$('.js-recipe-submit').click(function(){

		let buttonActive = !$(this).hasClass( 'button-disabled' );
		let recipeValue = $('.js-recipe-items [data-recipe].active').data('recipe');
		let authorValue = $('.js-author-items [data-author].active').data('author');
		let toppingsValue = Array.from($('.js-toppings-items [data-topping].active'), n => n.dataset.topping).join(',');

		if( buttonActive && recipeValue && authorValue ){

			//AJAX
			$.post(
				"/send_order/",
				{
					recipe: recipeValue,
					author: authorValue,
					toppings: toppingsValue,
				}
			)
			.done(function( data ) {
				//Работа с данными, переадресация
			});
		}
	});
})
*/
