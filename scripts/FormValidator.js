export class FormValidator {
  constructor(classNames, formElement) {
    this._classNames = classNames;
    this._form = formElement;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._classNames.inputSelector)
    );
    this._buttonElement = this._form.querySelector(
      this._classNames.submitButtonSelector
    );
  }

  _showInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._classNames.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._classNames.errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._classNames.inputErrorClass);
    errorElement.classList.remove(this._classNames.errorClass);
    errorElement.textContent = "";
  };

  _deactivateButton = () => {
    this._buttonElement.classList.add(this._classNames.inactiveButtonClass);
    this._buttonElement.classList.remove(this._classNames.activeButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  };

  _activateButton = () => {
    this._buttonElement.classList.remove(this._classNames.inactiveButtonClass);
    this._buttonElement.classList.add(this._classNames.activeButtonClass);
    this._buttonElement.removeAttribute("disabled");
  };

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
    return inputElement.validity.valid;
  };

  _toggleButtonState = () => {
    if (
      this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    ) {
      this._deactivateButton();
    } else {
      this._activateButton();
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };

  clearForm() {
    if (!this._form) {
      return;
    }
    // this._deactivateButton();
    this._inputList.forEach((inputElement, index) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}
