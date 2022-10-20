const { Router }  = require('express');

const controleLembretes = require("./controladores/lembretes");

const rotas = new Router();

rotas.route('/lembretes')
   .get(controleLembretes.getLembretes)
   .post(controleLembretes.addLembretes)
   .put(controleLembretes.updateLembrete)

rotas.route('/lembretes/:codigo')
   .get(controleLembretes.getLembretePorCodigo)
   .delete(controleLembretes.deleteLembrete)

module.exports = rotas;