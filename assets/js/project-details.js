// assets/js/project-details.js

document.addEventListener("DOMContentLoaded", () => {
  // Get project ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");

  if (!projectId || !projectData[projectId]) {
    document.querySelector("#project-description").textContent =
      "Project not found.";
    return;
  }

  const project = projectData[projectId];

  // Elements
  const imageGalleryEl = document.getElementById("project-images");
  const infoEl = document.getElementById("project-info");
  const descEl = document.getElementById("project-description");
  const featuresEl = document.getElementById("project-features");

  /* ==============================
     1. Load images into Swiper
  ============================== */
  project.images.forEach((imgSrc) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    const img = document.createElement("img");
    img.src = imgSrc;
    img.classList.add("img-fluid");
    img.loading = "lazy";

    slide.appendChild(img);
    imageGalleryEl.appendChild(slide);
  });

  // Initialize Swiper AFTER images are added
  new Swiper(".portfolio-details-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  /* ==============================
     2. Project Info
  ============================== */
  infoEl.innerHTML = `
    <li><strong>Category</strong>: ${project.category}</li>
    <li><strong>Client</strong>: ${project.client}</li>
    <li><strong>Project date</strong>: ${project.date || "N/A"}</li>
    <li><strong>Project URL</strong>: <a href="${project.url}" target="_blank">${project.url}</a></li>
  `;

  /* ==============================
     3. Description
  ============================== */
  descEl.textContent = project.overview;

  /* ==============================
     4. Features (optional)
  ============================== */
  if (project.features && project.features.length > 0) {
    const featureTitle = document.createElement("h3");
    featureTitle.textContent = "Key Features";
    featuresEl.appendChild(featureTitle);

    const row = document.createElement("div");
    row.classList.add("row", "gy-3");

    project.features.forEach((feature, index) => {
      const col = document.createElement("div");
      col.classList.add("col-md-6");

      const item = document.createElement("div");
      item.classList.add("feature-item");
      item.setAttribute("data-aos", "fade-up");
      item.setAttribute("data-aos-delay", 400 + index * 100);

      item.innerHTML = `
        <i class="${feature.icon}"></i>
        <h4>${feature.title}</h4>
        <p>${feature.description}</p>
      `;

      col.appendChild(item);
      row.appendChild(col);
    });

    featuresEl.appendChild(row);
  }
});
