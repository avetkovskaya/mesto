const popupEditAuthor = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('.popup__close-button');

const formAuthor = document.querySelector('.popup_for_edit-title');

const authorNameInForm = document.querySelector('.form__input_info_name-author');
const authorProfile = document.querySelector('.profile__title');
const authorJobInform = document.querySelector('.form__input_info_name-author-job');
const authorJobProfile = document.querySelector('.profile__about-author');

function openPopup(element) {
  element.classList.add('popup_visible');
};

function closePopup(element) {
  element.classList.remove('popup_visible');
};

function openPropfilePopup() {
  authorNameInForm.value = authorProfile.textContent;
  authorJobInform.value = authorJobProfile.textContent;
  openPopup(formAuthor);
};

function submit(evt) {
  evt.preventDefault();
  authorProfile.textContent = authorNameInForm.value;
  authorJobProfile.textContent = authorJobInform.value;
  closePopup(formAuthor);
};

popupEditAuthor.addEventListener('click', openPropfilePopup);
popupClose.addEventListener('click', () => closePopup(formAuthor));
formAuthor.addEventListener('submit', submit);