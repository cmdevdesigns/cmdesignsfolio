// assets/js/service-details.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const serviceId = params.get("id");

  // Exit if no ID or service not found
  if (!serviceId || !serviceData[serviceId]) {
    console.error("Service not found:", serviceId);
    return;
  }

  const service = serviceData[serviceId];

  // Titles & description
  document.getElementById("service-title").textContent = service.title;
  document.getElementById("service-title-2").textContent = service.title;
  document.getElementById("service-description").textContent = service.description;

  // Features
  const featuresContainer = document.getElementById("service-features");
  if (service.features && service.features.length > 0) {
    service.features.forEach((f) => {
      const featureEl = document.createElement("div");
      featureEl.classList.add("col-md-6");
      featureEl.innerHTML = `
        <div class="feature-box d-flex align-items-start">
          <i class="${f.icon}"></i>
          <div>
            <h4>${f.title}</h4>
            <p>${f.description}</p>
          </div>
        </div>
      `;
      featuresContainer.appendChild(featureEl);
    });
  }

  // Images / slider
  if (service.images && service.images.length > 0) {
    const slider = document.getElementById("service-slider");
    const imageContainer = document.getElementById("service-images");
    slider.style.display = "block";

    service.images.forEach((img) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      slide.innerHTML = `<img src="${img}" class="img-fluid" alt="">`;
      imageContainer.appendChild(slide);
    });

    // Init Swiper
    new Swiper(".service-details-slider", {
      speed: 600,
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true }
    });
  }
});
