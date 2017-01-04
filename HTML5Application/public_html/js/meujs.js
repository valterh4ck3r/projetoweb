function Login() {
    var done = 0;
    var usuario = document.loginUsuario.nomeusuario.value;
    usuario = usuario.toLowerCase();
    var senha = document.loginSenha.senha.value;
    seha = senha.toLowerCase();

    if (usuario === "admin" && senha === "admin") {
        alert("Sucesso");
        window.location = "/p/index.html";
        done = 1;
    }
    if (done === 0) {
        alert("Dados incorretos, tente novamente");
    }
}

function teste() {

    alert(document.getElementById("loginUsuario").valeu);
}
