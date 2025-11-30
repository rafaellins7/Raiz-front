// Navigation functionality
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update active nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    event.target.closest('.nav-item').classList.add('active');
    
    // Show notification
    showNotification(`Navegando para ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`);
}

// Logout functionality
function handleLogout() {
    if (confirm('Tem certeza que deseja sair do sistema?')) {
        showNotification('Saindo do sistema...', 'info');
        setTimeout(() => {
            alert('Logout realizado com sucesso!');
            // In a real application, this would redirect to login page
            window.location.reload();
        }, 1000);
    }
}

// Profile edit functionality
function handleEditProfile() {
    showNotification('Modo de edição ativado', 'success');
    const inputs = document.querySelectorAll('.profile-form input');
    inputs.forEach(input => {
        input.focus();
   // Focus on first input
    });
}

// Save changes functionality
function handleSaveChanges(event) {
    event.preventDefault();
    
    const formData = {
        nomeCompleto: document.getElementById('nomeCompleto').value,
        cep: document.getElementById('cep').value,
        email: document.getElementById('email').value,
        logradouro: document.getElementById('logradouro').value,
        cpf: document.getElementById('cpf').value,
        bairro: document.getElementById('bairro').value,
        telefone: document.getElementById('telefone').value,
        cidade: document.getElementById('cidade').value
    };
    
    console.log('Dados salvos:', formData);
    showNotification('Alterações salvas com sucesso!', 'success');
    
    // Simulate API call
    setTimeout(() => {
        showModal('Sucesso', 'Seu perfil foi atualizado com sucesso!');
    }, 500);
}

// Settings - Change Password
function handleChangePassword() {
    const modalContent = `
        <h2>Alterar Senha</h2>
        <form onsubmit="saveNewPassword(event)" style="margin-top: 1.5rem;">
            <div class="form-group" style="margin-bottom: 1rem;">
                <label>Senha Atual</label>
                <input type="password" id="currentPassword" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label>Nova Senha</label>
                <input type="password" id="newPassword" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label>Confirmar Nova Senha</label>
                <input type="password" id="confirmPassword" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <button type="submit" class="btn-save">Salvar Nova Senha</button>
        </form>
    `;
    
    document.getElementById('modalBody').innerHTML = modalContent;
    document.getElementById('modal').style.display = 'block';
}

function saveNewPassword(event) {
    event.preventDefault();
    const newPass = document.getElementById('newPassword').value;
    const confirmPass = document.getElementById('confirmPassword').value;
    
    if (newPass !== confirmPass) {
        alert('As senhas não coincidem!');
        return;
    }
    
    showNotification('Senha alterada com sucesso!', 'success');
    closeModal();
}

// Orders functionality
function handleNewOrder() {
    const modalContent = `
        <h2>Novo Pedido</h2>
        <form onsubmit="saveNewOrder(event)" style="margin-top: 1.5rem;">
            <div class="form-group" style="margin-bottom: 1rem;">
                <label>Fornecedor</label>
                <select id="orderSupplier" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">Selecione...</option>
                    <option value="1">Sementes Nordeste Ltda</option>
                    <option value="2">AgroSementes PE</option>
                    <option value="3">Distribuidora Agrícola</option>
                </select>
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label>Tipo de Semente</label>
                <input type="text" id="orderSeedType" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label>Quantidade (kg)</label>
                <input type="number" id="orderQuantity" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <button type="submit" class="btn-save">Criar Pedido</button>
        </form>
    `;
    
    document.getElementById('modalBody').innerHTML = modalContent;
    document.getElementById('modal').style.display = 'block';
}

function saveNewOrder(event) {
    event.preventDefault();
    showNotification('Pedido criado com sucesso!', 'success');
    closeModal();
}

function viewOrder(id) {
    showNotification(`Visualizando pedido #${id}`, 'info');
    const modalContent = `
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
    document.getElementById('modalBody').innerHTML = modalContent;
    document.getElementById('modal').style.display = 'block';
}

function editOrder(id) {
    showNotification(`Editando pedido #${id}`, 'info');
    handleNewOrder();
}

// Stock functionality
function handleAddStock() {
    const modalContent = `
        <h2>Adicionar Item ao Estoque</h2>
        <form onsubmit="saveNewStock(event)" style="margin-top: 1.5rem;">
            <div class="form-group" style="margin-bottom: 1rem;">
                <label>Tipo de Semente</label>
                <input type="text" id="stockSeedType" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label>Variedade</label>
                <input type="text" id="stockVariety" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label>Quantidade (kg)</label>
                <input type="number" id="stockQuantity" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label>Lote</label>
                <input type="text" id="stockLot" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label>Validade</label>
                <input type="month" id="stockExpiry" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <button type="submit" class="btn-save">Adicionar ao Estoque</button>
        </form>
    `;
    
    document.getElementById('modalBody').innerHTML = modalContent;
    document.getElementById('modal').style.display = 'block';
}

function saveNewStock(event) {
    event.preventDefault();
    showNotification('Item adicionado ao estoque com sucesso!', 'success');
    closeModal();
}

function viewStock(id) {
    showNotification(`Visualizando item de estoque #${id}`, 'info');
    const modalContent = `
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
    document.getElementById('modalBody').innerHTML = modalContent;
    document.getElementById('modal').style.display = 'block';
}

function editStock(id) {
    showNotification(`Editando item de estoque #${id}`, 'info');
    handleAddStock();
}

