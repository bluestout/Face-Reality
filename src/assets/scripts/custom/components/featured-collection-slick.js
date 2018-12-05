import $ from "jquery";
import "slick-carousel";

function testimonials() {
  const $testimonials = $(".js-featured-collection-slider");
  if ($testimonials.length > 0) {
    $testimonials.slick({
      swipeToSlide: true,
      arrows: true,
      dots: true,
      slidesToShow: 4,
      nextArrow:
        "<button type='button' class='slick-next slick-arrow icon-arrow-right'></button>",
      prevArrow:
        "<button type='button' class='slick-prev slick-arrow icon-arrow-left'></button>",
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            centerMode: true,
            centerPadding: "20px",
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            centerMode: true,
            centerPadding: "20px",
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: "20px",
          },
        },
      ],
    });
  }
}

$(document).ready(testimonials);
