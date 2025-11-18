const express = require('express')
const server = express()
const cors = require('cors')
const mysql = require('mysql2/promise')

server.use(cors())
server.use(express.json())

const pool = require('./db') 
const porta = 3000

server.listen(porta, () =>{
    console.log(`Servidor rodando em: http://localhost:${porta}`)
})

server.post("/faleconosco", async (req,res) =>{
    try {
        const {nome, email, telefone, assunto, mensagem} = req.body

        if(nome == ""){
            return res.json({"resposta":"Preencha o campo nome corretamenete"})
        }else if(email == ""){
            return res.json({"resposta":"Preencha o campo e-mail corretamenete"})
        }else if(assunto == ""){
            return res.json({"resposta":"Preencha o campo assunto corretamenete"})
        }else if(mensagem == ""){
            return res.json({"resposta":"Preencha o campo mensagem corretamenete"})
        }

        const sql = `insert into fale_conosco (nome, email, telefone, assunto, mensagem) values (?,?,?,?,?)`

        const [resultado] = await pool.query(sql,[nome, email, telefone, assunto, mensagem])

        res.json({"resposta":"Enviado com sucesso"})
    } catch (error) {
        res.json({"resposta":"Erro inesperado"})
    }
})