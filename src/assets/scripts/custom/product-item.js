/**
 *  Allow every product item to function as a full product
 *  with variant selection, price & availability changes on the fly
 */

import $ from "jquery";
import { formatMoney } from "@shopify/theme-currency";

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
};

// initialize the functionality for each product-item present on the page
function init() {
  $(el.container).each(function() {
    const $this = $(this);
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

$(document).ready(init);
