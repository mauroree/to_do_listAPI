const { pool } = require('../config');

const getLembretesDB = async () => {
    try {    
        const results = await pool.query('SELECT * FROM lembrete order by codigo');
        return results.rows;
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addLembretesDB = async (body) => {
    try {   
        const { nome, assunto, descricao } = body; 
        const results = await pool.query(`INSERT INTO lembrete (nome, assunto, descricao) 
        values ($1, $2, $3) returning codigo, nome, assunto, descricao`,
        [nome, assunto, descricao]);
        return results.rows[0];
    } catch (err) {
        throw "Erro ao inserir o lembrete: " + err;
    }    
}


const updateLembreteDB = async (body) => {
    try {   
        const {codigo, nome, assunto, descricao }  = body; 
        const results = await pool.query(`UPDATE lembrete SET nome=$1, assunto=$2, descricao=$3
        WHERE codigo=$4 returning codigo, nome, assunto, descricao`,
        [nome, assunto, descricao, codigo]);
        return results.rows[0];
    } catch (err) {
        throw "Erro ao alterar o lembrete: " + err;
    }      
}

const deleteLembreteDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM lembrete WHERE codigo=$1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Lembrete removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o lembrete: " + err;
    }     
}

const getLembretePorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM lembrete WHERE codigo=$1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            return results.rows[0];
        }       
    } catch (err) {
        throw "Erro ao recuperar o lembrete: " + err;
    }     
}


module.exports = {
    getLembretesDB, addLembretesDB, updateLembreteDB, deleteLembreteDB, getLembretePorCodigoDB }
