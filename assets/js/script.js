// Smooth scrolling para links internos
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os links com href começando com #
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Fecha o menu mobile se estiver aberto
                const closeMenuCheckbox = document.getElementById('close-menu');
                if (closeMenuCheckbox) {
                    closeMenuCheckbox.checked = false;
                }
                
                // Scroll suave para a seção
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Menu mobile - fechamento ao clicar fora
    const menu = document.querySelector('.menu');
    const closeMenuCheckbox = document.getElementById('close-menu');
    
    if (menu && closeMenuCheckbox) {
        // Fecha o menu ao clicar no overlay
        menu.addEventListener('click', function(e) {
            if (e.target === menu) {
                closeMenuCheckbox.checked = false;
            }
        });

        // Previne que cliques no conteúdo do menu fechem o menu
        const menuContent = document.querySelector('.menu-content');
        if (menuContent) {
            menuContent.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }

        // Fecha o menu com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && closeMenuCheckbox.checked) {
                closeMenuCheckbox.checked = false;
            }
        });
    }

    // Formulário de contato
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Limpa mensagens de erro anteriores
            clearErrorMessages();
            
            // Validação do nome
            if (!name.value.trim()) {
                showError('name', 'Nome é obrigatório');
                isValid = false;
            }
            
            // Validação do email
            if (!email.value.trim()) {
                showError('email', 'Email é obrigatório');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError('email', 'Email inválido');
                isValid = false;
            }
            
            // Validação da mensagem
            if (!message.value.trim()) {
                showError('message', 'Mensagem é obrigatória');
                isValid = false;
            }
            
            if (isValid) {
                // Aqui você pode implementar o envio do formulário
                showSuccessMessage();
                contactForm.reset();
            }
        });
    }

    // Animação de entrada dos elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observa elementos para animação
    const animatedElements = document.querySelectorAll('.project-content, .about-formation-content, .about-skills-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Botão voltar ao topo - mostrar/esconder baseado no scroll
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });

        // Inicialmente esconde o botão
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
        backToTopButton.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    }
});

// Funções auxiliares
function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
        msg.textContent = '';
    });
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + '-error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    // Cria uma mensagem de sucesso temporária
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    successMessage.textContent = 'Mensagem enviada com sucesso!';
    
    document.body.appendChild(successMessage);
    
    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// Adiciona estilo para a animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
