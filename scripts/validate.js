const showInputError = (formElement, inputElement, inputArg) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputArg.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(inputArg.errorClass);
};

const hideInputError = (formElement, inputElement, inputArg) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputArg.inputErrorClass);
  errorElement.classList.remove(inputArg.errorClass);
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement, inputArg) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputArg);
  } else {
    hideInputError(formElement, inputElement, inputArg);
  }
  return inputElement.validity.valid;
};

const setEventListeners = (formElement, inputArg) => {
  const buttonElement = formElement.querySelector(
    inputArg.submitButtonSelector
  );
  const inputList = Array.from(
    formElement.querySelectorAll(inputArg.inputSelector)
  );
  const inputValidityList = [];

  inputList.forEach((inputElement, inputIndex) => {
    inputValidityList.push(false);
    inputElement.addEventListener("input", () => {
      inputValidityList[inputIndex] = isValid(
        formElement,
        inputElement,
        inputArg
      );
      if (
        inputList.some((input) => {
          return !isValid(formElement, input, inputArg);
        })
      ) {
        buttonElement.classList.add(inputArg.inactiveButtonClass);
        buttonElement.classList.remove(inputArg.activeButtonClass);
        buttonElement.setAttribute("disabled", true);
      } else {
        buttonElement.classList.remove(inputArg.inactiveButtonClass);
        buttonElement.classList.add(inputArg.activeButtonClass);
        buttonElement.removeAttribute("disabled");
      }
    });
  });
};

const enableValidation = (inputArg) => {
  const formList = Array.from(document.querySelectorAll(inputArg.formSelector));
  formList.forEach((formElement) => {
    const buttonElement = formElement.querySelector(
      inputArg.submitButtonSelector
    );
    const closeButtonElement = formElement.parentElement.querySelector(
      inputArg.closePopupButtons
    );
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, inputArg);
    closeButtonElement.addEventListener("click", () => {
      const inputList = Array.from(
        formElement.querySelectorAll(inputArg.inputSelector)
      );
      inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, inputArg);
        buttonElement.classList.add(inputArg.inactiveButtonClass);
        buttonElement.classList.remove(inputArg.activeButtonClass);
        buttonElement.setAttribute("disabled", true);
      });
    });

    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
      buttonElement.classList.remove(inputArg.activeButtonClass);
      buttonElement.classList.add(inputArg.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    });
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__decription",
  submitButtonSelector: ".popup__button",
  closePopupButtons: ".popup__close-button",
  inactiveButtonClass: "popup__button_invalid",
  activeButtonClass: "popup__button_valid",
  inputErrorClass: "popup__description_type_error",
  errorClass: "popup__input-error_active",
});
