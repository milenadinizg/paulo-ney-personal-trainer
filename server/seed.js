const { getDb } = require("./database");

async function seed() {
  const db = await getDb();
  console.log("Iniciando seed do banco de dados...\n");

  const trainerExists = db.prepare("SELECT COUNT(*) as count FROM trainer").get();

  if (trainerExists.count === 0) {
    const trainer = db
      .prepare(`INSERT INTO trainer (tag, name, photo_url, bio, quote) VALUES (?, ?, ?, ?, ?)`)
      .run(
        "SEU TREINADOR",
        "Paulo Ney",
        "./server/img/paulo-ney-imagem.jpeg",
        "Sou alegre, extrovertido e apaixonado por desafios, principalmente os que envolvem altura, velocidade e superação. Profissional formado pela UniCatólica desde 2019, já transformei centenas de vidas com um trabalho sério, humano e focado em resultados reais. Meu propósito é ajudar cada aluno a alcançar sua melhor versão.",
        "Sua transformação não é sobre motivação. É sobre sistemas, responsabilidade e aparecer mesmo quando você não está com vontade."
      );

    const trainerId = trainer.lastInsertRowid;

    db.prepare(`INSERT INTO trainer_credentials (trainer_id, icon, text) VALUES (?, ?, ?)`)
      .run(trainerId, "bi-award", "Certificado CREF");
    db.prepare(`INSERT INTO trainer_credentials (trainer_id, icon, text) VALUES (?, ?, ?)`)
      .run(trainerId, "bi-people", "Mais de 300 Clientes");
    db.prepare(`INSERT INTO trainer_credentials (trainer_id, icon, text) VALUES (?, ?, ?)`)
      .run(trainerId, "bi-trophy", "7 Anos de Experiência");

    console.log("Dados do trainer inseridos.");
  } else {
    console.log("Trainer já existe, pulando.");
  }

  const statsExist = db.prepare("SELECT COUNT(*) as count FROM stats").get();

  if (statsExist.count === 0) {
    db.prepare(`INSERT INTO stats (value, label, suffix, is_decimal, sort_order) VALUES (?, ?, ?, ?, ?)`)
      .run(300, "CLIENTES TRANSFORMADOS", "+", 0, 1);
    db.prepare(`INSERT INTO stats (value, label, suffix, is_decimal, sort_order) VALUES (?, ?, ?, ?, ?)`)
      .run(4.9, "AVALIAÇÃO MÉDIA", "/5", 1, 2);
    db.prepare(`INSERT INTO stats (value, label, suffix, is_decimal, sort_order) VALUES (?, ?, ?, ?, ?)`)
      .run(7, "ANOS DE EXPERIÊNCIA", " ANOS", 0, 3);

    console.log("Estatísticas inseridas.");
  } else {
    console.log("Stats já existem, pulando.");
  }

  const resultsExist = db.prepare("SELECT COUNT(*) as count FROM results").get();

  if (resultsExist.count === 0) {
    db.prepare(`INSERT INTO results (name, duration, goal, before_image, after_image, sort_order) VALUES (?, ?, ?, ?, ?, ?)`)
      .run("Carlos Silva", "4 semanas", "Perdeu 5kg",
        "./server/img/results/carlos-silva-before.jpg",
        "./server/img/results/carlos-silva-after.jpg", 1);
    db.prepare(`INSERT INTO results (name, duration, goal, before_image, after_image, sort_order) VALUES (?, ?, ?, ?, ?, ?)`)
      .run("Ana Paula", "10 semanas", "Ganhou 5kg de músculo",
        "./server/img/results/ana-paula-before.jpg",
        "./server/img/results/ana-paula-after.jpg", 2);
    db.prepare(`INSERT INTO results (name, duration, goal, before_image, after_image, sort_order) VALUES (?, ?, ?, ?, ?, ?)`)
      .run("Rafael Costa", "18 semanas", "Transformação completa",
        "./server/img/results/rafael-costa-before.jpg",
        "./server/img/results/rafael-costa-after.jpg", 3);

    console.log("Resultados antes/depois inseridos.");
  } else {
    console.log("Resultados já existem, pulando.");
  }

  const testimonialsExist = db.prepare("SELECT COUNT(*) as count FROM testimonials").get();

  if (testimonialsExist.count === 0) {
    const ins = db.prepare(`INSERT INTO testimonials (name, role, rating, text, approved, featured) VALUES (?, ?, ?, ?, ?, ?)`);

    ins.run("Alex Oliveira", "Desenvolvedor", 5,
      "Melhor investimento que já fiz. Eliminei 11kg e me sinto mais forte do que nunca.", 1, 0);
    ins.run("Mariana Santos", "Diretora de Marketing", 5,
      "Finalmente um programa que se encaixa na minha rotina corrida. Sem enrolação, só resultados. Meus níveis de energia estão nas alturas.", 1, 0);
    ins.run("Lucas Ferreira", "Empreendedor", 5,
      "Ganhei 7kg de músculo em 4 meses. O plano nutricional mudou tudo. Vale cada centavo.", 1, 0);
    ins.run("Juliana Costa", "Professora", 5,
      "Já tentei de tudo e este é o único programa que funcionou. A personalização faz toda a diferença. Não poderia estar mais feliz!", 1, 1);

    console.log("Depoimentos inseridos.");
  } else {
    console.log("Depoimentos já existem, pulando.");
  }

  console.log("\nSeed concluído! Banco de dados pronto.");
  console.log("   Execute  npm start  para iniciar o servidor.\n");
}

seed().catch((err) => {
  console.error("Erro no seed:", err);
  process.exit(1);
});
