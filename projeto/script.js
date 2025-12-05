// Funcionalidade de navegação
function mostrarSecao(idSecao) {
    // Esconder todas as seções
    const secoes = document.querySelectorAll('.secao-conteudo');
    secoes.forEach(secao => {
        secao.classList.remove('ativo');
    });
    
    // Mostrar seção selecionada
    const secaoAlvo = document.getElementById(idSecao);
    if (secaoAlvo) {
        secaoAlvo.classList.add('ativo');
    }
    
    // Atualizar item de navegação ativo
    const itensNavegacao = document.querySelectorAll('.item-navegacao');
    itensNavegacao.forEach(item => {
        item.classList.remove('ativo');
    });
    
    evento.target.closest('.item-navegacao').classList.add('ativo');
    
    // Mostrar notificação
    mostrarNotificacao(`Navegando para ${idSecao.charAt(0).toUpperCase() + idSecao.slice(1)}`);
}

// Funcionalidade de logout
function lidarComSair() {
    if (confirm('Tem certeza que deseja sair do sistema?')) {
        mostrarNotificacao('Saindo do sistema...', 'info');
        setTimeout(() => {
            alert('Logout realizado com sucesso!');
            window.location.reload();
        }, 1000);
    }
}

// Funcionalidade de edição de perfil
function lidarComEditarPerfil() {
    mostrarNotificacao('Modo de edição ativado', 'sucesso');
    const entradas = document.querySelectorAll('.formulario-perfil input');
    entradas.forEach(entrada => {
        entrada.focus();
        // Focar na primeira entrada
    });
}

// salvar alterações
function lidarComSalvarAlteracoes(evento) {
    evento.preventDefault();
    
    const dadosFormulario = {
        nomeCompleto: document.getElementById('nomeCompleto').value,
        cep: document.getElementById('cep').value,
        email: document.getElementById('email').value,
        logradouro: document.getElementById('logradouro').value,
        cpf: document.getElementById('cpf').value,
        bairro: document.getElementById('bairro').value,
        telefone: document.getElementById('telefone').value,
        cidade: document.getElementById('cidade').value
    };
    
    console.log('Dados salvos:', dadosFormulario);
    mostrarNotificacao('Alterações salvas com sucesso!', 'sucesso');
    
    setTimeout(() => {
        mostrarModal('Sucesso', 'Seu perfil foi atualizado com sucesso!');
    }, 500);
}

// Ajustes - Alterar Senha
function lidarComAlterarSenha() {
    const conteudoModal = `
        <h2>Alterar Senha</h2>
        <form onsubmit="salvarNovaSenha(evento)" style="margin-top: 1.5rem;">
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Senha Atual</label>
                <input type="password" id="senhaAtual" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Nova Senha</label>
                <input type="password" id="novaSenha" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1.5rem;">
                <label>Confirmar Nova Senha</label>
                <input type="password" id="confirmarSenha" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <button type="submit" class="btn-salvar">Salvar Nova Senha</button>
        </form>
    `;
    
    document.getElementById('corpoModal').innerHTML = conteudoModal;
    document.getElementById('modal').style.display = 'block';
}

