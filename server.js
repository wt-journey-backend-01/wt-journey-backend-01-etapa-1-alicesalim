const express = require('express')
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  res.redirect(`/contato-recebido?nome=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}&assunto=${encodeURIComponent(assunto)}&mensagem=${encodeURIComponent(mensagem)}`);
});




app.get('/contato-recebido', (req, res) => {
    const { nome, email, assunto, mensagem } = req.query;

    res.status(200)
    .set("Content-Type", "text/html")
    .send(`
        <!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8" />
    <title>Contato</title>
    <link rel="stylesheet" href="/css/style.css" />
</head>

<body>
    <header>
        <h1>Contato Recebido</h1>
    </header>

    <section>
        <a href="/">Voltar</a>
        <p>Ola ${nome} recebemos sua mensagem e te daremos um retorno atraves do email ${email}, sobre ${assunto}, vamos encaminhar a seguinte mensagem ${mensagem} para nossa equipe</p>
        
    </section>
</body>

</html>
        
        `)
})

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});

app.get('/api/lanches', (req, res) => {
    const lanches = require('./public/data/lanches.json');
    res.json(lanches);
});

app.get('/sugestao', (req, res) => {
    const nome = req.query.nome;
    const ingredientes = req.query.ingredientes;
    res.status(200).send(`
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevBurguer</title>
    <link rel="stylesheet" href="/css/style.css" />
</head>

<body>
<header>
<h1>Obrigada pela seugestão</h1>
</header>
<section>
<a href="/"> <- Voltar </a>
<p>Recebemos a seugestão do lanche: ${nome} <br> Que contem os ingredientes: ${ingredientes}<p>

</section>
</body>

</html>
        `);
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'))
});