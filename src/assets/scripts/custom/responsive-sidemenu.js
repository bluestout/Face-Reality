import $ from "jquery";

const el = {
  sidemenu: "[data-responsive-sidemenu]",
  container: "[data-sidemenu-container]",
  menuToggle: "[data-mobile-menu-toggle]",
  subNavToggle: "[data-sidemenu-subnav-toggle]",
  subNavItem: "[data-sidemenu-subnav-item]",
  header: "[data-section-id='header']",
};

function menuToggle(event) {
  event.preventDefault();
  $(el.sidemenu).toggleClass("active");
  $("html").toggleClass("no-scroll");
}

function subNavToggle(event) {
  event.preventDefault();
  $(event.currentTarget)
    .toggleClass("active")
    .siblings(el.subNavItem)
    .slideToggle();
}

function limitSidemenuHeight() {
  const height = $(window).height();
  $(el.sidemenu).css("max-height", height);
}

$(document).on("click", el.menuToggle, menuToggle);

$(document).on("click", el.subNavToggle, subNavToggle);

$(window).on("load resize", limitSidemenuHeight);
