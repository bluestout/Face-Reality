import $ from 'jquery';

function switchTabs(event) {
  event.preventDefault();
  const $this = $(event.currentTarget);
  if (!$this.hasClass('active')) {
    const target = $this.data('tab-target');
    const $target = $(`[data-col-type-tab="${target}"]`);
    $('[data-tab-target]')
      .not($this)
      .removeClass('active');
    $this.addClass('active');
    $target.siblings('[data-col-type-tab]').fadeOut('fast', () => {
      $target.fadeIn('fast');
    });
  }
}

$(document).on('click', '.collection-by-type [data-tab-target]', switchTabs);
