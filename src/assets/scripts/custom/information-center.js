import $ from 'jquery';

function infoCenter(event) {
  const value = event.currentTarget.value;
  if (value === 'all') {
    $('[data-ic-topic]').fadeIn('fast');
  } else {
    $('[data-ic-topic]')
      .not($(`[data-ic-topic="${value}"]`))
      .fadeOut('fast');
    $(`[data-ic-topic="${value}"]`).fadeIn('fast');
  }
}

$(document).on('change', '[data-infocenter-filter]', infoCenter);
