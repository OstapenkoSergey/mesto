/*console.log('hello world')*/

const editButton = document.querySelector('.profile__edit-button_popup-opened');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__icon');

console.log({
  editButton,
  popup,
  closeButton
})

function togglePopup() {
  popup.classList.add('popup_opened')
}

editButton.addEventListener('click', togglePopup)

function closePopup() {
  popup.classList.remove('popup_opened')
}

closeButton.addEventListener('click', closePopup)