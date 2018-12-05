import $ from "jquery";
import "slick-carousel";

function caseStudies() {
  const $caseStudies = $("[data-case-studies-slider]");
  $caseStudies.slick({
    swipe: false,
    arrows: true,
    dots: true,
    slidesToShow: 1,
    nextArrow:
      "<button type='button' class='slick-next slick-arrow icon-angle-right'></button>",
    prevArrow:
      "<button type='button' class='slick-prev slick-arrow icon-angle-left'></button>",
  });
}

$(document).ready(caseStudies);
