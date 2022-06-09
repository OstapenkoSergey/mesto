// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__decription');
const formError = formElement.querySelector(`.${formInput.id}-error`); 
const buttonElement = formElement.querySelector('.popup__button');


const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  // Остальной код такой же
  inputElement.classList.add('popup__description_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};


// console.log(showInputError(formInput));

// // Функция, которая удаляет класс с ошибкой
// const hideInputError = (element) => {
//   element.classList.remove('popup__description_type_error');
//   // Скрываем сообщение об ошибке
//   formError.classList.remove('popup__input-error_active');
//   // Очистим ошибку
//   formError.textContent = '';
// };


const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  // Остальной код такой же
  inputElement.classList.remove('popup__description_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

closePopupButtons.forEach((button) => { 
  button.addEventListener('click', () => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__decription'));
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement);
      buttonElement.classList.add('popup__button_invalid');
      buttonElement.classList.remove('popup__button_valid');
      buttonElement.setAttribute("disabled", true);
    });
  });
});

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  const buttonElement = formElement.querySelector('.popup__button');
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
    // buttonElement.classList.add('popup__button_invalid');
    // buttonElement.classList.remove('popup__button_valid');
    // buttonElement.setAttribute("disabled", true);
    console.log(inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
    // buttonElement.classList.remove('popup__button_invalid');
    // buttonElement.classList.add('popup__button_valid');
    // buttonElement.removeAttribute("disabled");
    console.log('is valid');
  }
  return inputElement.validity.valid;
};
 

formElement.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
});


// // Вызовем функцию isValid на каждый ввод символа
// formInput.addEventListener('input', isValid); 

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__decription'));
  const inputValidityList = [];
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement, inputIndex) => {
    // каждому полю добавим обработчик события input
    inputValidityList.push(true);
    // let isFormValid = true;
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      inputValidityList [inputIndex] = isValid(formElement, inputElement);
      if (inputValidityList.some((isInputValid) => {return !isInputValid})) {
        buttonElement.classList.add('popup__button_invalid');
        buttonElement.classList.remove('popup__button_valid');
        buttonElement.setAttribute("disabled", true);
      } else {
        buttonElement.classList.remove('popup__button_invalid');
        buttonElement.classList.add('popup__button_valid');
        buttonElement.removeAttribute("disabled");
      }
    });
  });

};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
// enableValidation(); 

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__decription',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.popup__button_invalid',
  inputErrorClass: '.popup__description_type_error',
  errorClass: 'popup__input-error_active'
}); 