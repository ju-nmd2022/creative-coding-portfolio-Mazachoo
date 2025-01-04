const colors = [
  color(255, 214, 255),
  color(231, 198, 255),
  color(200, 182, 255),
  color(184, 192, 255),
  color(187, 208, 255),
  color(247, 37, 133),
];

function setup() {
  createCanvas(1000, 1000);
  frameRate(2);
}

const size = 160;
const layers = 13;

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 0.12, -variance, variance);
}

function drawLayers(x, y, size, layers) {
  const variance = size / 50;
  noFill();
  strokeWeight(1);

  stroke(random(colors));

  for (let i = 0; i < layers; i++) {
    if (Math.random() > 0.98) {
      continue;
    }
    const s = (size / layers) * i;
    const half = s / 4;
    beginShape();
    vertex(
      getRandomValue(x - half, variance),
      getRandomValue(y - half, variance)
    );
    vertex(
      getRandomValue(x + half, variance),
      getRandomValue(y - half, variance)
    );
    vertex(
      getRandomValue(x + half, variance),
      getRandomValue(y + half, variance)
    );
    vertex(
      getRandomValue(x - half, variance),
      getRandomValue(y + half, variance)
    );
    endShape(CLOSE);
  }
}

function draw() {
  background(15, 20, 30);
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 6; x++) {
      drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
    }
  }
}
