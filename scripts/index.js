import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const selectorsNamesForValidation = {
  formSelector: ".form",
  inputSelector: ".form__input",
  inputErrorClass: "form__input-error_active",
  errorClass: "form__input-error_visible",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_inactive", 
};

const popups = document.querySelectorAll('.popup');
const popupEditAuthor = document.querySelector('.popup_for_edit-title');
const popupCard = document.querySelector('.popup_for_card');
const btnOpenEditAuthor = document.querySelector('.profile__edit-button');
const btnOpenAddCard = document.querySelector('.profile__add-picture');

const formAuthor = popupEditAuthor.querySelector(
  ".form_for_edit-title"
);

const formCard = popupCard.querySelector(".form_for_add-card"); 

const formInputImage = formCard.querySelector(
  ".form__input_info_link-image"
);

const inputImageName = formCard.querySelector(
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
  formAuthor
);
const validatorFromForAddCard = new FormValidator(
  selectorsNamesForValidation,
  formCard
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
  authorNameInForm.value = authorProfile.textContent;
  authorJobInform.value = authorJobProfile.textContent;
  validatorFormForEditAuthor.resetValidation();
  openPopup(popupEditAuthor);
}

function submitProfileInfo(evt) {
  evt.preventDefault();
  authorProfile.textContent = authorNameInForm.value;
  authorJobProfile.textContent = authorJobInform.value;
  closePopup(popupEditAuthor);
}

function renderCard(elementPlace, element) {
  elementPlace.prepend(element);
}

function handleNewCard(card) {
  const newCard = new Card(card, "#element").generateCard();
  return newCard;
}

function submitAddCard(evt) {
  evt.preventDefault();

  const cardContainer = [];
  cardContainer.link = formInputImage.value;
  cardContainer.name = inputImageName.value;

  renderCard(cardElements, handleNewCard(cardContainer));

  closePopup(popupCard);
  formCard.reset();
}

validatorFormForEditAuthor.enableValidation();
validatorFromForAddCard.enableValidation();

btnOpenEditAuthor.addEventListener("click", openPropfilePopup);
btnOpenAddCard.addEventListener("click", () => {
  formCard.reset();
  validatorFromForAddCard.resetValidation();
  openPopup(popupCard);
});

formAuthor.addEventListener("submit", submitProfileInfo);
formCard.addEventListener("submit", submitAddCard);

popups.forEach((item) => {
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

