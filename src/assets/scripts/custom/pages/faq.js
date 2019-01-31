import $ from "jquery";

function faqAccordion(event) {
  event.preventDefault ? event.preventDefault() : (event.returnValue = false);
  const $this = $(this);
  const $parent = $this.closest("[data-faq-item]");

  $("[data-faq-item]")
    .not($parent)
    .removeClass("active");

  $("[data-faq-answer]")
    .not($parent.find("[data-faq-answer]"))
    .slideUp("fast");

  $parent.toggleClass("active");
  $parent.find("[data-faq-answer]").slideToggle("fast");
}

function faqFilter() {
  setTimeout(() => {
    const $this = $("[data-faq-filter-input]");
    const value = $this.val();
    if (value.length > 0) {
      $("[data-faq-question-text]").each(function() {
        const $item = $(this);
        if ($item.text().includes(value)) {
          $item.closest("[data-faq-item]").slideDown("fast");
        } else {
          $item.closest("[data-faq-item]").slideUp("fast");
        }
      });
    } else {
      $("[data-faq-item]").slideDown("fast");
    }
  }, 200);
}

$(document).on("click", "[data-faq-question]", faqAccordion);

$(document).on("change, keydown", "[data-faq-filter-input]", faqFilter);
