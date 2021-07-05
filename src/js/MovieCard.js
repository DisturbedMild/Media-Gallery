function createMovieItem(movieID, movieImg, movieName, movieYear) {
  const wrapper = document.querySelector(".media-gallery__wrapper");
  const item = document.createElement("div");
  const img = document.createElement("img");
  const itemContent = document.createElement("div");
  const itemName = document.createElement("div");
  const itemYear = document.createElement("div");
  const favouriteStar = document.createElement('button');
  
  item.classList.add("media-gallery__item");


  item.setAttribute("item-id", movieID);
  img.setAttribute("src", movieImg);

  itemContent.classList.add("media-gallery__item-content");
  itemName.classList.add("media-gallery__item-name");
  itemYear.classList.add("media-gallery__item-year");
  favouriteStar.classList.add("media-gallery__item-btn");

  itemName.innerText = movieName;
  itemYear.innerText = movieYear;
  favouriteStar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>'

  itemContent.insertAdjacentElement("beforeend", itemName);
  itemContent.insertAdjacentElement("beforeend", itemYear);
  
  item.insertAdjacentElement("afterbegin", favouriteStar);
  item.insertAdjacentElement("beforeend", img);
  item.insertAdjacentElement("beforeend", itemContent);

  wrapper.insertAdjacentElement("beforeend", item);
}

export default createMovieItem;