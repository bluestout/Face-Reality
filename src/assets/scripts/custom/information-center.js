import $ from "jquery";

const el = {
  sharing: "[data-info-sharing]",
  shareToggle: "[data-info-share-toggle]",
  topic: "[data-ic-topic]",
  backLink: "[data-info-backlink]",
  filter: "[data-infocenter-filter]",
  morebutton: "[data-info-topics-load-more]",
};

function shareToggle(event) {
  $(el.sharing).slideToggle();
}

function infoCenter(event) {
  const value = event.currentTarget.value;
  if (value === "all") {
    $(el.topic).fadeIn("fast");
  } else {
    $(el.topic)
      .not($(`[data-ic-topic="${value}"]`))
      .fadeOut("fast");
    $(`[data-ic-topic="${value}"]`)
      .attr("data-ic-initial", "true")
      .fadeIn("fast");
  }
}

function initBacklinks() {
  const backlinks = document.querySelectorAll(el.backLink);
  for (let i = 0; i < backlinks.length; i++) {
    backlinks[i].setAttribute("href", document.referrer);
    backlinks[i].onclick = historyBack;
  }
}

function loadMoreTopics() {
  const $targets = $("[data-ic-initial=false]");

  if ($targets.length > 0) {
    $targets.each(function(index) {
      if (index < 5) {
        $(this)
          .slideDown()
          .attr("data-ic-initial", "true");
      }
    });
    if ($targets.length <= 5) {
      $(el.button).fadeOut();
    }
  } else {
    $(el.button).fadeOut();
  }
}

function historyBack() {
  history.back();
}

$(document).on("change", el.filter, infoCenter);

$(document).on("click", el.shareToggle, shareToggle);

$(document).on("click", el.morebutton, loadMoreTopics);

$(document).ready(initBacklinks);
