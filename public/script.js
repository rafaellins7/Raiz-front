let estoqueData = []; // Array para armazenar os itens
let itemEditando = null; 
const API_URL = '/api/estoque'; // URL daAPI

const Validacao = {
    // Validação de CPF 
    cpf: function(cpf) {
        if (!cpf) return false;
        
        cpf = cpf.replace(/\D/g, '');
        
        if (cpf.length !== 11 ) return false;
        
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;
        
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) return false;
        
        return true;
    },
    
    // Validação de CNPJ 
    cnpj: function(cnpj) {
        if (!cnpj) return false;
        
        cnpj = cnpj.replace(/\D/g, '');
        
        if (cnpj.length !== 14) return false;
        
        if (/^(\d)\1{13}$/.test(cnpj)) return false;
        
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) pos = 9;
        }
        
        let resultado = soma % 11;
        resultado = resultado < 2 ? 0 : 11 - resultado;
        
        if (resultado !== parseInt(digitos.charAt(0))) return false;
        

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        
        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) pos = 9;
        }
        
        resultado = soma % 11;
        resultado = resultado < 2 ? 0 : 11 - resultado;
        
        if (resultado !== parseInt(digitos.charAt(1))) return false;
        
        return true;
    },
    

    email: function(email) {
        if (!email) return false;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    

    telefone: function(telefone) {
        if (!telefone) return false;
        const numeros = telefone.replace(/\D/g, '');
        return numeros.length >= 10 && numeros.length <= 11;
    },
    

    cep: function(cep) {
        if (!cep) return false;
        const numeros = cep.replace(/\D/g, '');
        return numeros.length === 8;
    },
    
    
    senha: function(senha) {
        if (!senha) return false;
        return senha.length >= 6;
    },
    
    nomeCompleto: function(nome) {
        if (!nome) return false;
        const partes = nome.trim().split(' ').filter(parte => parte.length > 0);
        return partes.length >= 2;
    },
    
    // campo obrigatório
    obrigatorio: function(valor) {
        return valor !== null && valor !== undefined && valor.toString().trim() !== '';
    },
    
    // Validação de número positivo
    numeroPositivo: function(numero) {
        if (numero === '' || numero === null || numero === undefined) return false;
        const num = parseFloat(numero);
        return !isNaN(num) && num > 0;
    },
    
    // Validação de data futura (para validade)
    dataFutura: function(valor) {
        if (!valor) return false;
        // valor do input month vem no formato "YYYY-MM"
        const hoje = new Date();
        const data = new Date(valor + "-01"); 
        return data > hoje;
    }
};

function validarCampo(campo, tipo) {
    const valor = campo.value;
    let valido = true;
    let mensagem = '';
    
    
    if (campo.required && !Validacao.obrigatorio(valor)) {
        campo.classList.add('invalido');
        let erroSpan = campo.parentNode.querySelector('.mensagem-erro');
        if (!erroSpan) {
            erroSpan = document.createElement('span');
            erroSpan.className = 'mensagem-erro';
            campo.parentNode.appendChild(erroSpan);
        }
        erroSpan.textContent = 'Campo obrigatório';
        erroSpan.style.cssText = 'color: #dc3545; font-size: 0.85rem; margin-top: 0.25rem; display: block;';
        
        return false;
    }
    
    // validações por tipo
    switch(tipo) {
        case 'cpf':
            valido = Validacao.cpf(valor);
            mensagem = valido ? '' : 'CPF inválido';
            break;
            
        case 'cnpj':
            valido = Validacao.cnpj(valor);
            mensagem = valido ? '' : 'CNPJ inválido';
            break;
            
        case 'email':
            valido = Validacao.email(valor);
            mensagem = valido ? '' : 'E-mail inválido';
            break;
            
        case 'telefone':
            valido = Validacao.telefone(valor);
            mensagem = valido ? '' : 'Telefone inválido (10 ou 11 dígitos)';
            break;
            
        case 'cep':
            valido = Validacao.cep(valor);
            mensagem = valido ? '' : 'CEP inválido (8 dígitos)';
            break;
            
        case 'senha':
            valido = Validacao.senha(valor);
            mensagem = valido ? '' : 'Senha deve ter pelo menos 6 caracteres';
            break;
            
        case 'nomeCompleto':
            valido = Validacao.nomeCompleto(valor);
            mensagem = valido ? '' : 'Informe nome e sobrenome';
            break;
            
        case 'obrigatorio':
            valido = Validacao.obrigatorio(valor);
            mensagem = valido ? '' : 'Campo obrigatório';
            break;
            
        case 'numeroPositivo':
            valido = Validacao.numeroPositivo(valor);
            mensagem = valido ? '' : 'Informe um número positivo';
            break;
            
        case 'dataFutura':
            valido = Validacao.dataFutura(valor);
            mensagem = valido ? '' : 'Data deve ser futura';
            break;
    }
    
    // estilo de validação
    if (mensagem) {
        campo.classList.add('invalido');
        let erroSpan = campo.parentNode.querySelector('.mensagem-erro');
        if (!erroSpan) {
            erroSpan = document.createElement('span');
            erroSpan.className = 'mensagem-erro';
            campo.parentNode.appendChild(erroSpan);
        }
        erroSpan.textContent = mensagem;
        erroSpan.style.cssText = 'color: #dc3545; font-size: 0.85rem; margin-top: 0.25rem; display: block;';
        
    } else {
        campo.classList.remove('invalido');
        const erroSpan = campo.parentNode.querySelector('.mensagem-erro');
        if (erroSpan) {
            erroSpan.remove();
        }
    }
    
    return valido;
}


