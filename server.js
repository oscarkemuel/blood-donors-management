// configurando server
const express = require('express')
const server = express()

// configurando uso dos elementos estaticos
server.use(express.static('assets'))

// liberando o body
server.use(express.urlencoded({ extended: true}))

// configurar conexão com o banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: '37915',
    database: 'doe',
    host: 'localhost',
    port: 5432
})

// configurando a teamplate engine
const nunjucks = require('nunjucks')
nunjucks.configure('./', {
    express: server,
    noCache: true
})

// configurando a apresentação da pagina
server.get("/", function(req, res){

    // Puxando informações do banco de dados
    db.query(`SELECT * FROM "donors"`, function(err, result){
        if (err) return res.send('erro no banco')

        const donors = result.rows
        console.log(donors)
        return res.render('index.html', {donors})
    })
    
})

// pegando dados atraves de post
server.post("/", function(req, res){
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    // verificando se não ha inputs vazios
    if (name == '' || email == '' || blood == ''){
        return res.send('Preencha todos os dados')
    }

    const query = `INSERT INTO donors ("name", "email", "blood") VALUES ($1, $2, $3)`

    // Adicionando informações ao banco de dados
    db.query(query , [name, email, blood], function(err){
        if (err) return res.send('erro no banco')

        return res.redirect("/")
    })
    
})

// configurando porta
server.listen(3000, function(){
    console.log('Started Server')
})
