import $ from "jquery";

const el = {
  submit: "[data-newsletter-submit]",
  input: "[data-newsletter-input]",
};

function checkInput(event) {
  const input = $(event.currentTarget).val();
  if (
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i.test(input)
  ) {
    $(event.currentTarget)
      .siblings(el.submit)
      .removeAttr("title")
      .prop("disabled", false);
  } else {
    $(event.currentTarget)
      .siblings(el.submit)
      .attr("title", "Enter a valid email")
      .prop("disabled", true);
  }
}

$(document).on("input", el.input, checkInput);
