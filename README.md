# Paulo Ney — Site de Personal Trainer

Site de consultoria online de personal trainer com backend Node.js e banco de dados SQLite.

---

## Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|------------|
| Frontend | HTML5, CSS3, JavaScript puro |
| Estilização | Bootstrap 5.3 + CSS customizado |
| Backend | Node.js com Express |
| Banco de dados | SQLite via `sql.js` (WebAssembly — sem compilação nativa) |

---

## Estrutura do Projeto

```
fitcoach/
├── index.html              ← Página principal do site
├── css/
│   └── style.css           ← Estilos customizados
├── js/
│   ├── api.js              ← Comunicação com a API REST
│   ├── data.js             ← Dados estáticos (textos, preços, FAQ)
│   ├── render.js           ← Injeta conteúdo no DOM
│   ├── ui.js               ← Interações (navbar, FAQ, scroll)
│   └── form.js             ← Formulários (lead, avaliação, depoimento)
├── server/
│   ├── index.js            ← Servidor Express + rotas da API
│   ├── database.js         ← Configuração do SQLite (cria tabelas)
│   ├── seed.js             ← Popula o banco com dados iniciais
│   └── fitcoach.db         ← Banco gerado automaticamente (não versionar)
├── data/                   ← (legado — não mais utilizado)
├── package.json
├── .gitignore
└── README.md
```

---

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** versão 18 ou superior → https://nodejs.org
- **Git** → https://git-scm.com

Para verificar se já estão instalados, abra o terminal e execute:

```bash
node --version   # deve mostrar v18.x.x ou superior
npm --version    # deve mostrar 9.x.x ou superior
git --version    # deve mostrar git version 2.x.x
```

---

## Como Compilar e Rodar Localmente

### Passo 1 — Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/fitcoach.git
cd fitcoach
```

### Passo 2 — Instalar as dependências

```bash
npm install
```

Isso cria a pasta `node_modules/` com os pacotes:
- **express** — servidor web
- **sql.js** — SQLite em WebAssembly (funciona no Windows sem Visual Studio)
- **cors** — permite requisições entre origens

### Passo 3 — Popular o banco de dados (apenas na primeira vez)

```bash
npm run seed
```

Este comando cria o arquivo `server/fitcoach.db` e insere os dados iniciais:
depoimentos, estatísticas, resultados de antes/depois e dados do trainer.

Você verá a saída:
```
 Iniciando seed do banco de dados...
 Dados do trainer inseridos.
 Estatísticas inseridas.
 Resultados antes/depois inseridos.
 Depoimentos inseridos.
 Seed concluído! Banco de dados pronto.
```

### Passo 4 — Iniciar o servidor

```bash
npm start
```

Acesse no navegador: **http://localhost:3000**

Para desenvolvimento com reinicialização automática ao salvar arquivos:

```bash
npm run dev
```

---

## API REST

O servidor expõe os seguintes endpoints:

### Depoimentos

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/testimonials` | Lista todos os depoimentos aprovados |
| `POST` | `/api/testimonials` | Envia um novo depoimento (fica pendente) |

Exemplo de body para POST:
```json
{
  "name": "João Silva",
  "role": "Engenheiro",
  "rating": 5,
  "text": "Perdi 10kg em 3 meses. Recomendo!"
}
```

### Avaliações

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/reviews` | Lista todas as avaliações aprovadas |
| `GET` | `/api/reviews?plan=PRO` | Filtra por plano |
| `POST` | `/api/reviews` | Envia uma nova avaliação |

### Leads

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/leads` | Salva um lead no banco |

### Dados do Personal

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/trainer` | Dados do personal trainer |
| `GET` | `/api/stats` | Estatísticas do hero |
| `GET` | `/api/results` | Resultados antes/depois |

---

## Banco de Dados (SQLite)

O banco `server/fitcoach.db` é criado automaticamente ao iniciar o servidor. As tabelas são:

- **`testimonials`** — depoimentos de clientes (com aprovação)
- **`reviews`** — avaliações com nota e comentário (com aprovação)
- **`leads`** — dados de potenciais clientes captados pelo formulário
- **`trainer`** — dados do personal trainer
- **`trainer_credentials`** — badges/credenciais do trainer
- **`stats`** — estatísticas exibidas no hero
- **`results`** — resultados de antes/depois

> Depoimentos e avaliações enviados pelo site ficam com `approved = 0` por padrão.
> Para aprová-los, você pode usar qualquer cliente SQLite (ex.: **DB Browser for SQLite**):
> ```sql
> UPDATE testimonials SET approved = 1 WHERE id = 1;
> UPDATE reviews SET approved = 1 WHERE id = 1;
> ```
