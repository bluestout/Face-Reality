const href = window.location.href;

if (href.indexOf("/apps/omega-search/") > -1) {
  document.addEventListener("DOMContentLoaded", overrides, false);
}

function overrides() {
  const column = document.getElementsByClassName("col-lg-8 col-sm-11 col-12");
  if (column) {
    column[0].classList.add("omega-app-override");
  }
}

$(document).on("DOMNodeInserted", (event) => {
  if (
    event &&
    event.target &&
    event.target.classList &&
    event.target.classList.value
  ) {
    if ($(event.target).hasClass("os-e os-sidebar")) {
      const $listItems = $(event.target).find(".os-e.bucket");
      $listItems.each(function() {
        $(this).html(
          $(this)
            .html()
            .replace("use-", ""),
        );
        $(this).html(
          $(this)
            .html()
            .replace("skin-", ""),
        );
      });
    }
  }
});
