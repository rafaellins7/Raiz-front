const express = require('express');
const path = require('path');
const db = require('./db');  

const app = express();
const PORT = process.env.PORT || 3000;

console.log(' Importado do db.js:');
console.log('Tipo:', typeof db);
console.log('É uma connection?', db.constructor.name === 'Connection');
console.log('Estado:', db.state);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// verifica a conexão com o MySQL

function verificarConexaoMySQL() {
    return new Promise((resolve) => {
        console.log('Testando conexão MySQL...');
        
        db.query('SELECT 1 as test', (err, results) => {
            if (err) {
                console.error('MySQL não responde:', err.message);
                resolve(false);
            } else {
                console.log('MySQL funcionando');
                resolve(true);
            }
        });
    });
}

//Essa é a única parte do código que interage com o banco de dados MySQL. Devido o tempo, os outros arquivos são apenas front-end.

// 1. GET todos os itens do estoque
app.get('/api/estoque', (req, res) => {
    console.log('GET /api/estoque');
    
    const sql = 'SELECT * FROM estoque ORDER BY id DESC';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar estoque:', err.message);
            return res.status(500).json({ 
                error: 'Erro no banco de dados',
                details: err.message,
                sql: sql
            });
        }
        
        console.log(`${results.length} itens encontrados`);
        console.log('Primeiro item:', results[0] ? results[0].codigo : 'Nenhum');
        res.json(results);
    });
});

// 2. POST novo item
app.post('/api/estoque', (req, res) => {
    console.log('POST /api/estoque:', req.body);
    
    const { tipo, variedade, quantidade, lote, validade } = req.body;
    
    // Validação
    if (!tipo || !variedade || !quantidade || !lote || !validade) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    // 1. Primeiro conta quantos itens já existem
    db.query('SELECT COUNT(*) as total FROM estoque', (err, countResults) => {
        if (err) {
            console.error('Erro ao contar itens:', err.message);
            return res.status(500).json({ error: 'Erro no banco de dados' });
        }
        
        const totalItens = countResults[0].total;
        const codigo = `SEM-${(totalItens + 1).toString().padStart(3, '0')}`;
        
        console.log(`Total de itens: ${totalItens}, Novo código: ${codigo}`);
        
        // 2. Insere no banco
        const sql = `
            INSERT INTO estoque 
            (codigo, tipo_semente, variedade, quantidade, lote, validade) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        db.query(sql, 
            [codigo, tipo, variedade, quantidade, lote, validade], 
            (err, insertResults) => {
                if (err) {
                    console.error('Erro ao inserir item:', err.message);
                    console.error('SQL:', sql);
                    console.error('Parâmetros:', [codigo, tipo, variedade, quantidade, lote, validade]);
                    return res.status(500).json({ 
                        error: 'Erro ao salvar no banco',
                        details: err.message
                    });
                }
                
                console.log('Item inserido no MySQL');
                console.log('📊 ID inserido:', insertResults.insertId);
                console.log('📊 Rows afetadas:', insertResults.affectedRows);
                
                // 3. Retorna o item inserido
                const novoItem = {
                    id: insertResults.insertId,
                    codigo: codigo,
                    tipo_semente: tipo,
                    variedade: variedade,
                    quantidade: parseFloat(quantidade),
                    lote: lote,
                    validade: validade,
                    data_cadastro: new Date().toISOString().split('T')[0]
                };
                
                res.status(201).json(novoItem);
            }
        );
    });
});

// 3. PUT atualizar item
app.put('/api/estoque/:id', (req, res) => {
    const id = req.params.id;
    console.log(`📝 PUT /api/estoque/${id}:`, req.body);
    
    const { tipo, variedade, quantidade, lote, validade } = req.body;
    
    const sql = `
        UPDATE estoque 
        SET tipo_semente = ?, variedade = ?, quantidade = ?, lote = ?, validade = ?
        WHERE id = ?
    `;
    
    db.query(sql, 
        [tipo, variedade, quantidade, lote, validade, id], 
        (err, results) => {
            if (err) {
                console.error('❌ Erro ao atualizar item:', err.message);
                return res.status(500).json({ error: 'Erro no banco de dados' });
            }
            
            console.log('📊 Resultado UPDATE:', results);
            
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Item não encontrado' });
            }
            
            console.log(`✅ Item ${id} atualizado`);
            res.json({ 
                success: true, 
                message: 'Item atualizado', 
                id: id,
                affectedRows: results.affectedRows
            });
        }
    );
});

// 4. DELETE excluir item
app.delete('/api/estoque/:id', (req, res) => {
    const id = req.params.id;
    console.log(`🗑️  DELETE /api/estoque/${id}`);
    
    const sql = 'DELETE FROM estoque WHERE id = ?';
    
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('❌ Erro ao excluir item:', err.message);
            return res.status(500).json({ error: 'Erro no banco de dados' });
        }
        
        console.log('📊 Resultado DELETE:', results);
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }
        
        console.log(`✅ Item ${id} excluído`);
        res.json({ 
            success: true, 
            message: 'Item excluído', 
            id: id,
            affectedRows: results.affectedRows
        });
    });
});

// ========== ROTAS DAS PÁGINAS ==========

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", 'index.html'));
});

app.get('/ajustes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ajustes.html'));
});

app.get('/pedidos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pedidos.html'));
});

app.get('/estoque', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'estoque.html'));
});

app.get('/relatorios', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'relatorios.html'));
});

app.get('/mensagens', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'mensagens.html'));
});

app.get('/fornecedores', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'fornecedores.html'));
});

app.get('/transparencia', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'transparencia.html'));
});

app.get('/painel', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'painel.html'));
});

// ========== INICIAR SERVIDOR COM VERIFICAÇÃO ==========

async function iniciarServidor() {
    console.log('🚀 Iniciando servidor...');
    
    // Testa conexão MySQL
    const mysqlOk = await verificarConexaoMySQL();
    
    if (!mysqlOk) {
        console.log('⚠️  AVISO: MySQL pode não estar funcionando corretamente');
        console.log('📌 A API retornará erro 500 nas requisições');
    }
    
    // Inicia servidor
    app.listen(PORT, () => {
        console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
        console.log(`📊 API: http://localhost:${PORT}/api/estoque`);
        console.log(`📄 Estoque: http://localhost:${PORT}/estoque`);
        console.log(`🐬 MySQL: ${mysqlOk ? '✅ Conectado' : '❌ Problemas'}`);
        
        if (!mysqlOk) {
            console.log('\n📌 Para diagnosticar:');
            console.log('1. Verifique se MySQL está rodando');
            console.log('2. Teste: node -e "require(\'./db\').query(\'SELECT 1\', console.log)"');
            console.log('3. Verifique o arquivo .env');
        }
    });
}

// Inicia o servidor
iniciarServidor().catch(err => {
    console.error('❌ Erro fatal ao iniciar servidor:', err);
    process.exit(1);
});

// Tratamento de erros não capturados
process.on('uncaughtException', (err) => {
    console.error('❌ Erro não capturado:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promise rejeitada não tratada:', reason);
});