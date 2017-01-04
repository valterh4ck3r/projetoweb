function Login() {    
    var done = 0;
    var usuario = document.getElementById("loginUsuario").value;
    usuario = usuario.toLowerCase();
    var senha = document.getElementById("loginSenha").valeu;

    if (usuario === "admin" && senha === "admin") {
        alert("Sucesso");
        alert("Usuário: " + usuario + "  " + "Senha: " + senha);
        done = 1;
    }
    if (done === 0) {
        alert("Dados incorretos, tente novamente");
    }
}

