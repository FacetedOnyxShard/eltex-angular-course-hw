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

  const COMPONENT_PATH = "src/pages/components/";

  async function loadComponents() {
    await loadComponent(COMPONENT_PATH + "header.html", "header-placeholder");
    setActiveNavLink();

    await loadComponent(COMPONENT_PATH + "footer.html", "footer-placeholder");
    await loadComponent(
      COMPONENT_PATH + "form--dark.html",
      "form-dark-placeholder",
    );

    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    if (currentPage === "blog.html") {
      await loadComponent(
        COMPONENT_PATH + "form--bright.html",
        "form-bright-placeholder",
      );
    }
  }

  loadComponents().catch((e) => console.error(e));
});

function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const currentPageName = currentPage.replace(".html", "");

  const navLinks = document.querySelectorAll(".header__element");

  navLinks.forEach((link) => {
    const pageAttr = link.getAttribute("data-page");

    if (pageAttr === currentPageName) {
      link.classList.add("header__element--active");
    }
  });
}
