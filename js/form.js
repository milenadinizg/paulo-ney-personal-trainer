function setupLeadForm() {
  const form = document.getElementById("lead-form");
  const submitBtn = document.getElementById("submitBtn");
  const submitText = document.getElementById("submitText");
  const submitIcon = document.getElementById("submitIcon");
  const successMessage = document.getElementById("success-message");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      whatsapp: form.whatsapp.value.trim(),
      goal: form.goal.value,
    };

    setSubmittingState(true, submitBtn, submitText, submitIcon);

    try {
      await Api.postLead(formData);
    } catch (err) {
      console.warn("Aviso: lead não salvo no banco:", err.message);
    }

    sendToWhatsApp(formData);
    setSubmittingState(false, submitBtn, submitText, submitIcon);
    showSuccessMessage(form, successMessage);
    resetFormAfterDelay(form, successMessage);
  });
}

function setSubmittingState(isSubmitting, btn, textEl, iconEl) {
  btn.disabled = isSubmitting;
  if (isSubmitting) {
    textEl.textContent = "ENVIANDO...";
    iconEl.className = "spinner-border spinner-border-sm-custom text-dark";
  } else {
    textEl.textContent = "GARANTIR MINHA VAGA";
    iconEl.className = "bi bi-send-fill";
  }
}

function sendToWhatsApp(data) {
  const goalLabel = goalLabels[data.goal] || data.goal;
  const message =
    `Olá!\n\n` +
    `Gostaria de iniciar minha transformação com a assessoria online.\n\n` +
    `*Meus dados:*\n` +
    `Nome: ${data.name}\n` +
    `Email: ${data.email}\n` +
    `WhatsApp: ${data.whatsapp}\n` +
    `Objetivo: ${goalLabel}\n\n` +
    `Aguardo retorno para começarmos!`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
}

function showSuccessMessage(form, successMessage) {
  form.classList.add("d-none");
  successMessage.classList.remove("d-none");
}

function resetFormAfterDelay(form, successMessage) {
  setTimeout(() => {
    form.reset();
    form.classList.remove("d-none");
    successMessage.classList.add("d-none");
  }, 5000);
}

function setupTestimonialForm() {
  const form = document.getElementById("testimonial-form");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "ENVIANDO...";

    try {
      await Api.postTestimonial({
        name: form.testimonialName.value.trim(),
        role: form.testimonialRole.value.trim(),
        rating: Number(form.testimonialRating.value),
        text: form.testimonialText.value.trim(),
      });

      form.reset();
      showFormFeedback(
        "testimonial-feedback",
        "Depoimento enviado!",
        "success"
      );
      const grid = document.getElementById("testimonials-grid");
      const mobile = document.getElementById("testimonials-mobile");
      const featured = document.getElementById("testimonial-featured");
      if (grid) grid.innerHTML = "";
      if (mobile) mobile.innerHTML = "";
      if (featured) featured.innerHTML = "";
      if (typeof renderTestimonials === "function") renderTestimonials();
    } catch (err) {
      showFormFeedback("testimonial-feedback", `Erro: ${err.message}`, "error");
    } finally {
      btn.disabled = false;
      btn.textContent = "ENVIAR DEPOIMENTO";
    }
  });
}

function showFormFeedback(elementId, message, type) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.className = `form-feedback ${type}`;
  el.style.display = "block";
  setTimeout(() => {
    el.style.display = "none";
  }, 6000);
}

document.addEventListener("DOMContentLoaded", () => {
  setupLeadForm();
  setupTestimonialForm();
});
