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
            containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem} alt="Logo do Canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
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
