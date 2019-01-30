import $ from "jquery";

const el = {
  offset: "[data-header-offset]",
  header: "[data-section-id='header']",
  link: "[data-primary-nav-link]",
  sublist: "[data-primary-nav-sublist]",
  authSwitch: "[data-collection-authorization-switch]",
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

function isHeaderScrolled(scroll) {
  if (scroll > 5) {
    $(el.header).addClass("scrolled");
  } else {
    $(el.header).removeClass("scrolled");
  }
}

function isCollFilterScrolled(scroll, authPos) {
  if (scroll > authPos - $(el.header).outerHeight()) {
    $(el.authSwitch)
      .css("top", $(el.header).outerHeight())
      .addClass("scrolled");
    $(el.header).addClass("no-box");
  } else {
    $(el.authSwitch).removeClass("scrolled");
    $(el.header).removeClass("no-box");
  }
}

$(el.sublist).hover(listIn, listOut);

$(window).on("resize", headerOffset);

$(document).ready(headerOffset);

function scrolling() {
  let authPos = 0;
  if ($(el.authSwitch).length > 0) {
    authPos = $(el.authSwitch).offset().top;
  }
  let lastKnownScrollPos = 0;
  let ticking = false;
  lastKnownScrollPos = window.scrollY;
  isHeaderScrolled(lastKnownScrollPos);

  window.addEventListener("scroll", () => {
    lastKnownScrollPos = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        isHeaderScrolled(lastKnownScrollPos);
        if ($(el.authSwitch).length > 0) {
          isCollFilterScrolled(lastKnownScrollPos, authPos);
        }
        ticking = false;
      });

      ticking = true;
    }
  });
}

$(document).ready(scrolling);
