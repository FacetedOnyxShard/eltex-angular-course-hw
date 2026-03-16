document.addEventListener("DOMContentLoaded", function () {
  function loadComponent(url, placeholderId) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка загрузки ${url}: ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        document.getElementById(placeholderId).innerHTML = html;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const COMPONENT_PATH = "/src/pages/components/";

  async function loadComponents() {
    loadComponent(COMPONENT_PATH + "header.html", "header-placeholder");

    await loadComponent(COMPONENT_PATH + "footer.html", "footer-placeholder");
    await loadComponent(COMPONENT_PATH + "form--dark.html", "form-placeholder");
  }

  loadComponents().catch((e) => console.error(e));
});
