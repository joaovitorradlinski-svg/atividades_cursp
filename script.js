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
const playlist =[extra, iwillsurvive, lovethesubhumanself]
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
    cover.src = `images/${playlist[index].file}.jpeg`;
    song.src = `songs/${playlist[index].file}.mp3`
    SongName.innerText = playlist[index].SongName;
    bandName.innerText = playlist[index].bandName;
}

function previoussong(){
    if (index === 0){
        index = playlist.length -1;
    }
    else{
        index -=1;
    }
    loadSong();
    playSong();
}

function nextsong(){
    if (index === playlist.length -1){
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
    const width =progresscontainer.clientWidth
    const clickposition = event.offsetX;
    song.jumpToTime = (clickposition / width) * song.duration
    song.currentTime = jumpToTime


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