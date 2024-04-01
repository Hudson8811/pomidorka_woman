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


$(document).ready(function() {

	$('.js-recipe-items [data-recipe]').click(function(){

		$(".js-recipe-items [data-recipe]").removeClass( 'active' );
		$(this).addClass( 'active' );

		$(".js-choice-block-1").removeClass( 'show' );
		$(".js-choice-block-2").addClass( 'show' );
	});
	$('.js-author-items [data-author]').click(function(){

		$('.js-author-items [data-author]').removeClass( 'active' );
		$(this).addClass( 'active' );

		$(".js-choice-block-2").removeClass( 'show' );
		$(".js-choice-block-3").addClass( 'show' );
	});

	$('.js-toppings-items [data-topping]').click(function(){
		$(this).toggleClass( 'active' );
	});

	//Показать прелоадер
	function showPreloader(){
		$('.preloader').addClass( 'show' );
	}
	
	//Скрыть прелоадер
	function hidePreloader(){
		$('.preloader').removeClass( 'show' );
	}

	function get_status(id=0, timerId)
	{
		$.post( "/send_order/", {type: "get_status", id: id})
		.done(function( data ) {
			var res = JSON.parse(data)
			if(res.status=='COMPLETE')
			{
				clearInterval(timerId);
				window.location.href = "/recipe/" + id + "/";
			}
		});
	}

	//SUBMIT
	$('.js-recipe-submit').click(function(){

		let recipeValue = $('.js-recipe-items [data-recipe].active').data('recipe');
		let authorValue = $('.js-author-items [data-author].active').data('author');
		let toppingsValue = Array.from($('.js-toppings-items [data-topping].active'), n => n.dataset.topping).join(',');

		if( recipeValue && authorValue ){

			
			showPreloader();

			//AJAX
			$.post(
				"/send_order/",
				{
					type: 'generate',
					recipe: recipeValue,
					author: authorValue,
					toppings: toppingsValue,
				}
			)
			.done(function( data ) {
				if(data!='') {
					let timerId = setInterval(() => get_status(data, timerId), 2000);
				}
			});
		}
	});
})

