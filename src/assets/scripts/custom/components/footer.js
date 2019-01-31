import $ from "jquery";

const el = {
  link: "[data-footer-nav-main]",
  list: "[data-footer-nav-list]",
};

function footerNav() {
  if ($(window).width() < 768) {
    $(el.link).on("click", (event) => {
      event.preventDefault ? event.preventDefault() : (event.returnValue = false);
      const $this = $(event.currentTarget);
      const $sibling = $this.siblings(el.list);
      if ($sibling.length > 0 && $sibling.css("display") === "none") {
        $sibling.slideDown();
        $this.addClass("active");
      } else if ($sibling.length > 0 && $sibling.css("display") !== "none") {
        $sibling.slideUp();
        $this.removeClass("active");
      }
    });
  } else {
    $(el.link).removeClass("active");
    $(el.list).slideDown();
  }
}

$(document).ready(footerNav);
