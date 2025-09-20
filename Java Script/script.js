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