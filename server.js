const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));

//rota principal
app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, "public", 'index.html'));
});

//rota para a pagina Ajustes
app.get('/ajustes', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'ajustes.html'));
})

//rota para a pagina pedidos
app.get('/pedidos', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'pedidos.html'));
})

//rota para a pagina estoque
app.get('/estoque', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'estoque.html'));
})

//rota para a pagina relatorios
app.get('/relatorios', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'relatorios.html'));
})

//rota para a pagina mensagens
app.get('/mensagens', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'mensagens.html'));
})

//rota para a pagina fornecedores
app.get('/fornecedores', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'fornecedores.html'));
})

//rota para a pagina transparencia
app.get('/transparencia', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'transparencia.html'));
})

//rota para a pagina painel
app.get('/painel', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'painel.html'));
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

