const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./routes');
const app = express();


app.use(cors()); //vai restringir acesso (módulo segurança)

app.use(express.json());
app.use(routes);
app.use(errors());// troca erros de validação de 500 internal server error (celebrate) para bad request

app.listen(3333);