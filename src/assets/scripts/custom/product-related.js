import $ from "jquery";
import "slick-carousel";

function products() {
  const $products = $(".js-related-products-slider");
  if ($products.length > 0) {
    $products.slick({
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
  products();
});
