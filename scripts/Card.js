import {openPopup} from './index.js';

export class Card {
  _data;
  _selector;
  _cardElement;
  

  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
    this._zoomPopup = document.querySelector(".popup_photo");
    this._zoomPicture = document.querySelector(".popup__zoom-image");
    this._zoomDescription = document.querySelector(".popup__image-description");

    this._createClone();
  }

  _createClone() {
    const templateElement = document.querySelector(
      this._selector
    ).content;
    const cardElement = templateElement.querySelector('.group__element').cloneNode(true); 
    const groupImage = cardElement.querySelector(".group__image");
    const groupTitle = cardElement.querySelector(".group__title");
    cardElement
      .querySelector(".group__like-button")
      .addEventListener("click", this._toggleLike);
    groupImage.src = this._data.link;
    groupTitle.textContent = this._data.name;
    groupImage.setAttribute("alt", this._data.name);
    groupImage.addEventListener("click", this._zoomImage);
    const deleteButtonElement = cardElement.querySelector(
      ".group__delete-button"
    );
    deleteButtonElement.addEventListener("click", this._deleteGroupItem);
    this._cardElement = cardElement;
  }

  _toggleLike (event) {
    event.target.classList.toggle("group__like-button_active");
  }

  _deleteGroupItem = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _zoomImage = () => {
    this._zoomPicture.src =  this._data.link;
    this._zoomPicture.setAttribute("alt", this._data.name);
    this._zoomDescription.textContent = this._data.name;
    this._handleOpenImage(this._zoomPopup);
  };

  _handleOpenImage() {
    openPopup(this._zoomPopup);
  }


  getElement() {
    return this._cardElement;
  }
}
