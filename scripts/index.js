const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*-------------------------------------------------------------------------------------------------------*/
/*                                           ELEMENTS                                                    */
/*-------------------------------------------------------------------------------------------------------*/
// MODALS------------------------------------------------------------------------------------------------
const profileEditModal = document.querySelector("#profile-edit-modal");
const addNewCardModal = document.querySelector("#profile-image-modal");
// SELECT MODALS-----------------------------------------------------------------------------------------
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(
  ".modal__picture-preview"
);

const previewCaption = previewModal.querySelector("#priview-caption");
// WRAPPERS----------------------------------------------------------------------------------------------
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addNewCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");

// form inputs-------------------------------------------------------------------------------------------
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");

// BUTTONS-----------------------------------------------------------------------------------------------
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileModalCloseBtn = document.querySelector("#profile-close-btn");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector("#profile-add-button");
const profileImageCloseBtn = document.querySelector("#profile-image-close-btn");

//-------------------------------------------------------------------------------------------------------
const cardTemplate =
  document.querySelector("#template-card").content.firstElementChild;
/*-------------------------------------------------------------------------------------------------------*/
/*                             FUNCTIONS AKA FORM DATA                                                   */
/*-------------------------------------------------------------------------------------------------------*/
function closePopUp(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__text");
  const likebutton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likebutton.addEventListener("click", () => {
    likebutton.classList.toggle("card__like-button_active");
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = cardData.link;
    previewModalImageEl.alt = cardData.name;
    previewCaption.textContent = cardData.name;
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}
/*-------------------------------------------------------------------------------------------------------*/
/*                                     EVENT HANDLERS                                                    */
/*-------------------------------------------------------------------------------------------------------*/
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileTitleInput.value = "";
  profileDescriptionInput.value = "";
  closePopUp(profileEditModal);
}
function handleAddCardSubmit(e) {
  e.preventDefault();
  const cardData = {
    name: cardTitleInput.value,
    link: cardUrlInput.value,
  };

  const titleValue = cardTitleInput.value;
  const urlValue = cardUrlInput.value;
  const cardElement = getCardElement(cardData);

  cardListEl.prepend(cardElement);
  // reset input
  cardTitleInput.value = "";
  cardUrlInput.value = "";
  closePopUp(addNewCardModal);
}
/*-------------------------------------------------------------------------------------------------------*/
/*                                    EVENT LISTENERS                                                    */
/*-------------------------------------------------------------------------------------------------------*/
// EDIT MODAL--------------------------------------------------------------------------------------------

profileEditBtn.addEventListener("click", () => openModal(profileEditModal));
// form listeners----------------------------------------------------------------------------------------
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);
// ADD MODAL---------------------------------------------------------------------------------------------
addNewCardButton.addEventListener("click", () => {
  openModal(addNewCardModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});
//

/*-------------------------------------------------------------------------------------------------------*/
/*                          "forEach" LOOPS FOR INSERTING CARDS                                          */
/*-------------------------------------------------------------------------------------------------------*/
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  const popUp = button.closest(".modal");
  button.addEventListener("click", () => closePopUp(popUp));
});
