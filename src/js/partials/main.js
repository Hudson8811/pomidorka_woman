$(document).ready(function() {
	AOS.init();

	var usersSwiperParam = {
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
	};

	if ($(window).width() < 800) {
		usersSwiperParam.loop = true;
	}

	var users__swiper = new Swiper(".js-other-users-slider", usersSwiperParam);


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
					loop: true,
			});
			var choice__items = new Swiper('.swiper-style', {
					navigation: {
						prevEl: ".swiper-style .swiper-arrow-prev",
						nextEl: ".swiper-style .swiper-arrow-next",
					},
					slidesPerView: 1,
					loop: true,
			});
			/*
			var choice__items = new Swiper('.swiper-extra', {
					navigation: {
						prevEl: ".swiper-extra .swiper-arrow-prev",
						nextEl: ".swiper-extra .swiper-arrow-next",
					},
					slidesPerView: 1,
			});*/
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

		let recipeValue = $('.js-recipe-items [data-recipe].active').data('recipe');
		if(recipeValue)
			$('[data-recipe-extra=' + recipeValue + ']').addClass( 'show' );

	});
	$('.js-author-items [data-author]').click(function(){

		$('.js-author-items [data-author]').removeClass( 'active' );
		$(this).addClass( 'active' );

		$(".js-choice-block-2").removeClass( 'show' );
		$(".js-choice-block-3").addClass( 'show' );

		let authorValue = $('.js-author-items [data-author].active').data('author');
		if(authorValue){
			$('[data-type]').not('[data-type=' + authorValue + ']').remove();
			$('[data-type=' + authorValue + ']').addClass( 'show' );
		}

		$('.js-toppings-items').each(function () {
			let slider = $(this).find('.swiper');
			if (slider.length > 0){
				let prevArrow = $(this).find('.swiper-arrow-prev');
				let nextArrow = $(this).find('.swiper-arrow-next');

				let choice__extra = new Swiper(slider[0], {
					slidesPerView: 1,
					spaceBetween: 65,
					loop: true,
					navigation: {
						nextEl: nextArrow[0],
						prevEl: prevArrow[0],
					},
					breakpoints: {
						801: {
							slidesPerView: 3
						}
					}
				});
			}
		})
	});

	$('.js-toppings-items [data-topping]').click(function(){
		$(this).toggleClass( 'active' );
	});

	function PreloaderTextController() {
		var text_arr = ['придумываем идеальный рецепт', 'продумываем пропорции', 'подбираем ингредиенты', 'происходит магия', 'готовится волшебство', 'почти готово'];
	  
		var i = 0;
		var _timer = null;
	  
		function _showText() {
			if (i >= text_arr.length) {
				clearInterval(_timer);
				return;
			}

			$( ".preloader span.text" ).text(text_arr[i++]);
		}
	  
		_timer = setInterval(_showText, 2000);
	}

	//Показать прелоадер
	function showPreloader(){
		$( ".preloader" ).fadeTo( 900 , 1, function() {});

		PreloaderTextController();
		//$('.preloader').addClass( 'show' );
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

