import $ from "jquery";
import "slick-carousel";

function products() {
  const $products = $("[data-related-products-slider]");
  if ($products.length > 0) {
    $products.slick({
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

$(document).ready(products);
