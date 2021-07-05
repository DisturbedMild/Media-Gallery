import createMovieItem from './MovieCard.js';
import { addToFavourite } from './FavouriteList.js';
import createModal from './MovieCardModal.js';
import { renderElementsFromStorage } from './Storage';
async function movieList(url) {
  return await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
}



async function renderMoviesList() {
  const movieArr = await movieList(
    "https://my-json-server.typicode.com/moviedb-tech/movies/list"
  );
    
    movieArr.forEach((movie) => {
    const { id, img, name, year } = movie;
    movie.favourite = false;
    createMovieItem(id, img, name, year);
  });

  const galleryItems = document.querySelectorAll('.media-gallery__item img');
  createModal(galleryItems, movieArr, ".media-gallery__item");
  renderElementsFromStorage(movieArr);
  addToFavourite(movieArr);
}


export default renderMoviesList;
