import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._data = data;
    this._data.link = data.link;
    this._zoomPicture = this._popup.querySelector(".popup__zoom-image");
    this._zoomDescription = this._popup.querySelector(
      ".popup__image-description"
    );
  }

  openPopup = () => {
    super.openPopup();

    this._zoomPicture.src = this._data.link;
    this._zoomPicture.setAttribute("alt", this._data.name);
    this._zoomDescription.textContent = this._data.name;
  };
}
