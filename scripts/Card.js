export class Card {
  _data;
  _selector;
  _cardElement;

  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
    this._groupElements = document.querySelector(".group");

    this._createClone();
  }

  _createClone() {
    const templateElement = this._groupElements.querySelector(
      this._selector
    ).content;
    const cardElement = templateElement.cloneNode(true);
    const groupImage = cardElement.querySelector(".group__image");
    const groupTitle = cardElement.querySelector(".group__title");
    cardElement
      .querySelector(".group__like-button")
      .addEventListener("click", function (event) {
        event.target.classList.toggle("group__like-button_active");
      });
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

  _deleteGroupItem(event) {
    const buttonElement = event.target;
    const groupCardElement = buttonElement.closest(".group__element");
    groupCardElement.remove();
  }

  _zoomImage = (event) => {
    const groupImage = event.target;
    const zoomPopup = document.querySelector(".popup_photo");
    const zoomPicture = document.querySelector(".popup__zoom-image");
    const zoomDescription = document.querySelector(".popup__image-description");

    zoomPicture.src = groupImage.src;
    zoomPicture.setAttribute("alt", groupImage.alt);
    zoomDescription.textContent = groupImage.alt;
    this._openPopup(zoomPopup);
  };

  _openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._closeByEscape);
  }

  _closeByEscape(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      this._closePopup(openedPopup);
    }
  }

  _closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closeByEscape);
  }

  getElement() {
    return this._cardElement;
  }
}
