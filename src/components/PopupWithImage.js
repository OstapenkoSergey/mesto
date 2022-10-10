import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._zoomPicture = this._popup.querySelector(".popup__zoom-image");
    this._zoomDescription = this._popup.querySelector(
      ".popup__image-description"
    );
  }

  openPopup = (name, link) => {
    super.openPopup();
    this._zoomPicture.src = link;
    this._zoomPicture.setAttribute("alt", name);
    this._zoomDescription.textContent = name;
  };
}
