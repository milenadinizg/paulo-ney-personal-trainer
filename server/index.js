const express = require("express");
const path = require("path");
const cors = require("cors");
const { getDb } = require("./database");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

getDb().then((db) => {

  app.get("/api/testimonials", (req, res) => {
    const rows = db
      .prepare(`SELECT * FROM testimonials WHERE approved = 1 ORDER BY featured DESC, created_at DESC`)
      .all();
    res.json(rows);
  });

  app.post("/api/testimonials", (req, res) => {
    const { name, role, rating, text } = req.body;

    if (!name || !role || !rating || !text) {
      return res.status(400).json({ error: "Campos obrigatórios: name, role, rating, text" });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating deve ser entre 1 e 5" });
    }

    const result = db
      .prepare(`INSERT INTO testimonials (name, role, rating, text, approved, featured) VALUES (?, ?, ?, ?, 1, 0)`)
      .run(name.trim(), role.trim(), Number(rating), text.trim());

    res.status(201).json({ id: result.lastInsertRowid, message: "Depoimento enviado com sucesso!" });
  });

  app.get("/api/reviews", (req, res) => {
    const { plan } = req.query;
    let rows;

    if (plan) {
      rows = db
        .prepare(`SELECT * FROM reviews WHERE approved = 1 AND plan = ? ORDER BY created_at DESC`)
        .all(plan);
    } else {
      rows = db
        .prepare(`SELECT * FROM reviews WHERE approved = 1 ORDER BY created_at DESC`)
        .all();
    }

    res.json(rows);
  });

  app.post("/api/reviews", (req, res) => {
    const { name, email, plan, rating, comment } = req.body;

    if (!name || !email || !rating || !comment) {
      return res.status(400).json({ error: "Campos obrigatórios: name, email, rating, comment" });
    }

    const result = db
      .prepare(`INSERT INTO reviews (name, email, plan, rating, comment, approved) VALUES (?, ?, ?, ?, ?, 1)`)
      .run(name.trim(), email.trim(), plan || null, Number(rating), comment.trim());

    res.status(201).json({ id: result.lastInsertRowid, message: "Avaliação enviada! Obrigado." });
  });


  app.post("/api/leads", (req, res) => {
    const { name, email, whatsapp, goal } = req.body;

    if (!name || !email || !whatsapp || !goal) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const result = db
      .prepare(`INSERT INTO leads (name, email, whatsapp, goal) VALUES (?, ?, ?, ?)`)
      .run(name.trim(), email.trim(), whatsapp.trim(), goal);

    res.status(201).json({ id: result.lastInsertRowid, message: "Lead salvo com sucesso!" });
  });

  app.get("/api/trainer", (req, res) => {
    const trainer = db.prepare(`SELECT * FROM trainer WHERE id = 1`).get();
    if (!trainer) return res.status(404).json({ error: "Dados do trainer não encontrados" });

    const credentials = db.prepare(`SELECT * FROM trainer_credentials WHERE trainer_id = 1`).all();
    res.json({ ...trainer, credentials });
  });

  app.get("/api/stats", (req, res) => {
    const rows = db.prepare(`SELECT * FROM stats ORDER BY sort_order`).all();
    res.json(rows);
  });

  app.get("/api/results", (req, res) => {
    const rows = db.prepare(`SELECT * FROM results ORDER BY sort_order`).all();
    res.json(rows);
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
  });

  app.listen(PORT, () => {
    console.log(`\nServidor rodando em http://localhost:${PORT}`);
    console.log(`   Banco de dados: ${path.join(__dirname, "fitcoach.db")}`);
    console.log(`   Pressione Ctrl+C para parar.\n`);
  });

}).catch((err) => {
  console.error("Falha ao inicializar o banco de dados:", err);
  process.exit(1);
});
