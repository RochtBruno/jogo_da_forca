/* Elemento HTML referente a categoria */
const categoria = document.querySelector("#category");
/* Elemento HTML referente a lista das letras erradas*/
const letrasErradas = document.querySelector(".wrongLetters");
/* Elemento HTML referente a palavra oculta
   Utilizaremos esse mesmo elemento para exibir as mensagens do jogo*/
   const palavraInterface = document.querySelector(".dashes");
/* Array com elementos HTML referentes aos olhos do personagem */
const olhos = Array.from(document.querySelectorAll(".eyes"));
/* Array com elementos HTML referentes as partes do corpo */
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
/* Palavra corrente */
let palavraProposta;
/* Lista das letras erradas */
let letrasErradasArray = [];
/* Index da parte do corpo corrente */
let indiceBoneco;
/* Numero de chances do jogador */
const numTentativas = 7;
/* Valor para opacidade dos olhos */
const opacidadeOlhos = 0.3;

const categorias = {
    frutas : ['limao','abacaxi','banana','pessego','manga','kiwi','morango'],
    cores : ['azul','vermelho','preto', 'branco','cinza','laranja','rosa'],
    animais : ['elefante','tigre','cachorro','gato','passarinho','abelha','tartaruga'],
    profissoes : ['engenheiro','dentista','advogado','pintor','motorista','professor'],
}

function retornaListaCategoria(){
    return Object.keys(categorias)
}   

function retornaCategoria(){
    const arrayCategorias = retornaListaCategoria();
    let indiceCategoria = Math.floor(Math.random() * arrayCategorias.length)//sorteando o tema
    return arrayCategorias[indiceCategoria];
}

function exibeCategoria(){
    categoria.innerHTML = retornaCategoria()
}

function definirPalavraCategoria(){
    const arrayPalavras = categorias[categoria.innerHTML];
    let indicePalavra = Math.floor(Math.random() * arrayPalavras.length);
    palavraProposta = arrayPalavras[indicePalavra];
    console.log(palavraProposta);
    ocultarPalavraProposta();
}

function ocultarPalavraProposta(){
    let palavraOcultada = '';
    for(let i = 0; i < palavraProposta.length; i++){
        palavraOcultada += '-'
    }
    exibePalavraOculta(palavraOcultada)
}
function exibePalavraOculta(palavra){
    palavraInterface.innerHTML = palavra;
}

function tentativa(letra){
    if(palavraProposta.includes(letra)){
        atualizaPalavraInterface(letra);
    }else{
        letrasErradasArray.push(letra);
        letrasErradas.innerHTML = 'letras erradas: '+letrasErradasArray;
        if(partesBoneco.length > indiceBoneco){
            desenhaBoneco()
        }
    }
    verificarFimJogo();
}
function verificarFimJogo(){
    if(!palavraInterface.innerHTML.includes('-')){
        exibePalavraOculta('Parabéns, você venceu');
        window.removeEventListener('keypress',retornaLetra) 
    }else if(letrasErradasArray.length >= numTentativas){
        desenhaOlhos();
        exibePalavraOculta('Você perdeu, boa sorte na próxima vez');
        window.removeEventListener('keypress',retornaLetra)
    }
}
function atualizaPalavraInterface(letra){
    let palavraAuxiliar = '';
    for(let i = 0; i < palavraProposta.length; i++){
        if(palavraProposta[i] === letra){
            //se acertar a letra
            palavraAuxiliar += letra;
        } else if(palavraInterface.innerHTML[i] != '-'){
            // se acertar a letra, porém ja ter acertado outras anteriores e não substituir as letras descobertas por '-'
            palavraAuxiliar += palavraInterface.innerHTML[i];
        }
        else{
            //se não acertar a palavra
            palavraAuxiliar += '-';
        }
    }
    exibePalavraOculta(palavraAuxiliar)
}
/*
Recebe o evento do teclado e passa apenas o valor da letra para a função tentativa
*/
function retornaLetra(e){ 
    tentativa(e.key);
}

/*
Desenha a parte do corpo corrente
*/
function desenhaBoneco(){
    partesBoneco[indiceBoneco].classList.remove("hide");
    indiceBoneco++; 
}

/* 
Desenha os olhos do personagem
*/
function desenhaOlhos(){
    olhos.forEach((olho => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    }));
}

/*
Oculta as partes do corpo do personagem
*/
function ocultaBoneco(){
    olhos.forEach((olho => {
        olho.style.opacity = opacidadeOlhos; 
    }));
    partesBoneco.forEach(parteBoneco => {
        parteBoneco.classList.add("hide");
    });
}

/*
Inicia as configurações do jogo
*/
function iniciaJogo(){
    exibeCategoria();
    definirPalavraCategoria();
    ocultaBoneco();
    indiceBoneco = 0;
    letrasErradasArray = [];
    letrasErradas.innerHTML = "Letras erradas: ";
    window.addEventListener("keypress", retornaLetra);
}

window.addEventListener("load", iniciaJogo);
