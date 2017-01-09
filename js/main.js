
var token = sessionStorage.getItem('token');

var nomeUsuario = sessionStorage.getItem('nomeUsuario');	

if(token!=null && nomeUsuario!=null){
	document.getElementById('nomeUsuario').innerText = 'Olá '+nomeUsuario;		
}


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
			}
			else{
				
				sessionStorage.setItem('token', token);
				sessionStorage.setItem('nomeUsuario', document.getElementById('nome').value);
				alert('Login efetuado com sucesso.');
				window.location.href= "./chat.html";
			}
		}
	}



	myRequest.send(params);

}


function logout(){
	var token = sessionStorage.getItem('token');

	if(token==null){
		alert('Voce ainda nao se logou na aplicação.');
		window.location.href= "./login.html";

	}
	else{
		alert('Deslogado com sucesso');
		sessionStorage.removeItem('token');
		window.location.href= "./login.html";
	}
}


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


function cadastrarSala(){
	var nomeSala = document.getElementById('nomeSala').value;

	var token = sessionStorage.getItem('token');

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

				var retorno = JSON.stringify(retorno);

				if(result='sucess'){
					alert('Sala criada com sucesso');
				}
			}
		}
		myRequest.send(params);
	}
}



function listarSalasPublicas(){

	var myRequest = new XMLHttpRequest();

	myRequest.open('GET', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=salas');

	myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	myRequest.onreadystatechange = function() {
		if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {

			var retorno = JSON.parse(myRequest.responseText);

			for(var i=0;i<retorno.data.length;i++){
				//alert('ID : '+ retorno.data[i].id +' Nome: '+retorno.data[i].nome);
			}

			retorno = JSON.stringify(retorno);

			alert(retorno);  
			
		}
	}

	myRequest.send();
}


function listarSalasPrivadas(){

	var tokenUsuario = sessionStorage.getItem('token');

	if(tokenUsuario==null){
		alert('Voce precisa estar logado na aplicacao');
	}
	else{ 

		var myRequest = new XMLHttpRequest();

		myRequest.open('GET', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=minhas_salas&token='+tokenUsuario);

		myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		myRequest.onreadystatechange = function() {
			if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {
				
				var retorno = JSON.parse(myRequest.responseText);

				for(var i=0;i<retorno.data.length;i++){
					//console.log('ID : '+ retorno.data[i].id +' Nome: '+retorno.data[i].nome);
				}

				retorno = JSON.stringify(retorno);

				alert(retorno);
			}
		}

		myRequest.send();
	}


}

function listarMensagensSalaPrivada(){

	var tokenUsuario = sessionStorage.getItem('token');

	

	if(tokenUsuario == null){
		alert('Voce precisa estar logado.');
	}
	else{

		var idSala = document.getElementById('idSala').value;

		var myRequest = new XMLHttpRequest();

		myRequest.open('GET', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=mensagens_sala&token='+tokenUsuario+'&sala='+idSala);

		myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		myRequest.onreadystatechange = function() {
			if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {
				
				var retorno = JSON.parse(myRequest.responseText);

				alert(myRequest.responseText);

				
			}
		}

		myRequest.send();
	}

}


function exibirUltimaMensagem(){

	var tokenUsuario = sessionStorage.getItem('token');

	if(tokenUsuario==null){
		alert('Você precisa estar logado.');
	}
	else{

		var idSala = document.getElementById('idSala').value;

		var idUltimaMensagem = document.getElementById('idUltimaMensagem').value;

		var myRequest = new XMLHttpRequest();

		myRequest.open('GET', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=mensagens_sala&token='+tokenUsuario+'&sala='+idSala+'&id='+tokenUsuario);

		myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		myRequest.onreadystatechange = function() {
			if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {
				
				var retorno = JSON.parse(myRequest.responseText);

				for(var i=0;i<retorno.data.length;i++){
					//console.log(retorno.data[i].nome);
				}

				alert('Mensagens Listadas no Console');
			}
		}

		myRequest.send();

	}

	


}


function tornarSalaPrivada(){

	var tokenUsuario = sessionStorage.getItem('token');

	if(tokenUsuario==null){
		alert('Você precisa estar logado.');
	}
	else{

		var selectSalaPublica = document.getElementById('selectSalaPublica');

		var itemSelecionado = selectSalaPublica.options[selectSalaPublica.selectedIndex].value;

		var idSala = itemSelecionado;

		var myRequest = new XMLHttpRequest();

		myRequest.open('GET', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=sala_privada&token='+tokenUsuario+'&sala='+idSala);

		myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		myRequest.onreadystatechange = function() {
			if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {
				
				var retorno = JSON.parse(myRequest.responseText);

				for(var i=0;i<retorno.data.length;i++){
					//console.log(retorno.data[i].nome);
				}

				alert('Voce so pode tornar uma sala privada ou pulica se você for o dono da sala.');
			}
		}

		myRequest.send();
	}
}

function tornarSalaPublica(){
	var tokenUsuario = sessionStorage.getItem('token');

	if(tokenUsuario==null){
		alert('Você precisa estar logado.');
	}
	else{

		alert('Voce so pode tornar uma sala privada ou pulica se você for o dono da sala.');

		var selectSalaPublica = document.getElementById('selectSalaPublica');

		var itemSelecionado = selectSalaPublica.options[selectSalaPublica.selectedIndex].value;

		var idSala = itemSelecionado;

		var myRequest = new XMLHttpRequest();

		myRequest.open('GET', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=sala_publica&token='+tokenUsuario+'&sala='+idSala);

		myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		myRequest.onreadystatechange = function() {
			if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {
				
				var retorno = JSON.parse(myRequest.responseText);

				for(var i=0;i<retorno.data.length;i++){
					//console.log(retorno.data[i].nome);
				}
			}
		}

		myRequest.send();
	}
}


function cadastrarMensagem(){

	var tokenUsuario = sessionStorage.getItem('token');

	if(tokenUsuario == null){
		alert('Voce precisa estar logado na aplicacao');
	}
	else{
		var idSala = document.getElementById('idSala').value;

		var mensagem = document.getElementById('mensagem').value;

		var myRequest = new XMLHttpRequest();

		myRequest.open('POST', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=cad_mensagem');

		myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		myRequest.onreadystatechange = function() {
			if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {
				
				var retorno = JSON.parse(myRequest.responseText);

				//console.log(retorno);

				if(retorno.result == 'Erro'){
					alert('Ocorreu um erro interno.');
				}
				else{
					alert('Mensagem Cadastrada com sucesso');
				}
			}
		}

		var params = 'token='+tokenUsuario+'&sala='+ idSala+'&mensagem='+mensagem;

		myRequest.send(params);
	}

}


if(document.readyState == 'loading'){

	var selectSalaPublica = document.getElementById('selectSalaPublica');

	if(selectSalaPublica != null){

		var myRequest = new XMLHttpRequest();

		myRequest.open('GET', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=salas');

		myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		myRequest.onreadystatechange = function() {
			if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {

				var retorno = JSON.parse(myRequest.responseText);


				for(var i=0;i<retorno.data.length;i++){
					
					var option = document.createElement('option');

					//console.log(retorno.data[i].nome);

					option.value =retorno.data[i].id;

					option.innerHTML = retorno.data[i].nome;

					//alert('ID : '+ retorno.data[i].id +' Nome: '+retorno.data[i].nome);

					selectSalaPublica.appendChild(option);
				}

				retorno = JSON.stringify(retorno);

				//alert(retorno);  
				
			}
		}

		myRequest.send();
	}
}

if(window.location.href.includes('tornarSalaPrivada')){

	var selectSalaPublica = document.getElementById('selectSalaPublica');

	if(selectSalaPublica != null){

		var tokenUsuario = sessionStorage.getItem('token');

		if(tokenUsuario == null){
			alert('Voce precisa estar logado para participar de uma sala');
		}
		else{

				//document.getElementById('CaixaMensagens').innerHTML = "";

				var myRequest = new XMLHttpRequest();

				myRequest.open('GET', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=salas');

				myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

				myRequest.onreadystatechange = function() {
					if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {

					var retorno = JSON.parse(myRequest.responseText);

					for(var i=0;i<retorno.data.length;i++){
						
						var option = document.createElement('option');

						//console.log(retorno.data[i].nome);

						option.value =retorno.data[i].id;

						option.innerHTML = retorno.data[i].nome;

						//alert('ID : '+ retorno.data[i].id +' Nome: '+retorno.data[i].nome);

						selectSalaPublica.appendChild(option);
					}

					retorno = JSON.stringify(retorno);

					//alert(retorno);  

				}
			}

				myRequest.send();
			};
		}
	}

	else if(window.location.href.includes('tornarSalaPublica')){
		var selectSalaPublica = document.getElementById('selectSalaPublica');

		if(selectSalaPublica != null){

			//var itemSelecionado = this.options[this.selectedIndex].value;

			var tokenUsuario = sessionStorage.getItem('token');


			if(tokenUsuario == null){
				alert('Voce precisa estar logado para participar de uma sala');
			}
			else{

				//document.getElementById('CaixaMensagens').innerHTML = "";

				var myRequest = new XMLHttpRequest();

				myRequest.open('GET', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=minhas_salas&token='+tokenUsuario);

				myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

				myRequest.onreadystatechange = function() {
					if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {

						var retorno = JSON.parse(myRequest.responseText);


						for(var i=0;i<retorno.data.length;i++){

							var option = document.createElement('option');

						//console.log(retorno.data[i].nome);

						option.value =retorno.data[i].id;

						option.innerHTML = retorno.data[i].nome;

						//alert('ID : '+ retorno.data[i].id +' Nome: '+retorno.data[i].nome);

						selectSalaPublica.appendChild(option);
					}

					retorno = JSON.stringify(retorno);

					//alert(retorno);  
					
				}
			};

			myRequest.send();

		}
		
	}
}

else{

	var selectSalaPublica = document.getElementById('selectSalaPublica');

	if(selectSalaPublica != null){

		selectSalaPublica.addEventListener('change', function(){

			var itemSelecionado = this.options[this.selectedIndex].value;

			var tokenUsuario = sessionStorage.getItem('token');


			if(tokenUsuario == null){
				alert('Voce precisa estar logado para participar de uma sala');
			}
			else{

				document.getElementById('CaixaMensagens').innerHTML = "";

				var myRequest = new XMLHttpRequest();

				myRequest.open('GET', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=mensagens_sala&token='+tokenUsuario+'&sala='+itemSelecionado);

				myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

				myRequest.onreadystatechange = function() {
					if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {

						var retorno = JSON.parse(myRequest.responseText);

						var caixaMensagens = document.getElementById('CaixaMensagens');

						for(var i=0;i<retorno.data.length;i++){
							caixaMensagens.innerHTML += retorno.data[i].mensagem +" <br>";
							//console.log(retorno.data[i].mensagem);
						}



					}
				}

				myRequest.send();
			}

		});


		document.getElementById('enviarMensagem').addEventListener('click',function(){

			var selectSalaPublica = document.getElementById('selectSalaPublica');

			var itemSelecionado = selectSalaPublica.options[selectSalaPublica.selectedIndex].value;

			var tokenUsuario = sessionStorage.getItem('token');

			if(tokenUsuario == null){
				alert('Voce precisa estar logado na aplicacao');
			}
			else{
				var idSala = itemSelecionado;

				var mensagem = document.getElementById('mensagem').value;

				var myRequest = new XMLHttpRequest();

				myRequest.open('POST', 'http://www.henriquesantos.pro.br/~hctsantos/chat.php?acao=cad_mensagem');

				myRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

				myRequest.onreadystatechange = function() {
					if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status == 200) {

						var retorno = JSON.parse(myRequest.responseText);

						//console.log(retorno);

						if(retorno.result == 'Erro'){
							alert('Ocorreu um erro interno.');
						}
						else{

							var caixaMensagens = document.getElementById("CaixaMensagens");

							var nomeUsuario = sessionStorage.getItem('nomeUsuario');

							caixaMensagens.innerHTML += nomeUsuario+' enviou : '+mensagem;

						}
					}
				}

				var nomeUsuario = sessionStorage.getItem('nomeUsuario');

				var params = 'token='+tokenUsuario+'&sala='+ idSala+'&mensagem='+nomeUsuario+' enviou : '+mensagem;

				myRequest.send(params);

				document.getElementById('mensagem').value = "";
			}
		});
	}
}


