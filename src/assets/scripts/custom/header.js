import $ from "jquery";

function headerOffset() {
  const $offset = $("[data-header-offset]");
  const headerHeight = $("[data-section-id='header']").outerHeight();
  $offset.css("min-height", headerHeight);
}

$(document).ready(() => {
  headerOffset();
});