// Reports functionality
function handleGenerateReport() {
    const modalContent = `
        <h2>Gerar Relatório Personalizado</h2>
        <form onsubmit="generateCustomReport(event)" style="margin-top: 1.5rem;">
            <div class="form-group" style="margin-bottom: 1rem;">
                <label>Tipo de Relatório</label>
                <select id="reportType" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">Selecione...</option>
                    <option value="estoque">Estoque</option>
                    <option value="distribuicao">Distribuição</option>
                    <option value="fornecedores">Fornecedores</option>
                    <option value="financeiro">Financeiro</option>
                </select>
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label>Período Inicial</label>
                <input type="date" id="reportStartDate" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label>Período Final</label>
                <input type="date" id="reportEndDate" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <button type="submit" class="btn-save">Gerar Relatório</button>
        </form>
    `;
    
    document.getElementById('modalBody').innerHTML = modalContent;
    document.getElementById('modal').style.display = 'block';
}

function generateCustomReport(event) {
    event.preventDefault();
    showNotification('Gerando relatório...', 'info');
    setTimeout(() => {
        showNotification('Relatório gerado com sucesso!', 'success');
        closeModal();
    }, 1500);
}

function generateReport(type) {
    showNotification(`Gerando relatório de ${type}...`, 'info');
    setTimeout(() => {
        alert(`Relatório de ${type} gerado com sucesso!\nO arquivo foi salvo na área de downloads.`);
    }, 1500);
}

// Messages functionality
function handleNewMessage() {
    const modalContent = `
        <h2>Nova Mensagem</h2>
        <form onsubmit="sendMessage(event)" style="margin-top: 1.5rem;">
            <div class="form-group" style="margin-bottom: 1rem;">
                <label>Destinatário</label>
                <input type="text" id="messageRecipient" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label>Assunto</label>
                <input type="text" id="messageSubject" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label>Mensagem</label>
                <textarea id="messageBody" rows="5" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;"></textarea>
            </div>
            <button type="submit" class="btn-save">Enviar Mensagem</button>
        </form>
    `;
    
    document.getElementById('modalBody').innerHTML = modalContent;
    document.getElementById('modal').style.display = 'block';
}

function sendMessage(event) {
    event.preventDefault();
    showNotification('Mensagem enviada com sucesso!', 'success');
    closeModal();
}

function openMessage(id) {
    showNotification(`Abrindo mensagem #${id}`, 'info');
    const modalContent = `
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
            <button onclick="replyMessage()" class="btn-primary" style="margin-top: 1rem;">Responder</button>
        </div>
    `;
    document.getElementById('modalBody').innerHTML = modalContent;
    document.getElementById('modal').style.display = 'block';
}

function replyMessage() {
    closeModal();
    handleNewMessage();
}

// Suppliers functionality
function handleAddSupplier() {
    const modalContent = `
        <h2>Adicionar Fornecedor</h2>
        <form onsubmit="saveNewSupplier(event)" style="margin-top: 1.5rem;">
            <div class="form-group" style="margin-bottom: 1rem;">
                <label>Nome do Fornecedor</label>
                <input type="text" id="supplierName" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label>CNPJ</label>
                <input type="text" id="supplierCNPJ" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label>Contato</label>
                <input type="tel" id="supplierContact" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label>Cidade</label>
                <input type="text" id="supplierCity" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <button type="submit" class="btn-save">Adicionar Fornecedor</button>
        </form>
    `;
    
    document.getElementById('modalBody').innerHTML = modalContent;
    document.getElementById('modal').style.display = 'block';
}

function saveNewSupplier(event) {
    event.preventDefault();
    showNotification('Fornecedor adicionado com sucesso!', 'success');
    closeModal();
}

function viewSupplier(id) {
    showNotification(`Visualizando fornecedor #${id}`, 'info');
    const modalContent = `
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
    document.getElementById('modalBody').innerHTML = modalContent;
    document.getElementById('modal').style.display = 'block';
}

function editSupplier(id) {
    showNotification(`Editando fornecedor #${id}`, 'info');
    handleAddSupplier();
}

// Transparency functionality
function viewTransparencyData(type) {
    showNotification(`Acessando dados de ${type}...`, 'info');
    setTimeout(() => {
        alert(`Abrindo página de ${type}...\nEm um sistema real, isso redirecionaria para a página específica.`);
    }, 500);
}

// Modal functionality
function showModal(title, message) {
    const modalContent = `
        <h2>${title}</h2>
        <p style="margin-top: 1.5rem;">${message}</p>
    `;
    document.getElementById('modalBody').innerHTML = modalContent;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#5a8a1f'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
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
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de Gestão de Sementes - IPA iniciado');
    showNotification('Bem-vindo ao Sistema de Gestão de Sementes!', 'success');
});

// Form input masks
document.addEventListener('DOMContentLoaded', function() {
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');
    
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                e.target.value = value;
            }
        });
    }
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
                e.target.value = value;
            }
        });
    }
    
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 8) {
                value = value.replace(/(\d{6})(\d{2})/, '$1-$2');
                e.target.value = value;
            }
        });
    }
});
