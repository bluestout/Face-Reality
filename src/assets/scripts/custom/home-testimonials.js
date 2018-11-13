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
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: "33px",
          },
        },
      ],
    });
  }
}

$(document).ready(() => {
  testimonials();
});
