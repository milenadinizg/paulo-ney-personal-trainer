# Paulo Ney — Consultoria Online de Personal Trainer

Site institucional para consultoria online de personal trainer, com captação de leads, envio para WhatsApp, depoimentos, resultados, dados do treinador e integração opcional com newsletter por e-mail.

O projeto está dividido em duas partes principais:

- **Site principal**: frontend em HTML, CSS e JavaScript puro, servido por um backend Node.js/Express com banco SQLite.
- **Newsletter**: módulo separado em Java/Spring Boot, responsável por salvar inscritos em PostgreSQL e enviar e-mail usando Thymeleaf + SMTP.

---

## Tecnologias utilizadas

| Parte | Tecnologias |
|------|-------------|
| Frontend | HTML5, CSS3, JavaScript puro, Bootstrap 5.3, Bootstrap Icons |
| Backend principal | Node.js, Express, CORS |
| Banco do site | SQLite via `sql.js` |
| Newsletter | Java 21, Spring Boot, Spring Web MVC, Spring Data JPA, Thymeleaf, Java Mail Sender |
| Banco da newsletter | PostgreSQL |

---

## Funcionalidades

- Página inicial com apresentação da consultoria.
- Seção de dores/problemas do público-alvo.
- Explicação do processo de acompanhamento.
- Exibição de resultados antes/depois.
- Depoimentos de clientes.
- Área com dados do personal trainer.
- Planos de acompanhamento.
- FAQ.
- Formulário de lead.
- Redirecionamento automático para WhatsApp com os dados preenchidos.
- Cadastro de depoimentos.
- Integração opcional com newsletter por e-mail.

---

## Estrutura do projeto

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── api.js
│   ├── data.js
│   ├── form.js
│   ├── render.js
│   └── ui.js
├── data/
│   ├── results.json
│   └── testimonials.json
├── server/
│   ├── database.js
│   ├── fitcoach.db
│   ├── index.js
│   ├── seed.js
│   └── img/
│       ├── paulo-ney-imagem.jpeg
│       └── results/
├── Newsletter/
│   └── Newsletter/
│       ├── pom.xml
│       ├── mvnw
│       ├── mvnw.cmd
│       └── src/
│           └── main/
│               ├── java/com/pauloney/Newsletter/
│               └── resources/
│                   ├── application.properties
│                   └── templates/email/newsletter.html
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## Pré-requisitos

Para rodar o site principal, instale:

- Node.js 18 ou superior.
- npm.

Para rodar o módulo de newsletter, instale também:

- Java 21.
- PostgreSQL.
- Maven, ou use o Maven Wrapper já incluído no projeto.

Verifique as instalações com:

```bash
node --version
npm --version
java --version
```

---

# 1. Como rodar o site principal

## 1.1 Instalar dependências

Na raiz do projeto, execute:

```bash
npm install
```

## 1.2 Criar e popular o banco SQLite

Ainda na raiz do projeto, execute:

```bash
npm run seed
```

Esse comando cria/popula o banco:

```text
server/fitcoach.db
```

Ele insere dados iniciais como:

- informações do personal trainer;
- credenciais;
- estatísticas;
- resultados antes/depois;
- depoimentos iniciais.

## 1.3 Rodar o servidor

```bash
npm start
```

Depois acesse:

```text
http://localhost:3000
```

## 1.4 Rodar em modo desenvolvimento

```bash
npm run dev
```

Esse comando usa o modo `--watch` do Node para reiniciar o servidor automaticamente quando houver mudanças nos arquivos do backend.

---

# 2. Como rodar a Newsletter

O módulo de newsletter fica em:

```text
Newsletter/Newsletter
```

Ele é uma aplicação Spring Boot separada do backend Node.js.

## 2.1 Criar o banco PostgreSQL

Crie um banco no PostgreSQL chamado:

```sql
CREATE DATABASE paulo_ney_newsletter;
```

