function setupScrollSpy() {
  const sections = ["hero", "how-it-works", "results", "pricing"];
  const navLinks = document.querySelectorAll(".nav-section-link");

  function onScroll() {
    const scrollPosition = window.scrollY + 200;
    let activeSection = "";

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const { offsetTop, offsetHeight } = el;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          activeSection = id;
        }
      }
    });

    navLinks.forEach((link) => {
      if (link.dataset.section === activeSection) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll();
}

function setupFAQAccordion() {
  const faqList = document.getElementById("faq-list");

  faqList.addEventListener("click", (event) => {
    const button = event.target.closest(".faq-question");
    if (!button) return;

    const index = button.dataset.faqIndex;
    const answer = document.getElementById(`faq-answer-${index}`);
    const icon = button.querySelector(".faq-icon");
    const isOpen = answer.classList.contains("open");

    document.querySelectorAll(".faq-answer.open").forEach((openAnswer) => {
      if (openAnswer !== answer) {
        openAnswer.classList.remove("open");
        const otherButton = openAnswer.previousElementSibling;
        otherButton.querySelector(".faq-icon").classList.replace("bi-dash-lg", "bi-plus-lg");
      }
    });

    answer.classList.toggle("open", !isOpen);
    icon.classList.toggle("bi-plus-lg", isOpen);
    icon.classList.toggle("bi-dash-lg", !isOpen);
  });
}

let scrollRevealObserver = null;

function setupScrollReveal() {
  scrollRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          scrollRevealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  observeFadeUpElements();
}

// Registra no observer qualquer elemento .fade-up que ainda não foi observado.
// Precisa ser chamado sempre que conteúdo novo for inserido dinamicamente no DOM
// (ex: depoimentos, resultados, stats vindos da API), senão o elemento fica
// preso em opacity: 0 para sempre, já que só o observer o torna visível.
function observeFadeUpElements() {
  if (!scrollRevealObserver) return;
  document.querySelectorAll(".fade-up:not(.is-visible)").forEach((el) => {
    scrollRevealObserver.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupScrollSpy();
  setupFAQAccordion();
  setupScrollReveal();
});
