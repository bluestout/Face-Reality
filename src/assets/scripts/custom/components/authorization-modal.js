import $ from "jquery";

const el = {
  toggle: "[data-toggle-authorization-modal]",
  modal: "[data-authorization-modal]",
  video: "[data-authorization-video]",
};
let timeHolder;
function toggleModal(event) {
  event.preventDefault();
  $(el.modal).fadeToggle();
  $(el.modal).toggleClass("active");
  clearTimeout(timeHolder);
  if (!$(el.modal).hasClass("active")) {
    timeHolder = setTimeout(() => {
      $(el.video)
        .get(0)
        .pause();
    }, 100);
  } else if ($(el.modal).hasClass("active")) {
    timeHolder = setTimeout(() => {
      $(el.video)
        .get(0)
        .play();
    }, 100);
  }
}

$(el.video).hover(
  () => {
    $(el.video).attr("controls", "controls");
  },
  () => {
    $(el.video).removeAttr("controls");
  },
);

$(document).on("click", el.toggle, toggleModal);
