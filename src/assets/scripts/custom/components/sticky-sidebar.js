import $ from "jquery";

const el = {
  container: "[data-sticky-container]",
  sidebar: "[data-sticky-sidebar]",
  header: "[data-section-id='header']",
};

let lastKnownScrollPos = 0;
let ticking = false;

window.addEventListener("scroll", () => {
  lastKnownScrollPos = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      stickySidebar(lastKnownScrollPos);
      ticking = false;
    });

    ticking = true;
  }
});

function stickySidebar(lastPosition, padding = 90) {
  $(el.sidebar).each(function() {
    const $this = $(this);
    if ($(window).width() > 991) {
      const $container = $this.closest(el.container);
      const headerH = $(el.header).outerHeight() || 0;
      if ($container.length > 0) {
        const containerOffset = $container.offset().top;
        const containerHeight = $container.height();
        const maxH = containerHeight - containerOffset - headerH - padding;

        if (lastPosition > containerOffset - headerH) {
          if (lastPosition > maxH) {
            $this.css({ bottom: 0, top: "" });
          } else {
            $this.css({
              bottom:
                containerHeight -
                $this.height() -
                lastPosition +
                containerOffset -
                headerH -
                padding,
              top: "",
            });
          }
        } else {
          $this.css({ top: 0, bottom: null });
        }
      }
    } else {
      $this.css({ bottom: "", top: "", "max-height": "100%" });
    }
  });
}

function prepSticky() {
  $(el.sidebar).each(function() {
    const $this = $(this);
    $this.closest(el.container).css("min-height", $this.height());
    if ($(window).width() > 991) {
      $this.addClass("sticky-active").css({
        height: $this.height(),
      });
    } else {
      $this.removeClass("sticky-active").css({
        height: "auto",
      });
    }
  });
}

$(document).ajaxComplete(stickySidebar);

$(document).ready(() => {
  document.addEventListener("runFilter", () => {
    lastKnownScrollPos = window.scrollY;
    stickySidebar(lastKnownScrollPos);
    setTimeout(() => {
      lastKnownScrollPos = window.scrollY;
      stickySidebar(lastKnownScrollPos);
    }, 201);
  });
});

$(window).on("load resize", prepSticky);
