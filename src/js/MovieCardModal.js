function createModal(moviesElements, moviesObject, itemName) {
  const allMovies = moviesElements;
  const modal = document.querySelector(".modal");
  const favouriteButton = document.querySelector(
    ".modal-content__favourite-btn"
  );

  allMovies.forEach((movie) => {
    movie.addEventListener("click", (e) => {
      const { target } = e;
      const galleryItem = target.closest(itemName);
      const id = galleryItem.getAttribute("item-id");
      const [currentObjItem] = moviesObject.filter((item) => {
        if (item.id === Number(id)) {
          modal.style.display = "block";
          modal.setAttribute("modal-id", id);
          if (item.favourite === true) {
            favouriteButton.classList.add("favourite");
          } else {
            favouriteButton.classList.remove("favourite");
          }
          return item;
        }
        return;
      });

      fillModalCard(currentObjItem);
    });
  });
}

function closeModal() {
  const modal = document.querySelector(".modal");
  const close = document.querySelector(".close");
  const favouriteButton = document.querySelector(
    ".modal-content__favourite-btn"
  );

  modal.addEventListener("click", (e) => {
    e.target == modal || e.target == close
      ? ((modal.style.display = "none"),
        modal.removeAttribute("modal-id"),
        favouriteButton.classList.remove("favourite"))
      : null;
  });
}

closeModal();

function fillModalCard(card) {
  const { img, name, description, year, genres, starring, director } = card;

  const cardImg = document.querySelector(".modal-content__img");
  const cardYear = document.querySelector(".modal-content__year");
  const cardGenres = document.querySelector(".modal-content__genres");
  const cardTitle = document.querySelector(".modal-about__title");
  const cardText = document.querySelector(".modal-about__text");
  const cardDirector = document.querySelector(".modal-about__director");
  const cardStarring = document.querySelector(".modal-about__starring");

  cardImg.firstChild.src = img;
  cardYear.innerText = year;
  cardTitle.innerText = name;
  cardText.innerText = description;
  cardDirector.innerText = `Director: ${director}`;

  renderCardGenres(genres, cardGenres, "modal-content__genres-item");
  renderCardStarring(starring, cardStarring);
}

function renderCardGenres(arr, insertPlace, cardClassName) {
  insertPlace.innerHTML = "";
  if (arr.length > 0) {
    arr.forEach((item) => {
      const arrItem = document.createElement("div");
      arrItem.classList.add(cardClassName);
      arrItem.innerText = item;
      insertPlace.insertAdjacentElement("beforeend", arrItem);
    });
  } else {
    const arrItem = document.createElement("div");
    arrItem.classList.add(cardClassName);
    arrItem.innerText = item;
    insertPlace.insertAdjacentElement("beforeend", arrItem);
  }
}

function renderCardStarring(arr, insertPlace) {
  insertPlace.innerText = "Starring: ";
  if (arr.length > 0) {
    arr.forEach((item, index) => {
      insertPlace.insertAdjacentText("beforeend", `${item}, `);
      if (index === arr.length - 1) {
        insertPlace.insertAdjacentText("beforeend", `${item}`);
      }
    });
  } else {
    insertPlace.insertAdjacentText("beforeend", `${arr} `);
  }
}

export default createModal;
