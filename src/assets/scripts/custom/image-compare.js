import $ from 'jquery';

function compareSetPosition(value) {
  $('[data-compare-after-wrap]').css('left', `${value}%`);
  $('[data-compare-after-image]').css('left', `-${value}%`);
  $('[data-compare-visual-slide]').css('left', `${value}%`);
}

function compareChanged(event) {
  const pos = event.currentTarget.valueAsNumber;
  if (typeof pos === 'number' && pos > -1 && pos < 101) {
    compareSetPosition(pos);
  }
}

$(document).on('input', '[data-compare-range]', compareChanged);

$(document).ready(() => {
  const base = $('[data-compare-base]').data('compare-base');
  if (typeof base === 'number' && base > -1 && base < 101) {
    compareSetPosition(base);
  }
});
