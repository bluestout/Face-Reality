import $ from "jquery";

const el = {
  target: "[data-site-link-change]",
  source: "[data-site-link]",
};

function setLink() {
  const source = $(el.source).text();
  if (source.length > 0) {
    $(el.target).each(function() {
      const $this = $(this);
      $this.attr("href", source);
    });
  }
}

$(document).ready(setLink);
