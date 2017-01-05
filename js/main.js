
/* 	Pego os valores de dois campos, login e senha
*	Em seguida faço o request para URL que o professor disponibilizou no Web Service
*	Em seguida seto o Header que é NECESSÁRIO para o servidor reconhecer o formulário
*	Em seguida pego o retorno da requisição, separo o token e seto no sessionStorage.
*/	
function login(){
	var login = document.getElementById('nome').value;
	var senha = document.getElementById('senha').value;

	var params = 'nome='+login+'&senha='+senha;

	var myRequest = new XMLHttpRequest();

	myRequest.open('POST', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=login', true);

	myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	myRequest.onreadystatechange = function() {
	    if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {

	        var retorno = JSON.parse(myRequest.responseText);

	        if(retorno.data[0]== null){
	        	alert('Usuario ou Senha Invalido');
	        }
	        token = retorno.data[0].token;

	        if(token == null){
	        	document.getElementById('nome').value = "";
	        	document.getElementById('senha').value = "";
	        	alert('Usuario e Senha Invalido');
	        	console.log(myRequest.responseText);
	        }
	        else{
	        	console.log(token);
	        	sessionStorage.setItem('token', token);
	        	alert('Login efetuado com sucesso.');
	    	}
	    }
	}



	myRequest.send(params);

}


/*
* Ele busca no sessionStorage um token, se houver um token, ele remove, se não houver um token ele alerta ao usuario.
*/
function logout(){
	var token = sessionStorage.getItem('token');

	if(token==null){
		alert('Voce ainda nao se logou na aplicação.');
	}
	else{
		alert('Deslogado com sucesso');
		sessionStorage.removeItem('token');
	}
}

/*	Faço o request para o URL que o professor disponibilizou no site.
*	Em seguida envio os campos nome e senha para o URL
*/
function registrar(){
	var login = document.getElementById('nome').value;
	var senha = document.getElementById('senha').value;

	var params = 'nome='+login+'&senha='+senha;

	var myRequest = new XMLHttpRequest();

	myRequest.open('POST', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=cad_usuario', true);

	myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	myRequest.onreadystatechange = function() {
	    if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {

	        var retorno = JSON.parse(myRequest.responseText);

	        alert(retorno.message);

	        document.getElementById('nome').value = "";
	        document.getElementById('senha').value = "";
	    }
	}

	myRequest.send(params);
}


/* 	Pego os valores dos campos
* 	Verifico se tem token no session Storage para poder cadastrar uma sala.
*	Em seguida eu registro a sala.
*
*	OBS.: Parametro esta informado errado, quando era pra ser SALA, está informando NOME.
*/	
function cadastrarSala(){
	var nomeSala = document.getElementById('nomeSala').value;

	var token = sessionStorage.getItem('token');

	console.log(token);

	if(token == null){
		alert('Você precisa estar logado para cadastrar uma sala');
	}
	else{
		var params = 'sala='+nomeSala+'&token='+token;

		var myRequest = new XMLHttpRequest();

		myRequest.open('POST', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=cad_sala');

		myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		myRequest.onreadystatechange = function() {
		    if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {
		        console.log(myRequest.responseText);
		        

		        var retorno = JSON
		    }
		}
		myRequest.send(params);
	}
}


/* 	Apenas um request para listar as salas em um alert.
*/
function listarSalasPublicas(){

	var myRequest = new XMLHttpRequest();

	myRequest.open('GET', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=salas');

	myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	myRequest.onreadystatechange = function() {
	    if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {

	        var retorno = JSON.parse(myRequest.responseText);

	        for(var i=0;i<retorno.data.length;i++){
	        	console.log('ID : '+ retorno.data[i].id +' Nome: '+retorno.data[i].nome);
	        }

	        alert('Salas listadas no Console');	        	
	     
	    }
	}

	myRequest.send();
}


/* 	Pego os valores dos campos
* 	Pego o valor do campo Token e passo por paramentro
*	Em seguida eu mostro ao usuario em um alert.
*/
function listarSalasPrivadas(){

	var tokenUsuario = document.getElementById('tokenUsuario').value;

	var params = 'token='+tokenUsuario;

	var myRequest = new XMLHttpRequest();

	myRequest.open('GET', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=minhas_salas&token='+tokenUsuario);

	myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	myRequest.onreadystatechange = function() {
	    if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {
	        
	        var retorno = JSON.parse(myRequest.responseText);

	        for(var i=0;i<retorno.data.length;i++){
	        	console.log('ID : '+ retorno.data[i].id +' Nome: '+retorno.data[i].nome);
	        }

	        alert('Salas Listadas no Console');
	    }
	}

	myRequest.send();


}

function listarMensagensSalaPrivada(){

	var tokenUsuario = document.getElementById('tokenUsuario').value;

	var idSala = document.getElementById('idSala').value;

	var myRequest = new XMLHttpRequest();

	myRequest.open('GET', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=mensagens_sala&token='+tokenUsuario+'&sala='+idSala);

	myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	myRequest.onreadystatechange = function() {
	    if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {
	        
	        var retorno = JSON.parse(myRequest.responseText);

	        for(var i=0;i<retorno.data.length;i++){
	        	console.log(retorno.data[i].nome);
	        }

	        alert('Mensagens Listadas no Console');
	    }
	}

	myRequest.send();

}


function exibirUltimaMensagem(){

	var tokenUsuario = document.getElementById('tokenUsuario').value;

	var idSala = document.getElementById('idSala').value;

	var idUltimaMensagem = document.getElementById('idUltimaMensagem').value;

	var myRequest = new XMLHttpRequest();

	myRequest.open('GET', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=mensagens_sala&token='+tokenUsuario+'&sala='+idSala+'&id='+tokenUsuario);

	myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	myRequest.onreadystatechange = function() {
	    if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {
	        
	        var retorno = JSON.parse(myRequest.responseText);

	        for(var i=0;i<retorno.data.length;i++){
	        	console.log(retorno.data[i].nome);
	        }

	        alert('Mensagens Listadas no Console');
	    }
	}

	myRequest.send();


}


function tornarSalaPrivada(){

	var tokenUsuario = document.getElementById('tokenUsuario').value;

	var idSala = document.getElementById('idSala').value;

	var myRequest = new XMLHttpRequest();

	myRequest.open('GET', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=sala_privada&token='+tokenUsuario+'&sala='+idSala);

	myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	myRequest.onreadystatechange = function() {
	    if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {
	        
	        var retorno = JSON.parse(myRequest.responseText);

	        for(var i=0;i<retorno.data.length;i++){
	        	console.log(retorno.data[i].nome);
	        }

	        alert('A Sala é privada agora');
	    }
	}

	myRequest.send();
}

function tornarSalaPublica(){
	var tokenUsuario = document.getElementById('tokenUsuario').value;

	var idSala = document.getElementById('idSala').value;

	var myRequest = new XMLHttpRequest();

	myRequest.open('GET', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=sala_publica&token='+tokenUsuario+'&sala='+idSala);

	myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	myRequest.onreadystatechange = function() {
	    if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {
	        
	        var retorno = JSON.parse(myRequest.responseText);

	        for(var i=0;i<retorno.data.length;i++){
	        	console.log(retorno.data[i].nome);
	        }

	        alert('A Sala é pública agora');
	    }
	}

	myRequest.send();
}