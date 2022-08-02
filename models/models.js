const mysql = require('mysql')
const pool = require('../db/connect')

//funcao do register
function registerFunction(obj) {
  const insert = `INSERT INTO registro (nome, email, idade, cpf) VALUES ('${obj.nome}', '${obj.email}', ${obj.idade}, '${obj.cpf}')`

  pool.query(insert, function (err) {
    if (err) {
      console.log(err)
    }
  })

  console.log('Models funcionando!', obj)
}

module.exports = {
  registerFunction
}
