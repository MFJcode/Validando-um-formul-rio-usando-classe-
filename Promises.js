// Promises

// Promessa 

// CHAMOS DE CÓDIGO ASSINCRONO

// QUANDO ESTAMOS NA INTERNET SOLICITAMOS OU REQUISITAMOS ALGUNS RECURSOS E NAO SABEMOS QUANDO ESTA SOLICITAÇAO SERÁ ATENDIDA
// NÃO TEMOS A NOÇAO EXATA DE QUANDO ESTE RECURSOS VÃO VOLTAR PRA GENTE

// POR EXEMPLO VC SE CONECTA EM UMA API E PEDE DADOS DO USUARIO (SEU CODIGO NÃO TEM A NOÇÃO EXATA DE QUANDO ESSES DADOS VAO RETORNAR PARA VC TRABALHAR COM ESSES DADOS )

// A SOLUÇAO ANTIGA PARA ISSO SERIA AS FUNÇOES DE CALL BACK ( VC PEDE O DADO PASSA COMO PARAMETRO DA FUNÇAO E UMA FUNÇAO DED CALL BACK QUE SERÁ EXECUTADA QUANDO
// AQUELE DADO ESTIVER PRONTO )

// E A PROMESSA VEIO PARA AJUDAR E NAO CRIAR UMA ARVORE DE FUNÇOES UMA DENTRO DA OUTRA USANDO CALL BACK

// ASSIM PODEMOS FAZER UMA COISA ASSINCRONA PARECER QUE É SINCRONA (OU UMA COISA QUE ACONTECE EM UMA ORDEM)


// VAMOS TRABALHAR AQUI COM CÓDIGO E ONDE AS PROMISES VAO SOLUCIONAR O PROBLEMA

// VAMOS CRIAR UMA FUNÇAO NORMAL QUE DEMORA PARA FAZER ALGUMA COISA

 /* //-----------------------CODE---------------------------//

function rand(min, max) {
    min *= 1000;
    max *= 1000;
    return Math.floor(Math.random() * (max - min) + min);
}

function esperaAi (msg, tempo) {
    setTimeout(() => {
        console.log(msg);
    }, tempo);
}

esperaAi('Frase 1', 1000); //Eviamos a msg Frase 1 e o tem em milisegundo que representa 1 segundo para mostrar a mensagem

esperaAi('Frase 1', rand(1, 3)); // usamos um funçao para ter valores aleatorios e nao sabemo o tempo que cada msg será exibida
esperaAi('Frase 2', rand(1, 3));
esperaAi('Frase 3', rand(1, 3));


 //-----------------------CODE---------------------------// */


   //-------------------------------SUBTITULO----------------------------------//


// ASSIM PRECISAMOS FALAR PRO JAVASCRIPT EXECUTAR A FRASE 2 APENAS DEPOIS DA FRASE 1 E A FRASE 3 APENAS DEPOIS DA 2 NESTA ORDEM INDEPENDENTE DO TEMPO QUE DEMORAR

// COMO RESOLVIA ISSO COM CALL BACK?


 /* //-----------------------CODE---------------------------//

function rand(min, max) {
    min *= 1000;
    max *= 1000;
    return Math.floor(Math.random() * (max - min) + min);
}

function esperaAi (msg, tempo, callBack) {
    setTimeout(() => {
        console.log(msg);
        if(callBack) callBack();
    }, tempo);
}

// COMO A FRASE 2 ESTÁ DENTRO DA FRASE 1 E A FRASE 3 DENTRO DA FRASE 2 ELAS AGORA VAO APARECER NA ORDEM CORRETA POR QUE UMA SÓ SERÁ EXECUTADA DEPOIS DA OUTRA
// O PROBLEMA É QUE ESTE CÓDIGO FACILMENTE VAI VIRANDO UMA ARVORE ONDE SE VAI IDENTANDO UMA FUNÇAO DENTRO DA OUTRA
// NÃO É A MELHOR SOLUÇAO

esperaAi('Frase 1', rand(1, 3), function() {
    esperaAi('Frase 2', rand(1, 3), function() {
        esperaAi('Frase 3', rand(1, 3));
    });
}); 


 //-----------------------CODE---------------------------// */

  //-------------------------------SUBTITULO----------------------------------//

// COMO RESOLVER ISSO COM PROMISE

 /* //-----------------------CODE---------------------------//

function rand(min, max) {
    min *= 1000;
    max *= 1000;
    return Math.floor(Math.random() * (max - min) + min);
}

// ESSA FUNÇAO QUE SABEMOS QUE VAI DEMORAR ENVOLVEMOS DENTRO DE UMA PROMISE

function esperaAi (msg, tempo) {
    return new Promise((resolve, reject) => { // estes dois parametros nao precisa chamar resolve e reject mas é uma convenção 
        setTimeout(() => {
           resolve(msg); // só podemos enviar 01 argumento para o resolve e para o reject
        }, tempo);

    });
}

esperaAi('Conexão com o BD', rand(1, 3))
    .then(resposta => {
        console.log(resposta)
        return esperaAi('Buscando dados da Base', rand(1, 3))
    })
    .then(resposta => {
        console.log(resposta);
        return esperaAi('Tratando os dados da Base', rand(1, 3))
    })
    .then(resposta => {
        console.log(resposta)
    })
    .then(() => {
        console.log('Exibe dados na tela')
    })
    .catch

    console.log('Isso será exibido antes de qualquer promise')

 //-----------------------CODE---------------------------// */

    //-------------------------------SUBTITULO----------------------------------//

// VAMOS FALAR AGORA DO REJECT


function rand(min, max) {
    min *= 1000;
    max *= 1000;
    return Math.floor(Math.random() * (max - min) + min);
}

// ESSA FUNÇAO QUE SABEMOS QUE VAI DEMORAR ENVOLVEMOS DENTRO DE UMA PROMISE

function esperaAi (msg, tempo) {
    return new Promise((resolve, reject) => {
        if(typeof msg !== 'string') reject('BAD VALUE');

        setTimeout(() => {
           resolve(msg); // só podemos enviar 01 argumento para o resolve e para o reject
        }, tempo);

    });
}

esperaAi('Conexão com o BD', rand(1, 3))
    .then(resposta => {
        console.log(resposta)
        return esperaAi('Buscando dados da Base', rand(1, 3))
    })
    .then(resposta => {
        console.log(resposta);
        return esperaAi(22222, rand(1, 3))
    })
    .then(resposta => {
        console.log(resposta)
    })
    .then(() => {
        console.log('Exibe dados na tela')
    })
    .catch(erro => {
        console.log('ERRO:', erro);
    });

    console.log('Isso será exibido antes de qualquer promise')