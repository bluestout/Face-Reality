import $ from "jquery";
// change the input visuals & make the ajax request, if required
function QuantityChange(event) {
  if (typeof event !== "undefined") {
    event.preventDefault();
  }
  const $source = $(event.currentTarget);
  const $input = $($source.data("qty-change"));
  const direction = $source.data("direction");
  if (direction === "down") {
    if ($input.val() > 1) {
      $input.val(parseInt($input.val(), 10) - 1);
    }
  } else if (direction === "up") {
    $input.val(parseInt($input.val(), 10) + 1);
  }
  $input.change();
}

$(document).on("click", "[data-qty-change]", QuantityChange);
