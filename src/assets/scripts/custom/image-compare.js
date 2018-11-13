import $ from "jquery";

function compareSetPosition($base, value) {
  $base.find("[data-compare-after-wrap]").css("left", `${value}%`);
  $base.find("[data-compare-after-image]").css("left", `-${value}%`);
  $base.find("[data-compare-visual-slide]").css("left", `${value}%`);
}

function compareChanged(event) {
  const pos = event.currentTarget.valueAsNumber;
  const $base = $(event.currentTarget).closest("[data-compare-base]");
  if (typeof pos === "number" && pos > -1 && pos < 101) {
    compareSetPosition($base, pos);
  }
}

$(document).on("input", "[data-compare-range]", compareChanged);

$(document).ready(() => {
  $("[data-compare-base]").each(function() {
    const $base = $(this);
    const pos = $base.data("compare-base");
    if (typeof pos === "number" && pos > -1 && pos < 101) {
      compareSetPosition($base, pos);
    }
  });
});
