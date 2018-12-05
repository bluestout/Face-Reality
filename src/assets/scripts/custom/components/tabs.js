import $ from "jquery";

function tabs(event) {
  event.preventDefault();
  const $this = $(event.currentTarget);
  if (!$this.hasClass("active")) {
    const $container = $this.closest("[data-tabs-container]");
    const index = $this.data("tab-link");
    const $target = $container.find(`[data-tab="${index}"]`);
    $container
      .find("[data-tab-link]")
      .not($this)
      .removeClass("active");
    $this.addClass("active");
    $container
      .find(".active[data-tab]")
      .removeClass("active")
      .fadeOut("fast", () => {
        $target.fadeIn("fast").addClass("active");
      });
  }
}

$(document).on("click", "[data-tab-link]", tabs);
