import $ from "jquery";

const el = {
  button: "[data-qty-change]",
};

function QuantityChange(event) {
  if (typeof event !== "undefined") {
    event.preventDefault();
  }
  const $source = $(event.currentTarget);
  const $input = $($source.data("qty-change"));
  // if no max, inventory is not tracked, so there's technically no limit to how many of that product can be added
  const max = $input.attr("max") || 99999;
  const direction = $source.data("direction");
  if (direction === "down") {
    if ($input.val() > 0) {
      $input.val(parseInt($input.val(), 10) - 1);
    }
  } else if (direction === "up") {
    if ($input.val() < max) {
      $input.val(parseInt($input.val(), 10) + 1);
    }
  }
  $input.change();
}

$(document).on("click", el.button, QuantityChange);
