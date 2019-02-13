import $ from "jquery";
import { formatMoney } from "@shopify/theme-currency";

/**
 *  Allow every product item to function as a full product
 *  with variant selection, price & availability changes on the fly
 */
// all of these are in the product-item snippet
const el = {
  container: "[data-product-item]",
  varSelect: "[data-product-item-select]",
  priceWrap: "[data-product-item-price-wrapper]",
  price: "[data-product-item-price]",
  priceCompare: "[data-product-item-compare-price]",
  addToCart: "[data-product-item-add-button]",
  addToCartText: "[data-add-button-text]",
  option: "[data-product-item-option]",
  optionInput: "[data-product-item-option-input]",
  json: "[data-product-item-json]",
  imageWrap: "[data-product-image-wrapper]",
  cTitle: "[data-collection-banner-title]",
};

const filter = {
  product: "[data-product-column]",
  authorization: "[data-authorization-filter]",
  set: "[data-filter-set]",
  authFilterBox: "[data-authorization-filter-container]",
  prodFilterBox: "[data-product-filter-container]",
  responsiveToggle: "[data-responsive-filter-toggle]",
  responsiveContent: "[data-product-filter-responsive-content]",
  reset: "[data-responsive-filter-reset]",
  noResults: "[data-collections-no-results]",
};

const page = {
  button: "[data-order-load-more]",
  pagination: "[data-collection-pagination]",
  content: "[data-paginate-collection-content]",
  product: "[data-product-column]",
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
  $(filter.noResults).fadeOut();

  // when clicking an input, change the active tag classes
  if ($source[0].tagName === "INPUT") {
    $currentset.removeClass();
    $currentset.addClass(`product-filter__filter-wrap ${tag}`);
  }

  runFilter();
}

const filterEvent = new Event("runFilter");

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
    $(`${filter.product}${activeTags}`).fadeIn(200);
    $(`${filter.product}:not(${activeTags})`).fadeOut(200);
    // this if prevents infinite recursion - run only if no results after filtering
    setTimeout(() => {
      if (
        $(`${filter.product}${activeTags}`).length <= 9 &&
        $(page.button).length > 0
      ) {
        loadMore();
      } else if (
        $(`${filter.product}${activeTags}`).length === 0 &&
        $(page.button).length === 0
      ) {
        $(filter.noResults).fadeIn();
      }
    }, 100);
  } else {
    $(filter.product).fadeIn(200);
  }

  return document.dispatchEvent(filterEvent);
}

// load more order items on click - pagination ajax
function loadMoreClick(event) {
  event.preventDefault ? event.preventDefault() : (event.returnValue = false);
  loadMore();
}

// load more order items on click - pagination ajax
function loadMore() {
  const $source = $(page.button);
  if ($source.length <= 0) {
    return false;
  }
  const link = $source.attr("href");
  $(page.pagination).html("<div class='linear-loader'></div>");
  $.get(link, (data) => {
    const $content = $(`${page.content} ${page.product}`, data);
    console.log($(`${page.content}`, data));
    const $moreLink = $(page.button, data);
    $(page.content).append($content);
    $content.hide().slideDown();
    runFilter();
    productItemInit();
    if ($moreLink.length > 0) {
      $(page.pagination).html($moreLink);
    } else {
      $(page.pagination).html("");
    }
    document.dispatchEvent(filterEvent);
    return true;
  });
  return false;
}

