const SongName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const prev = document.getElementById('previous');
const currentprogress = document.getElementById('current-progress');
const progresscontainer = document.getElementById('progress-container');
const shuffle = document.getElementById('shuffle');
const repeat = document.getElementById('repeat');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');




const iwillsurvive ={
    SongName: 'I Will Survive',
    bandName: 'Gloria Gaynor',
    file: 'Iwillsurvive',
}

const lovethesubhumanself ={
    SongName: 'lovethesubhumanself',
    bandName: 'Guilty Gear',
    file: 'lovethesubhumanself',
}

const extra ={
    SongName: 'extra',
    bandName: 'Guilty Gear',
    file: 'extra'
}

let isPlaying = false;
let issnuffle =false;
let isrepeat = false;
const playlist =[extra, iwillsurvive, lovethesubhumanself]
let sortedplaylist = [...playlist]
let index = 0;


function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    song.pause();
    isPlaying = false;
}

function loadSong(){
    cover.src = `images/${sortedplaylist[index].file}.jpeg`;
    song.src = `songs/${sortedplaylist[index].file}.mp3`
    SongName.innerText = sortedplaylist[index].SongName;
    bandName.innerText = sortedplaylist[index].bandName;
}

function previoussong(){
    if (index === 0){
        index = sortedplaylist.length -1;
    }
    else{
        index -=1;
    }
    loadSong();
    playSong();
}

function nextsong(){
    if (index === sortedplaylist.length -1){
        index = 0;
    }
    else{
        index +=1;
    }
    loadSong();
    playSong();
}

function updateprogressbar(){
    song.duration
    song.duration
    const barwidth = (song.currentTime / song.duration) * 100;
    currentprogress.style.setProperty = ('--progress', `${barwidth}%`)

}


function jumpto(event){
    const width =progresscontainer.clientWidth;
    const clickposition = event.offsetX;
    song.jumpToTime = (clickposition / width) * song.duration;
    song.currentTime = jumpToTime;
    song.currenttime=jumpToTime;
    alert(song.currentTime);


}

function snufflearray(presnuffledarray){
    let size = sortedplaylist.length;
    let currentIndex = size -1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random()* size);
        let aux = presnuffledarray[currentIndex];
        presnuffledarray[currentIndex] = presnuffledarray[randomIndex];
        presnuffledarray[randomIndex] = aux;
        currentIndex -= 1;
    }
}


function shufflebuttoncliked(){
    if(issnuffle === false){
        issnuffle = true
        snufflearray(sortedplaylist)
        shuffle.classList.add('button-shuffle')
    }
    else{
        issnuffle = false
        shuffle.classList.remove('button-shuffle')
    }


}

function repeatbuttoncliked(){
    if(isrepeat === false){
        isrepeat = true
        repeat.classList.add('button-repeat')
    }
    else{
        isrepeat = false
        repeat.classList.remove('button-repeat')
    }
}
function nextorRepeat(){
    if(isrepeat === false   ){
        nextsong();
    }
    else{
        pauseSong();
    }
}
function formatTime(time){
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds}`;
}

function updatetotaltime(){
    duration.innerText = formatTime(song.duration);
}

loadSong();


play.addEventListener('click', () => {
    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
})


prev.addEventListener('click', previoussong);
next.addEventListener('click', nextsong);
song.addEventListener('timeupdate', updateprogressbar);
progresscontainer.addEventListener('click', jumpto);
song.addEventListener('ended', nextorRepeat);
song.addEventListener('loadedmetadata', updatetotaltime);
shuffle.addEventListener('click' ,shufflebuttoncliked
)
repeat.addEventListener('click', repeatbuttoncliked)