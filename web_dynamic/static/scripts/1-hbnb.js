$(function () {
  // const amenityIds = [];
  const amenityIds = {};
  $('input:checkbox').change(function () {
    const dataId = $(this).data('id');
    const dataName = $(this).data('name');
    // console.log('dataName:', dataName);
    if (dataId in amenityIds) {
      delete amenityIds[dataId];
    } else {
      amenityIds[dataId] = dataName;
    }
    // console.log(amenityIds);
    const selectItems = [];
    $('.amenities > h4').html('&nbsp;');
    $.each(amenityIds, function (key, value) {
      selectItems.push(value);
    });
    const desiredWidthInner = $('.amenities').width();
    //console.log('Width of .amenities', desiredWidthInner);
    //const desiredWidth = 37;
    const toPrint = selectItems.join(', ');
    // if (toPrint.length > desiredWidth) {
    //   $('.amenities > h4').html(toPrint.slice(0, desiredWidth) + '...');
    //   console.log(toPrint.slice(0, desiredWidth) + '...');
    // } else {
    //   $('.amenities > h4').html(toPrint);
    //   console.log(toPrint);
    // }
	max_length = 0;
	while ($(".amenities h4").html(toPrint.substring(0, max_length)).width() <= desiredWidthInner && max_length < toPrint.length)
		max_length+=1
	if ($(".amenities h4").html(toPrint.substring(0, max_length)).width() <= $(".amenities").width())
	{
		$(".amenities h4").html(toPrint)
	}else{
		max_length-=3
		$(".amenities h4").html(toPrint.substring(0, max_length)+ "...")
	}
	
	});
});