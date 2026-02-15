//vid vid vid - needs main scroll handler
const ScrollCanvas = document.getElementById("scroll-canvas");
const ScrollCtx = ScrollCanvas.getContext("2d");
const container = document.querySelector(".scroll-container");
//const videoTitle = document.getElementById("video-title");

const frameCount = 186; // Total number of frames
const frames = [];
let loadedCount = 0;
let currentFrame = 0;

ScrollCanvas.width = 1920;
ScrollCanvas.height = 1080;

// Preload all frames
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `vid/cloo-webp/${String(i).padStart(4, "0")}.webp`;

    img.onload = () => {
    loadedCount++;
    if (i === 0) {
        drawFrame(0);
    }

    if (loadedCount === frameCount) {
        console.log("All frames loaded!");
    }
    };

    frames.push(img);
}

// Draw a frame on the canvas
function drawFrame(index) {
  const frame = frames[Math.min(index, frameCount - 1)];
  if (frame.complete) {
      ScrollCtx.clearRect(0, 0, ScrollCanvas.width, ScrollCanvas.height);
      ScrollCtx.drawImage(frame, 0, 0, ScrollCanvas.width, ScrollCanvas.height);
  }
}


drawFrame(0);

function resizeCanvas() {
    ScrollCanvas.width = window.innerWidth;
    ScrollCanvas.height = window.innerHeight;
    drawFrame(currentFrame);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// "Cover" draw — fills canvas without stretching
function drawFrame(index) {
    currentFrame = index;
    const frame = frames[Math.min(index, frameCount - 1)];
    if (!frame || !frame.complete) return;

    const canvasW = ScrollCanvas.width;
    const canvasH = ScrollCanvas.height;
    const imgW = frame.naturalWidth;
    const imgH = frame.naturalHeight;

    const scale = Math.max(canvasW / imgW, canvasH / imgH);
    const w = imgW * scale;
    const h = imgH * scale;
    const x = (canvasW - w) / 2;
    const y = (canvasH - h) / 2;

    ScrollCtx.clearRect(0, 0, canvasW, canvasH);
    ScrollCtx.drawImage(frame, x, y, w, h);
}

/*
function handleScroll() {
    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight - window.innerHeight;

    if (containerHeight <= 0) return;

    const scrolled = (currentScroll - containerTop) / containerHeight;
    const progress = Math.min(Math.max(scrolled, 0), 1);

    // Map progress to frame index
    const frameIndex = Math.floor(progress * (frameCount - 1));
    drawFrame(frameIndex);

    if (progress > 0.85) {
    videoTitle.classList.add("visible");
    } else {
    videoTitle.classList.remove("visible");
    }
}
*/

//main scroll 
const videoTitle = document.getElementById("video-title");

const lenis = new Lenis({
  duration: 1.25,
  easing: (e) => Math.min(1, 1.001 - Math.pow(2, -10 * e)),
  wheelMultiplier: 1,
  touchMultiplier: 2,
  normalizeWheel: true
});

lenis.stop();  //lock

function unlockScroll() {
  lenis.start();
  scrollLock = false;
}

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.on("scroll", ({ scroll }) => {
  currentScroll = scroll;
  handleScroll();
});

window.addEventListener("resize", () => {
  targetScroll = window.scrollY;
  currentScroll = window.scrollY;
});

function handleScroll() {
  const container = document.querySelector(".scroll-container");
  const containerTop = container.offsetTop;
  const containerHeight = container.offsetHeight - window.innerHeight;

  if (containerHeight <= 0) return;

  const scrolled = (currentScroll - containerTop) / containerHeight;
  const progress = Math.min(Math.max(scrolled, 0), 1);

  const frameIndex = Math.floor(progress * (frameCount - 1));
  drawFrame(frameIndex);

  if (progress > 0.5) {
    const fadeProgress = (progress - 0.5) / 0.3; // 0 → 1 over that range
    videoTitle.style.opacity = Math.min(fadeProgress, 1);
  } else {
    videoTitle.style.opacity = 0;
  }
}


//splash splash splash
const splash = document.getElementById("splash");

let splashDismissed = false;

document.body.classList.add("no-scroll");
window.scrollTo(0, 0); 

function dismissSplash() {
  if (splashDismissed) return;
  splashDismissed = true;
  
  window.scrollTo(0, 0);
  let currentscroll = 0;
  let targetScroll = 0;

  splash.classList.add("hidden");

  setTimeout(() => {
    splash.style.display = "none";
    console.log("Removing no-scroll");
    document.body.classList.remove("no-scroll");
    document.documentElement.classList.remove("no-scroll");
    unlockScroll()
  }, 1000); // important- if scroll doesnt work
}

splash.addEventListener("click", dismissSplash);

setTimeout(dismissSplash, 3000); 