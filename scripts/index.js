import Card from "./Card";
import FormValidator from "./FormValidator.js";

const selectorsNamesForValidation = {
  formSelector: ".form",
  inputSelector: ".form__input",
  inputErrorClass: "form__input-error",
  errorClass: "form__input-error_active",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_inactive", 
};

const popups = document.querySelectorAll('.popup');
const popupEditAuthor = document.querySelector('.popup_for_edit-title');
const popupCard = document.querySelector('.popup_for_card');
const popupZoomImage = document.querySelector('.popup_for_zoom-image');
const btnOpenEditAuthor = document.querySelector('.profile__edit-button');
const btnOpenAddCard = document.querySelector('.profile__add-picture');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popupVisible = document.querySelectorAll('.popup_visible');


const formAuthor = popupForEditAuthor.querySelector(
  ".form_for_edit-title"
);

const formCard = popupForAddCard.querySelector(".form_for_add-card"); 

const formInputImage = formForAddCard.querySelector(
  ".form__input_info_link-image"
);

const inputImageName = formForAddCard.querySelector(
  ".form__input_info_name-card"
);

const authorNameInForm = document.querySelector('.form__input_info_name-author');
const authorProfile = document.querySelector('.profile__title');
const authorJobInform = document.querySelector('.form__input_info_name-author-job');
const authorJobProfile = document.querySelector('.profile__about-author');

const cardElements = document.querySelector(".elements");

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

const validatorFormForEditAuthor = new FormValidator(
  selectorsNamesForValidation,
  formForEditAuthor
);
const validatorFromForAddCard = new FormValidator(
  selectorsNamesForValidation,
  formForCard
);

export function openPopup(popup) {
  popup.classList.add("popup_visible");
  document.addEventListener("keydown", popupCloseEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_visible");
  document.removeEventListener("keydown", popupCloseEsc);
}

function popupCloseEsc(evt) {
  if (evt.key === "Escape") {
    const popupVisible = document.querySelector(".popup_visible");
    closePopup(popupVisible);
  }
}

function openPropfilePopup() {
  authorProfileInput.value = authorProfile.textContent;
  authorJobProfileInput.value = authorJobProfile.textContent;
  validatorFormForEditAuthor.resetValidation();
  openPopup(popupEditAuthor);
}

function submitProfileInfo(evt) {
  evt.preventDefault();
  authorProfile.textContent = authorProfileInput.value;
  authorJobProfile.textContent = authorJobProfileInput.value;
  closePopup(popupEditAuthor);
}

function renderCard(elementPlace, element) {
  elementPlace.prepend(element);
}

function handleNewCard(card) {
  const newCard = new Card(card, "#card").generateCard();
  return newCard;
}

function submitAddCard(evt) {
  evt.preventDefault();

  const cardContainer = [];
  cardContainer.link = formInputImage.value;
  cardContainer.name = formInputTitle.value;

  renderCard(cardElements, handleNewCard(cardContainer));

  closePopup(popupCard);
  formForAddCard.reset();
}

window.onload = function () {
  const body = document.querySelector('.page');
  body.style.display = 'flex';
};

validatorFormForEditAuthor.enableValidation();
validatorFromForAddCard.enableValidation();

profileEditOpenBtn.addEventListener("click", openPropfilePopup);
cardAddOpenBtn.addEventListener("click", () => {
  formForAddCard.reset();
  validatorFromForAddCard.resetValidation();
  openPopup(popupCard);
});

formForEditAuthor.addEventListener("submit", submitProfileInfo);
formForAddCard.addEventListener("submit", submitAddCard);

popupList.forEach((item) => {
  item.addEventListener("mousedown", function (evt) {
    if (
      evt.target.classList.contains("popup_visible") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closePopup(item);
    }
  });
});

initialCards.forEach((item) => {
  renderCard(cardElements, handleNewCard(item));
});