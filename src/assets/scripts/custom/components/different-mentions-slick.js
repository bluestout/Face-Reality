import $ from "jquery";
import "slick-carousel";

function mentions() {
  const $mentions = $("[data-different-mentions-slick]");
  if ($mentions.length > 0) {
    if ($(window).width() > 767) {
      $mentions.slick({
        swipeToSlide: true,
        arrows: true,
        dots: true,
        slidesToShow: 5,
        nextArrow:
          "<button type='button' class='slick-next slick-arrow icon-arrow-right'></button>",
        prevArrow:
          "<button type='button' class='slick-prev slick-arrow icon-arrow-left'></button>",
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    }
  }
}

$(document).ready(mentions);
