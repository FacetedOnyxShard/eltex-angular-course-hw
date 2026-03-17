function addElementsToBlog() {
  const container = document.getElementById("small-cards-placeholder");
  const template = document.getElementById("small-card-template");

  for(let i = 0; i < 6; ++i) {
    const clone = template.content.cloneNode(true);
    container.append(clone);
  }
}

addElementsToBlog();