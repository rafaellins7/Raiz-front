## 🌱 **Sistema de Gestão de Sementes - Instituto Agronômico de Pernambuco**

Um sistema web para gestão de estoque de sementes desenvolvido para o Instituto Agronômico de Pernambuco (IPA).

![Status](https://img.shields.io/badge/Status-Funcional-brightgreen)
![Tecnologias](https://img.shields.io/badge/Tecnologias-Node.js%20%7C%20MySQL%20%7C%20HTML%20%7C%20CSS%20%7C%20JS-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ⚠️ **IMPORTANTE - OBSERVAÇÃO SOBRE O CÓDIGO**
A integração completa MySQL está implementada apenas no módulo de estoque. Devido ao tempo disponível para desenvolvimento, os outros arquivos são apenas front-end.

## ✨ **Funcionalidades Principais**

### 📦 **Gestão de Estoque (FULL CRUD - Com MySQL)**
- ✅ **BACKEND INTEGRADO** - Conexão real com MySQL
- ✅ Cadastro de sementes (tipo, variedade, quantidade, lote, validade)
- ✅ Visualização em tabela com dados do banco
- ✅ Edição e exclusão de itens no MySQL
- ✅ Controle de validade e lotes
- ✅ Estatísticas em tempo real

### 🎯 **Módulos do Sistema (FRONT-END APENAS)**
- **👤 Perfil do Usuário** - Interface visual apenas
- **⚙️ Ajustes** - Interface visual apenas  
- **🛒 Pedidos** - Interface visual apenas
- **📊 Relatórios** - Interface visual apenas
- **💬 Mensagens** - Interface visual apenas
- **🚚 Fornecedores** - Interface visual apenas
- **📈 Transparência** - Interface visual apenas
- **📱 Painel** - Interface visual apenas

## 🔧 **Arquivos com Integração Real**

| Arquivo | Tipo | Banco de Dados | Status |
|---------|------|----------------|---------|
| `server.js` | Backend | ✅ MySQL | **Implementado** |
| `db.js` | Conexão BD | ✅ MySQL | **Implementado** |
| `script.js` (estoque) | Frontend | ✅ MySQL | **Implementado** |
| `estoque.html` | Frontend | ✅ MySQL | **Implementado** |
| Outras páginas HTML | Frontend | ❌ Mock Data | Somente UI |

## 🛠 **Tecnologias Utilizadas**

### **Backend (Implementado para Estoque)**
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) Node.js + Express
- ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white) MySQL Database (Apenas para estoque)
- ![REST API](https://img.shields.io/badge/REST_API-02569B?style=for-the-badge&logo=rest&logoColor=white) API RESTful (Apenas `/api/estoque`)

### **Frontend (Todas as Páginas)**
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) HTML5 Semântico
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) CSS3 Moderno
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) JavaScript Vanilla

## 📁 **Estrutura do Projeto - Status Real**

```
sistema-gestao-sementes/
├── 📁 public/                          # FRONTEND COMPLETO
│   ├── 📄 index.html                   # ✅ Página principal (UI apenas)
│   ├── 📄 painel.html                  # ⚠️  painel (UI apenas)
│   ├── 📄 estoque.html                 # ✅ Gestão de estoque (COM MySQL)
│   ├── 📄 pedidos.html                 # ⚠️  Gestão de pedidos (UI apenas)
│   ├── 📄 relatorios.html              # ⚠️  Relatórios (UI apenas)
│   ├── 📄 fornecedores.html            # ⚠️  Fornecedores (UI apenas)
│   ├── 📄 ajustes.html                 # ⚠️  Ajustes (UI apenas)
│   ├── 📄 mensagens.html               # ⚠️  Mensagens (UI apenas)
│   ├── 📄 transparencia.html           # ⚠️  Transparência (UI apenas)
│   ├── 📄 layout.html                  # ✅ Layout/template base
│   ├── 📄 style.css                    # ✅ Estilos principais
│   └── 📄 script.js                    # ✅ JavaScript (estoque: ✅ MySQL)
│                                        #                 (outros: ⚠️ Mock)
├── 📄 server.js                        # ✅ Backend Node.js (COM MySQL para estoque)
├── 📄 db.js                            # ✅ Conexão com MySQL (IMPLEMENTADO)
├── 📄 package.json                     # ✅ Dependências do projeto
└── 📄 README.md                        # ✅ Este arquivo
```

## 🔌 **API Endpoints Implementados**

### **✅ IMPLEMENTADO - Com MySQL**
| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|---------|
| `GET` | `/api/estoque` | Listar todos os itens do estoque | ✅ **Produção** |
| `POST` | `/api/estoque` | Criar novo item no estoque | ✅ **Produção** |
| `PUT` | `/api/estoque/:id` | Atualizar item do estoque | ✅ **Produção** |
| `DELETE` | `/api/estoque/:id` | Excluir item do estoque | ✅ **Produção** |

