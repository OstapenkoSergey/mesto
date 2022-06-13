// Вынесем все необходимые элементы формы в константы
// const formElement = document.querySelector('.popup__form');
// const formInput = formElement.querySelector('.popup__decription');
// const formError = formElement.querySelector(`.${formInput.id}-error`); 
// const buttonElement = formElement.querySelector('.popup__button');


const showInputError = (formElement, inputElement, inputArg) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputArg.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(inputArg.errorClass);
};

const hideInputError = (formElement, inputElement, inputArg) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputArg.inputErrorClass);
  errorElement.classList.remove(inputArg.errorClass);
  errorElement.textContent = '';
};


// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, inputArg) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputArg);
    console.log(inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, inputArg);
    console.log('is valid');
  }
  return inputElement.validity.valid;
};
 


// // Вызовем функцию isValid на каждый ввод символа
// formInput.addEventListener('input', isValid); 

const setEventListeners = (formElement, inputArg) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const buttonElement = formElement.querySelector(inputArg.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(inputArg.inputSelector));
  const inputValidityList = [];

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement, inputIndex) => {
    inputValidityList.push(true);
    console.log(inputElement);
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      inputValidityList [inputIndex] = isValid(formElement, inputElement, inputArg);
      if (inputValidityList.some((isInputValid) => {return !isInputValid})) {
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
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(inputArg.formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    const buttonElement = formElement.querySelector(inputArg.submitButtonSelector);
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    console.log(formElement);
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, inputArg);
    closePopupButtons.forEach((button) => { 
      button.addEventListener('click', () => {
        const inputList = Array.from(formElement.querySelectorAll(inputArg.inputSelector));
        inputList.forEach((inputElement) => {
          hideInputError(formElement, inputElement, inputArg);
          buttonElement.classList.add(inputArg.inactiveButtonClass);
          buttonElement.classList.remove(inputArg.activeButtonClass);
          buttonElement.setAttribute("disabled", true);
        });
      });
    });
    
    formElement.addEventListener('submit', function (evt) {
      // Отменим стандартное поведение по сабмиту
      evt.preventDefault();
    });
  });
};

// Вызовем функцию
// enableValidation(); 

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__decription',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  activeButtonClass: 'popup__button_valid',
  inputErrorClass: 'popup__description_type_error',
  errorClass: 'popup__input-error_active'
}); 