function salvarNovaSenha(evento) {
    evento.preventDefault();
    const novaSenha = document.getElementById('novaSenha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    
    if (novaSenha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }
    
    mostrarNotificacao('Senha alterada com sucesso!', 'sucesso');
    fecharModal();
}


function lidarComNovoPedido() {
    const conteudoModal = `
        <h2>Novo Pedido</h2>
        <form onsubmit="salvarNovoPedido(evento)" style="margin-top: 1.5rem;">
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Fornecedor</label>
                <select id="fornecedorPedido" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">Selecione...</option>
                    <option value="1">Sementes Nordeste Ltda</option>
                    <option value="2">AgroSementes PE</option>
                    <option value="3">Distribuidora Agrícola</option>
                </select>
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Tipo de Semente</label>
                <input type="text" id="tipoSementePedido" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1.5rem;">
                <label>Quantidade (kg)</label>
                <input type="number" id="quantidadePedido" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <button type="submit" class="btn-salvar">Criar Pedido</button>
        </form>
    `;
    
    document.getElementById('corpoModal').innerHTML = conteudoModal;
    document.getElementById('modal').style.display = 'block';
}

function salvarNovoPedido(evento) {
    evento.preventDefault();
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

// Funcionalidade de estoque
function lidarComAdicionarEstoque() {
    const conteudoModal = `
        <h2>Adicionar Item ao Estoque</h2>
        <form onsubmit="salvarNovoEstoque(evento)" style="margin-top: 1.5rem;">
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Tipo de Semente</label>
                <input type="text" id="tipoSementeEstoque" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Variedade</label>
                <input type="text" id="variedadeEstoque" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Quantidade (kg)</label>
                <input type="number" id="quantidadeEstoque" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Lote</label>
                <input type="text" id="loteEstoque" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1.5rem;">
                <label>Validade</label>
                <input type="month" id="validadeEstoque" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <button type="submit" class="btn-salvar">Adicionar ao Estoque</button>
        </form>
    `;
    
    document.getElementById('corpoModal').innerHTML = conteudoModal;
    document.getElementById('modal').style.display = 'block';
}

function salvarNovoEstoque(evento) {
    evento.preventDefault();
    mostrarNotificacao('Item adicionado ao estoque com sucesso!', 'sucesso');
    fecharModal();
}

function verEstoque(id) {
    mostrarNotificacao(`Visualizando item de estoque #${id}`, 'info');
    const conteudoModal = `
        <h2>Detalhes do Item SEM-${String(id).padStart(3, '0')}</h2>
        <div style="margin-top: 1.5rem;">
            <p><strong>Tipo:</strong> Milho</p>
            <p><strong>Variedade:</strong> BRS 1030</p>
            <p><strong>Quantidade:</strong> 850 kg</p>
            <p><strong>Lote:</strong> L2025-001</p>
            <p><strong>Validade:</strong> 12/2026</p>
            <p><strong>Localização:</strong> Armazém A - Prateleira 3</p>
        </div>
    `;
    document.getElementById('corpoModal').innerHTML = conteudoModal;
    document.getElementById('modal').style.display = 'block';
}

function editarEstoque(id) {
    mostrarNotificacao(`Editando item de estoque #${id}`, 'info');
    lidarComAdicionarEstoque();
}

//relatórios
function lidarComGerarRelatorio() {
    const conteudoModal = `
        <h2>Gerar Relatório Personalizado</h2>
        <form onsubmit="gerarRelatorioPersonalizado(evento)" style="margin-top: 1.5rem;">
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Tipo de Relatório</label>
                <select id="tipoRelatorio" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">Selecione...</option>
                    <option value="estoque">Estoque</option>
                    <option value="distribuicao">Distribuição</option>
                    <option value="fornecedores">Fornecedores</option>
                    <option value="financeiro">Financeiro</option>
                </select>
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Período Inicial</label>
                <input type="date" id="dataInicialRelatorio" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1.5rem;">
                <label>Período Final</label>
                <input type="date" id="dataFinalRelatorio" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <button type="submit" class="btn-salvar">Gerar Relatório</button>
        </form>
    `;
    
    document.getElementById('corpoModal').innerHTML = conteudoModal;
    document.getElementById('modal').style.display = 'block';
}

function gerarRelatorioPersonalizado(evento) {
    evento.preventDefault();
    mostrarNotificacao('Gerando relatório...', 'info');
    setTimeout(() => {
        mostrarNotificacao('Relatório gerado com sucesso!', 'sucesso');
        fecharModal();
    }, 1500);
}

function gerarRelatorio(tipo) {
    mostrarNotificacao(`Gerando relatório de ${tipo}...`, 'info');
    setTimeout(() => {
        alert(`Relatório de ${tipo} gerado com sucesso!\nO arquivo foi salvo na área de downloads.`);
    }, 1500);
}

//mensagens
function lidarComNovaMensagem() {
    const conteudoModal = `
        <h2>Nova Mensagem</h2>
        <form onsubmit="enviarMensagem(evento)" style="margin-top: 1.5rem;">
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Destinatário</label>
                <input type="text" id="destinatarioMensagem" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Assunto</label>
                <input type="text" id="assuntoMensagem" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1.5rem;">
                <label>Mensagem</label>
                <textarea id="corpoMensagem" rows="5" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;"></textarea>
            </div>
            <button type="submit" class="btn-salvar">Enviar Mensagem</button>
        </form>
    `;
    
    document.getElementById('corpoModal').innerHTML = conteudoModal;
    document.getElementById('modal').style.display = 'block';
}

function enviarMensagem(evento) {
    evento.preventDefault();
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
            <button onclick="responderMensagem()" class="btn-primario" style="margin-top: 1rem;">Responder</button>
        </div>
    `;
    document.getElementById('corpoModal').innerHTML = conteudoModal;
    document.getElementById('modal').style.display = 'block';
}

function responderMensagem() {
    fecharModal();
    lidarComNovaMensagem();
}

// fornecedores
function lidarComAdicionarFornecedor() {
    const conteudoModal = `
        <h2>Adicionar Fornecedor</h2>
        <form onsubmit="salvarNovoFornecedor(evento)" style="margin-top: 1.5rem;">
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Nome do Fornecedor</label>
                <input type="text" id="nomeFornecedor" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>CNPJ</label>
                <input type="text" id="cnpjFornecedor" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1rem;">
                <label>Contato</label>
                <input type="tel" id="contatoFornecedor" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="grupo-formulario" style="margin-bottom: 1.5rem;">
                <label>Cidade</label>
                <input type="text" id="cidadeFornecedor" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <button type="submit" class="btn-salvar">Adicionar Fornecedor</button>
        </form>
    `;
    
    document.getElementById('corpoModal').innerHTML = conteudoModal;
    document.getElementById('modal').style.display = 'block';
}

function salvarNovoFornecedor(evento) {
    evento.preventDefault();
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
    setTimeout(() => {
        alert(`Abrindo página de ${tipo}...\nEm um sistema real, isso redirecionaria para a página específica.`);
    }, 500);
}

// Funcionalidade do modal
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
}

// Fechar modal ao clicar fora
window.onclick = function(evento) {
    const modal = document.getElementById('modal');
    if (evento.target == modal) {
        fecharModal();
    }
}

// notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Remover notificação existente se houver
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
    
    // Remover após 3 segundos
    setTimeout(() => {
        notificacao.style.animation = 'deslizarSaida 0.3s ease';
        setTimeout(() => {
            notificacao.remove();
        }, 300);
    }, 3000);
}

const estilo = document.createElement('style');
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
`;
document.head.appendChild(estilo);

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de Gestão de Sementes - IPA iniciado');
    mostrarNotificacao('Bem-vindo ao Sistema de Gestão de Sementes!', 'sucesso');
});


document.addEventListener('DOMContentLoaded', function() {
    const entradaCpf = document.getElementById('cpf');
    const entradaTelefone = document.getElementById('telefone');
    const entradaCep = document.getElementById('cep');
    
    if (entradaCpf) {
        entradaCpf.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length <= 11) {
                valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                e.target.value = valor;
            }
        });
    }
    
    if (entradaTelefone) {
        entradaTelefone.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length <= 11) {
                valor = valor.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
                e.target.value = valor;
            }
        });
    }
    
    if (entradaCep) {
        entradaCep.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length <= 8) {
                valor = valor.replace(/(\d{6})(\d{2})/, '$1-$2');
                e.target.value = valor;
            }
        });
    }
});