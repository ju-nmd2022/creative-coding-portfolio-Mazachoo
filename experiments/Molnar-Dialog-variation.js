// Ensure that the colors are defined using p5.js color function ChatGPT
const colors = [
  [255, 214, 255],
  [231, 198, 255],
  [200, 182, 255],
  [184, 192, 255],
  [187, 208, 255],
  [247, 37, 133],
];

function setup() {
  createCanvas(1000, 1000);
  frameRate(2);
  noLoop();
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

  // Make sure to use p5.js color() function with color values directly ChatGPT
  stroke(color(random(colors)));

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
