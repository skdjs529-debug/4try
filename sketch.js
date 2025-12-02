let cam;
let filterGif;
let gifAspect;
let camStarted = false;

function preload() {
  filterGif = loadImage("ipad live 3.gif"); // GIF 업로드
  gifAspect = filterGif.width / filterGif.height;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(20);
  text("터치하여 카메라 시작", width / 2, height / 2);
}

function draw() {
  background(0);

  if (camStarted && cam) {
    // 캔버스 비율 대비 GIF+카메라 크기 계산
    let canvasAspect = width / height;
    let drawWidth, drawHeight;

    if (canvasAspect > gifAspect) {
      drawHeight = height;
      drawWidth = drawHeight * gifAspect;
    } else {
      drawWidth = width;
      drawHeight = drawWidth / gifAspect;
    }

    let drawX = (width - drawWidth) / 2;
    let drawY = (height - drawHeight) / 2;

    // 카메라 미러링 + 비율 유지
    push();
    translate(width, 0);
    scale(-1, 1);
    image(cam, drawX, drawY, drawWidth, drawHeight);
    pop();

    // GIF 중앙 정렬, 원본 비율 유지
    image(filterGif, drawX, drawY, drawWidth, drawHeight);
  }
}

// 터치 이벤트로 카메라 시작 (iOS Safari 대응)
function touchStarted() {
  if (!camStarted) {
    cam = createCapture({
      video: { facingMode: "user" },
      audio: false
    });
    cam.elt.setAttribute('playsinline', '');
    cam.hide();
    camStarted = true;
  }
}

// 창 크기 변경 시 캔버스와 카메라 반응형
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}