//formatar o nome do campo para exibição
function formatarNomeCampo(campoNome) {
    const mapeamento = {
        'cpf': 'CPF',
        'cnpjFornecedor': 'CNPJ do Fornecedor',
        'nomeCompleto': 'Nome Completo',
        'email': 'E-mail',
        'telefone': 'Telefone',
        'cep': 'CEP',
        'logradouro': 'Logradouro',
        'bairro': 'Bairro',
        'cidade': 'Cidade',
        'senhaAtual': 'Senha Atual',
        'novaSenha': 'Nova Senha',
        'confirmarSenha': 'Confirmar Senha',
        'tipoSementePedido': 'Tipo de Semente',
        'quantidadePedido': 'Quantidade',
        'fornecedorPedido': 'Fornecedor',
        'tipoSementeEstoque': 'Tipo de Semente',
        'variedadeEstoque': 'Variedade',
        'quantidadeEstoque': 'Quantidade',
        'loteEstoque': 'Lote',
        'validadeEstoque': 'Validade',
        'destinatarioMensagem': 'Destinatário',
        'assuntoMensagem': 'Assunto',
        'corpoMensagem': 'Mensagem',
        'nomeFornecedor': 'Nome do Fornecedor',
        'contatoFornecedor': 'Contato do Fornecedor',
        'cidadeFornecedor': 'Cidade do Fornecedor',
        'tipoRelatorio': 'Tipo de Relatório',
        'dataInicialRelatorio': 'Data Inicial',
        'dataFinalRelatorio': 'Data Final'
    };
    
    return mapeamento[campoNome] || campoNome.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}


function validarFormulario(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;
    
    const campos = form.querySelectorAll('input, select, textarea');
    let valido = true;
    let camposInvalidos = [];
    
    campos.forEach(campo => {
        if (campo.type === 'hidden' || campo.type === 'submit' || campo.type === 'button') {
            return;
        }
        
        let tipoValidacao = 'obrigatorio';
        
        if (campo.id === 'cpf' || campo.name === 'cpf') tipoValidacao = 'cpf';
        else if (campo.id === 'cnpjFornecedor' || campo.name === 'cnpj') tipoValidacao = 'cnpj';
        else if (campo.type === 'email') tipoValidacao = 'email';
        else if (campo.type === 'tel' || campo.id === 'telefone') tipoValidacao = 'telefone';
        else if (campo.id === 'cep') tipoValidacao = 'cep';
        else if (campo.type === 'password' && (campo.id === 'novaSenha' || campo.id === 'senhaAtual')) tipoValidacao = 'senha';
        else if (campo.id === 'nomeCompleto') tipoValidacao = 'nomeCompleto';
        else if (campo.type === 'number' && campo.min && parseFloat(campo.min) > 0) tipoValidacao = 'numeroPositivo';
        else if (campo.type === 'month' && (campo.id === 'validadeEstoque' || campo.name === 'validade')) tipoValidacao = 'dataFutura';
        else if (campo.required) tipoValidacao = 'obrigatorio';
        
        if (!validarCampo(campo, tipoValidacao)) {
            valido = false;
            camposInvalidos.push({
                campo: campo.id || campo.name,
                nome: formatarNomeCampo(campo.id || campo.name)
            });
        }
    });
    
    // Se houver campos inválidos, mostrar ALERT 
    if (!valido && camposInvalidos.length > 0) {
        const mensagemResumo = `Foram encontrados ${camposInvalidos.length} erro(s) de validação:\n\n` +
            camposInvalidos.map(c => `• ${c.nome}`).join('\n') +
            '\n\nPor favor, corrija os campos destacados em vermelho.';
        
        alert(` VALIDAÇÃO DO FORMULÁRIO\n\n${mensagemResumo}`);
    }
    
    return valido;
}


// Funcionalidade de navegação
function mostrarSecao(idSecao, evento) {
    const secoes = document.querySelectorAll('.secao-conteudo');
    secoes.forEach(secao => {
        secao.classList.remove('ativo');
    });
    
    const secaoAlvo = document.getElementById(idSecao);
    if (secaoAlvo) {
        secaoAlvo.classList.add('ativo');
    }
    
    const itensNavegacao = document.querySelectorAll('.item-navegacao');
    itensNavegacao.forEach(item => {
        item.classList.remove('ativo');
        
        
        const href = item.getAttribute('href');
        if (href && href.replace('.html', '') === idSecao.toLowerCase()) {
            item.classList.add('ativo');
        }
    });
    
    
    if (evento && evento.target) {
        const itemClicado = evento.target.closest('.item-navegacao');
        if (itemClicado) {
            itemClicado.classList.add('ativo');
        }
    }
    
    mostrarNotificacao(`Navegando para ${idSecao.charAt(0).toUpperCase() + idSecao.slice(1)}`);
}