## 2.2 Configurar o arquivo `application.properties`

O arquivo fica em:

```text
Newsletter/Newsletter/src/main/resources/application.properties
```

Configure os dados do banco e do e-mail:

```properties
spring.application.name=Newsletter

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=SEU_EMAIL@gmail.com
spring.mail.password=SUA_SENHA_DE_APP
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

spring.datasource.url=jdbc:postgresql://localhost:5432/paulo_ney_newsletter
spring.datasource.username=SEU_USUARIO_POSTGRES
spring.datasource.password=SUA_SENHA_POSTGRES
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

> Importante: não envie senhas reais para o GitHub. Use senhas de app no Gmail e, em produção, prefira variáveis de ambiente.

## 2.3 Rodar no Windows

Dentro da pasta `Newsletter/Newsletter`, execute:

```bash
mvnw.cmd spring-boot:run
```

## 2.4 Rodar no Linux/macOS

Dentro da pasta `Newsletter/Newsletter`, execute:

```bash
./mvnw spring-boot:run
```

A API da newsletter ficará disponível em:

```text
http://localhost:8080
```

---

# 3. Como usar o sistema completo

Para usar todas as funcionalidades, rode os dois servidores ao mesmo tempo:

## Terminal 1 — Site principal

Na raiz do projeto:

```bash
npm start
```

Acesse:

```text
http://localhost:3000
```

## Terminal 2 — Newsletter

Na pasta `Newsletter/Newsletter`:

```bash
mvnw.cmd spring-boot:run
```

ou, no Linux/macOS:

```bash
./mvnw spring-boot:run
```

A newsletter ficará em:

```text
http://localhost:8080
```

O frontend chama a newsletter por meio da função:

```js
Api.subscribeToNewsletter(email, name)
```

Essa função envia os dados para:

```text
POST http://localhost:8080/api/sub
```

---

## Scripts disponíveis

Na raiz do projeto:

| Comando | Descrição |
|--------|-----------|
| `npm install` | Instala as dependências do Node.js |
| `npm run seed` | Cria/popula o banco SQLite |
| `npm start` | Inicia o servidor Express |
| `npm run dev` | Inicia o servidor em modo desenvolvimento com watch |

No módulo da newsletter:

| Comando | Descrição |
|--------|-----------|
| `mvnw.cmd spring-boot:run` | Roda a newsletter no Windows |
| `./mvnw spring-boot:run` | Roda a newsletter no Linux/macOS |

---

## API do site principal

Base URL local:

```text
http://localhost:3000
```

### Depoimentos

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/testimonials` | Lista depoimentos aprovados |
| `POST` | `/api/testimonials` | Cadastra um novo depoimento |

Exemplo de envio:

```json
{
  "name": "João Silva",
  "role": "Aluno",
  "rating": 5,
  "text": "Consegui evoluir muito com o acompanhamento."
}
```

### Avaliações

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/reviews` | Lista avaliações aprovadas |
| `GET` | `/api/reviews?plan=PRO` | Lista avaliações filtrando por plano |
| `POST` | `/api/reviews` | Cadastra uma nova avaliação |

Exemplo de envio:

```json
{
  "name": "Maria Oliveira",
  "email": "maria@email.com",
  "plan": "PRO",
  "rating": 5,
  "comment": "O plano foi excelente para minha rotina."
}
```

### Leads

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/leads` | Salva os dados de um potencial cliente |

Exemplo de envio:

```json
{
  "name": "Carlos Lima",
  "email": "carlos@email.com",
  "whatsapp": "88999999999",
  "goal": "lose-weight"
}
```

### Dados institucionais

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/trainer` | Retorna dados do personal trainer |
| `GET` | `/api/stats` | Retorna estatísticas do topo do site |
| `GET` | `/api/results` | Retorna resultados antes/depois |

---

## API da Newsletter

Base URL local:

```text
http://localhost:8080
```

### Inscrição na newsletter

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/sub` | Salva o inscrito no PostgreSQL e envia o e-mail de newsletter |

