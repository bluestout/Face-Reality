import $ from "jquery";

// load more order items on click - pagination ajax
function loadMore(event) {
  event.preventDefault();
  const $source = $(event.currentTarget);
  const link = $source.attr("href");
  const $paginationContainer = $("[data-order-pagination]");
  $paginationContainer.html("<div class='linear-loader'></div>");
  $.get(link, (data) => {
    const $content = $("[data-table-pagination-row]", data);
    const $moreLink = $("[data-order-load-more]", data);
    $("[data-table-pagination-row]:last-of-type").after($content);
    if ($moreLink.length > 0) {
      $paginationContainer.html($moreLink);
    } else {
      $paginationContainer.html("");
    }
  });
}

$(document).on("click", "[data-order-load-more]", loadMore);
