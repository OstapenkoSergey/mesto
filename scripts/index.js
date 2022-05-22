const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
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
// const templateElement = groupElemets.querySelector('.template-element');
// const groupImage = templateElement.content.querySelector('.group__image');
// const groupTitle = templateElement.content.querySelector('.group__title');
// console.log(initialCards[0].link);
// console.log(initialCards[1].link);

function renderGroup(data) {
  data.forEach((item) => {
    return renderCard (item)})
}

function renderCard(data) {
  const templateElement = groupElemets.querySelector('.template-element').content;
  const cardElement = templateElement.cloneNode(true);
  const groupImage = cardElement.querySelector('.group__image');
  const groupTitle = cardElement.querySelector('.group__title');
  groupImage.src = data.link;
  groupTitle.textContent = data.name;
  groupElemets.append(cardElement); 
  console.log(cardElement);
}

renderGroup(initialCards);


// function renderGroup(data) { ПУСТЫЕ КАРТОЧКИ
//   data.forEach((item) => {
//     return renderCard (item.name, item.link)})
// }

// function renderCard({name, link}) {
//   const templateElement = groupElemets.querySelector('.template-element').content;
//   const cardElement = templateElement.cloneNode(true);
//   const groupImage = templateElement.querySelector('.group__image');
//   groupImage.src = link;
//   const groupTitle = templateElement.querySelector('.group__title');
//   groupTitle.textContent = name;
//   groupElemets.append(cardElement); 
//   console.log(cardElement);
// }


// renderGroup(initialCards);
/////////////////////////////////////////через for

// let cardElement = templateElement.content.cloneNode(true);
// groupElemets.append(cardElement);

// for (let i = 0; i<=initialCards.length; i++) {
//   groupImage.src = initialCards[i].link
//   groupTitle.textContent = initialCards[i].name
//   let cardElement = templateElement.content.cloneNode(true);
//   groupElemets.append(cardElement);
// }
////////////////////////////////////////////
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