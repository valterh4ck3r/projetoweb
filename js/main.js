
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
	        var index = myRequest.responseText.indexOf('token') + 8;

	        var token = myRequest.responseText.slice(index,index+13);


	        if(token=='t":"Erro ao r'){
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
	        console.log(myRequest.responseText);
	    }
	}

	myRequest.send(params);
}



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
		    }
		}

		console.log(params);
		myRequest.send(params);
	}
}


function listarSalasPublicas(){

	var myRequest = new XMLHttpRequest();

	myRequest.open('GET', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=salas');

	myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	myRequest.onreadystatechange = function() {
	    if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {
	        console.log(myRequest.responseText);
	        alert(myRequest.responseText);
	    }
	}

	myRequest.send();
}

function listarSalasPrivadas(){

	var tokenUsuario = document.getElementById('tokenUsuario').value;

	var params = 'token='+tokenUsuario;

	var myRequest = new XMLHttpRequest();

	myRequest.open('GET', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=minhas_salas&token='+tokenUsuario);

	myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	myRequest.onreadystatechange = function() {
	    if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {
	        alert(myRequest.responseText);
	    }
	}

	myRequest.send();


}