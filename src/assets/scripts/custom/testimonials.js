import $ from "jquery";

function loadMore(event) {
  event.preventDefault();
  const $this = $(event.currentTarget);
  let index = $this.data("testimonials-loader");
  const next = index + 1;
  const $target = $(`[data-testimonials-page-row="${index}"]`);
  const $next = $(`[data-testimonials-page-row="${next}"]`);
  if ($next.length === 0) {
    $this.fadeOut();
  }
  if ($target.length > 0) {
    $target.slideDown();
    index++;
    $this.data("testimonials-loader", index);
  }
}

$(document).on("click", "[data-testimonials-loader]", loadMore);
