import createModal from "./MovieCardModal.js";
import { setStorage, removeFromStorage } from "./Storage.js";

function addToFavourite(arr) {
  const modalAddToFavouriteButton = document.querySelector(
    ".modal-content__favourite-btn"
  );
  const cardAddToFavouriteButton = Array.from(
    document.querySelectorAll(".media-gallery__item-btn")
  );
  const cardItems = Array.from(
    document.querySelectorAll(".media-gallery__item")
  );

  modalAddToFavouriteButton.addEventListener("click", (e) => {
    const modalId = e.target.closest(".modal").getAttribute("modal-id");

    arr.forEach((item) => {
      if (item.id === Number(modalId)) {
        item.favourite = !item.favourite;
        if (item.favourite === true) {
          modalAddToFavouriteButton.classList.add("favourite");
          setStorage(item.id, item.name);
          cardItems.forEach((item) => {
            const cardId = item.getAttribute("item-id");
            if (cardId === modalId) {
              item.firstElementChild.classList.add("favourite");
            }
          });
        } else {
          modalAddToFavouriteButton.classList.remove("favourite");
          removeFromStorage(item.id);
          cardItems.forEach((item) => {
            const cardId = item.getAttribute("item-id");
            if (cardId === modalId) {
              item.firstElementChild.classList.remove("favourite");
            }
          });
        }
      }
    });

    renderFavouriteList(arr);
    const listItems = document.querySelectorAll(
      ".media-favourite__list-item-name"
    );
    createModal(listItems, arr, ".media-favourite__list-item");
  });

  cardAddToFavouriteButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      const cardId = e.target
        .closest(".media-gallery__item")
        .getAttribute("item-id");

      arr.forEach((item) => {
        if (item.id === Number(cardId)) {
          item.favourite = !item.favourite;
          if (item.favourite === true) {
            setStorage(item.id, item.name)
            button.classList.add("favourite");
          } else {
            removeFromStorage(item.id);
            button.classList.remove("favourite");
          }
        }
      });

      renderFavouriteList(arr);
      const listItems = document.querySelectorAll(
        ".media-favourite__list-item-name"
      );
      createModal(listItems, arr, ".media-favourite__list-item");
    });
  });
}

function renderFavouriteList(arr) {
  const favouriteList = document.querySelector(".media-favourite__list");
  favouriteList.innerHTML = ``;

  const favouriteListArray = [];

  arr.forEach((item) => {
    if (item.favourite === true) {
      favouriteListArray.push(item);
    }
    return;
  });

  favouriteListArray.forEach((item) => {
    const listItem = document.createElement("div");
    const listItemName = document.createElement("div");
    const listItemRemoveBtn = document.createElement("button");

    listItem.classList.add("media-favourite__list-item");
    listItem.setAttribute("item-Id", item.id);
    listItemName.classList.add("media-favourite__list-item-name");
    listItemRemoveBtn.classList.add("media-favourite__list-item-btn");

    listItemName.innerText = item.name;
    listItemRemoveBtn.innerText = "Remove";
    listItem.insertAdjacentElement("beforeend", listItemName);
    listItem.insertAdjacentElement("beforeend", listItemRemoveBtn);
    favouriteList.insertAdjacentElement("beforeend", listItem);
  });

  removeFavouriteFilm(favouriteListArray);
}

function removeFavouriteFilm(favouriteListArray) {
  const removeBtn = Array.from(
    document.querySelectorAll(".media-favourite__list-item-btn")
  );

  removeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const { target } = e;
      const item = target.closest(".media-favourite__list-item");
      favouriteListArray.forEach((favouriteItem) => {
        if (favouriteItem.id === Number(item.getAttribute("item-id"))) {
          favouriteItem.favourite = false;
          removeFromStorage(favouriteItem.id);
          item.remove();
          const cardButtons = Array.from(
            document.querySelectorAll(".media-gallery__item")
          );
          const modalBtn = document.querySelector(
            ".modal-content__favourite-btn"
          );
          modalBtn.classList.remove("favourite");
          cardButtons.forEach((el) => {
            if (el.getAttribute("item-id") === item.getAttribute("item-id")) {
              el.firstElementChild.classList.remove("favourite");
            }
          });
        }
      });
    });
  });
}

export { addToFavourite, removeFavouriteFilm, renderFavouriteList };
