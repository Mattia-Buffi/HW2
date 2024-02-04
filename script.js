//https://striveschool-api.herokuapp.com/api/deezer/search?q=INSERISCI QUI UNA QUERI
//https://api.deezer.com/album/ --> ID <-- /tracks con id album traccio le canzoni

// fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=fedez')
//     .then((Response)=>Response.json())
//     .then((json)=>console.log(json.data[0]))
//     .catch((err)=>console.log("Error detected: ",err));

/*   CARICAMENTO HOME   */
fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem')
    .then((Response)=>Response.json())
    .then((json)=>{
        document.getElementById('eminem').classList.remove('d-none');
        loadBestFour(json,'eminemSection');
    })
    .catch((err)=>console.log('Error detected: ',err));
fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=metallica')
    .then((Response)=>Response.json())
    .then((json)=>{
        document.getElementById('metallica').classList.remove('d-none');
        loadBestFour(json,'metallicaSection');
    })
    .catch((err)=>console.log('Error detected: ',err));
fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=quenn')
    .then((Response)=>Response.json())
    .then((json)=>{
        document.getElementById('queen').classList.remove('d-none');
        loadBestFour(json,'queenSection');
    })
    .catch((err)=>console.log('Error detected: ',err));

function loadBestFour(objectList,pinArtist){
    let imgPin=document.getElementById(pinArtist).children;
    console.log(imgPin);
    for(let i=0;i<4;i++){
        let cover=document.createElement('img');
        cover.src=objectList.data[i].album.cover_big;
        cover.classList.add('defaultList')
        cover.alt='No cover';
        imgPin[i].appendChild('cover');
        
        // settare l'attributo per attivare la modale correta 

        //creare la modale con le track
        let modalTracks=document.createElement('div');
        modalTracks.classList.add('modal');
        let albumID=objectList.data.album.id;
        let link=`https://api.deezer.com/album/${albumID}/tracks`;
        fetch(link)
            .then((Response)=>Response.json())
            .then((json)=>createList(json,albumID)
            .catch((err)=>console.log('Error detected: ',err)));
    }
}
//funzione creazione lista track
function createList(traks,album){
    
}

//funzione di ricera 
function search(){
    let searchKey=document.getElementById('searchField').value;
    //eliminare tutte le righe vecchie
    let previesResult=document.getElementById('searchSection');
    console.log(previesResult);
    for (const iterator of previesResult.childNodes) {
        previesResult.removeChild(iterator);
    }
    //aggiungere verifiche di controllo della parola per la richerca, spazi o piu parole come vanno gestite
    fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q='+searchKey)
    .then((Response)=>Response.json())
    .then((json)=>{
        document.getElementById('found').classList.remove('d-none');
        showResult(json,'searchSection');
        })
    .catch((err)=>console.log("Error detected: ",err));
}
//funzione crazione lista
function showResult(objectList,idPin){
    console.log(objectList);
    for (const iterator of objectList.data) {
        let elementTemp=document.createElement('div');
        elementTemp.classList.add('card','bg-dark','text-white');
        document.getElementById(idPin).appendChild(elementTemp);  
        let imgTemp=document.createElement('img');
        imgTemp.classList.add('card-img-top');
        imgTemp.src=iterator.album.cover_big;
        imgTemp.alt='No Image';
        elementTemp.appendChild(imgTemp);
        let titleTemp=document.createElement('div');
        titleTemp.classList.add('card-body');
        titleTemp.innerHTML=`<h5>${iterator.title}</h5>`;
        elementTemp.appendChild(titleTemp);
    } 
}
