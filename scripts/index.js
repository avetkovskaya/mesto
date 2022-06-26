const btnOpenEditAuthor = document.querySelector('.profile__edit-button');
const btnOpenAddCard = document.querySelector('.profile__add-picture');
const popupCloseList = document.querySelectorAll('.popup__close-button');

const popupEditAuthor = document.querySelector('.popup_for_edit-title');
const popupCard = document.querySelector('.popup_for_card');
const popupZoomImage = document.querySelector('.popup_for_zoom-image');

const formAuthor = document.querySelector('.form_for_edit-title');
const formCard = document.querySelector('.form_for_add-card');

const inputImageName = document.querySelector('.form__input_info_name-card')
const inputLinkImage = document.querySelector('.form__input_info_link-image')

const authorNameInForm = document.querySelector('.form__input_info_name-author');
const authorProfile = document.querySelector('.profile__title');
const authorJobInform = document.querySelector('.form__input_info_name-author-job');
const authorJobProfile = document.querySelector('.profile__about-author');

const placeForCard = document.querySelector('.elements');
const templateCard = document.querySelector('#element').content;

function openPopup(element) {
  element.classList.add('popup_visible');
};

function closePopup(element) {
  element.classList.remove('popup_visible');
};

function openPropfilePopup() {
  authorNameInForm.value = authorProfile.textContent;
  authorJobInform.value = authorJobProfile.textContent;
  openPopup(popupEditAuthor);
};

function submitProfile(evt) {
  evt.preventDefault();
  authorProfile.textContent = authorNameInForm.value;
  authorJobProfile.textContent = authorJobInform.value;
  closePopup(popupEditAuthor);
};

function likeCard(evt) {
  evt.target.classList.toggle('element__like_active');
};

function deleteCard(evt) {
  evt.target.closest('.element').remove();
};

function zoomImage(element) {
  openPopup(popupZoomImage);
  const popupImage = document.querySelector('.popup__image');
  const popupImageTitle = document.querySelector('.popup__image-title');
  popupImage.src = element.src;
  popupImage.alt = element.alt;
  popupImageTitle.textContent = element.alt;
};

function createCard(image, title) {
  const card = templateCard.querySelector('.element').cloneNode(true);
  const imageEl = card.querySelector('.element__image');
  imageEl.src = image;
  imageEl.alt = title;

  card.querySelector('.element__title').textContent = title;
  card.querySelector('.element__like').addEventListener('click', likeCard);
  card.querySelector('.element__delete').addEventListener('click', deleteCard);
  imageEl.addEventListener('click', () => zoomImage(imageEl));

  return card;
};

function addCard(places, element) {
  places.prepend(element);
};

function submitAddCard(evt) {
  evt.preventDefault();
  const element = createCard(inputLinkImage.value, inputImageName.value);
  addCard(placeForCard, element);
  formCard.reset();
  closePopup(popupCard);
};

initialCards.forEach((item) => {
  const card = createCard(item.link, item.name);
  addCard(placeForCard, card);
});

btnOpenEditAuthor.addEventListener('click', openPropfilePopup);
btnOpenAddCard.addEventListener('click', () => openPopup(popupCard))
popupCloseList.forEach((item) => {
  item.addEventListener('click', () => closePopup(item.closest('.popup')));
});

formAuthor.addEventListener('submit', submitProfile);
formCard.addEventListener('submit', submitAddCard);