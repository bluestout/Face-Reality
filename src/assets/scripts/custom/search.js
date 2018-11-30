import $ from "jquery";

const el = {
  searchToggle: "[data-header-search-toggle]",
  searchform: "[data-header-search-form]",
  searchResults: "[data-header-search-results]",
};

function searchToggle() {
  $(el.searchform).slideToggle("fast");
}

function searchInit() {
  let currentAjaxRequest = null;
  $('form[action="/search"]').each(function() {
    const $input = $("input[name='q']", $(this));
    $input.attr("autocomplete", "off").bind("keyup change", function() {
      const term = $(this).val();
      const $form = $(this).closest("form");
      const searchURL = `/search?q=*${term}*`;
      const $resultsList = $form.siblings(el.searchResults);
      if (
        $resultsList.length > 0 &&
        term.length > 0 &&
        term !== $(this).attr("data-old-term")
      ) {
        $(this).attr("data-old-term", term);
        if (currentAjaxRequest !== null) {
          currentAjaxRequest.abort();
        }
        currentAjaxRequest = $.getJSON(`${searchURL}&view=json`, (data) => {
          $resultsList.empty();
          if (data.results_count === 0) {
            $resultsList.html("<p>No results.</p>");
            $resultsList.fadeIn();
          } else {
            $.each(data.results, (index, item) => {
              const $link = $('<a class="search-results__link"></a>').attr(
                "href",
                item.url,
              );
              console.log(item);
              if (!item.thumbnail.includes("no-image")) {
                $link.append(
                  `<span class="search-results__image-wrap"><img class="search-results__image" src="${
                    item.thumbnail
                  }" /></span>`,
                );
              }
              $link.append(
                `<span class="search-results__title">${item.title}</span>`,
              );
              $link.wrap('<div class="search-results__item"></div>');
              $resultsList.append($link.parent());
            });
            if (data.results_count > 5) {
              $resultsList.append(
                `<div class="search-results__more"><a class="search-results__more-link" href="${searchURL}">Show more</a></div>`,
              );
            }
            $resultsList.fadeIn();
          }
        });
      }
    });
  });
}

$("body").on("click", () => {
  $(el.searchResults).fadeOut(100);
});

$(document).on("click", el.searchToggle, searchToggle);

$(document).ready(searchInit);

/* $("body").on("click", () => {
  $(".js-search-results").fadeOut(100);
}); */
