async function renderHeroStats() {
  const container = document.getElementById("stats-container");

  try {
    const stats = await Api.getStats();

    stats.forEach((stat, index) => {
      const col = document.createElement("div");
      col.className = "col-12 col-md-4";
      col.innerHTML = `
        <div class="stat-card fade-up">
          <div class="stat-value" id="stat-value-${index}">0${stat.suffix}</div>
          <div class="stat-label">${stat.label}</div>
        </div>
      `;
      container.appendChild(col);
    });

    animateStatsCountUp(stats);
    if (typeof observeFadeUpElements === "function") observeFadeUpElements();
  } catch (err) {
    console.error("Erro ao carregar stats:", err);
  }
}

function animateStatsCountUp(stats) {
  const duration = 2000;
  const steps = 60;
  const interval = duration / steps;

  stats.forEach((stat, index) => {
    let current = 0;
    const increment = stat.value / steps;
    const el = document.getElementById(`stat-value-${index}`);

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        current = stat.value;
        clearInterval(timer);
      }
      const displayValue = stat.is_decimal ? current.toFixed(1) : Math.floor(current);
      el.textContent = `${displayValue}${stat.suffix}`;
    }, interval);
  });
}

function renderPainPoints() {
  const container = document.getElementById("painpoints-container");
  painPoints.forEach((point) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-4";
    col.innerHTML = `
      <div class="painpoint-card fade-up">
        <i class="bi ${point.icon} painpoint-icon"></i>
        <h3 class="painpoint-title">${point.title}</h3>
        <p class="text-gray-400 mb-0">${point.description}</p>
      </div>
    `;
    container.appendChild(col);
  });
}

function renderProcessSteps() {
  const container = document.getElementById("process-container");

  const desktopWrap = document.createElement("div");
  desktopWrap.className = "col-12 d-none d-md-block";
  desktopWrap.innerHTML = `<div class="process-line"></div>`;

  const desktopRow = document.createElement("div");
  desktopRow.className = "row g-4";

  processSteps.forEach((step) => {
    const col = document.createElement("div");
    col.className = "col-3 process-step fade-up";
    col.innerHTML = `
      <div class="process-icon-circle">
        <i class="bi ${step.icon}"></i>
      </div>
      <div class="process-number">${step.number}</div>
      <h3 class="process-title">${step.title}</h3>
      <p class="process-description">${step.description}</p>
    `;
    desktopRow.appendChild(col);
  });

  desktopWrap.appendChild(desktopRow);
  container.appendChild(desktopWrap);

  const mobileWrap = document.createElement("div");
  mobileWrap.className = "col-12 d-md-none d-flex flex-column gap-4";

  processSteps.forEach((step, index) => {
    const isLast = index === processSteps.length - 1;
    const item = document.createElement("div");
    item.className = "process-step-mobile fade-up";
    item.innerHTML = `
      <div class="process-icon-col">
        <div class="process-icon-circle-sm">
          <i class="bi ${step.icon}"></i>
        </div>
        ${!isLast ? '<div class="process-vline"></div>' : ""}
      </div>
      <div class="flex-grow-1 pb-3">
        <div class="process-number" style="font-size: 2.5rem;">${step.number}</div>
        <h3 class="process-title">${step.title}</h3>
        <p class="process-description">${step.description}</p>
      </div>
    `;
    mobileWrap.appendChild(item);
  });

  container.appendChild(mobileWrap);
}

