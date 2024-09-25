let rez = 0.02;
let minSize = 10;
let maxSize = 50;

let palette = [
  [235, 78, 119],
  [255, 154, 108],
  [255, 229, 140],
  [154, 186, 89],
  [31, 115, 85],
];

function setup() {
  noStroke();
  createCanvas(600, 600);
  noLoop();
}

function draw() {
  background(31, 115, 85);

  let selectedColors = [];
  let numColors = floor(random(3, 5));
  for (let i = 0; i < numColors; i++) {
    let randomColor = random(palette);
    selectedColors.push(randomColor);
  }

  let size = random(minSize, maxSize);

  for (let i = 0; i < width; i += size) {
    for (let j = 0; j < height; j += size) {
      let color1 = random(selectedColors);
      let color2 = random(selectedColors);

      if (noise(i * rez, j * rez) < 0.5) {
        fill(color1[0], color1[1], color1[2]);
        triangle(i, j, i + size, j + size, i, j + size);

        fill(color2[0], color2[1], color2[2]);
        triangle(i, j, i + size, j + size, i + size, j);
      } else {
        fill(color1[0], color1[1], color1[2]);
        triangle(i + size, j, i, j + size, i, j);

        fill(color2[0], color2[1], color2[2]);
        triangle(i + size, j, i, j + size, i + size, j + size);
      }
    }
  }
}