// logout
function lidarComSair() {
    if (confirm('Tem certeza que deseja sair do sistema?')) {
        mostrarNotificacao('Saindo do sistema...', 'info');
        setTimeout(() => {
            alert('Logout realizado com sucesso!');
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Funcionalidade de edição de perfil
function lidarComEditarPerfil() {
    mostrarNotificacao('Modo de edição ativado', 'sucesso');
    const entradas = document.querySelectorAll('.formulario-perfil input');
    entradas.forEach(entrada => {
        entrada.focus();
    });
}

// salvar alterações 
function lidarComSalvarAlteracoes(evento) {
    if (evento) evento.preventDefault();
    
    // Validar TODOS os campos do formulário
    const formPerfil = document.querySelector('.formulario-perfil');
    if (!formPerfil) {
        mostrarNotificacao('Formulário não encontrado', 'erro');
        return;
    }
    
    const campos = {
        nomeCompleto: document.getElementById('nomeCompleto'),
        cpf: document.getElementById('cpf'),
        email: document.getElementById('email'),
        telefone: document.getElementById('telefone'),
        cep: document.getElementById('cep'),
        logradouro: document.getElementById('logradouro'),
        bairro: document.getElementById('bairro'),
        cidade: document.getElementById('cidade')
    };
    
    let valido = true;
    let primeiroCampoInvalido = null;
    let camposInvalidos = [];
    
    // Validar cada campo
    Object.keys(campos).forEach(key => {
        const campo = campos[key];
        if (campo) {
            let tipo = 'obrigatorio';
            if (key === 'cpf') tipo = 'cpf';
            else if (key === 'email') tipo = 'email';
            else if (key === 'telefone') tipo = 'telefone';
            else if (key === 'cep') tipo = 'cep';
            else if (key === 'nomeCompleto') tipo = 'nomeCompleto';
            
            if (!validarCampo(campo, tipo)) {
                valido = false;
                camposInvalidos.push(formatarNomeCampo(key));
                if (!primeiroCampoInvalido) {
                    primeiroCampoInvalido = campo;
                }
            }
        }
    });
    
    if (!valido) {
        const mensagemErro = `Corrija os seguintes campos:\n\n${camposInvalidos.map(c => `• ${c}`).join('\n')}`;
        
        mostrarNotificacao('Corrija os campos destacados em vermelho', 'erro');
        if (primeiroCampoInvalido) {
            primeiroCampoInvalido.focus();
        }
        return;
    }
    
    const dadosFormulario = {
        nomeCompleto: campos.nomeCompleto?.value || '',
        cep: campos.cep?.value || '',
        email: campos.email?.value || '',
        logradouro: campos.logradouro?.value || '',
        cpf: campos.cpf?.value || '',
        bairro: campos.bairro?.value || '',
        telefone: campos.telefone?.value || '',
        cidade: campos.cidade?.value || ''
    };
    
    console.log('Dados salvos:', dadosFormulario);
    mostrarNotificacao('Alterações salvas com sucesso!', 'sucesso');
    
    setTimeout(() => {
        mostrarModal('Sucesso', 'Seu perfil foi atualizado com sucesso!');
    }, 500);
}

// Ajustes 
function lidarComAlterarSenha() {
    const conteudoModal = `
        <h2>Alterar Senha</h2>
        <form id="formAlterarSenha" style="margin-top: 1.5rem;">
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Senha Atual *</label>
                <input type="password" id="senhaAtual" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Nova Senha *</label>
                <input type="password" id="novaSenha" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
                <small style="display: block; margin-top: 0.25rem; color: #666;">
                    Mínimo 6 caracteres
                </small>
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1.5rem;">
                <label>Confirmar Nova Senha *</label>
                <input type="password" id="confirmarSenha" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <button type="submit" class="btn-salvar">Salvar Nova Senha</button>
        </form>
    `;
    
    document.getElementById('corpoModal').innerHTML = conteudoModal;
    document.getElementById('modal').style.display = 'block';
    
    setTimeout(() => {
        const form = document.getElementById('formAlterarSenha');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                salvarNovaSenha(e);
            });
        }
    }, 100);
}

function salvarNovaSenha(evento) {
    evento.preventDefault();
    
    if (!validarFormulario('formAlterarSenha')) {
        mostrarNotificacao('Preencha todos os campos corretamente', 'erro');
        return;
    }
    
    const novaSenha = document.getElementById('novaSenha')?.value;
    const confirmarSenha = document.getElementById('confirmarSenha')?.value;
    
    if (novaSenha !== confirmarSenha) {
        mostrarNotificacao('As senhas não coincidem!', 'erro');
        return;
    }

    const senhaAtual = document.getElementById('senhaAtual')?.value;
    if (senhaAtual === novaSenha) {
        mostrarNotificacao('Sua nova senha não pode ser igual à senha atual!', 'erro');
        return;
    }
    
    mostrarNotificacao('Senha alterada com sucesso!', 'sucesso');
    fecharModal();
}


function lidarComNovoPedido() {
    const conteudoModal = `
        <h2>Novo Pedido</h2>
        <form id="formNovoPedido" style="margin-top: 1.5rem;">
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Fornecedor *</label>
                <select id="fornecedorPedido" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">Selecione...</option>
                    <option value="1">Sementes Nordeste Ltda</option>
                    <option value="2">AgroSementes PE</option>
                    <option value="3">Distribuidora Agrícola</option>
                </select>
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Tipo de Semente *</label>
                <input type="text" id="tipoSementePedido" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1.5rem;">
                <label>Quantidade (kg) *</label>
                <input type="number" id="quantidadePedido" required min="1" step="0.01" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <button type="submit" class="btn-salvar">Criar Pedido</button>
        </form>
    `;
    
    document.getElementById('corpoModal').innerHTML = conteudoModal;
    document.getElementById('modal').style.display = 'block';
    
    setTimeout(() => {
        const form = document.getElementById('formNovoPedido');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                salvarNovoPedido(e);
            });
        }
    }, 100);
}

