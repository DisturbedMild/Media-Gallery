import { renderFavouriteList } from "./FavouriteList";
import createModal from "./MovieCardModal.js";

function setStorage(key, value) {
  localStorage.setItem(key, value);
}

function removeFromStorage(key) {
  localStorage.removeItem(key);
}

function renderElementsFromStorage(movieArr) {
  const arrayOfStorageElements = [];

  const cardButtons = Array.from(
    document.querySelectorAll(".media-gallery__item-btn")
  );
  const modalButton = document.querySelector(".modal-content__favourite-btn");

  const filteredMovieArray = movieArr.filter((movie) => {
    if (movie.name == localStorage.getItem(movie.id)) {
      movie.favourite = true;
      arrayOfStorageElements.push(movie);
      return movie;
    }
  });
  arrayOfStorageElements.forEach((el) => {
    const modalID = modalButton.closest(".modal").getAttribute("modal-id");

    if (el.id === Number(modalID)) {
      modalButton.classList.add("favourite");
    } else {
      modalButton.classList.remove("favourite");
    }
  });

  arrayOfStorageElements.forEach((el) => {
    cardButtons.forEach((card) => {
      const cardID = card
        .closest(".media-gallery__item")
        .getAttribute("item-id");
      if (el.id === Number(cardID)) {
        card.classList.add("favourite");
      }
    });
  });

  renderFavouriteList(filteredMovieArray);
  const listItems = document.querySelectorAll(
    ".media-favourite__list-item-name"
  );
  createModal(listItems, arrayOfStorageElements, ".media-favourite__list-item");
}

export { setStorage, removeFromStorage, renderElementsFromStorage };
