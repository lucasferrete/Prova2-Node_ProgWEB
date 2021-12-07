const express = require("express");
const mysql = require("mysql");
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'p2nodejs-login'
});

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.set('view engine', 'hbs');

db.connect( (error) => {
    if(error){
        console.log("erro");
    }
    else{
        console.log("MYSQL conectado...");
    }
});

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(8081, function() {
    console.log("Servidor rodando na url http://localhost:8081");
});