const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'p2nodejs-login'
});

exports.login = (req, res) => {
    console.log(req.body);

    const name = req.body.nome;
    const e_mail = req.body.email;
    const user = req.body.usuario;
    const password = req.body.senha;

    db.query('SELECT usuario FROM usuarios WHERE usuario = ?', [user], async (error, results) => {
        /*
        if(error){
            console.log("erro");
        }
        if(results.length > 0){
            return res.render('login', {
                message: 'Usuario incorreto'
            })
        }
        */

        let Cripsenha = await bcrypt.hash(password, 4);
        console.log(Cripsenha);

        db.query('INSERT INTO usuarios SET ?', {nome: name, email: e_mail, usuario: user, senha: Cripsenha});
        if(error){
            console.log("erro");
        }
        else{
            console.log(results);
            return res.render('login', {
                message2: 'Usuário registrado'
            });
        }
    });
}