import $ from "jquery";

const el = {
  offset: "[data-header-offset]",
  header: "[data-section-id='header']",
  link: "[data-primary-nav-link]",
  sublist: "[data-primary-nav-sublist]",
};

function headerOffset() {
  const $offset = $(el.offset);
  const headerHeight = $(el.header).outerHeight();
  const currentHeight = $(el.offset).outerHeight();
  if (headerHeight !== currentHeight) {
    $offset.css("min-height", headerHeight);
  }
}

function listIn(event) {
  const $this = $(event.currentTarget);
  $this.siblings(el.link).addClass("active");
}

function listOut(event) {
  const $this = $(event.currentTarget);
  $this.siblings(el.link).removeClass("active");
}

$(el.sublist).hover(listIn, listOut);

$(window).on("load resize", headerOffset);
