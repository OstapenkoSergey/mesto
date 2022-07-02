export class FormValidator {
  // formElement, inputElement, inputArg

  constructor(classNames, formElement) {
    this._classNames = classNames;
    this._form = formElement;
    this._input = this._form.querySelector(classNames.inputSelector);

    // this._enableValidation(); ///при создании нового экземпляра выполняются эти функции
    ///чем отличаются эти методы и методы внутри класса но снаружи конструктора
  }

  enableValidation = () => {
    // const formList = Array.from(
    //   document.querySelectorAll(this._classNames.formSelector)
    // );
    // formList.forEach((formElement) => {
      const buttonElement = this._form.querySelector(
        this._classNames.submitButtonSelector
      );
      const closeButtonElement = this._form.parentElement.querySelector(
        this._classNames.closePopupButtons
      );
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(this._form, this._classNames);
      closeButtonElement.addEventListener("click", () => {
        const inputList = Array.from(
          this._form.querySelectorAll(this._classNames.inputSelector)
        );
        inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
          buttonElement.classList.add(this._classNames.inactiveButtonClass);
          buttonElement.classList.remove(this._classNames.activeButtonClass);
          buttonElement.setAttribute("disabled", true);
        });
      });

      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        buttonElement.classList.remove(this._classNames.activeButtonClass);
        buttonElement.classList.add(this._classNames.inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
      });
    // });
  };

  _setEventListeners = () => {
    const buttonElement = this._form.querySelector(
      this._classNames.submitButtonSelector
    );
    const inputList = Array.from(
      this._form.querySelectorAll(this._classNames.inputSelector)
    );
    const inputValidityList = [];

    inputList.forEach((inputElement, inputIndex) => {
      inputValidityList.push(false);
      inputElement.addEventListener("input", () => {
        inputValidityList[inputIndex] = this._isValid(inputElement);
        if (
          inputList.some((input) => {
            return !this._isValid(input);
          })
        ) {
          buttonElement.classList.add(this._classNames.inactiveButtonClass);
          buttonElement.classList.remove(this._classNames.activeButtonClass);
          buttonElement.setAttribute("disabled", true);
        } else {
          buttonElement.classList.remove(this._classNames.inactiveButtonClass);
          buttonElement.classList.add(this._classNames.activeButtonClass);
          buttonElement.removeAttribute("disabled");
        }
      });
    });
  };

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
    return inputElement.validity.valid;
  };

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
}
