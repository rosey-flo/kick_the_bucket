const addFavoriteButton = document.querySelector('.add-to-favorites');
let map;
let locationValue;


async function geocodeAddress(address) {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBQ2we2dx9nzsbqE4Mh7Icfh9SDgZkqrc4`);
  const data = await response.json();
 

  if (data.results.length > 0) {
    const location = data.results[0].geometry.location;
    return location;
  } else {
    throw new Error("Location not found");
  }
}

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  locationValue  = `${landmark}, ${city}, ${state}, ${country}`
  const mapLocation = await geocodeAddress(locationValue);


  map = new Map(document.getElementById("map"), {
    center: mapLocation,
    zoom: 13,
  });

  new google.maps.Marker({
    position: mapLocation,
    map: map,
    // title: "Landmark Title"
  });
}

function addToFavorites() {
	fetch('/api/favorites', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			landmark,
			city,
			state,
			country
		})
	})
	.then(response => response.json())
	.then(data => {
		if (data.message) {
			window.location = '/list';
		} else {
			alert('Failed to add to favorites: ' + data.message);
		}
	})
	.catch(error => {
		console.error('Error:', error);
	});
}

addFavoriteButton.addEventListener('click', addToFavorites)


initMap();

document.addEventListener('DOMContentLoaded', () => {
  const addFavoriteButtons = document.querySelectorAll('.add-to-favorites');

  addFavoriteButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          const destinationId = event.target.dataset.destinationId;
          addToFavorites(destinationId);
      });
  });

  function addToFavorites(destinationId) {
      fetch('/favorites', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ destinationId })
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              alert('Added to favorites!');
          } else {
              alert('Failed to add to favorites: ' + data.message);
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }
});

