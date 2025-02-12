require("core-js/stable");
require("regenerator-runtime/runtime");

require("./assets/css/style.css");
const Login = require("./modules/Login");
const Contato = require("./modules/Contato");

const login = new Login(".form-login");
const cadastro = new Login(".form-cadastro");
const contato = new Contato(".form-contato");

login.init();
cadastro.init();
contato.init();
