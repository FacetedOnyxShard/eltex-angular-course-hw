function addElementsToBlog() {
  const container = document.getElementById("small-cards-placeholder");
  const template = document.getElementById("small-card-template");

  for (let i = 0; i < 6; ++i) {
    const clone = template.content.cloneNode(true);
    container.append(clone);
  }
}

addElementsToBlog();

function initDialogLogic() {
  const dialog = document.getElementById("dialog-container");
  const openButton = document.getElementById("open-button-for-add-post");
  const closeButton = document.getElementById("close-button-for-dialog");

  openButton.addEventListener("click", () => {
    dialog.style.display = "flex";
  });
  closeButton.addEventListener("click", () => {
    dialog.style.display = "none";
  });

  // кнопки на форме
  const addButton = document.getElementById("dialog-form-add-post-button");
  const cancelButton = document.getElementById("dialog-form-cancel-button");

  if (!dialog || !openButton || !closeButton || !addButton || !cancelButton)
    return false;

  cancelButton.addEventListener("click", () => {
    dialog.style.display = "none";
  });

  return true;
}

export function waitForDialogElements() {
  const observer = new MutationObserver((m, obs) => {
    const dialog = document.getElementById("dialog-container");
    const openButton = document.getElementById("open-button-for-add-post");

    if (dialog && openButton) {
      if (initDialogLogic()) {
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
