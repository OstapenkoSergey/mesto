import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popups = document.querySelectorAll(".popup");
const editButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup-profile");
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
const groupElements = document.querySelector(".group");
const popupAddCard = document.querySelector(".popup-add-card");
const addForm = document.querySelector(".popup__add-form");
const createButton = document.querySelector(".popup__create-button");
const newPlaceName = addForm.querySelector(".popup__decription_type_new-place");
const newPlaceLink = addForm.querySelector(
  ".popup__decription_type_place-link"
);
const addButton = document.querySelector(".profile__add-button");

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
const addFormValidator = new FormValidator(validationConfig, addForm);

profileFormValidator.enableValidation();
addFormValidator.enableValidation();

editButton.addEventListener("click", () => {
  openProfilePopup(popupProfile);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
addForm.addEventListener("submit", addItem);
addButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function openProfilePopup(data) {
  openPopup(data);
  namePopup.value = profileTitle.textContent;
  profPopup.value = profileSubtitle.textContent;
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
  clearAllForms(popup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = namePopup.value;
  profileSubtitle.textContent = profPopup.value;
  closePopup(popupProfile);
}

function getNewCard(item, order) {
  const card = new Card(item, ".template-element");
  groupElements.append(card.getElement());
  if (order === "append") {
    groupElements.append(card.getElement());
  } else {
    groupElements.prepend(card.getElement());
  }
  return card.getElement();
}

function renderInitialCards(data) {
  data.forEach((item) => {
    getNewCard(item, "append");
  });
}

function prependCard(data) {
  getNewCard(data, "prepend");
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

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closePopup(popup);
      clearAllForms(popup);
    }
  });
});

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
    clearAllForms(openedPopup);
  }
}

function clearAllForms(popup) {
  if (popup.querySelector(".popup__form")) {
    profileFormValidator.clearForm(popupProfile);
  }
  if (popup.querySelector(".popup__add-form")) {
    addFormValidator.clearForm(popupAddCard);
  }
}
