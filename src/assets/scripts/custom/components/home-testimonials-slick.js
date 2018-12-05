import $ from "jquery";
import "slick-carousel";

function testimonials() {
  const $testimonials = $(".js-testimonials-slider");
  if ($testimonials.length > 0) {
    $testimonials.slick({
      swipeToSlide: true,
      arrows: true,
      dots: true,
      slidesToShow: 3,
      nextArrow:
        "<button type='button' class='slick-next slick-arrow icon-arrow-right'></button>",
      prevArrow:
        "<button type='button' class='slick-prev slick-arrow icon-arrow-left'></button>",
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            centerMode: false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerMode: false,
            centerPadding: 0,
          },
        },
      ],
    });
  }
}

$(document).ready(testimonials);
