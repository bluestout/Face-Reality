import $ from "jquery";

const el = {
  sticky: ".js-sticky-sidebar",
  container: ".js-sticky-container",
  header: "[data-section-id='header']",
};

function stickyInit() {
  if ($(".js-sticky-sidebar").length > 0 && $(window).width() > 991) {
    const filter = $("body").hasClass("template-collection") ? 60 : 0;
    const headerHeight = $(el.header).outerHeight() + filter + 20;
    const sidebar = new StickySidebar(".js-sticky-sidebar", {
      topSpacing: headerHeight,
      bottomSpacing: 10,
      containerSelector: ".js-sticky-sidebar-container",
    });
  }
}

$(document).ready(() => {
  stickyInit();
});
