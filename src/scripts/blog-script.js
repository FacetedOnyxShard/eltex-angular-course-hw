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
  const container = document.getElementById("small-cards-placeholder");
  const template = document.getElementById("small-card-template");

  for (let i = 0; i < 6; ++i) {
    const clone = template.content.cloneNode(true);
    container.append(clone);
  }
}

addElementsToBlog();

function commonDialogEvents(dialog, openButton, closeButton) {
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.classList.remove("show-dialog");
    }
  });
  openButton.addEventListener("click", () => {
    dialog.classList.add("show-dialog");
  });
  closeButton.addEventListener("click", () => {
    dialog.classList.remove("show-dialog");
  });
}

function getArticlesFromLocalStorage() {
  localStorage.getItem("articles").split(",") ?? [];
}

function addArticle() {
  const form = document.getElementById("form--bright");

  form.onsubmit = (e) => {
    e.preventDefault();

    const newArticle = {
      id: crypto.randomUUID(),
      image: "../empty-picture.png",
      title: document.getElementById("form-title-input").value,
      content: document.getElementById("form-article-content").value,
      publicationDate: new Date(),
    };

    localStorage.setItem("articles", JSON.stringify(newArticle));
    form.reset();
  };
}

function initAddPostDialogLogic() {
  const dialog = document.getElementById("dialog-container");
  const openButton = document.getElementById("open-button-for-add-post");
  const closeButton = document.getElementById("close-button-for-dialog");

  commonDialogEvents(dialog, openButton, closeButton);
  // кнопки на форме
  const addButton = document.getElementById("dialog-form-add-post-button");
  const cancelButton = document.getElementById("dialog-form-cancel-button");

  if (!dialog || !openButton || !closeButton || !addButton || !cancelButton)
    return false;

  addArticle();

  cancelButton.addEventListener("click", () => {
    dialog.classList.remove("show-dialog");
  });

  return true;
}

function initStatsDialogLogic() {
  const dialog = document.getElementById("stats-dialog-container");
  const openButton = document.getElementById("open-button-for-stats");
  const closeButton = document.getElementById("close-button-for-stats-dialog");

  commonDialogEvents(dialog, openButton, closeButton);

  return true;
}

export function waitForDialogElements() {
  const observer = new MutationObserver((m, obs) => {
    const dialog = document.getElementById("dialog-container");
    const openButton = document.getElementById("open-button-for-add-post");

    const statsDialog = document.getElementById("dialog-container");
    const statsOpenButton = document.getElementById("open-button-for-add-post");

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

document.addEventListener("DOMContentLoaded", function () {
  waitForDialogElements();
});

function calculatePostsCount() {
  const postContainer = document.getElementById("posts-section");
  const articles = postContainer.querySelectorAll("article");

  const metricContainer = document.getElementById("posts-count");
  metricContainer.innerHTML = `
    <h4 class="metric-section__title">Всего статей:</h4>
    <p class="metric-section__metric">${articles.length}</p>
  `;
}

calculatePostsCount();

function workWithDynamicArticles() {
  let articles = JSON.parse(localStorage.getItem("articles")) ?? [];
  console.log(articles);
}

workWithDynamicArticles();
