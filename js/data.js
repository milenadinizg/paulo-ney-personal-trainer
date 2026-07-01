const painPoints = [
  {
    icon: "bi-exclamation-circle",
    title: "Falta de Responsabilidade",
    description:
      "Você começa motivado mas perde o gás em poucas semanas. Ninguém acompanha, ninguém te cobra resultados.",
  },
  {
    icon: "bi-exclamation-circle",
    title: "Programas Genéricos",
    description:
      "Treinos prontos da internet que não consideram seu tipo físico, limitações ou objetivos reais.",
  },
  {
    icon: "bi-exclamation-circle",
    title: "Dinheiro Desperdiçado",
    description:
      "Pagando mensalidades em academias com equipamentos que você não usa corretamente e sem orientação adequada.",
  },
];

const processSteps = [
  {
    icon: "bi-clipboard-check",
    number: "01",
    title: "AVALIAÇÃO",
    description:
      "Complete um questionário detalhado sobre seu nível de condicionamento, objetivos, lesões e estilo de vida.",
  },
  {
    icon: "bi-bar-chart-steps",
    number: "02",
    title: "PLANO PERSONALIZADO",
    description:
      "Receba seu programa de treino personalizado e guia nutricional em até 48 horas.",
  },
  {
    icon: "bi-calendar-check",
    number: "03",
    title: "CHECK-INS SEMANAIS",
    description:
      "Acompanhe o progresso com fotos, medidas e desempenho. Receba ajustes em tempo real.",
  },
  {
    icon: "bi-trophy",
    number: "04",
    title: "RESULTADOS",
    description:
      "Alcance sua transformação em 90 dias e estabeleça hábitos sustentáveis para a vida toda.",
  },
];

const pricingPlans = [
  {
    name: "ESSENCIAL",
    price: "R$ 299",
    period: "/mês",
    popular: false,
    features: [
      "Programa de treino personalizado",
      "Plano nutricional individualizado",
      "Check-ins mensais",
      "Suporte por email",
    ],
  },
  {
    name: "PRO",
    price: "R$ 399",
    period: "/mês",
    popular: true,
    features: [
      "Programa de treino personalizado",
      "Plano nutricional individualizado",
      "Check-ins semanais",
      "Suporte prioritário no WhatsApp",
      "Dashboard de acompanhamento",
      "Ajustes mensais no plano",
    ],
  },
  {
    name: "ELITE",
    price: "R$ 599",
    period: "/mês",
    popular: false,
    features: [
      "Programa de treino personalizado",
      "Plano nutricional individualizado",
      "Chamadas de vídeo quinzenais",
      "Suporte 24/7 no WhatsApp",
      "Dashboard de acompanhamento",
      "Ajustes semanais no plano",
      "Recomendações de suplementos",
      "Protocolos de recuperação",
    ],
  },
];

const trustBadges = [
  { icon: "bi-shield-check", text: "Garantia de satisfação" },
  { icon: "bi-lock", text: "Pagamento seguro" },
  { icon: "bi-award", text: "Mais de 300 histórias de sucesso" },
];

const faqData = [
  {
    question: "Preciso de matrícula em academia?",
    answer:
      "Não necessariamente. Posso criar programas para treinos em casa com equipamento mínimo ou com acesso completo à academia—o que funcionar melhor para você.",
  },
  {
    question: "Com que frequência nos comunicamos?",
    answer:
      "Depende do seu plano. Essencial inclui check-ins mensais, Pro inclui check-ins semanais, e Elite inclui chamadas de vídeo quinzenais mais suporte 24/7.",
  },
  {
    question: "E se eu tiver lesões ou limitações?",
    answer:
      "Já trabalhei com clientes se recuperando de lesões, dor crônica e limitações físicas. Seu programa será totalmente personalizado para contornar suas restrições.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Há um compromisso mínimo de 90 dias para ver resultados reais. Depois disso, você pode cancelar quando quiser com aviso prévio de 30 dias.",
  },
  {
    question: "Você fornece planos alimentares?",
    answer:
      "Sim! Todos os planos incluem um guia nutricional personalizado com macros, horários de refeições e recomendações alimentares adaptadas aos seus objetivos e preferências.",
  },
];

const WHATSAPP_NUMBER = "5588998027394";

const goalLabels = {
  "lose-weight": "Perder Peso",
  "build-muscle": "Ganhar Massa Muscular",
  "get-lean": "Definição e Tonificação",
  "improve-performance": "Melhorar Performance Atlética",
  "general-fitness": "Condicionamento Geral",
};
