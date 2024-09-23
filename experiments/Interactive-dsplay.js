let size = 10;
let circles = [];
let cols;
let rows;

function setup() {
  createCanvas(1000, 800);

  cols = width / size;
  rows = height / size;

  let i = 0;
  while (i < cols) {
    circles[i] = [];
    stroke(9);
    fill(0);
    let j = 0;
    while (j < rows) {
      circles[i][j] = createCircle(
        size / 2 + i * size,
        size / 2 + j * size,
        0,
        0
      );
      j++;
    }
    i++;
  }
}

function draw() {
  background(152, 255, 152);

  let i = 0;
  while (i < cols) {
    let j = 0;
    while (j < rows) {
      let distance = dist(mouseX, mouseY, circles[i][j].x, circles[i][j].y);
      circles[i][j].dw = map(distance, 0, width / 5, 0, size);
      circles[i][j].dh = map(distance, 0, height, 0, size);
      displayCircle(circles[i][j]);
      j++;
    }
    i++;
  }
}

function createCircle(x, y, dw, dh) {
  return {
    x: x,
    y: y,
    dw: dw,
    dh: dh,
  };
}

function displayCircle(circle) {
  ellipse(circle.x, circle.y, circle.dw, circle.dh);
}
