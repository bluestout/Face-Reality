import $ from "jquery";

function handleSubmit() {
  setTimeout(() => {
    document.getElementById("shopify-product-reviews-anchor").scrollIntoView();
  }, 500);
}

$(document).on(
  "click",
  "[type='submit'].spr-button.spr-button-primary",
  handleSubmit,
);
