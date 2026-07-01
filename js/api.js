const BASE_URL = ""; 

const Api = {
  // Depoimentos

  async getTestimonials() {
    const res = await fetch(`${BASE_URL}/api/testimonials`);
    if (!res.ok) throw new Error("Erro ao buscar depoimentos");
    return res.json();
  },

  async postTestimonial(data) {
    const res = await fetch(`${BASE_URL}/api/testimonials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error || "Erro ao enviar depoimento");
    return body;
  },

  // Avaliações

  async getReviews(plan = null) {
    const url = plan
      ? `${BASE_URL}/api/reviews?plan=${encodeURIComponent(plan)}`
      : `${BASE_URL}/api/reviews`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Erro ao buscar avaliações");
    return res.json();
  },

  async postReview(data) {
    const res = await fetch(`${BASE_URL}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error || "Erro ao enviar avaliação");
    return body;
  },

  // Leads

  async postLead(data) {
    const res = await fetch(`${BASE_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error || "Erro ao salvar lead");
    return body;
  },

  // Dados do personal

  async getTrainer() {
    const res = await fetch(`${BASE_URL}/api/trainer`);
    if (!res.ok) throw new Error("Erro ao buscar dados do trainer");
    return res.json();
  },

  async getStats() {
    const res = await fetch(`${BASE_URL}/api/stats`);
    if (!res.ok) throw new Error("Erro ao buscar estatísticas");
    return res.json();
  },

  async getResults() {
    const res = await fetch(`${BASE_URL}/api/results`);
    if (!res.ok) throw new Error("Erro ao buscar resultados");
    return res.json();
  },

  async subscribeToNewsletter(email, name) {
    const res = await fetch(`http://localhost:8080/api/sub`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email }),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error || "Erro ao se inscrever na newsletter");
    return body;
  }
};
