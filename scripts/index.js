const popups = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const profileForm = document.querySelector('.popup__form');
const namePopup = profileForm.querySelector('.popup__decription_type_name');
const profPopup = profileForm.querySelector('.popup__decription_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
const groupElemets = document.querySelector('.group');
const popupAddCard = document.querySelector('.popup-add-card');
const addForm = document.querySelector('.popup__add-form');
const createButton = document.querySelector('.popup__create-button');
const newPlaceName = addForm.querySelector('.popup__decription_type_new-place');
const newPlaceLink = addForm.querySelector('.popup__decription_type_place-link');
const addButton = document.querySelector('.profile__add-button');

editButton.addEventListener('click', () => {openProfilePopup(popupProfile)});
profileForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', addItem);
addButton.addEventListener('click', () => {openPopup(popupAddCard)});

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function openProfilePopup(data) {
  openPopup(data);
  namePopup.value = profileTitle.textContent;
  profPopup.value = profileSubtitle.textContent;
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

closePopupButtons.forEach((button) => { 
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = namePopup.value;
  profileSubtitle.textContent = profPopup.value;
  closePopup(popupProfile);
}

function renderInitialCards(data) {
  data.forEach((item) => {
    return renderCard (item)})
}

function deleteGroupItem(event) {
  const buttonElement = event.target; 
  const groupCardElement = buttonElement.closest('.group__element');
  groupCardElement.remove();
}

function createClone(data) {
  const templateElement = groupElemets.querySelector('.template-element').content;
  const cardElement = templateElement.cloneNode(true);
  const groupImage = cardElement.querySelector('.group__image');
  const groupTitle = cardElement.querySelector('.group__title');
  cardElement.querySelector(".group__like-button")
    .addEventListener("click", function (event) {
      event.target.classList.toggle("group__like-button_active");
    });
  groupImage.src = data.link;
  groupTitle.textContent = data.name;
  groupImage.setAttribute('alt', data.name);
  groupImage.addEventListener("click", zoomImage);
  const deleteButtonElement = cardElement.querySelector('.group__delete-button');
  deleteButtonElement.addEventListener('click', deleteGroupItem);
  return cardElement;
}

function renderCard(data) {
  groupElemets.append(createClone(data)); 
}

function prependCard(data) {
  groupElemets.prepend(createClone(data)); 
}

function addItem(evt) {
  evt.preventDefault();
  const name = newPlaceName.value;
  const link = newPlaceLink.value;
  prependCard({ name, link });
  closePopup(popupAddCard);
  newPlaceName.value = null;
  newPlaceLink.value = null;
}

renderInitialCards(initialCards);

const zoomPopup = document.querySelector('.popup_photo');
const zoomPicture = document.querySelector('.popup__zoom-image');
const zoomDescription = document.querySelector('.popup__image-description');

function zoomImage(event) {
  const groupImage = event.target;
  zoomPicture.src = groupImage.src;
  zoomDescription.textContent = groupImage.alt;
  zoomPicture.setAttribute('alt', groupImage.alt);
  openPopup(zoomPopup);
  } 