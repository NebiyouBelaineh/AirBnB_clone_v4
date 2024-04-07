$(function () {
  const amenityIds = {};
  const cityIds = {};
  const stateIds = {}
  // Changes in amenities popup
  $('.amenities input:checkbox').change(function () {
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
  // Changes in locations popup
  $('.locations input:checkbox').change(function () {
    const dataId = $(this).data('id');
    const dataName = $(this).data('name');
	const parentTag = $(this).closest("div").attr('class')
	console.log(parentTag)
    
	if (parentTag === 'popover'){
		if (dataId in cityIds) {
			delete cityIds[dataId];
		} else {
			cityIds[dataId] = dataName;
		}
	}else if (parentTag === 'state-header'){
		if (dataId in stateIds) {
			delete stateIds[dataId];
		} else {
			stateIds[dataId] = dataName;
		}
	}
    const selectItems = [];
    $('.locations > h4').html('&nbsp;');
    $.each(cityIds, function (key, value) {
      selectItems.push(value);
    });
    $.each(stateIds, function (key, value) {
      selectItems.push(value);
    });
	// desired with is the with that h4 take from the start
    const desiredWidthInner = $('.locations h4').width();

    const toPrint = selectItems.join(', ');

    let maxLength = 0;
    while (
      $('.locations h4').html(toPrint.substring(0, maxLength)).width() <=
        desiredWidthInner &&
      maxLength < toPrint.length
    ) {
		maxLength += 1;
    }
    if (
      $('.locations h4').html(toPrint.substring(0, maxLength)).width() <=
      desiredWidthInner
    ) {
      $('.locations h4').html(toPrint);
    } else {
      maxLength -= 3;
      $('.locations h4').html(toPrint.substring(0, maxLength) + '...');
    }
  });

  // get request related to status
  const apiUrl = 'http://localhost:5001/api/v1/status/';
  $.get(apiUrl, function (response) {
    if (response.status === 'OK') {
      $('div#api_status').addClass('available');
    }
  });
  const placeSearchUrl = 'http://localhost:5001/api/v1/places_search/';
  const data = {};

  // initial post request to get all postes when page is loaded
//   $.post({
//     url: placeSearchUrl,
//     contentType: 'application/json',
//     data: JSON.stringify(data),
//     success: function (response) {
//       response.forEach((place) => {

//         $('section.places').append(`<article>
//           <div class="title_box">
//             <h2>${place.name}</h2>
//             <div class="price_by_night">$${place.price_by_night}</div>
//           </div>
//           <div class="information">
//             <div class="max_guest">${place.max_guest} Guest${
//           place.max_guest !== 1 ? 's' : ''
//         }</div>
//             <div class="number_rooms">${place.number_rooms} Bedroom${
//           place.number_rooms !== 1 ? 's' : ''
//         }</div>
//             <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
//           place.number_bathrooms !== 1 ? 's' : ''
//         }</div>
//           </div>
//           <div class="user"></div>
//           <div class="description">
//             ${place.description}
//           </div>

// 			<div class="amenities">
// 			<h2>Amenities</h2>
// 			<ul>
				
// 			</ul>
// 		</div>	
		
//         </article>`);
//       });
//     },
//     error: function (xhr, status, error) {
//       console.error('Error:', error);
//     }
//   });

  // filter related to searching
  $('.filters button').click(function () {
    if (amenityIds.length === 0) {
      delete data.amenities;
    } else {
      data.amenities = Object.keys(amenityIds);
    }

	if (cityIds.length === 0){
		delete data.cities;
	}else{
		data.cities = Object.keys(cityIds)
	}

	if (stateIds.length === 0){
		delete data.states;
	}else{
		data.states = Object.keys(stateIds)
	}

    $('section.places').empty();
    $.post({
      url: placeSearchUrl,
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (response) {
		  console.log(data.amenties);
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
			
			<div class="amenities">
			<h2>Amenities</h2>
			<ul>
				
			</ul>
		</div>	
		
          </article>`);
        });
      },
      error: function (xhr, status, error) {
        console.error('Error:', error);
      }
    });
  });
  function getDateParts(dateString) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	  ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()]; // Month is zero-based, so add 1
    const year = date.getFullYear();
    return { day, month, year };
}

  async function fetchData() {
    try {
        const response = await $.ajax({
            url: placeSearchUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });

        const promises = response.map(async (place) => {
            const review_list = await fetchReviews(place.id);
            return { place, review_list };
        });

        const results = await Promise.all(promises);

        results.forEach(({ place, review_list }) => {
            let reviewsHtml = "";
            for (const review of review_list) {
				const dateString = review.created_at;
				const { day, month, year } = getDateParts(dateString);
                reviewsHtml += `
				
					<li>
						<h3>From Max the ${day}th ${month} ${year}</h3>
						<p>
							${review.text}
						</p>
					</li>
				`;
            }
			console.log(place.id);
            $('section.places').append(`<article>
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div class="user"></div>
                <div class="description">
                    ${place.description}
                </div>
                <div class="amenities">
				<div class=reviews>
					<div class="review-head">
					<h2>Reviews</h2>
					<span data-place="${place.id}"> Hide </span>
					</div>
					<ul>
					${reviewsHtml}
					</ul>
				</div>
                </div>
            </article>`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchReviews(place_id) {
    try {
        const responseReviews = await $.ajax({
            url: `http://localhost:5001/api/v1/places/${place_id}/reviews`,
            type: 'GET',
        });
        return responseReviews;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return [];
    }
}

fetchData();


const parentElement = document.querySelector('section.places');
const childSelector = '.reviews span';

parentElement.addEventListener('click', function(event) {
    // Check if the clicked element matches the child selector
    if (event.target.matches(childSelector)) {
        // Your logic for when the child element is clicked
        console.log('Child element clicked:', event.target);
		console.log(event.target.getAttribute("data-place"));
		console.log(event.target.getAttribute("data-place"));
    }
});
  

});

/**

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
	
				<div class="amenities">
				<h2>Amenities</h2>
				<ul>
					
				</ul>
			</div>	
			
			</article>`);
		  });
		 

 */
