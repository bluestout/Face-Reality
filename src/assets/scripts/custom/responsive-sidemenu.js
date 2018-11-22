import $ from "jquery";

const el = {
  sidemenu: "[data-responsive-sidemenu]",
  container: "[data-sidemenu-container]",
  menuToggle: "[data-mobile-menu-toggle]",
  subNavToggle: "[data-sidemenu-subnav-toggle]",
  subNavItem: "[data-sidemenu-subnav-item]",
};

function menuToggle(event) {
  event.preventDefault();
  $(el.sidemenu).toggleClass("active");
}

function subNavToggle(event) {
  event.preventDefault();
  $(event.currentTarget)
    .toggleClass("active")
    .siblings(el.subNavItem)
    .slideToggle();
}

$(document).on("click", el.menuToggle, menuToggle);
$(document).on("click", el.subNavToggle, subNavToggle);
