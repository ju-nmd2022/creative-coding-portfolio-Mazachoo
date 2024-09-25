function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(10, 20, 30);
  stroke(255);
  noFill();

  let rows = 3;
  let cols = 3;
  let gridWidth = width / cols;
  let gridHeight = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let centerX = i * gridWidth + gridWidth / 2;
      let centerY = j * gridHeight + gridHeight / 2;

      push();
      translate(centerX, centerY);

      drawAnimatedFigure();

      pop();
    }
  }
}

function drawAnimatedFigure() {
  for (var i = 0; i < 80; i++) {
    push();
    rotate(sin(frameCount + i + 3) * 100);

    //var r = map(sin(frameCount), -1, 1, 50, 255);
    //var g = map(cos(frameCount / 2), -1, 1, 50, 255);
    //var b = map(sin(frameCount / 4), -1, 1, 50, 255);

    //stroke(r, g, b);

    rect(0, 0, 100 - i * 2, 600 - i * 3, 80 - i);

    pop();
  }
}
