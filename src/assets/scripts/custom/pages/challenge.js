// if redirected to challenge page by newsletter form, scroll the page to the top
const href = window.location.href;
if (href.indexOf("challenge#contact_form") > -1) {
  document.getElementById("contact_form").removeAttribute("id");
}