function salvarNovoPedido(evento) {
    evento.preventDefault();
    
    if (!validarFormulario('formNovoPedido')) {
        mostrarNotificacao('Preencha todos os campos corretamente', 'erro');
        return;
    }
    
    mostrarNotificacao('Pedido criado com sucesso!', 'sucesso');
    fecharModal();
}

function verPedido(id) {
    mostrarNotificacao(`Visualizando pedido #${id}`, 'info');
    const conteudoModal = `
        <h2>Detalhes do Pedido #${String(id).padStart(3, '0')}</h2>
        <div style="margin-top: 1.5rem;">
            <p><strong>Status:</strong> Pendente</p>
            <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
            <p><strong>Fornecedor:</strong> Sementes Nordeste Ltda</p>
            <p><strong>Tipo de Semente:</strong> Milho</p>
            <p><strong>Quantidade:</strong> 500 kg</p>
            <p><strong>Valor Total:</strong> R$ 5.000,00</p>
        </div>
    `;
    document.getElementById('corpoModal').innerHTML = conteudoModal;
    document.getElementById('modal').style.display = 'block';
}

function editarPedido(id) {
    mostrarNotificacao(`Editando pedido #${id}`, 'info');
    lidarComNovoPedido();
}

// FUNÇÕES DE ESTOQUE 
function lidarComAdicionarEstoque(item = null) {
    itemEditando = item;
    
    const titulo = item ? 'Editar Item do Estoque' : 'Adicionar Item ao Estoque';
    const botaoTexto = item ? 'Salvar Alterações' : 'Adicionar ao Estoque';
    
    let validadeFormatada = '';
    if (item && item.validade) {
        const [mes, ano] = item.validade.split('/');
        validadeFormatada = `${ano}-${mes.padStart(2, '0')}`;
    }
    
    const conteudoModal = `
        <h2>${titulo}</h2>
        <form id="formEstoque" style="margin-top: 1.5rem;">
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Tipo de Semente *</label>
                <input type="text" id="tipoSementeEstoque" 
                       value="${item ? item.tipo_semente : ''}" 
                       required 
                       style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Variedade *</label>
                <input type="text" id="variedadeEstoque" 
                       value="${item ? item.variedade : ''}" 
                       required 
                       style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Quantidade (kg) *</label>
                <input type="number" id="quantidadeEstoque" 
                       value="${item ? item.quantidade : ''}" 
                       required min="0.1" step="0.01" 
                       style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Lote *</label>
                <input type="text" id="loteEstoque" 
                       value="${item ? item.lote : ''}" 
                       required 
                       style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1.5rem;">
                <label>Validade *</label>
                <input type="month" id="validadeEstoque" 
                       value="${validadeFormatada}" 
                       required 
                       style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="botoes-modal">
                <button type="button" class="btn-secundario" onclick="fecharModal()" style="margin-right: 10px;">
                    Cancelar
                </button>
                <button type="submit" class="btn-primario">
                    ${botaoTexto}
                </button>
            </div>
        </form>
    `;
    
    document.getElementById('corpoModal').innerHTML = conteudoModal;
    document.getElementById('modal').style.display = 'block';
    

    setTimeout(() => {
        const form = document.getElementById('formEstoque');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                salvarItemEstoque(e);
            });
        }
    }, 100);
}

