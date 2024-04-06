$(function () {
  const amenityIds = {};
  $('input:checkbox').change(function () {
    const dataId = $(this).data('id');
    const dataName = $(this).data('name');

    if (dataId in amenityIds) {
      delete amenityIds[dataId];
    } else {
      amenityIds[dataId] = dataName;
    }
    const selectItems = [];
    $('.amenities > h4').html('&nbsp;');
    $.each(amenityIds, function (key, value) {
      selectItems.push(value);
    });
    const desiredWidthInner = $('.amenities').width();

    const toPrint = selectItems.join(', ');

    let maxLength = 0;
    while ($('.amenities h4').html(toPrint.substring(0, maxLength)).width() <= desiredWidthInner && maxLength < toPrint.length) { maxLength += 1; }
    if ($('.amenities h4').html(toPrint.substring(0, maxLength)).width() <= $('.amenities').width()) {
      $('.amenities h4').html(toPrint);
    } else {
      maxLength -= 3;
      $('.amenities h4').html(toPrint.substring(0, maxLength) + '...');
    }
  });
  const apiUrl = 'http://localhost:5001/api/v1/status/';
  $.get(apiUrl, function (response) {
    if (response.status === 'OK') {
      $('div#api_status').addClass('available');
    }
  });
});
