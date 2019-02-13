import $ from "jquery";

const el = {
  submit: "[data-newsletter-submit]",
  input: "[data-newsletter-input]",
  message: "[data-newsletter-message]",
};

function checkInput() {
  if (
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i.test(
      $(el.input).val(),
    )
  ) {
    $(el.input)
      .siblings(el.submit)
      .removeAttr("title")
      .removeClass("disabled");
  } else {
    $(el.input)
      .siblings(el.submit)
      .attr("title", "Enter a valid email")
      .addClass("disabled");
  }
}

let eventHolder;
function checkSubmit(event) {
  if ($(el.submit).hasClass("disabled")) {
    event.preventDefault();
    $(el.message).addClass("active");
    clearTimeout(eventHolder);
    eventHolder = setTimeout(() => {
      $(el.message).removeClass("active");
    }, 2000);
  }
}

$(document).on("input", el.input, checkInput);

$(document).ready(checkInput);

$(document).on("click", el.submit, checkSubmit);
