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
    while (
      $('.amenities h4').html(toPrint.substring(0, maxLength)).width() <=
        desiredWidthInner &&
      maxLength < toPrint.length
    ) {
      maxLength += 1;
    }
    if (
      $('.amenities h4').html(toPrint.substring(0, maxLength)).width() <=
      $('.amenities').width()
    ) {
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
  const placeSearchUrl = 'http://localhost:5001/api/v1/places_search/';
  const data = {};

  $.post({
    url: placeSearchUrl,
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function (response) {
      response.forEach((place) => {
        $('section.places').append(`<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${
          place.max_guest !== 1 ? 's' : ''
        }</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${
          place.number_rooms !== 1 ? 's' : ''
        }</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
          place.number_bathrooms !== 1 ? 's' : ''
        }</div>
          </div>
          <div class="user"></div>
          <div class="description">
            ${place.description}
          </div>
        </article>`);
      });
    },
    error: function (xhr, status, error) {
      console.error('Error:', error);
    }
  });
  $('.filters button').click(function () {
    if (amenityIds.length === 0) {
      delete data.amenities;
    } else {
      data.amenities = Object.keys(amenityIds);
    }

    $('section.places').empty();
    $.post({
      url: placeSearchUrl,
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (response) {
        response.forEach((place) => {
          $('section.places').append(`<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${
            place.max_guest !== 1 ? 's' : ''
          }</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${
            place.number_rooms !== 1 ? 's' : ''
          }</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
            place.number_bathrooms !== 1 ? 's' : ''
          }</div>
            </div>
            <div class="user"></div>
            <div class="description">
              ${place.description}
            </div>
          </article>`);
        });
      },
      error: function (xhr, status, error) {
        console.error('Error:', error);
      }
    });
  });
});
