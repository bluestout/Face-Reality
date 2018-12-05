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
    error: addToCartFail,
    success: addToCartSuccess($form.serializeArray()),
    cache: false,
  });
}

function addToCartFail(jqXHR, textStatus, errorThrown) {
  const response = $.parseJSON(jqXHR.responseText);
  console.log(response, errorThrown, textStatus);
}

function addToCartSuccess(formArray) {
  let title = "";
  let qty = 0;
  for (let i = 0; i < formArray.length; i++) {
    const element = formArray[i];
    if (element.name === "product-title") {
      title = element.value;
    }
    if (element.name === "quantity") {
      qty = element.value;
    }
  }
  itemAddedMessage(title, qty);
}

let eventHolder = null;
function itemAddedMessage(title, qty) {
  if (!title && !qty) {
    return false;
  } else {
    clearTimeout(eventHolder);
    const verb = qty > 1 ? "have" : "has";
    $(el.addedMessage).html(`${qty} of ${title} ${verb} been added to cart.`);
    $(el.addedContainer).addClass("active");
    eventHolder = setTimeout(() => {
      $(el.addedContainer).removeClass("active");
    }, 4500);
    return eventHolder;
  }
}

/*
// update the quick cart
function updateQuickCart(cart) {
  const $quickCart = $(el.qCartContent);
  let cartItems = "";
  for (let i = 0; i < cart.items.length; i++) {
    // prepare all the parts to show for each product in cart
    const product = cart.items[i];
    let image = "";
    if (product.image.length > 0) {
      image = Shopify.resizeImage(product.image, "160x160");
      image = `<img src="${image}" class="quick-cart__image" alt="${
        product.product_title
      }"/>`;
    }
    const shownPrice = formatMoney(product.price);
    const originalPrice = formatMoney(product.original_price);
    let price = "";
    if (product.original_price > product.price) {
      price = `<span class="visually-hidden">Discounted Price</span>
      ${shownPrice}
      <span class="visually-hidden">Original Price</span>
      <s>${originalPrice}</s>`;
    } else if (product.price === 0) {
      price = "Free!";
    } else {
      price = shownPrice;
    }
    let variantTitle = "";
    if (product.variant_title) {
      variantTitle = `<p class="quick-cart__item-text">${
        product.variant_title
      }</p>`;
    }

    const showQuantity = `
    <div class="quick-cart__item-qty">
      <span class="quick-cart__qty-change js-qty-change icon-minus-circle" data-src=".line-${
        product.line
      }" data-direction="down"></span>
      <input type="number"
        class="quick-cart__qty line-${product.line}"
        name="updates[]"
        id="qc_updates_${product.key}"
        data-line="${product.line}"
        value="${product.quantity}"
        min="0"
        aria-label="Quantity"/>
      <span class="quick-cart__qty-change js-qty-change icon-plus-circle" data-src=".line-${
        product.line
      }" data-direction="up"></span>
    </div>`;
    const showLink = `href="${product.url}"`;

    // put together all the data into one line item, append to whole cart
    cartItems += `
    <div class="quick-cart__item" data-line="${product.line}" data-quantity="${
      product.quantity
    }">
      <div class="quick-cart__image-wrap">
        <a ${showLink} class="quick-cart__image-link">
          ${image}
        </a>
        <a class="quick-cart__remove icon-cross " href="/cart/change?line=${i}&amp;quantity=0" data-remove-item="${
      product.line
    }"></a>
      </div>
      <div class="quick-cart__item-content">
        <a ${showLink} >
          <h4 class="quick-cart__item-title">${product.product_title}</h4>
          ${variantTitle}
        </a>
        <div class="quick-cart__item-info">
          ${showQuantity}
          <div class="quick-cart__item-price">${price}</div>
        </div>
      </div>
    </div>
    `;
  }

  // insert all the prepared items in the cart
  const form = `
    <form action="/cart" method="post" novalidate class="quick-cart__form">
    <div class="quick-cart__items-wrap js-quick-items-wrap">
      ${cartItems}
    </div>
    <div class="quick-cart__totals">
      <span class="quick-cart__totals-text quick-cart__totals-text--left">Subtotal</span>
      <span class="quick-cart__totals-text quick-cart__totals-text--right">${formatMoney(
        cart.total_price,
      )}</span>
    </div>
    <input type="submit" name="checkout" class="quick-cart__checkout button button--main" value="Secure Checkout"/>
    </form>
  `;

  // replace the cart content
  return $quickCart.html(form);
}
*/

/*
function returnCartIfNotEmpty(json) {
  // if json has items, update cart. If not, return empty
  if (json.item_count > 0) {
    updateQuickCart(json);
    // updateQuickCartCount(json);
  } else {
    // QuickcartIsEmpty();
    // updateQuickCartCount(json);
  }
}
*/

/*
// open the quickcart after an item has been added to cart
function quickCartOpen(open) {
  if (open) {
    $(el.overlay).addClass("active");
    $(el.qCart).addClass("open");
  } else {
    $(el.qCart).removeClass("open");
  }
}
 */

/*
// show/hide the quickcart
function quickCartToggle(event) {
  if (typeof event !== "undefined") {
    event.preventDefault();
  }
  $(el.qCart).toggleClass("open");
  $(el.overlay).toggleClass("active");
}
 */

// $(document).on("click", el.qCartButton, quickCartToggle);

$(document).on("click", el.add, ajaxAddToCart);
