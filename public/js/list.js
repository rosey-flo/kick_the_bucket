async function getImages() {
  const apiKey = "uG1og2BBDQveA1KvQ2jnwRW9uXAzJbvGeL8zCVxiJhrSXFJMMVUMfIRD"
  const url = "https://api.pexels.com/v1/search?per_page=1&orientation=landscape&query=";
  const favorites = document.querySelectorAll('.landmark-wrapper');

  favorites.forEach(async favEl => {
    const country = favEl.dataset.country;
    const res = await fetch(url + country, {
      headers: {
        Authorization: apiKey
      }
    });
    const data = await res.json();

    const img = favEl.querySelector('img');

    img.src = data.photos[0].src.tiny;
  })

}

async function removeFav(e, favId) {
	const wrapper = document.querySelector('.list')

  const url = `/api/favorites/unfav/${favId}`
  e.parentNode.remove();
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  });
	
	if(!wrapper.children.length){
		wrapper.innerHTML = '<h3 class="text-center p-4 col-span-full">No Favorites Have Been Added</h3>';
	}
}

getImages();

