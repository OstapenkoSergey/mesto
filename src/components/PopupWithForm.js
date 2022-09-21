import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._inputsList = Array.from(
      this._form.querySelectorAll(".popup__decription")
    );
    this._submitForm = submitForm;
    this._buttonElement = this._form.querySelector(".popup__button");
  }

  _getInputValues = () => {
    this._formValues = {};
    this._inputsList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  };

  openPopup() {
    super.openPopup();
    this._buttonElement.classList.add("popup__button_invalid");
    this._buttonElement.classList.remove("popup__button_valid");
    this._buttonElement.setAttribute("disabled", true);
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.closePopup();
    });
  }
}
