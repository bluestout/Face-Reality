import $ from "jquery";
import "slick-carousel";

function mentions() {
  const $mentions = $(".js-different-mentions-slider");
  if ($mentions.length > 0) {
    $mentions.slick({
      swipeToSlide: true,
      arrows: true,
      dots: true,
      slidesToShow: 5,
      nextArrow:
        "<button type='button' class='slick-next slick-arrow icon-arrow-right'></button>",
      prevArrow:
        "<button type='button' class='slick-prev slick-arrow icon-arrow-left'></button>",
    });
  }
}

$(document).ready(() => {
  mentions();
});