Exemplo de envio:

```json
{
  "name": "Ana Souza",
  "email": "ana@email.com"
}
```

---

## Banco de dados do site principal

O site principal usa SQLite via `sql.js`.

Arquivo do banco:

```text
server/fitcoach.db
```

Tabelas criadas automaticamente:

| Tabela | Função |
|--------|--------|
| `testimonials` | Armazena depoimentos dos clientes |
| `reviews` | Armazena avaliações dos planos |
| `leads` | Armazena os dados enviados pelo formulário principal |
| `trainer` | Armazena dados do personal trainer |
| `trainer_credentials` | Armazena credenciais/badges do treinador |
| `stats` | Armazena estatísticas exibidas na página inicial |
| `results` | Armazena resultados antes/depois |

---

## Banco de dados da Newsletter

A newsletter usa PostgreSQL com JPA/Hibernate.

Tabela principal:

| Tabela | Função |
|--------|--------|
| `user_sub` | Armazena nome e e-mail dos usuários inscritos |

A tabela é criada/atualizada automaticamente por causa da configuração:

```properties
spring.jpa.hibernate.ddl-auto=update
```

---

## Observações importantes

### 1. A newsletter é opcional

O site principal funciona mesmo se o módulo da newsletter não estiver rodando. Nesse caso, o lead ainda será enviado para o backend Node.js e o usuário será redirecionado para o WhatsApp.

Porém, para o envio de e-mail funcionar, o servidor Spring Boot precisa estar rodando em:

```text
http://localhost:8080
```

### 2. O formulário principal faz duas ações

Quando o usuário envia o formulário:

1. salva o lead em `/api/leads`;
2. se a opção de newsletter estiver marcada, envia os dados para `/api/sub`;
3. abre o WhatsApp com uma mensagem preenchida automaticamente.

### 3. Não versionar arquivos sensíveis

Evite subir para o GitHub:

- `node_modules/`;
- `server/fitcoach.db`;
- senhas reais no `application.properties`;
- arquivos `.env`;
- pasta `target/` do Spring Boot.

---

## Problemas comuns

### Erro ao acessar `http://localhost:3000`

Verifique se o servidor Node está rodando:

```bash
npm start
```

### Banco SQLite vazio ou dados não aparecem

Execute o seed novamente:

```bash
npm run seed
```

Se quiser recriar do zero, apague o arquivo:

```text
server/fitcoach.db
```

Depois rode:

```bash
npm run seed
npm start
```

### Newsletter retorna erro 500

Confira se:

- o PostgreSQL está aberto;
- o banco `paulo_ney_newsletter` existe;
- usuário e senha do PostgreSQL estão corretos;
- o Gmail está configurado com senha de app;
- a aplicação Spring Boot está rodando na porta `8080`.

### Erro de CORS na newsletter

O CORS da newsletter está configurado para aceitar requisições de:

```text
http://localhost:3000
```

Se o frontend estiver rodando em outra porta, será necessário atualizar a configuração em:

```text
Newsletter/Newsletter/src/main/java/com/pauloney/Newsletter/config/CorsConfig.java
```

---

## Sugestão de fluxo para testar

1. Rode `npm install`.
2. Rode `npm run seed`.
3. Rode `npm start`.
4. Acesse `http://localhost:3000`.
5. Teste se resultados, depoimentos e dados do personal aparecem.
6. Preencha o formulário principal sem newsletter.
7. Confirme se o WhatsApp abre com a mensagem preenchida.
8. Configure e rode o PostgreSQL.
9. Configure e rode a newsletter com Spring Boot.
10. Preencha o formulário marcando a opção de newsletter.
11. Verifique se o usuário foi salvo no PostgreSQL e se o e-mail foi enviado.

---

## Autor

Projeto desenvolvido para a consultoria online do personal trainer **Paulo Ney**.
