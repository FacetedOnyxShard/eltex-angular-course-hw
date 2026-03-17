function addElementsToJobExperienceTimeline() {
  const container = document.getElementById("job-experience-timeline-list");
  const template = document.getElementById(
    "job-experience-timeline-template-element",
  );

  const BASE_IMG_PATH = "src/assets/images/";

  const items = [
    {
      image: "graphic-design-logo",
      period: "Consectetur - (2016 - 2017)",
      title: "Graphic design",
      description:
        "Nostrud tempor cillum sunt excepteur do ut proident deserunt enim consequat exercitatio",
    },
    {
      image: "photographer-logo",
      period: "Bibendum - (2017 - 2020)",
      title: "Photographer",
      description:
        "Ad do dolore cillum dolor et ex non dolor qui. Dolor amet tempor pariatur officia pariatur et",
    },
    {
      image: "photographer-assistant-logo",
      period: "Adipiscing - (2020 - 2022)",
      title: "Photographer’s Assistant",
      description:
        "Ad do dolore cillum dolor et ex non dolor qui. Dolor amet tempor pariatur officia pariatur et",
    },
  ];

  items.forEach((item) => {
    const clone = template.content.cloneNode(true);

    const img = clone.querySelector(".record__image");
    img.src = BASE_IMG_PATH + item.image + ".png";
    img.alt = item.image;

    clone.querySelector(".record__period").textContent = item.period;
    clone.querySelector(".record__title").textContent = item.title;
    clone.querySelector(".record__description").textContent = item.description;

    container.append(clone);
  });
}

addElementsToJobExperienceTimeline();
