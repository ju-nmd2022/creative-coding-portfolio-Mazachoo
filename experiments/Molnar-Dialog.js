function setup() {
  createCanvas(1000, 1000);

  colors = [
    color(255, 255, 255),
    color(200, 5, 20),
    color(55, 188, 25),
    color(15, 35, 250),
    color(125, 235, 250),
    color(240, 245, 15),
    color(160, 60, 235),
  ];
}

const size = 160;
const layers = 13;

//color (255, 255, 255), //white
//color (200, 5, 20), //red
//color (55, 188, 25), //green
//color (15, 35, 250), //blue
//color (125, 235, 250), //light blue
//color (240, 245, 15), //yellow
//color (160, 60, 235), //purplw

let colors = [];
function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 0.3, -variance, variance);
}

function drawLayers(x, y, size, layers) {
  // const half = size / 2;
  const variance = size / 12;
  noFill();
  strokeWeight(3.5);

  stroke(random(colors));

  //rectMode(CENTER);
  for (let i = 0; i < layers; i++) {
    if (Math.random() > 0.8) {
      continue;
    }
    const s = (size / layers) * i;
    const half = s / 2;
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
    //rect(x - half, y - half, s, s);
  }
}

function draw() {
  background(15, 20, 30);
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 6; x++) {
      drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
    }
  }
  noLoop();
}
