import $ from "jquery";

const filter = {
  item: "[data-collection-product-column]",
  authorization: "[data-authorization-filter]",
  set: "[data-filter-set]",
  list: "[data-collection-filter-global-list]",
};

const page = {
  button: "[data-order-load-more]",
  pagination: "[data-collection-pagination]",
  content: "[data-paginate-collection-content]",
  product: "[data-collection-product-column]",
};

$(document).on("click", `${filter.set} input`, toggleFilter);

// remove falsy && empty values from array
function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

function toggleFilter(event) {
  const $source = $(event.currentTarget);
  const tag = $source.val();
  const $currentset = $source.closest($(filter.set));

  // when clicking an input, change the active tag classes
  if ($source[0].tagName === "INPUT") {
    $currentset.removeClass();
    $currentset.addClass(`product-filter__filter-wrap ${tag}`);
  }

  runFilter();
}

// do the actual filtering here
function runFilter() {
  const $allSets = $(filter.set);
  let allClasses = [];
  let activeTags = "";

  // remove the -all tag and the element class from the query
  $allSets.each(function() {
    let classes = $(this)
      .attr("class")
      .replace(/js-filter-set/, "")
      .replace(/product-filter__filter-wrap/, "")
      .replace(/usecase-all/, "")
      .replace(/skin-all/, "")
      .replace(/type-all/, "")
      .replace(/authorization-all/, "")
      .split(/\s+/);
    classes = cleanArray(classes);
    if (classes.length > 0) {
      for (let i = 0; i < classes.length; i++) {
        activeTags += `.${classes[i]}`;
        allClasses.push(classes[i]);
      }
    }
    // push the remaining (actual tags) to the allclasses array
  });

  // depending on the allClasses content show or hide items
  if (allClasses.length > 0) {
    $(`${filter.item}${activeTags}`).fadeIn();
    $(`${filter.item}:not(${activeTags})`).fadeOut();
  } else {
    $(filter.item).fadeIn();
  }
}

/*
function authorizationChange() {
  $(`${el.authorization} input`).change(() => {
    // const value = $(`${el.authorization} input:checked`).val();
    console.log(value);
    if (value === "all") {
    } else if (value === "authorization-required") {
    } else if (value === "no-authorization") {
    }
  });
}

$(document).ready(authorizationChange);
 */

// load more order items on click - pagination ajax
function loadMore(event) {
  event.preventDefault();
  const $source = $(event.currentTarget);
  const link = $source.attr("href");
  $(page.pagination).html("<div class='linear-loader'></div>");
  $.get(link, (data) => {
    const $content = $(`${page.content} ${page.product}`, data);
    const $moreLink = $(page.button, data);
    $(page.content).append($content);
    $content.hide().slideDown();
    runFilter();
    if ($moreLink.length > 0) {
      $(page.pagination).html($moreLink);
    } else {
      $(page.pagination).html("");
    }
  });
}

$(document).on("click", page.button, loadMore);