// Função para salvar item 
async function salvarItemEstoque(event) {
    event.preventDefault();

    if (!validarFormulario('formEstoque')) {
        mostrarNotificacao('Preencha todos os campos corretamente', 'erro');
        return;
    }
    
    const tipo = document.getElementById('tipoSementeEstoque').value;
    const variedade = document.getElementById('variedadeEstoque').value;
    const quantidade = parseFloat(document.getElementById('quantidadeEstoque').value);
    const lote = document.getElementById('loteEstoque').value;
    const validade = document.getElementById('validadeEstoque').value;
    
    const [ano, mes] = validade.split('-');
    const validadeFormatada = `${mes}/${ano}`;
    
    const dados = {
        tipo: tipo,
        variedade: variedade,
        quantidade: quantidade,
        lote: lote,
        validade: validadeFormatada
    };
    
    try {
        let resposta;
        
        if (itemEditando) {
            // ATUALIZAR item existente
            resposta = await fetch(`${API_URL}/${itemEditando.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
        } else {
            // CRIAR novo item
            resposta = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
        }
        
        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.error || 'Erro ao salvar');
        }
        
        const resultado = await resposta.json();
        console.log(' Item salvo:', resultado);
        
        mostrarNotificacao(
            itemEditando ? 'Item atualizado com sucesso!' : 'Item adicionado com sucesso!',
            'sucesso'
        );
        
        fecharModal();
        
      async function carregarEstoque() {
         try {
        const timestamp = new Date().getTime();
        const resposta = await fetch(`${API_URL}?_=${timestamp}`);
        
        if (!resposta.ok) {
            throw new Error('Erro ao carregar dados');
        }
        
        estoqueData = await resposta.json();
        console.log('Itens carregados (sem cache):', estoqueData);
        
        atualizarTabelaEstoque();
        atualizarEstatisticas();
        
        return estoqueData;
    } catch (erro) {
        console.error('Erro ao carregar estoque:', erro);
        mostrarNotificacao('Erro ao carregar estoque', 'erro');
        return [];
    }
}
        
    } catch (erro) {
        console.error('Erro ao salvar item:', erro);
        mostrarNotificacao('Erro ao salvar item. Verifique o servidor.', 'erro');
    }
}

// Função para carregar os itens do estoque e mostrar na tabela
async function carregarEstoque() {
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
            throw new Error('Erro ao carregar dados');
        }
        
        estoqueData = await resposta.json();
        console.log('Itens carregados:', estoqueData);
        
        atualizarTabelaEstoque();
        
        atualizarEstatisticas();
        
        return estoqueData;
    } catch (erro) {
        console.error(' Erro ao carregar estoque:', erro);
        mostrarNotificacao('Erro ao carregar estoque. Verifique o servidor.', 'erro');
        return [];
    }
}

function atualizarTabelaEstoque() {
    const tbody = document.querySelector('.tabela-dados tbody');
    if (!tbody) {
        console.log(' Tabela não encontrada!');
        return;
    }
    
    tbody.innerHTML = ''; 
    
    if (estoqueData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2rem; color: #666;">
                    <i class="fas fa-box-open" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                    Nenhum item cadastrado. Clique em "Adicionar Item" para começar.
                </td>
            </tr>
        `;
        return;
    }
    
    estoqueData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.codigo}</td>
            <td>${item.tipo_semente}</td>
            <td>${item.variedade}</td>
            <td>${item.quantidade}</td>
            <td>${item.lote}</td>
            <td>${item.validade}</td>
            <td>
                <button class="btn-icone" onclick="verDetalhesEstoque(${item.id})" title="Ver detalhes">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icone" onclick="editarItemEstoque(${item.id})" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icone btn-delete" onclick="excluirItemEstoque(${item.id})" title="Excluir">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    console.log(` Tabela atualizada com ${estoqueData.length} itens`);
}

// atualizar as estatísticas
function atualizarEstatisticas() {
    const totalEstoque = estoqueData.reduce((total, item) => total + parseFloat(item.quantidade), 0);
    const estoqueBaixo = estoqueData.filter(item => parseFloat(item.quantidade) < 100).length;
    const itensDisponiveis = estoqueData.length;
    
    const elementos = {
        'total-estoque': `${totalEstoque.toFixed(0)} kg`,
        'estoque-baixo': `${estoqueBaixo} itens`,
        'itens-disponiveis': `${itensDisponiveis}`
    };
    
    Object.keys(elementos).forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.textContent = elementos[id];
        }
    });
    
    const elementosEstatisticas = document.querySelectorAll('.valor-estatistica');
    if (elementosEstatisticas.length >= 3) {
        elementosEstatisticas[0].textContent = `${totalEstoque.toFixed(0)} kg`;
        elementosEstatisticas[1].textContent = `${estoqueBaixo} itens`;
        elementosEstatisticas[2].textContent = `${itensDisponiveis}`;
    }
}

