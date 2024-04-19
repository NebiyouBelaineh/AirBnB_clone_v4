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

  function statusCheck(){
	const apiUrl = 'http://34.207.237.37/api/v1/status/';
  
	$.ajax({
	  url: apiUrl,
	  timeout: 5000, // 
	})
	  .done(function (data, textStatus, jqXHR) {
		console.log('Server response:', data); // Log the response
		$('div#api_status').addClass('available');
	  })
	  .fail(function (jqXHR, textStatus, errorThrown) {
		if (textStatus === 'error' && errorThrown === 'net::ERR_CONNECTION_REFUSED') {
		  console.error('Connection refused. Check if the server is running.');
		} else {
		  console.error('An error occurred:', textStatus, errorThrown);
		}
		$('div#api_status').removeClass('available');
	  });
  }
  statusCheck()
  setInterval(statusCheck, 5000); // Check server status every 1 second
  
  
});
