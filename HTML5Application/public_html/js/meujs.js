function Login() {    
    var done = 0;
    var usuario = document.getElementById("loginUsuario").value;
    usuario = usuario.toLowerCase();
    var senha = document.getElementById("loginSenha").valeu;
    senha = senha.toString();

    if (usuario == "admin" && senha == "admin") {
        alert("Sucesso");
        alert("Usuário: " + usuario + "  " + "Senha: " + senha);
        done = 1;
    }
    if (done === 0) {
        alert("Dados incorretos, tente novamente");
    }
}

function Registro() {    
    var done = 0;
    var usuario = document.getElementById("registroNome").value;
    usuario = usuario.toLowerCase();
    var senha = document.getElementById("registroSenha").valeu;
    

    if (usuario !== "" && senha !== "") {
        alert("Sucesso");
        alert("Usuário: " + usuario + "  " + "Senha: " + senha);
        done = 1;
    }
    if (done === 0) {
        alert("Preencha todos os campos e tente novamente");
    }
}

