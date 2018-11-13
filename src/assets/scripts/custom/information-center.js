import $ from "jquery";

function shareToggle(event) {
  event.preventDefault();
  $("[data-info-sharing]").slideToggle();
}

function infoCenter(event) {
  const value = event.currentTarget.value;
  if (value === "all") {
    $("[data-ic-topic]").fadeIn("fast");
  } else {
    $("[data-ic-topic]")
      .not($(`[data-ic-topic="${value}"]`))
      .fadeOut("fast");
    $(`[data-ic-topic="${value}"]`).fadeIn("fast");
  }
}

function initBacklinks() {
  const backlinks = document.querySelectorAll("[data-info-backlink]");
  for (let i = 0; i < backlinks.length; i++) {
    backlinks[i].setAttribute("href", document.referrer);
    backlinks[i].onclick = historyBack;
  }
}

function historyBack() {
  history.back();
}

$(document).on("change", "[data-infocenter-filter]", infoCenter);

$(document).on("click", "[data-info-share-toggle]", shareToggle);

$(document).ready(() => {
  initBacklinks();
});
