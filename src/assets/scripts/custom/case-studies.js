import $ from "jquery";

const el = {
  row: "[data-case-studies-row]",
  button: "[data-case-studies-load-more]",
};

function loadMoreStudies() {
  const $target = $('[data-case-studies-row="false"]').first();
  if ($target.length > 0) {
    $target.slideDown().attr("data-case-studies-row", "true");
    if ($target.length === 1) {
      $(el.button).fadeOut();
    }
  } else {
    $(el.button).fadeOut();
  }
}

$(document).on("click", el.button, loadMoreStudies);