//  editar item
async function editarItemEstoque(id) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`);
        if (!resposta.ok) {
            throw new Error('Erro ao carregar item');
        }
        
        const item = await resposta.json();
        itemEditando = item;
        lidarComAdicionarEstoque(item);
        
    } catch (erro) {
        console.error('❌ Erro ao carregar item para edição:', erro);
        mostrarNotificacao('Erro ao carregar item para edição', 'erro');
    }
}

// ver detalhes
async function verDetalhesEstoque(id) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`);
        if (!resposta.ok) {
            throw new Error('Erro ao carregar detalhes');
        }
        
        const item = await resposta.json();
        
        const conteudoModal = `
            <h2>Detalhes do Item ${item.codigo}</h2>
            <div style="margin-top: 1.5rem;">
                <p><strong>ID:</strong> ${item.id}</p>
                <p><strong>Código:</strong> ${item.codigo}</p>
                <p><strong>Tipo:</strong> ${item.tipo_semente}</p>
                <p><strong>Variedade:</strong> ${item.variedade}</p>
                <p><strong>Quantidade:</strong> ${item.quantidade} kg</p>
                <p><strong>Lote:</strong> ${item.lote}</p>
                <p><strong>Validade:</strong> ${item.validade}</p>
                <p><strong>Data de Cadastro:</strong> ${item.data_cadastro ? new Date(item.data_cadastro).toLocaleDateString('pt-BR') : 'N/A'}</p>
                <p><strong>Status:</strong> 
                    <span class="status-ativo" style="padding: 3px 8px; border-radius: 12px; font-size: 0.85rem; background-color: #d4edda; color: #155724;">
                        Ativo
                    </span>
                </p>
            </div>
        `;
        
        document.getElementById('corpoModal').innerHTML = conteudoModal;
        document.getElementById('modal').style.display = 'block';
        
    } catch (erro) {
        console.error(' Erro ao carregar detalhes:', erro);
        mostrarNotificacao('Erro ao carregar detalhes do item', 'erro');
    }
}

// excluir item
async function excluirItemEstoque(id) {
    if (!confirm('Tem certeza que deseja excluir este item do estoque?')) {
        return;
    }
    
    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.error || 'Erro ao excluir');
        }
        
        mostrarNotificacao(' Item excluído com sucesso!', 'sucesso');
        
        await carregarEstoque();
        
    } catch (erro) {
        console.error('Erro ao excluir item:', erro);
        mostrarNotificacao('Erro ao excluir item', 'erro');
    }
}

// funções originais que redireciona para a nova função (mantidas apenas para compatibilidade)
function verEstoque(id) {
    verDetalhesEstoque(id);
}

function editarEstoque(id) {
    editarItemEstoque(id);
}

function salvarNovoEstoque(evento) {
    salvarItemEstoque(evento);
}

//relatórios
function lidarComGerarRelatorio() {
    const conteudoModal = `
        <h2>Gerar Relatório Personalizado</h2>
        <form id="formGerarRelatorio" style="margin-top: 1.5rem;">
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Tipo de Relatório *</label>
                <select id="tipoRelatorio" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">Selecione...</option>
                    <option value="estoque">Estoque</option>
                    <option value="distribuicao">Distribuição</option>
                    <option value="fornecedores">Fornecedores</option>
                    <option value="financeiro">Financeiro</option>
                </select>
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Período Inicial *</label>
                <input type="date" id="dataInicialRelatorio" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1.5rem;">
                <label>Período Final *</label>
                <input type="date" id="dataFinalRelatorio" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <button type="submit" class="btn-salvar">Gerar Relatório</button>
        </form>
    `;
    
    document.getElementById('corpoModal').innerHTML = conteudoModal;
    document.getElementById('modal').style.display = 'block';
    
    setTimeout(() => {
        const form = document.getElementById('formGerarRelatorio');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                gerarRelatorioPersonalizado(e);
            });
        }
    }, 100);
}

function gerarRelatorioPersonalizado(evento) {
    evento.preventDefault();
    
    if (!validarFormulario('formGerarRelatorio')) {
        mostrarNotificacao('Preencha todos os campos corretamente', 'erro');
        return;
    }
    
    const dataInicial = document.getElementById('dataInicialRelatorio')?.value;
    const dataFinal = document.getElementById('dataFinalRelatorio')?.value;
    
    if (dataInicial && dataFinal) {
        const inicio = new Date(dataInicial);
        const fim = new Date(dataFinal);
        
        if (fim < inicio) {
            mostrarNotificacao('A data final deve ser maior que a data inicial', 'erro');
            return;
        }
    }
    
    mostrarNotificacao('Gerando relatório...', 'info');
    setTimeout(() => {
        mostrarNotificacao('Relatório gerado com sucesso!', 'sucesso');
        fecharModal();
    }, 1500);
}

function gerarRelatorio(tipo) {
    mostrarNotificacao(`Gerando relatório de ${tipo}...`, 'info');
    setTimeout(() => {
    }, 1500);
}

//mensagens
function lidarComNovaMensagem() {
    const conteudoModal = `
        <h2>Nova Mensagem</h2>
        <form id="formNovaMensagem" style="margin-top: 1.5rem;">
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Destinatário *</label>
                <input type="text" id="destinatarioMensagem" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Assunto *</label>
                <input type="text" id="assuntoMensagem" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1.5rem;">
                <label>Mensagem *</label>
                <textarea id="corpoMensagem" rows="5" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;"></textarea>
            </div>
            <button type="submit" class="btn-salvar">Enviar Mensagem</button>
        </form>
    `;
    
    document.getElementById('corpoModal').innerHTML = conteudoModal;
    document.getElementById('modal').style.display = 'block';
    
    setTimeout(() => {
        const form = document.getElementById('formNovaMensagem');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                enviarMensagem(e);
            });
        }
    }, 100);
}

