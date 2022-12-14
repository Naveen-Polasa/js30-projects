const player = document.querySelector(".player");
const video = document.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreen = player.querySelector(".fullscreen");

function togglePlay() {
  video[video.paused ? "play" : "pause"]();
}

function updateBtn() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseInt(this.dataset.skip);
}

function handleRangeUpdates() {
  video[this.name] = this.value;
  console.log(this.name, this.value);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleScreen() {
  video.requestFullscreen();
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((btn) => {
  btn.addEventListener("click", skip);
});

ranges.forEach((input) => {
  input.addEventListener("change", handleRangeUpdates);
});
ranges.forEach((input) => {
  input.addEventListener("change", handleRangeUpdates);
});

let mousedown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
fullscreen.addEventListener("click", handleScreen);
