import $ from "jquery";

const filter = {
  item: "[data-collection-product-column]",
  authorization: "[data-authorization-filter]",
  set: "[data-filter-set]",
  authFilterBox: "[data-authorization-filter-container]",
  prodFilterBox: "[data-product-filter-container]",
  responsiveToggle: "[data-responsive-filter-toggle]",
  responsiveContent: "[data-product-filter-responsive-content]",
  reset: "[data-responsive-filter-reset]",
};

const page = {
  button: "[data-order-load-more]",
  pagination: "[data-collection-pagination]",
  content: "[data-paginate-collection-content]",
  product: "[data-collection-product-column]",
};

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
    let classes = $(this).attr("class");
    if (classes) {
      classes = classes
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
    }
  });

  // depending on the allClasses content show or hide items
  if (allClasses.length > 0) {
    $(`${filter.item}${activeTags}`).fadeIn();
    $(`${filter.item}:not(${activeTags})`).fadeOut();
  } else {
    $(filter.item).fadeIn();
  }
}

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

function resetFilters() {
  $(filter.set).each(function() {
    $(this)
      .removeClass()
      .addClass("product-filter__filter-wrap")
      .find("input")
      .first()
      .prop("checked", true);
  });
  runFilter();
}

function responsiveToggle() {
  if (!$(".responsive-sidemenu").hasClass("active")) {
    $(filter.prodFilterBox).toggleClass("active");
    $("html").toggleClass("no-scroll");
  }
}

// move the authorization filter depending on whether we're in responsive or desktop mode
function MoveAuthorizationFilter() {
  if (
    $(window).width() > 767 &&
    $(filter.authorization, filter.prodFilterBox).length > 0
  ) {
    $(filter.authorization)
      .detach()
      .appendTo($(filter.authFilterBox));
  } else if (
    $(window).width() <= 768 &&
    $(filter.authorization, filter.authFilterBox).length > 0
  ) {
    $(filter.authorization)
      .detach()
      .appendTo($(filter.responsiveContent));
  }
}

function limitResponsiveFilterHeight() {
  const height = $(window).height();
  $(filter.prodFilterBox).css("max-height", height);
}

$(document).on("click", page.button, loadMore);

$(document).on("click", filter.responsiveToggle, responsiveToggle);

$(document).on("click", filter.reset, resetFilters);

$(document).on("click", `${filter.set} input`, toggleFilter);

$(window).on("load resize", MoveAuthorizationFilter);

$(window).on("load resize", limitResponsiveFilterHeight);
