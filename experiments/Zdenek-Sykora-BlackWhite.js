let rez = 0.02;
let size = 18;

function setup() {
  noStroke();
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  colorStart = random(260);
  noLoop();
}

function draw() {
  background(255);
  noStroke();

  for (let i = 0; i < width; i += size) {
    for (let j = 0; j < height; j += size) {
      let color1 = random() < 0.5 ? 0 : 255;
      let color2 = random() < 0.5 ? 0 : 255;

      if (noise(i * rez, j * rez) < 0.5) {
        fill(color1);
        triangle(i, j, i + size, j + size, i, j + size);

        fill(color2);
        triangle(i, j, i + size, j + size, i + size, j);
      } else {
        fill(color1);
        triangle(i + size, j, i, j + size, i, j);

        fill(color2);
        triangle(i + size, j, i, j + size, i + size, j + size);
      }
    }
  }
}
