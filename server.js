const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const routes = require("./routes");
const path = require("path");
const helmet = require("helmet");
const csrf = require("csurf");
const {
  middlewareGlobal,
  checkCsrfError,
  csrfMiddleware,
} = require("./global/html/middlewares/middleware");

const apiRest = require("./projetos/api_rest/api/app");

// Conexão com o banco de dados
mongoose
  .connect(process.env.CONNECTIONSTRINGMONGO)
  .then(() => {
    app.emit("pronto");
  })
  .catch((e) => console.log(e));

// Segurança com Helmet

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"], // Permite imagens locais e externas
        styleSrc: ["'self'", "'unsafe-inline'", "https:"], // Permite CSS inline e externo
        scriptSrc: ["'self'", "'unsafe-inline'", "https:"], // Permite scripts locais e externos
        fontSrc: ["'self'", "https:", "data:"], // Permite fontes externas
      },
    },
  })
);

// Configuração para receber dados do corpo da requisição
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  if (req.headers["x-forwarded-proto"] === "https") {
    return res.redirect(`http://${req.headers.host}${req.url}`);
  }
  next();
});

// Configuração de arquivos estáticos
app.use(express.static(path.join(__dirname, "./global/html")));
app.use(express.static(path.join(__dirname, "./projetos/api_rest/uploads")));

app.use(
  "/landing_page",
  express.static(path.resolve(__dirname, "./projetos/landing_page"))
);

app.use(
  "/api_rest",
  express.static(
    path.resolve(__dirname, "./projetos/api_rest/html/documentacao")
  )
);

app.use(
  "/api_rest/assets",
  express.static(path.resolve(__dirname, "./projetos/api_rest/html/assets"))
);

app.use(
  "/agenda/public",
  express.static(path.resolve(__dirname, "./projetos/projetoagenda/public"))
);

app.use(
  "/lista_tarefas",
  express.static(path.resolve(__dirname, "./public/lista_tarefas/build"))
);

app.use(apiRest);

// Configuração de sessões
const sessionOptions = session({
  secret: "akasdfj0út23453456+54qt23qv  qwf qwer qwer qewr asdasdasda a6()",
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRINGMONGO }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

app.use(sessionOptions);
app.use(flash());

// Configuração das views
app.set("views", path.resolve(__dirname, "./projetos/projetoagenda/src/views"));
app.set("view engine", "ejs");

// Configuração de CSRF
app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

// Rotas
app.use(routes);

// Inicialização do servidor
app.on("pronto", () => {
  app.listen(3000, () => {
    console.log(
      "Servidor executando na porta 3000, acesse http://localhost:3000"
    );
  });
});
