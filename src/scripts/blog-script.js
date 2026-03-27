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

function initAddPostDialogLogic() {
  const dialog = document.getElementById("dialog-container");
  const statsDialog = document.getElementById("stats-dialog-container");
  const openButton = document.getElementById("open-button-for-add-post");
  const closeButton = document.getElementById("close-button-for-dialog");

  commonDialogEvents(dialog, statsDialog, openButton, closeButton);

  const form = document.getElementById("form--bright");
  // кнопки на форме
  const addButton = document.getElementById("dialog-form-add-post-button");
  const cancelButton = document.getElementById("dialog-form-cancel-button");

  if (!dialog || !openButton || !closeButton || !addButton || !cancelButton)
    return false;

  cancelButton.addEventListener("click", () => {
    form.reset();
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

function getPostsCount() {
  const postContainer = document.getElementById("posts-section");
  const articles = postContainer.querySelectorAll("article");

  return articles.length;
}

function calculatePostsCount() {
  const metricContainer = document.getElementById("posts-count");
  metricContainer.innerHTML = `
    <h4 class="metric-section__title">Всего статей:</h4>
    <p class="metric-section__metric">${getPostsCount()}</p>
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

  if (!bigCard) {
    const template = document.getElementById("first-article-template");
    const clone = template.content.cloneNode(true);

    const cloneImg = clone.querySelector(".card__image");
    const cloneTitle = clone.querySelector(".card__title");
    const cloneContent = clone.querySelector(".card__paragraph");
    const cloneDate = clone.querySelector(".card__publication-date");

    cloneImg.src = article.image;
    cloneTitle.textContent = article.title;
    cloneContent.textContent = article.content;
    cloneDate.textContent = `Опубликовано: ${formatDate(article.publicationDate)}`;
    cloneDate.setAttribute("datetime", formatDate(article.publicationDate));

    return clone;
  }

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

function getArticlesFromLocalStorage() {
  const articles = JSON.parse(localStorage.getItem("articles")) || [];

  return articles.map((article) => ({
    ...article,
    publicationDate: new Date(article.publicationDate),
  }));
}

function saveArticleToLocalStorage(article) {
  let articles = getArticlesFromLocalStorage();
  articles.unshift(article);
  localStorage.setItem("articles", JSON.stringify(articles));
}

function convertBigCardToSmall() {
  const bigCard = document.getElementById("first-article");

  if (!bigCard) {
    const firstBigCardTemplate = null;
    return firstBigCard;
  }

  const clone = bigCard.cloneNode(true);

  const image = clone.querySelector("#first-article__image");
  const title = clone.querySelector("#first-article__title");
  const content = clone.querySelector("#first-article__content");

  const articles = getArticlesFromLocalStorage();

  const article = {
    image: image.src,
    title: title.textContent,
    content: content.textContent,
    publicationDate: articles[0].publicationDate,
  };

  return createSmallCardElement(article);
}

function addPostToPage(article) {
  const postsSection = document.getElementById("posts-section");
  const currentBigCard = document.getElementById("first-article");
  const smallCardsContainer = document.getElementById(
    "blog__small-cards-placeholder",
  );

  if (!currentBigCard) {
    const firstBigCard = createBigCardElement(article);
    postsSection.prepend(firstBigCard);
    calculatePostsCount();
    return;
  }

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

function loadArticles() {
  const articles = getArticlesFromLocalStorage();

  articles.forEach((article) => {
    addPostToPage(article);
  });
}

function addArticleHandler() {
  const form = document.getElementById("form--bright");

  if (!form) {
    setTimeout(addArticleHandler, 100);
    return;
  }

  form.onsubmit = (e) => {
    e.preventDefault();

    const newArticle = {
      id: crypto.randomUUID(),
      image: "src/assets/images/empty-picture.png",
      title: document.getElementById("form-title-input").value,
      content: document.getElementById("form-article-content").value,
      publicationDate: new Date(),
    };

    addPostToPage(newArticle);
    saveArticleToLocalStorage(newArticle);

    form.reset();
  };
}

function convertSmallCardToBig(smallCard) {
  const bigCard = document.getElementById("first-article");

  if (!bigCard) return null;

  const clone = bigCard.cloneNode(true);

  const title = smallCard.querySelector(".card__title").textContent;
  const dateText = smallCard.querySelector(".card__date").textContent;

  const bigTitle = clone.querySelector("#first-article__title");
  const bigDate = clone.querySelector("#first-article__date");
  const bigImage = clone.querySelector("#first-article__image");
  const bigContent = clone.querySelector("#first-article__content");

  bigTitle.textContent = title || "Без названия";
  bigDate.textContent = `Опубликовано: ${dateText || ""}`;
  bigImage.src = "src/assets/images/empty-picture.png";
  bigContent.textContent = "Содержание статьи...";

  return clone;
}

function deleteArticleLogic(card) {
  card.remove();
  calculatePostsCount();
  toggleArticlePlaceholder();
}

function deleteArticleHandler() {
  const postsSection = document.getElementById("posts-section");

  postsSection.addEventListener("click", (e) => {
    const deleteButton = e.target.closest(".card__delete-article-button");

    if (!deleteButton) return;

    const card = deleteButton.closest(".card");

    if (!card) return;

    if (card.classList.contains("card--big")) {
      const nextSmallCard = postsSection.querySelector(".card--small");

      if (nextSmallCard) {
        const newBigCard = convertSmallCardToBig(nextSmallCard);

        postsSection.prepend(newBigCard);
        nextSmallCard.remove();
      }
    }

    deleteArticleLogic(card);
  });
}

function toggleArticlePlaceholder() {
  const postContainer = document.getElementById("posts-section");
  const placeholder = document.getElementById("article-placeholder");

  if (getPostsCount() === 0) {
    placeholder.classList.remove("display-none");
  } else {
    placeholder.classList.add("display-none");
  }
}

async function main() {
  document.addEventListener("DOMContentLoaded", () => {
    waitForDialogElements();

    loadArticles();
    calculatePostsCount();
    toggleArticlePlaceholder();

    addArticleHandler();
    deleteArticleHandler();
  });

  console.log(getArticlesFromLocalStorage());
}

main().catch(console.error);