async function renderResults() {
  const container = document.getElementById("results-grid");

  try {
    const results = await Api.getResults();

    results.forEach((result) => {
      const col = document.createElement("div");
      col.className = "col-12 col-md-4";
      col.innerHTML = `
        <div class="result-card fade-up">
          <div class="result-images">
            <div class="result-img-wrap before">
              <img src="${result.before_image}" alt="${result.name} antes">
              <span class="result-tag before-tag">ANTES</span>
            </div>
            <div class="result-img-wrap after">
              <img src="${result.after_image}" alt="${result.name} depois">
              <span class="result-tag after-tag">DEPOIS</span>
            </div>
          </div>
          <div class="result-info">
            <h3 class="result-name">${result.name}</h3>
            <p class="result-duration">${result.duration}</p>
            <p class="result-goal mb-0">${result.goal}</p>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
    if (typeof observeFadeUpElements === "function") observeFadeUpElements();
  } catch (error) {
    console.error("Erro ao carregar resultados:", error);
    container.innerHTML = `<p class="text-center text-gray-400">Não foi possível carregar os resultados agora.</p>`;
  }
}

let testimonialsData = [];
let currentTestimonialIndex = 0;

async function renderTestimonials() {
  const desktopContainer = document.getElementById("testimonials-grid");
  const featuredContainer = document.getElementById("testimonial-featured");

  desktopContainer.innerHTML = "";
  featuredContainer.innerHTML = "";

  try {
    testimonialsData = await Api.getTestimonials();

    const regular = testimonialsData.filter((t) => !t.featured);
    const featured = testimonialsData.find((t) => t.featured);

    if (regular.length === 0 && !featured) {
      const emptyEl = document.getElementById("testimonials-empty");
      if (emptyEl) emptyEl.style.display = "block";
    }

    regular.forEach((t) => {
      const card = document.createElement("div");
      card.innerHTML = buildTestimonialCardHTML(t);
      desktopContainer.appendChild(card);
    });

    renderMobileTestimonial(regular);

    if (featured) {
      featuredContainer.innerHTML = `
        <div class="testimonial-featured fade-up">
          <div class="testimonial-stars" style="font-size: 1.4rem;">
            ${buildStarsHTML(featured.rating)}
          </div>
          <p class="testimonial-text">"${featured.text}"</p>
          <div class="testimonial-name">${featured.name}</div>
          <div class="testimonial-role">${featured.role}</div>
        </div>
      `;
    }

    if (typeof observeFadeUpElements === "function") observeFadeUpElements();
  } catch (error) {
    console.error("Erro ao carregar depoimentos:", error);
    desktopContainer.innerHTML = `<p class="text-center text-gray-400">Não foi possível carregar os depoimentos agora.</p>`;
  }
}

function buildStarsHTML(rating) {
  let stars = "";
  for (let i = 0; i < rating; i++) {
    stars += `<i class="bi bi-star-fill me-1"></i>`;
  }
  return stars;
}

function buildTestimonialCardHTML(t) {
  return `
    <div class="testimonial-card fade-up">
      <div class="testimonial-stars">${buildStarsHTML(t.rating)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-name">${t.name}</div>
      <div class="testimonial-role">${t.role}</div>
    </div>
  `;
}

function renderMobileTestimonial(regularTestimonials) {
  const mobileContainer = document.getElementById("testimonials-mobile");
  if (!regularTestimonials.length) return;
  const t = regularTestimonials[currentTestimonialIndex];

  mobileContainer.innerHTML = `
    <div class="testimonial-card mb-3">
      <div class="testimonial-stars">${buildStarsHTML(t.rating)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-name mb-3">${t.name}</div>
      <div class="testimonial-role mb-3">${t.role}</div>
      <div class="d-flex justify-content-center gap-3">
        <button class="carousel-nav-btn" id="prevTestimonialBtn"><i class="bi bi-chevron-left"></i></button>
        <button class="carousel-nav-btn" id="nextTestimonialBtn"><i class="bi bi-chevron-right"></i></button>
      </div>
    </div>
  `;

  document.getElementById("prevTestimonialBtn").addEventListener("click", () => {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + regularTestimonials.length) % regularTestimonials.length;
    renderMobileTestimonial(regularTestimonials);
  });

  document.getElementById("nextTestimonialBtn").addEventListener("click", () => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % regularTestimonials.length;
    renderMobileTestimonial(regularTestimonials);
  });
}

async function renderTrainerInfo() {
  const container = document.getElementById("trainer-info");

  try {
    const trainer = await Api.getTrainer();

    const credentialsHTML = trainer.credentials
      .map((c) => `
        <div class="trainer-credential">
          <i class="bi ${c.icon}"></i>
          <span>${c.text}</span>
        </div>
      `)
      .join("");

    container.innerHTML = `
      <span class="trainer-tag">${trainer.tag}</span>
      <h2 class="trainer-name">${trainer.name}</h2>
      <div class="d-flex flex-wrap gap-2 mb-3">
        ${credentialsHTML}
      </div>
      <p class="trainer-bio">${trainer.bio}</p>
      <blockquote class="trainer-quote">"${trainer.quote}"</blockquote>
    `;

    const photoEl = document.querySelector(".trainer-photo");
    if (photoEl) photoEl.src = trainer.photo_url;
  } catch (err) {
    console.error("Erro ao carregar dados do trainer:", err);
  }
}

function renderPricingPlans() {
  const container = document.getElementById("pricing-grid");

  pricingPlans.forEach((plan) => {
    const featuresHTML = plan.features
      .map((f) => `
        <li>
          <i class="bi bi-check-circle-fill"></i>
          <span>${f}</span>
        </li>
      `)
      .join("");

    const col = document.createElement("div");
    col.className = "col-12 col-md-4";
    col.innerHTML = `
      <div class="pricing-card fade-up ${plan.popular ? "popular" : ""}">
        ${plan.popular ? '<span class="popular-badge">MAIS POPULAR</span>' : ""}
        <div class="text-center mb-3">
          <h3 class="plan-name">${plan.name}</h3>
          <div>
            <span class="plan-price">${plan.price}</span>
            <span class="plan-period">${plan.period}</span>
          </div>
        </div>
        <ul class="plan-features">
          ${featuresHTML}
        </ul>
        <a href="#community-feedback" class="btn-plan-review text-center text-decoration-none d-block mb-2">
          VER DEPOIMENTOS
        </a>
        <a href="#submit-forms" class="btn-plan ${plan.popular ? "popular" : "regular"} d-block text-center text-decoration-none">
          COMEÇAR AGORA
        </a>
      </div>
    `;
    container.appendChild(col);
  });

  const badgesContainer = document.getElementById("trust-badges");
  trustBadges.forEach((badge) => {
    const div = document.createElement("div");
    div.className = "trust-badge";
    div.innerHTML = `<i class="bi ${badge.icon}"></i><span>${badge.text}</span>`;
    badgesContainer.appendChild(div);
  });
}

function renderFAQ() {
  const container = document.getElementById("faq-list");

  faqData.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "faq-item fade-up";
    item.innerHTML = `
      <button class="faq-question" data-faq-index="${index}">
        <span>${faq.question}</span>
        <i class="bi bi-plus-lg faq-icon"></i>
      </button>
      <div class="faq-answer" id="faq-answer-${index}">
        <p>${faq.answer}</p>
      </div>
    `;
    container.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeroStats();
  renderPainPoints();
  renderProcessSteps();
  renderResults();
  renderTestimonials();
  renderTrainerInfo();
  renderPricingPlans();
  renderFAQ();
});
