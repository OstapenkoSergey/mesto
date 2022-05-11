const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__icon');
const formPopup = document.querySelector('.popup__form');
const namePopup = formPopup.querySelector('.js-popup-name');
const profPopup = formPopup.querySelector('.js-popup-prof');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

console.dir(formPopup);
console.dir(namePopup);
console.dir(profPopup);

console.log({
  editButton,
  popup,
  closeButton
})

function togglePopup(event) {
  const parent = event.currentTarget.parentNode;
  popup.classList.add('popup_opened');
  console.dir(parent.querySelector('.profile__title').innerText);
  console.dir(parent.querySelector('.profile__subtitle').innerText);
};


editButton.addEventListener('click', togglePopup);

function closePopup() {
  popup.classList.remove('popup_opened');
};

closeButton.addEventListener('click', closePopup);

popup.addEventListener('click', function (event) {
  console.log('target', event.target);
  console.log('currentTarget', event.currentTarget);
  if (event.target === event.currentTarget)
      closePopup();
});

const addButton = document.querySelector('.popup__button');
addButton.addEventListener('click', saveAndClosePopup);

function saveAndClosePopup() {
  closePopup();
  console.log(namePopup.value);
  profileTitle.innerText = namePopup.value;
  profileSubtitle.innerText = profPopup.value;
};

document.addEventListener('keyup', (ev) => {
  console.log(ev.key);
  if (ev.key === "Enter") {
    saveAndClosePopup()
  }
});