function resetFilters() {
  $(filter.noResults).fadeOut();
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

// initialize the functionality for each product-item present on the page
function productItemInit() {
  $(el.container)
    .not(".script-loaded")
    .each(function() {
      const $this = $(this);
      $this.addClass("script-loaded");
      const $options = $(el.optionInput, $this);

      if ($options.length > 0) {
        const jsonObject = JSON.parse($(el.json, $this).html()) || [];
        $options.change(() => {
          const options = getCurrentOptions($this);
          const variants = jsonObject.variants;
          const variant = getVariant(options, variants);
          setNewVariant($this, variant);
        });
      }
    });
}

function switchImage(imageId, parent) {
  const $newImage = $(`${el.imageWrap}[data-image-id='${imageId}']`, parent);
  const $otherImages = $(
    `${el.imageWrap}:not([data-image-id='${imageId}'])`,
    parent,
  );
  $newImage.removeClass("hide");
  $otherImages.addClass("hide");
}

// this function sets new values for prices, id & availability on the parent product item
function setNewVariant(parent, variant) {
  if (!parent || !variant) {
    return null;
  }

  // set id
  $(el.varSelect, parent).val(variant.id);

  // set price
  $(el.price, parent).html(formatMoney(variant.price, theme.moneyFormat));
  if (variant.compare_at_price > variant.price) {
    $(el.priceCompare, parent).html(
      formatMoney(variant.compare_at_price, theme.moneyFormat),
    );
  } else {
    $(el.priceCompare, parent).html("");
  }

  // set availability
  if (variant.available) {
    $(el.addToCart, parent).prop("disabled", false);
    $(el.addToCartText, parent).html(theme.strings.addToCart);
  } else {
    $(el.addToCart, parent).prop("disabled", true);
    $(el.addToCartText, parent).html(theme.strings.soldOut);
  }

  // switch image
  if (variant.featured_image) {
    switchImage(variant.featured_image.id, parent);
  }
  return null;
}

// get the current product variant options
function getCurrentOptions(source) {
  if (!source) {
    return null;
  }
  const currentOptions = [];
  const $option = $(el.option, source);
  for (let i = 0; i < $option.length; i++) {
    const currentOption = {};
    const $element = $($option[i]);
    const $input = $(`${el.optionInput}:checked`, $element);
    if ($input) {
      currentOption.value = $input.val();
      currentOption.index = $input.data("index");
      currentOptions.push(currentOption);
    }
  }
  return currentOptions;
}

// match the variants we get from the input to the json content and return matching variant
function getVariant(options, variants) {
  if (!options || !variants) {
    return null;
  }
  let found = false;
  variants.forEach((variant) => {
    let satisfied = true;

    options.forEach((option) => {
      if (satisfied) {
        satisfied = option.value === variant[option.index];
      }
    });

    if (satisfied) {
      found = variant;
    }
  });
  return found || null;
}

function getUrlParams() {
  const params = {};
  if (window.location.search.length > 0) {
    document.location.search
      .substr(1)
      .split("&")
      .forEach((pair) => {
        const paramsSplit = pair.split("=");
        params[paramsSplit[0]] = paramsSplit[1];
      });
  }
  return params;
}

function runUrlFilter() {
  const params = getUrlParams();
  if (params.authorization) {
    $(`#authorization-filter-${params.authorization}`).click();
    setCollectionTitle(params.authorization, "authorization");
  }
  if (params.type) {
    $(`#type-f-${params.type}`).click();
    setCollectionTitle(params.type, "type");
  }
  if (params.usecase) {
    $(`#usecase-f-${params.usecase}`).click();
    setCollectionTitle(params.usecase, "use");
  }
  if (params.skin) {
    $(`#skin-f-${params.skin}`).click();
    setCollectionTitle(params.skin, "skin");
  }
}

function deHandleize(str) {
  return str.replace("-", " ").replace("_", " ");
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function setCollectionTitle(titleRaw, type) {
  let title = "";
  if (type === "skin") {
    title = titleRaw.replace("skin-", "");
    title = capitalizeFirstLetter(deHandleize(title));
    title += " Skin";
  } else if (type === "type") {
    if (titleRaw === "sunscreen") {
      title = "Sun Protection";
    } else if (titleRaw === "acne-prevention") {
      title = "Acne Prevention";
    } else if (titleRaw === "miscellaneous") {
      title = capitalizeFirstLetter(deHandleize(titleRaw));
    } else {
      title = capitalizeFirstLetter(deHandleize(titleRaw));
      title += "s";
    }
  }
  return $(el.cTitle).text(title);
}

function initialize() {
  productItemInit();
  runUrlFilter();
}

if (document.getElementsByClassName("template-collection").length) {
  $(document).ready(initialize);

  $(document).on("click", page.button, loadMoreClick);

  $(document).on("click", filter.responsiveToggle, responsiveToggle);

  $(document).on("click", filter.reset, resetFilters);

  $(document).on("click", `${filter.set} input`, toggleFilter);

  $(window).on("load resize", MoveAuthorizationFilter);
}
