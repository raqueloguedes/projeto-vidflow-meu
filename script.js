const containerVideos = document.querySelector(".videos__container");

//codigo assíncrono
async function buscarEMostrarVideos(){ //função assíncrona, substitui o then
    try{
        const busca = await fetch('http://localhost:3000/videos'); //promessa
        const videos = await busca.json(); 
    //.then(res => res.json()) // quando acontecer
    //.then((videos) => //callback, uma função que espera outra
        videos.forEach((video)=> {
            if(video.categoria == ""){
                throw new Error('Vídeo não tem categoria');
            }
            // tudo isso aqui embaixo é de acordo com o json 
            containerVideos.innerHTML += ` 
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem} alt="Logo do Canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p>
                </div>
            </li>
            `;
        })
    }catch(error){
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: $[error]</p>`
    }    
//)
/*uma forma de tratar o erro quando era then
.catch((error) => { // se acontecer algum erro aparece essa mensagem
    containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error} </p>`;
})*/
}

buscarEMostrarVideos(); // chama a função


const barraDePesquisa = document.querySelector(".pesquisar__input"); //o que será inserido na barra de pesquisa

barraDePesquisa.addEventListener("input", filtrarPesquisa); //vai usar o que foi inserido no imput e executar a função filtrar pesquisa

function filtrarPesquisa(){
    const videos = document.querySelectorAll(".videos__item"); //parametro
    if(barraDePesquisa.value != ""){ //se for diferente de vazio 
        for(let video of videos){
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase(); //lowercase deixar minusculo pra poder comparar
            let valorFiltro = barraDePesquisa.value.toLowerCase();

            if(!titulo.includes(valorFiltro)){ // essa ! no começo é uma negação, ou seja, titulo não inclui mostrar none
                video.style.display = "none";
            } else {
                video.style.display = "block"; // mostra o que foi pedido
            }

        }

    } else {
        video.style.display = "block"; // se barra vazia, mostrar todos os videos
    }
    
} 

/* 
//código otimizado com forEach 
// A lógica condicional que define o estilo de exibição (display) dos vídeos é simplificada usando uma condição ternária. Isso elimina a necessidade de blocos if...else.

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');
    const valorFiltro = barraDePesquisa.value.toLowerCase();
  
    videos.forEach((video) => {
      const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
  
      video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    });
  }

  */

const botaoCategoria = document.querySelectorAll(".superior__item"); 

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name"); //para cada botão usar o name que ta no html
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria)); // quando clicar executar a função
})

function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll(".videos__item");
    for(let video of videos){
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if(!categoria.includes(valorFiltro) && valorFiltro != 'tudo'){ // QUANDO CLICAR EM TODOS APARECER
            video.style.display = "none";
        } else {
            video.style.display = "block"; 
        }
    }
}