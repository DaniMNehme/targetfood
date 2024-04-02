(function ($) {
	"use strict";
  
	// Preloader
	$(window).on('load', function () {
	  if ($('#preloader').length) {
		$('#preloader').delay(100).fadeOut('slow', function () {
		  $(this).remove();
		});
	  }
  
	  // Initialize swiper when document is fully loaded
	  var swiper = new Swiper('.swiper', {
		slidesPerView: 1,
		spaceBetween: 10,
		// init: false,
		pagination: {
		  el: '.swiper-pagination',
		  clickable: true,
		},
		breakpoints: {
		  640: {
			slidesPerView: 2,
			spaceBetween: 20,
		  },
		  768: {
			slidesPerView: 4,
			spaceBetween: 40,
		  },
		  1024: {
			slidesPerView: 5,
			spaceBetween: 50,
		  },
		}
	  });

	  var swiperProduct = new Swiper('.swiper-container-product', {
		
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
	});
  


	

	// Back to top button
	$(window).scroll(function () {
	  if ($(this).scrollTop() > 100) {
		$('.back-to-top').fadeIn('slow');
	  } else {
		$('.back-to-top').fadeOut('slow');
	  }
	});
	$('.back-to-top').click(function () {
	  $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
	  return false;
	});
  
	var nav = $('nav');
	var navHeight = nav.outerHeight();
  
	/*--/ ScrollReveal /Easy scroll animations for web and mobile browsers /--*/
	window.sr = ScrollReveal();
	sr.reveal('.foo', { duration: 1000, delay: 15 });
  
	/*--/ Carousel owl /--*/
	$('#carousel').owlCarousel({
	  loop: true,
	  margin: -1,
	  items: 1,
	  nav: true,
	  navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
	  autoplay: true,
	  autoplayTimeout: 3000,
	  autoplayHoverPause: true
	});
  
	/*--/ Animate Carousel /--*/
	$('.intro-carousel').on('translate.owl.carousel', function () {
	  $('.intro-content .intro-title').removeClass('zoomIn animated').hide();
	  $('.intro-content .intro-price').removeClass('fadeInUp animated').hide();
	  $('.intro-content .intro-title-top, .intro-content .spacial').removeClass('fadeIn animated').hide();
	});
  
	$('.intro-carousel').on('translated.owl.carousel', function () {
	  $('.intro-content .intro-title').addClass('zoomIn animated').show();
	  $('.intro-content .intro-price').addClass('fadeInUp animated').show();
	  $('.intro-content .intro-title-top, .intro-content .spacial').addClass('fadeIn animated').show();
	});
  
	/*--/ Navbar Collapse /--*/
	$('.navbar-toggle-box-collapse').on('click', function () {
	  $('body').removeClass('box-collapse-closed').addClass('box-collapse-open');
	});
	$('.close-box-collapse, .click-closed').on('click', function () {
	  $('body').removeClass('box-collapse-open').addClass('box-collapse-closed');
	  $('.menu-list ul').slideUp(700);
	});
  
	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).bind('scroll', function () {
	  var pixels = 50;
	  var top = 1200;
	  if ($(window).scrollTop() > pixels) {
		$('.navbar-default').addClass('navbar-reduce');
		$('.navbar-default').removeClass('navbar-trans');
	  } else {
		$('.navbar-default').addClass('navbar-trans');
		$('.navbar-default').removeClass('navbar-reduce');
	  }
	  if ($(window).scrollTop() > top) {
		$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
	  } else {
		$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
	  }
	});
  
	/*--/ Property owl /--*/
	$('#property-carousel').owlCarousel({
	  loop: true,
	  margin: 30,
	  responsive: {
		0: {
		  items: 1,
		},
		769: {
		  items: 2,
		},
		992: {
		  items: 3,
		}
	  }
	});
  
	/*--/ Property owl owl /--*/
	$('#property-single-carousel').owlCarousel({
	  loop: true,
	  margin: 0,
	  nav: true,
	  navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
	  responsive: {
		0: {
		  items: 1,
		}
	  }
	});
  
	/*--/ News owl /--*/
	$('#new-carousel').owlCarousel({
	  loop: true,
	  margin: 30,
	  responsive: {
		0: {
		  items: 1,
		},
		769: {
		  items: 2,
		},
		992: {
		  items: 3,
		}
	  }
	});
  
	/*--/ Testimonials owl /--*/
	$('#testimonial-carousel').owlCarousel({
	  margin: 0,
	  autoplay: true,
	  nav: true,
	  animateOut: 'fadeOut',
	  animateIn: 'fadeInUp',
	  navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
	  autoplayTimeout: 4000,
	  autoplayHoverPause: true,
	  responsive: {
		0: {
		  items: 1,
		}
	  }
	});
  
  })(jQuery);
  



  var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 3000); // Change image every 2 seconds (2000 milliseconds)
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}
