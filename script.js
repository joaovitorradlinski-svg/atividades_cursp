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
const likeBtn = document.getElementById("like");

const iwillsurvive = {
  SongName: "I Will Survive",
  bandName: "Gloria Gaynor",
  file: "Iwillsurvive",
  liked: false,
};

const lovethesubhumanself = {
  SongName: "lovethesubhumanself",
  bandName: "Guilty Gear",
  file: "lovethesubhumanself",
  liked: false,
};

const extra = {
  SongName: "extra",
  bandName: "Guilty Gear",
  file: "extra",
  liked: false,
};

let isPlaying = false;
let issnuffle = false;
let isrepeat = false;
const playlist = [extra, iwillsurvive, lovethesubhumanself];
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
  if (sortedplaylist[index].isLocal) {
    song.src = sortedplaylist[index].file;
    cover.src =
      "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=600&auto=format&fit=crop";
  } else {
    cover.src = `images/${sortedplaylist[index].file}.jpeg`;
    song.src = `songs/${sortedplaylist[index].file}.mp3`;
  }
  SongName.innerText = sortedplaylist[index].SongName;
  bandName.innerText = sortedplaylist[index].bandName;
  updateLikeButton();
}

function updateLikeButton() {
  const icon = likeBtn.querySelector("i");
  if (sortedplaylist[index].liked) {
    icon.classList.remove("bi-heart");
    icon.classList.add("bi-heart-fill");
    likeBtn.classList.add("button-liked");
  } else {
    icon.classList.remove("bi-heart-fill");
    icon.classList.add("bi-heart");
    likeBtn.classList.remove("button-liked");
  }
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
  currentTime.innerText = formatTime(song.currentTime);
}

function jumpto(event) {
  const width = progresscontainer.clientWidth;
  const clickposition = event.offsetX;
  const jumpToTime = (clickposition / width) * song.duration;
  song.currentTime = jumpToTime;
}

function snufflearray(presnuffledarray) {
  let size = sortedplaylist.length;
  let currentIndex = size - 1;
  while (currentIndex > 0) {
    let randomIndex = Math.floor(Math.random() * size);
    let aux = presnuffledarray[currentIndex];
    presnuffledarray[currentIndex] = presnuffledarray[randomIndex];
    presnuffledarray[randomIndex] = aux;
    currentIndex -= 1;
  }
}

function shufflebuttoncliked() {
  if (issnuffle === false) {
    issnuffle = true;
    snufflearray(sortedplaylist);
    shuffle.classList.add("button-shuffle");
  } else {
    issnuffle = false;
    shuffle.classList.remove("button-shuffle");
  }
}

function repeatbuttoncliked() {
  if (isrepeat === false) {
    isrepeat = true;
    repeat.classList.add("button-repeat");
  } else {
    isrepeat = false;
    repeat.classList.remove("button-repeat");
  }
}
function nextorRepeat() {
  if (isrepeat === false) {
    nextsong();
  } else {
    pauseSong();
  }
}
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds}`;
}

function updatetotaltime() {
  duration.innerText = formatTime(song.duration);
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
shuffle.addEventListener("click", shufflebuttoncliked);
repeat.addEventListener("click", repeatbuttoncliked);

const dropOverlay = document.getElementById("drop-overlay");

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  document.body.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

["dragenter", "dragover"].forEach((eventName) => {
  document.body.addEventListener(
    eventName,
    () => dropOverlay.classList.add("active"),
    false,
  );
});

["dragleave", "drop"].forEach((eventName) => {
  document.body.addEventListener(
    eventName,
    () => dropOverlay.classList.remove("active"),
    false,
  );
});

document.body.addEventListener("drop", handleDrop, false);

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;

  if (files.length > 0) {
    let file = files[0];
    if (file.type.startsWith("audio/")) {
      const objectURL = URL.createObjectURL(file);
      const fileName = file.name.replace(/\.[^/.]+$/, "");

      const customSong = {
        SongName: fileName,
        bandName: "Local Audio",
        file: objectURL,
        isLocal: true,
        liked: false,
      };

      playlist.push(customSong);
      sortedplaylist.push(customSong);

      index = sortedplaylist.length - 1;
      loadSong();
      playSong();
    } else {
      alert("Por favor, solte um arquivo de áudio (.mp3, .wav, etc).");
    }
  }
}

likeBtn.addEventListener("click", () => {
  sortedplaylist[index].liked = !sortedplaylist[index].liked;
  updateLikeButton();
});
