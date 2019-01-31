import $ from "jquery";

const el = {
  button: "[data-cart-update-button]",
  input: "[data-cart-table-quantity]",
};

function alignCartUpdateButtons() {
  const width = $(el.input).width();
  $(el.button).css({ "max-width": width });
}

$(window).on("resize", alignCartUpdateButtons);

$(document).ready(alignCartUpdateButtons);
