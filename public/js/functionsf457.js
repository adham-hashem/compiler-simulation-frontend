$(document).ready(function () {
  
  
  // Tab 
  $('.tab ul li').click(function() {
    var index = $('.tab ul li').index( this );
    var contentTab = $('.contentTab .TabDevelopment')
    var colorDev  = $('.contentTab .colorDev ')
    
    
    switch (index) {
      case 0:
      index = $(this).addClass('firstColor').siblings().attr('class', '');
      $(contentTab).eq( 0 ).addClass(' active').siblings().removeClass('active')
      $(colorDev).attr('class', 'colorDev  ').addClass('firstColor')
      
      break;
      case 1:
      index = $(this).addClass('secondColor').siblings().attr('class', '');
      $(contentTab).eq( 1 ).addClass(' active').siblings().removeClass('active')
      $(colorDev).attr('class', 'colorDev  ').addClass('secondColor')
      
      break;
      case 2:
      index = $(this).addClass('lastColor').siblings().attr('class', '');
      $(contentTab).eq( 2 ).addClass(' active').siblings().removeClass('active')
      $(colorDev).attr('class', 'colorDev  ').addClass('lastColor')
      
      break;
      default:
      break;
    }
    
  })
  
  
  // scrollToTop
  
  $('.scrollToTop').click(function() {
    
    $('html , body ').animate({
      scrollTop: 0
    }, 1000)
  })

  
  var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 0,
    slidesPerView: 1,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    }
    
  });
  var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 0,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: galleryThumbs
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    }
  });
  // menu 
  $('.menu').click(function(){
    $('.listMenu').toggleClass('openMenu')
    $('body').toggleClass('NoScroll')
  })
  
});

