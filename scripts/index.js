const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
const closeProfileButton = popupProfile.querySelector('.popup-profile__close-button');
const formPopup = document.querySelector('.popup__form');
const namePopup = formPopup.querySelector('.popup__decription_type_name');
const profPopup = formPopup.querySelector('.popup__decription_type_job');
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
const closeAddCardButton = document.querySelector('.popup-add-card__close-button');
const addFormPopup = document.querySelector('.popup__add-form');
const createButton = document.querySelector('.popup__create-button');
const newPlaceName = addFormPopup.querySelector('.popup__decription_type_new-place');
const newPlaceLink = addFormPopup.querySelector('.popup__decription_type_place-link');
const addButton = document.querySelector('.profile__add-button');

editButton.addEventListener('click', togglePopup);
closeProfileButton.addEventListener('click', closeProfilePopup);
formPopup.addEventListener('submit', formSubmitHandler);
addFormPopup.addEventListener('submit', addItem)
addButton.addEventListener('click', togglePopupCard);
closeAddCardButton.addEventListener('click', closeAddCardPopup);

function togglePopup(event) {
  popupProfile.classList.add('popup_opened');
  namePopup.value = profileTitle.textContent;
  profPopup.value = profileSubtitle.textContent;
};

function closeProfilePopup() {
  popupProfile.classList.remove('popup_opened');
};

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = namePopup.value;
  profileSubtitle.textContent = profPopup.value;
  closeProfilePopup();
}

function renderGroup(data) {
  data.forEach((item) => {
    return renderCard (item)})
}

function deleteGroupItem(event) {
  let buttonElement = event.target; 
  let groupCardElement = buttonElement.closest('.group__element');
  groupCardElement.remove();
}

function createClone(data) {
  const templateElement = groupElemets.querySelector('.template-element').content;
  const cardElement = templateElement.cloneNode(true);
  const groupImage = cardElement.querySelector('.group__image');
  const groupTitle = cardElement.querySelector('.group__title');
  const likeButton = cardElement.querySelector(".group__like-button")
    .addEventListener("click", function (event) {
      event.target.classList.toggle("group__like-button_active");
    });
  groupImage.src = data.link;
  groupTitle.textContent = data.name;
  groupImage.addEventListener("click", imageZoom);
  let deleteButtonElement = cardElement.querySelector('.group__delete-button');
  deleteButtonElement.addEventListener('click', deleteGroupItem);
  return cardElement;
}

function renderCard(data) {
  groupElemets.append(createClone(data)); 
}

function newCard(data) {
  groupElemets.prepend(createClone(data)); 
}

function addItem(evt) {
  evt.preventDefault();
  let name = newPlaceName.value;
  let link = newPlaceLink.value;
  newCard({ name, link });
  popupAddCard.classList.toggle("popup_opened");
}

renderGroup(initialCards);

function togglePopupCard(event) {
  popupAddCard.classList.add('popup_opened');
};

function closeAddCardPopup() {
  popupAddCard.classList.remove('popup_opened');
};

const zoomPopup = document.querySelector('.popup_photo');
const zoomImage = document.querySelector('.popup__zoom-image');
const zoomDescription = document.querySelector('.popup__image-description');

function imageZoom(event) {
  const groupImage = event.target;
  const groupImageParent = groupImage.closest('.group__element');
  const groupTitle = groupImageParent.querySelector('.group__title');
  zoomImage.src = groupImage.src;
  zoomDescription.textContent = groupTitle.textContent;
  zoomPopup.classList.add('popup_opened');
  } 

  const closeZoomImageButton = document.querySelector('.popup__close-button_photo');
  closeZoomImageButton.addEventListener('click', closePhotoPopup);

  function closePhotoPopup() {
    zoomPopup.classList.remove('popup_opened');
  }