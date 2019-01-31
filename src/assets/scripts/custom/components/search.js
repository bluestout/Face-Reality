import $ from "jquery";

const el = {
  searchToggle: "[data-header-search-toggle]",
  searchform: "[data-header-search-form]",
  searchResults: "[data-header-search-results]",
  searchInputId: "Search",
};

function searchToggle() {
  if ($(el.searchform).is(":hidden")) {
    setTimeout(() => {
      document.getElementById(el.searchInputId).focus();
    }, 190);
    $(el.searchform).slideToggle("fast");
  }
}

$("body").on("click", (event) => {
  if (typeof $(event.target).closest("form").data("header-search-form") === "undefined") {
    $(el.searchResults).fadeOut(100);
    if ($(el.searchform).is(":visible")) {
      $(el.searchform).slideToggle("fast");
    }
  }
});

$(document).on("click", el.searchToggle, searchToggle);
