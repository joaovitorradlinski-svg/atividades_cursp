const SongName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const next = document.getElementById("next");
const prev = document.getElementById("previous");
const currentprogress = document.getElementById("current-progress");
const progresscontainer = document.getElementById("progress-container");
const shuffle = document.getElementById("shuffle");
const repeat = document.getElementById("repeat");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const like = document.getElementById("like");

const Devilnevercry = {
  SongName: "devilnevercry",
  bandName: "devilnevercry",
  file: "dmc",
};

const lovethesubhumanself = {
  SongName: "lovethesubhumanself",
  bandName: "Guilty Gear",
  file: "lovethesubhumanself",
};

const extra = {
  SongName: "extra",
  bandName: "Guilty Gear",
  file: "extra",
};

let isPlaying = false;
let issnuffle = false;
let isrepeat = false;
const playlist = JSON.parse(localStorage.getItem("playlist")) ?? [
  Devilnevercry,
  lovethesubhumanself,
  extra,
];
let sortedplaylist = [...playlist];
let index = 0;

function playSong() {
  play.querySelector(".bi").classList.remove("bi-play-circle-fill");
  play.querySelector(".bi").classList.add("bi-pause-circle-fill");
  song.play();
  isPlaying = true;
}

function pauseSong() {
  play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
  play.querySelector(".bi").classList.add("bi-play-circle-fill");
  song.pause();
  isPlaying = false;
}

function loadSong() {
  cover.src = `images/${sortedplaylist[index].file}.jpeg`;
  song.src = `songs/${sortedplaylist[index].file}.mp3`;
  SongName.innerText = sortedplaylist[index].SongName;
  bandName.innerText = sortedplaylist[index].bandName;
  likebuttonrender();
}

function previoussong() {
  if (index === 0) {
    index = sortedplaylist.length - 1;
  } else {
    index -= 1;
  }
  loadSong();
  playSong();
}

function nextsong() {
  if (index === sortedplaylist.length - 1) {
    index = 0;
  } else {
    index += 1;
  }
  loadSong();
  playSong();
}

function updateprogressbar() {
  const barwidth = (song.currentTime / song.duration) * 100;
  currentprogress.style.setProperty("--progress", `${barwidth}%`);
}

function jumpto(event) {
  const width = progresscontainer.clientWidth;
  const clickposition = event.offsetX;
  const jumpToTime = (clickposition / width) * song.duration;
  song.currentTime = jumpToTime;
}

function snufflearray(presnuffledarray) {
  let size = presnuffledarray.length;
  let currentIndex = size - 1;
  while (currentIndex > 0) {
    let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    let aux = presnuffledarray[currentIndex];
    presnuffledarray[currentIndex] = presnuffledarray[randomIndex];
    presnuffledarray[randomIndex] = aux;
    currentIndex -= 1;
  }
}

function shufflebuttoncliked() {
  if (issnuffle === false) {
    issnuffle = true;
    let currentSong = sortedplaylist[index];
    snufflearray(sortedplaylist);
    index = sortedplaylist.indexOf(currentSong);
    shuffle.classList.add("button-shuffle");
  } else {
    issnuffle = false;
    let currentSong = sortedplaylist[index];
    sortedplaylist = [...playlist];
    index = sortedplaylist.indexOf(currentSong);
    shuffle.classList.remove("button-shuffle");
  }
}

function repeatbuttoncliked() {
  if (isrepeat === false) {
    isrepeat = true;
    repeat.classList.add("button-repeat");
    song.loop = true;
  } else {
    isrepeat = false;
    repeat.classList.remove("button-repeat");
    song.loop = false;
  }
}
function nextorRepeat() {
  if (isrepeat === false) {
    nextsong();
  } else {
    playSong();
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function updatetotaltime() {
  duration.innerText = formatTime(song.duration);
}
function updateCurrentTime() {
  currentTime.innerText = formatTime(song.currentTime);
}

function likebuttonrender() {
  if (sortedplaylist[index].like === true) {
    like.querySelector(".bi").classList.remove("bi-heart");
    like.querySelector(".bi").classList.add("bi-heart-fill");
    like.classList.add("button-liked");
  } else {
    like.querySelector(".bi").classList.remove("bi-heart-fill");
    like.querySelector(".bi").classList.add("bi-heart");
    like.classList.remove("button-liked");
  }
}

function likebuttoncliked() {
  if (sortedplaylist[index].like === true) {
    sortedplaylist[index].like = false;
  } else {
    sortedplaylist[index].like = true;
  }
  likebuttonrender();
  localStorage.setItem("playlist", JSON.stringify(playlist));
}

loadSong();

play.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prev.addEventListener("click", previoussong);
next.addEventListener("click", nextsong);
song.addEventListener("timeupdate", updateprogressbar);
progresscontainer.addEventListener("click", jumpto);
song.addEventListener("ended", nextorRepeat);
song.addEventListener("loadedmetadata", updatetotaltime);
song.addEventListener("timeupdate", updateCurrentTime);
shuffle.addEventListener("click", shufflebuttoncliked);
repeat.addEventListener("click", repeatbuttoncliked);
like.addEventListener("click", likebuttoncliked);
