import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const profileForm = document.querySelector(".popup__profile-form");
const namePopup = profileForm.querySelector(".popup__decription_type_name");
const profPopup = profileForm.querySelector(".popup__decription_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const newCardForm = document.querySelector(".popup__add-form");
const newPlaceName = newCardForm.querySelector(
  ".popup__decription_type_new-place"
);
const newPlaceLink = newCardForm.querySelector(
  ".popup__decription_type_place-link"
);
const buttonAddCard = document.querySelector(".profile__add-button");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__decription",
  submitButtonSelector: ".popup__button",
  closePopupButtons: ".popup__close-button",
  inactiveButtonClass: "popup__button_invalid",
  activeButtonClass: "popup__button_valid",
  inputErrorClass: "popup__description_type_error",
  errorClass: "popup__input-error_active",
};
const profileFormValidator = new FormValidator(validationConfig, profileForm);
const newCardFormValidator = new FormValidator(validationConfig, newCardForm);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();

const imagePopup = new PopupWithImage(".popup_photo");
imagePopup.setEventListeners();

const renderNewCards = (item) => {
  const card = new Card(item, ".template-element", imagePopup.openPopup);
  return card.getElement();
};

const userInfo = new UserInfo({
  nameInputSelector: ".profile__title",
  descriptionInputSelector: ".profile__subtitle",
});

function openProfilePopup(data) {
  const userData = userInfo.getUserInfo();
  namePopup.value = userData.name;
  profPopup.value = userData.description;
  data.openPopup();
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      const cardElement = renderNewCards(card);
      cardList.addInitialItems(cardElement);
    },
  },
  ".group"
);

cardList.renderInitialCards();

const profilePopupForm = new PopupWithForm(".popup-profile", (input) => {
  userInfo.setUserInfo(input.userName, input.userJob);
});

profilePopupForm.setEventListeners();

const addPopupForm = new PopupWithForm(".popup-add-card", (input) => {
  cardList.addItem(renderNewCards(input));
});

addPopupForm.setEventListeners();

buttonEditProfile.addEventListener("click", (evt) => {
  evt.preventDefault();
  openProfilePopup(profilePopupForm);
  profileFormValidator.deactivateButton();
});

buttonAddCard.addEventListener("click", (evt) => {
  evt.preventDefault();
  addPopupForm.openPopup();
  newCardFormValidator.deactivateButton();
});
