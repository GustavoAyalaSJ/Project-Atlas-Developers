function openTermosModal() {
    const termosModal = document.getElementById('TermosModal');
    termosModal.style.display = 'block'; 
}

function openPerguntasModal() {
    const perguntasModal = document.getElementById('PerguntasModal');
    perguntasModal.style.display = 'block';
}

function closeAllModals() {
    const termosModal = document.getElementById('TermosModal');
    const perguntasModal = document.getElementById('PerguntasModal');
    termosModal.style.display = 'none';
    perguntasModal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const termosModal = document.getElementById('TermosModal');
    const perguntasModal = document.getElementById('PerguntasModal');

    window.addEventListener('click', function(event) {
        if (event.target == termosModal || event.target == perguntasModal) {
            closeAllModals();
        }
    });

    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });
});