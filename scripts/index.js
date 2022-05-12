const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const formPopup = document.querySelector('.popup__form');
const namePopup = formPopup.querySelector('.popup__decription_js-popup-name');
const profPopup = formPopup.querySelector('.popup__decription_js-popup-prof');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', closePopup);
formPopup.addEventListener('submit', formSubmitHandler);

function togglePopup(event) {
  popup.classList.add('popup_opened');
  namePopup.value = profileTitle.textContent;
  profPopup.value = profileSubtitle.textContent;
};

function closePopup() {
  popup.classList.remove('popup_opened');
};

// popup.addEventListener('click', function (event) {
//   console.log('target', event.target);
//   console.log('currentTarget', event.currentTarget);
//   if (event.target === event.currentTarget)
//       closePopup();
// });

// document.addEventListener('keyup', (ev) => {
//   console.log(ev.key);
//   if (ev.key === "Enter") {
//     saveAndClosePopup()
//   }
// });

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = namePopup.value;
  profileSubtitle.textContent = profPopup.value;
  closePopup();
}