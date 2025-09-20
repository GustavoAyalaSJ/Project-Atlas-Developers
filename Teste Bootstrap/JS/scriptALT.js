function mostrar(){
    const m = document.getElementById("AtlasInfo")
    m.showModal()
}

document.addEventListener('DOMContentLoaded', function() {
    const loginModal = document.getElementById('loginModal');
    const roleSelected = document.getElementById('roleSelected');
    const avisoIdade = document.getElementById('avisoIdade');

    if (loginModal) {
        loginModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const role = button.getAttribute('data-role');
            
            roleSelected.textContent = role;

            if (role === 'CANDIDATO') {
                avisoIdade.classList.remove('d-none');
            } else {
                avisoIdade.classList.add('d-none');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById("togglePassword");
    
    if (togglePassword) {
        togglePassword.addEventListener('click', MostrarSenha);
    }

    function MostrarSenha() {
        const input = document.getElementById("password");
        const icon = document.getElementById("togglePassword");

        if (input.type === "password") {
            input.type = "text";
            icon.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
        } else {
            input.type = "password";
            icon.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
        }
    }
});