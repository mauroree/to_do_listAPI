const { pool } = require('../config');

const {  getLembretesDB, addLembretesDB, updateLembreteDB, deleteLembreteDB, getLembretePorCodigoDB } = require('../servicos/servicoLembretes')

const getLembretes = async (request, response) => {
    await getLembretesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar o lembrete: ' + err
        }));
}

const addLembretes = async (request, response) => {
    await addLembretesDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Lembrete criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateLembrete = async (request, response) => {
    await updateLembreteDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Lembrete alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteLembrete = async (request, response) => {
    await deleteLembreteDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getLembretePorCodigo = async (request, response) => {
    await getLembretePorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
    getLembretes, addLembretes, updateLembrete, deleteLembrete, getLembretePorCodigo
}