// util functions
function formatDate(date) {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

// logic functions
function addElementsToBlog() {
  const container = document.getElementById("blog__small-cards-placeholder");
  const template = document.getElementById("small-card-template");

  for (let i = 0; i < 6; ++i) {
    const clone = template.content.cloneNode(true);
    container.append(clone);
  }
}

function closeDialog(dialog) {
  dialog.classList.remove("show-dialog");
}

function commonDialogEvents(dialog, otherDialog, openButton, closeButton) {
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      closeDialog(dialog);
    }
  });
  openButton.addEventListener("click", () => {
    if (otherDialog.classList.contains("show-dialog")) {
      closeDialog(otherDialog);
    }

    dialog.classList.add("show-dialog");
  });
  closeButton.addEventListener("click", () => {
    closeDialog(dialog);
  });
}

// function addArticle() {
//   const form = document.getElementById("form--bright");

//   form.onsubmit = (e) => {
//     e.preventDefault();

//     const newArticle = {
//       id: crypto.randomUUID(),
//       image: "../empty-picture.png",
//       title: document.getElementById("form-title-input").value,
//       content: document.getElementById("form-article-content").value,
//       publicationDate: new Date(),
//     };

//     localStorage.setItem("articles", JSON.stringify(newArticle));
//     form.reset();
//   };
// }

function initAddPostDialogLogic() {
  const dialog = document.getElementById("dialog-container");
  const statsDialog = document.getElementById("stats-dialog-container");
  const openButton = document.getElementById("open-button-for-add-post");
  const closeButton = document.getElementById("close-button-for-dialog");

  commonDialogEvents(dialog, statsDialog, openButton, closeButton);
  // кнопки на форме
  const addButton = document.getElementById("dialog-form-add-post-button");
  const cancelButton = document.getElementById("dialog-form-cancel-button");

  if (!dialog || !openButton || !closeButton || !addButton || !cancelButton)
    return false;

  // addArticle();

  cancelButton.addEventListener("click", () => {
    closeDialog(dialog);
  });

  return true;
}

function initStatsDialogLogic() {
  const dialog = document.getElementById("stats-dialog-container");
  const addPostdialog = document.getElementById("dialog-container");
  const openButton = document.getElementById("open-button-for-stats");
  const closeButton = document.getElementById("close-button-for-stats-dialog");

  commonDialogEvents(dialog, addPostdialog, openButton, closeButton);

  return true;
}

export function waitForDialogElements() {
  const observer = new MutationObserver((m, obs) => {
    const dialog = document.getElementById("dialog-container");
    const openButton = document.getElementById("open-button-for-add-post");

    const statsDialog = document.getElementById("stats-dialog-container");
    const statsOpenButton = document.getElementById("open-button-for-stats");

    if (dialog && openButton && statsDialog && statsOpenButton) {
      if (initAddPostDialogLogic() && initStatsDialogLogic()) {
        obs.disconnect();
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

function calculatePostsCount() {
  const postContainer = document.getElementById("posts-section");
  const articles = postContainer.querySelectorAll("article");

  const metricContainer = document.getElementById("posts-count");
  metricContainer.innerHTML = `
    <h4 class="metric-section__title">Всего статей:</h4>
    <p class="metric-section__metric">${articles.length}</p>
  `;
}

function createSmallCardElement(article) {
  const template = document.getElementById("small-card-template");
  const clone = template.content.cloneNode(true);

  const title = clone.querySelector(".card__title");
  const date = clone.querySelector(".card__date");

  title.textContent = article.title;
  date.textContent = formatDate(article.publicationDate);

  return clone;
}

function createBigCardElement(article) {
  const bigCard = document.getElementById("first-article");

  const clone = bigCard.cloneNode(true);

  const image = clone.querySelector("#first-article__image");
  const title = clone.querySelector("#first-article__title");
  const content = clone.querySelector("#first-article__content");
  const date = clone.querySelector("#first-article__date");

  image.src = article.image;
  title.textContent = article.title;
  content.textContent = article.content;
  date.textContent = `Опубликовано: ${formatDate(article.publicationDate)}`;
  date.setAttribute("datetime", formatDate(article.publicationDate));

  return clone;
}

function saveArticleToLocalStorage(article) {
  let articles = getAllArticlesFromLocalStorage();
  articles.push(article);
  localStorage.setItem("articles", JSON.stringify(articles));
}

function getArticlesFromLocalStorage() {
  const articles = JSON.parse(localStorage.getItem("articles")) || [];
  return articles;
}

function convertBigCardToSmall() {
  const bigCard = document.getElementById("first-article");

  const clone = bigCard.cloneNode(true);

  const image = clone.querySelector("#first-article__image");
  const title = clone.querySelector("#first-article__title");
  const content = clone.querySelector("#first-article__content");
  const date = clone.querySelector("#first-article__date");

  const article = {
    image: image.src,
    title: title.textContent,
    content: content.textContent,
    publicationDate: new Date(), // дата текущая для упрощения
    // потом просто буду искать большую карту по id
    // или по положению в списке
  };

  return createSmallCardElement(article);
}

function addPostToPage(article) {
  const postsSection = document.getElementById("posts-section");
  const currentBigCard = document.getElementById("first-article");
  const smallCardsContainer = document.getElementById(
    "blog__small-cards-placeholder",
  );

  const newBigCard = createBigCardElement(article);

  if (currentBigCard) {
    const oldBigCardAsSmall = convertBigCardToSmall();

    currentBigCard.remove();

    postsSection.prepend(newBigCard);

    smallCardsContainer.insertBefore(
      oldBigCardAsSmall,
      smallCardsContainer.firstElementChild,
    );
  }

  calculatePostsCount();
}

function addMockPost() {
  const mockArticle = {
    id: crypto.randomUUID(),
    image: "src/assets/images/empty-picture.png",
    title: `Новый пост от ${new Date().toLocaleDateString()}`,
    content: "Это свежая статья, которая только что была добавлена!",
    publicationDate: new Date(),
  };

  addPostToPage(mockArticle);
}

function loadArticles() {}

async function main() {
  addElementsToBlog();

  document.addEventListener("DOMContentLoaded", () => {
    waitForDialogElements();

    loadArticles();
    calculatePostsCount();

    for (let i = 0; i < 3; ++i) {
      addMockPost();
    }
  });
}

main().catch(console.error);
