// import { formatMoney } from "@shopify/theme-currency";
import $ from "jquery";

const el = {
  add: "[data-add-to-cart]",
  qCart: "[data-quick-cart]",
  qCartContent: "[data-quick-cart-content]",
  overlay: "[data-quick-cart-overlay]",
  qCartButton: "[data-quick-cart-toggle]",
  addedContainer: "[data-item-added-container]",
  addedMessage: "[data-item-added-message]",
  cartQty: "[data-cart-count]",
  cartQtyPos: "[data-cart-count-position]",
};

function ajaxAddToCart(event) {
  event.preventDefault();
  const $source = $(event.currentTarget);
  const $form = $source.closest("form");
  return $.ajax({
    type: "POST",
    url: "/cart/add.js",
    async: false,
    data: $form.serialize(),
    dataType: "json",
    complete: addToCartHandle,
    cache: false,
  });
}

function updateCartQty() {
  $.getJSON("/cart.js", (json) => {
    if (json.item_count > 0) {
      if ($(el.cartQty).length > 0) {
        $(el.cartQty).text(json.item_count);
      } else {
        $(el.cartQtyPos).append(
          `<span class="utility-nav__count" data-cart-count>${
            json.item_count
          }</span>`,
        );
      }
    }
  });
}

function addToCartHandle(jqXHR, textStatus) {
  updateCartQty();
  if (textStatus === "success") {
    itemAddedMessage(
      jqXHR.responseJSON.product_title,
      jqXHR.responseJSON.quantity,
    );
  } else if (jqXHR.responseJSON.message === "Cart Error") {
    showMessage(jqXHR.responseJSON.description);
  } else {
    showMessage("Unable to add to cart at the moment.");
  }
}

function itemAddedMessage(title, qty) {
  if (!title && !qty) {
    return false;
  } else {
    const verb = qty > 1 ? "are" : "is";
    const message = `${qty} of ${title} ${verb} now in your cart.`;
    return showMessage(message);
  }
}

let eventHolder = null;
function showMessage(message) {
  if (!message || typeof message !== "string") {
    return null;
  }
  clearTimeout(eventHolder);
  $(el.addedMessage).html(message);
  $(el.addedContainer).addClass("active");
  eventHolder = setTimeout(() => {
    $(el.addedContainer).removeClass("active");
  }, 3000);
  return eventHolder;
}

$(document).on("click", el.add, ajaxAddToCart);
$(document).ready(updateCartQty);