function enviarMensagem(evento) {
    evento.preventDefault();
    
    if (!validarFormulario('formNovaMensagem')) {
        mostrarNotificacao('Preencha todos os campos', 'erro');
        return;
    }
    
    mostrarNotificacao('Mensagem enviada com sucesso!', 'sucesso');
    fecharModal();
}

function abrirMensagem(id) {
    mostrarNotificacao(`Abrindo mensagem #${id}`, 'info');
    const conteudoModal = `
        <h2>Mensagem de João Oliveira</h2>
        <div style="margin-top: 1.5rem;">
            <p style="color: #666; margin-bottom: 1rem;"><small>Recebida em: ${new Date().toLocaleString('pt-BR')}</small></p>
            <p><strong>Assunto:</strong> Sobre a entrega de sementes de milho</p>
            <div style="margin-top: 1rem; padding: 1rem; background-color: #f5f5f5; border-radius: 4px;">
                <p>Olá Roberto,</p>
                <p>Gostaria de confirmar a entrega das sementes de milho prevista para esta semana. Poderia me informar o status do pedido?</p>
                <p>Aguardo retorno.</p>
                <p>Atenciosamente,<br>João Oliveira</p>
            </div>
            <button id="btnResponderMensagem" class="btn-primario" style="margin-top: 1rem;">Responder</button>
        </div>
    `;
    document.getElementById('corpoModal').innerHTML = conteudoModal;
    document.getElementById('modal').style.display = 'block';
    
    setTimeout(() => {
        const btnResponder = document.getElementById('btnResponderMensagem');
        if (btnResponder) {
            btnResponder.addEventListener('click', responderMensagem);
        }
    }, 100);
}

function responderMensagem() {
    fecharModal();
    lidarComNovaMensagem();
}

// fornecedores
function lidarComAdicionarFornecedor() {
    const conteudoModal = `
        <h2>Adicionar Fornecedor</h2>
        <form id="formAdicionarFornecedor" style="margin-top: 1.5rem;">
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Nome do Fornecedor *</label>
                <input type="text" id="nomeFornecedor" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>CNPJ *</label>
                <input type="text" id="cnpjFornecedor" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
                <small style="display: block; margin-top: 0.25rem; color: #666;">Formato: 00.000.000/0000-00</small>
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Contato *</label>
                <input type="tel" id="contatoFornecedor" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1.5rem;">
                <label>Cidade *</label>
                <input type="text" id="cidadeFornecedor" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <button type="submit" class="btn-salvar">Adicionar Fornecedor</button>
        </form>
    `;
    
    document.getElementById('corpoModal').innerHTML = conteudoModal;
    document.getElementById('modal').style.display = 'block';
    
    setTimeout(() => {
        const form = document.getElementById('formAdicionarFornecedor');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                salvarNovoFornecedor(e);
            });
        }
    }, 100);
}

function salvarNovoFornecedor(evento) {
    evento.preventDefault();
    
    if (!validarFormulario('formAdicionarFornecedor')) {
        mostrarNotificacao('Preencha todos os campos corretamente', 'erro');
        return;
    }
    
    mostrarNotificacao('Fornecedor adicionado com sucesso!', 'sucesso');
    fecharModal();
}

function verFornecedor(id) {
    mostrarNotificacao(`Visualizando fornecedor #${id}`, 'info');
    const conteudoModal = `
        <h2>Detalhes do Fornecedor #F${String(id).padStart(3, '0')}</h2>
        <div style="margin-top: 1.5rem;">
            <p><strong>Nome:</strong> Sementes Nordeste Ltda</p>
            <p><strong>CNPJ:</strong> 12.345.678/0001-90</p>
            <p><strong>Contato:</strong> (81) 3333-4444</p>
            <p><strong>E-mail:</strong> contato@sementesnordeste.com.br</p>
            <p><strong>Cidade:</strong> Recife - PE</p>
            <p><strong>Status:</strong> Ativo</p>
            <p><strong>Total de Pedidos:</strong> 45</p>
            <p><strong>Avaliação:</strong> ⭐⭐⭐⭐⭐ (5.0)</p>
        </div>
    `;
    document.getElementById('corpoModal').innerHTML = conteudoModal;
    document.getElementById('modal').style.display = 'block';
}

function editarFornecedor(id) {
    mostrarNotificacao(`Editando fornecedor #${id}`, 'info');
    lidarComAdicionarFornecedor();
}

// Funcionalidade de transparência
function verDadosTransparencia(tipo) {
    mostrarNotificacao(`Acessando dados de ${tipo}...`, 'info');
   
}

//modal
function mostrarModal(titulo, mensagem) {
    const conteudoModal = `
        <h2>${titulo}</h2>
        <p style="margin-top: 1.5rem;">${mensagem}</p>
    `;
    document.getElementById('corpoModal').innerHTML = conteudoModal;
    document.getElementById('modal').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
    itemEditando = null;
}

//notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    const notificacaoExistente = document.querySelector('.notificacao');
    if (notificacaoExistente) {
        notificacaoExistente.remove();
    }
    
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    notificacao.textContent = mensagem;
    
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${tipo === 'sucesso' ? '#28a745' : tipo === 'erro' ? '#dc3545' : '#5a8a1f'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: deslizarEntrada 0.3s ease;
    `;
    
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.style.animation = 'deslizarSaida 0.3s ease';
        setTimeout(() => {
            notificacao.remove();
        }, 300);
    }, 3000);
}

// CONFIGURAÇÃO INICIAL 
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de Gestão de Sementes - IPA iniciado');
    
    
    document.addEventListener('click', function(evento) {
        const modal = document.getElementById('modal');
        if (modal && evento.target == modal) {
            fecharModal();
        }
    });
    
    const btnFecharModal = document.querySelector('.fechar');
    if (btnFecharModal) {
        btnFecharModal.addEventListener('click', fecharModal);
    }
    
    if (!document.querySelector('#estilos-sistema')) {
        const estilo = document.createElement('style');
        estilo.id = 'estilos-sistema';
        estilo.textContent = `
            @keyframes deslizarEntrada {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes deslizarSaida {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
            
            /* Estilos para validação */
            .invalido {
                border-color: #dc3545 !important;
                background-color: #fff8f8 !important;
            }
            
            .invalido:focus {
                outline-color: #dc3545 !important;
                box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
            }
            
            .mensagem-erro {
                color: #dc3545;
                font-size: 0.85rem;
                margin-top: 0.25rem;
                display: block;
            }
            
            .grupo-formulario {
                margin-bottom: 1rem;
            }
            
            .grupo-formulario label {
                display: block;
                margin-bottom: 0.25rem;
                font-weight: 500;
            }
            
            /* Botões do modal */
            .botoes-modal {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #eee;
            }
            
            /* Botão de excluir */
            .btn-icone.btn-delete {
                background-color: #dc3545 !important;
                color: white !important;
                border-radius: 4px;
                padding: 5px 8px !important;
                margin-left: 5px;
            }
            
            .btn-icone.btn-delete:hover {
                background-color: #c82333 !important;
                color: white !important;
            }
        `;
        document.head.appendChild(estilo);
    }
    
    const camposValidacao = {
        'nomeCompleto': 'nomeCompleto',
        'email': 'email',
        'novaSenha': 'senha',
        'tipoSementePedido': 'obrigatorio',
        'quantidadePedido': 'numeroPositivo',
        'tipoSementeEstoque': 'obrigatorio',
        'variedadeEstoque': 'obrigatorio',
        'quantidadeEstoque': 'numeroPositivo',
        'loteEstoque': 'obrigatorio',
        'validadeEstoque': 'dataFutura',
        'destinatarioMensagem': 'obrigatorio',
        'assuntoMensagem': 'obrigatorio',
        'corpoMensagem': 'obrigatorio',
        'nomeFornecedor': 'obrigatorio',
        'cidadeFornecedor': 'obrigatorio',
        'logradouro': 'obrigatorio',
        'bairro': 'obrigatorio',
        'cidade': 'obrigatorio'
    };
    
    Object.keys(camposValidacao).forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            campo.addEventListener('blur', function() {
                validarCampo(this, camposValidacao[id]);
            });
            
            campo.addEventListener('input', function() {
                if (this.classList.contains('invalido')) {
                    this.classList.remove('invalido');
                    const erroSpan = this.parentNode.querySelector('.mensagem-erro');
                    if (erroSpan) {
                        erroSpan.remove();
                    }
                }
            });
        }
    });

    const btnSair = document.querySelector('.btn-sair');
    if (btnSair) {
        btnSair.addEventListener('click', function(e) {
            e.preventDefault();
            lidarComSair();
        });
    }
    
    const alternadores = document.querySelectorAll('.alternador input[type="checkbox"]');
    alternadores.forEach(alternador => {
        alternador.addEventListener('change', function() {
            const acao = this.checked ? 'ativado' : 'desativado';
            mostrarNotificacao(`Configuração ${acao}`, 'sucesso');
        });
    });
    
    const paginaAtual = window.location.pathname.split('/').pop();
    const itensNavegacao = document.querySelectorAll('.item-navegacao');
    
    itensNavegacao.forEach(item => {
        const href = item.getAttribute('href');
        
        // destacar item se o href corresponder à página atual
        if (href === paginaAtual) {
            item.classList.add('ativo');
        }
    });
    
    const formPerfil = document.querySelector('.formulario-perfil');
    if (formPerfil) {
        formPerfil.addEventListener('submit', function(e) {
            lidarComSalvarAlteracoes(e);
        });
    }
    
    const caminho = window.location.pathname;
    if (caminho.includes('estoque') || caminho.endsWith('/estoque.html')) {
        console.log(' Inicializando módulo de estoque...');
        
        setTimeout(() => {
            carregarEstoque();
        }, 500);
    }
    
    // adicionar asterisco vermelho para campos obrigatórios
    setTimeout(() => {
        const camposObrigatorios = document.querySelectorAll('input[required], select[required], textarea[required]');
        camposObrigatorios.forEach(campo => {
            const label = campo.parentNode.querySelector('label');
            if (label && !label.innerHTML.includes('*')) {
                label.innerHTML += ' <span style="color: #dc3545;">*</span>';
            }
        });
    }, 100);
});