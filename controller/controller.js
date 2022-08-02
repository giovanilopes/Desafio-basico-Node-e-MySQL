const mysql = require('mysql')
const pool = require('../db/connect')
const { registerFunction } = require('../models/models')

exports.home = (req, res) => {
  res.render('home')
}

exports.register = async (req, res) => {
  const nome = req.body.nome
  const email = req.body.email
  const idade = req.body.idade
  const cpf = req.body.cpf

  const dadosDoUsuario = {
    nome: nome,
    email: email,
    idade: idade,
    cpf: cpf
  }

  await registerFunction(dadosDoUsuario)

  res.redirect('/')
}

exports.users = (req, res) => {
  const queryusuarios = 'SELECT * FROM registro'

  pool.query(queryusuarios, function (err, data) {
    if (err) {
      console.log(err)
      return
    }

    const usuarios = data
    console.log(usuarios)

    res.render('usuarios', { usuarios })
  })
}

exports.usersid = (req, res) => {
  const id = req.params.id

  const sql = `SELECT * FROM registro WHERE id = ${id}`

  pool.query(sql, function (err, data) {
    if (err) {
      console.log(err)
      return
    }

    const registro = data[0]

    //nome do handlebars e nome da variavel
    res.render('usersid', { registro })
  })
}

exports.useredit = (req, res) => {
  const id = req.params.id

  const sql = `SELECT * FROM registro WHERE id = ${id}`

  pool.query(sql, function (err, data) {
    if (err) {
      console.log(err)
      return
    }

    const useredit = data[0]

    res.render('useredit', { useredit })
  })
}

exports.updateduser = (req, res) => {
  const id = req.body.id
  const nome = req.body.nome
  const email = req.body.email
  const idade = req.body.idade
  const cpf = req.body.cpf

  const sql = `UPDATE registro SET nome = '${nome}', email = '${email}', idade = ${idade}, cpf = '${cpf}' WHERE id = ${id}`

  pool.query(sql, function (err) {
    if (err) {
      console.log(err)
      return
    }

    res.redirect('/usuarios')
  })
}

exports.remove = (req, res) => {
  const id = req.params.id
  const sql = `DELETE FROM registro WHERE id = ${id}`

  pool.query(sql, function (err) {
    if (err) {
      console.log(err)
      return
    }

    res.redirect('/usuarios')
  })
}