### **⚠️  NÃO IMPLEMENTADOS - Apenas Mock/UI**
| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|---------|
| `GET` | `/api/pedidos` | Listar pedidos | ❌ **Somente UI** |
| `GET` | `/api/fornecedores` | Listar fornecedores | ❌ **Somente UI** |
| `GET` | `/api/relatorios` | Gerar relatórios | ❌ **Somente UI** |
| `POST` | `/api/login` | Autenticar usuário | ❌ **Somente UI** |

## 🚀 **Instalação e Configuração**

### **⚠️ CONFIGURAÇÃO DO BANCO DE DADOS**

```sql
-- IMPORTANTE: Esta tabela é a ÚNICA que será usada no sistema
-- As outras funcionalidades não possuem tabelas no banco

CREATE DATABASE sistema_sementes;
USE sistema_sementes;

-- ÚNICA TABELA IMPLEMENTADA NO SISTEMA
CREATE TABLE estoque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    tipo_semente VARCHAR(50) NOT NULL,
    variedade VARCHAR(50) NOT NULL,
    quantidade DECIMAL(10,2) NOT NULL,
    lote VARCHAR(50) NOT NULL,
    validade VARCHAR(10) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dados iniciais (opcional)
INSERT INTO estoque (codigo, tipo_semente, variedade, quantidade, lote, validade) VALUES
('SEM-001', 'Milho', 'BRS 1030', 850.00, 'L2025-001', '12/2026'),
('SEM-002', 'Feijão', 'Carioca', 450.00, 'L2025-002', '10/2026');
```

## 📝 **Notas de Desenvolvimento**

### **O Que Está Realmente Implementado**
1. **Módulo de Estoque**: CRUD completo com MySQL
2. **Interface de Todas as Páginas**: HTML/CSS/JS funcionais
3. **Validações Frontend**: Para todos os formulários
4. **Sistema de Notificações**: Feedback visual ao usuário

### **O Que é Apenas Frontend**
1. **Módulo de Pedidos**: Interface bonita, sem backend
2. **Módulo de Fornecedores**: Formulários visuais apenas
3. **Sistema de Relatórios**: Páginas estáticas
4. **Autenticação**: Tela de login visual apenas

### **Próximos Passos**
```javascript
// Para completar o sistema, seria necessário:
// 1. Criar tabelas para cada módulo no MySQL
// 2. Implementar APIs para pedidos, fornecedores, etc.
// 3. Adicionar sistema de autenticação real
// 4. Criar relacionamentos entre tabelas
```

## 👨‍💻 **Para Desenvolvedores**

### **Estrutura do Código MySQL (Única Implementada)**
```javascript
// db.js - ÚNICO arquivo de conexão com banco
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME  // Apenas 'sistema_sementes'
});

// server.js - ÚNICAS rotas com banco de dados
app.get('/api/estoque', ...)      // ✅ Implementado
app.post('/api/estoque', ...)     // ✅ Implementado  
app.put('/api/estoque/:id', ...)  // ✅ Implementado
app.delete('/api/estoque/:id', ...) // ✅ Implementado

// Outras rotas (exemplos do que FALTA implementar)
app.get('/api/pedidos', ...)      // ❌ Não implementado
app.get('/api/fornecedores', ...) // ❌ Não implementado
```

## 📊 **Status do Projeto**

| Módulo | Frontend | Backend | Banco de Dados | Status Geral |
|--------|----------|---------|----------------|--------------|
| **Estoque** | ✅ 100% | ✅ 100% | ✅ MySQL | ✅ **COMPLETO** |
| **Pedidos** | ✅ 100% | ❌ 0% | ❌ Nenhum | ⚠️  **SOMENTE UI** |
| **Fornecedores** | ✅ 100% | ❌ 0% | ❌ Nenhum | ⚠️  **SOMENTE UI** |
| **Relatórios** | ✅ 100% | ❌ 0% | ❌ Nenhum | ⚠️  **SOMENTE UI** |
| **Perfil** | ✅ 100% | ❌ 0% | ❌ Nenhum | ⚠️  **SOMENTE UI** |

## 🎯 **Foco do Projeto**

Este projeto foi desenvolvido com foco em:
1. **Demonstrar competência** em desenvolvimento full-stack
2. **Mostrar interface profissional** e responsiva
3. **Implementar CRUD completo** para o módulo principal (estoque)
4. **Criar base escalável** para futuras implementações

---

**Desenvolvido com os recursos e tempo disponíveis** ⏳  

