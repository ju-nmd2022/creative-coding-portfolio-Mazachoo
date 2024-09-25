function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(10, 20, 30);
  noFill();
  stroke(255);

  translate(width / 2, height / 2);

  for (var i = 0; i < 165; i++) {
    push();
    rotate(sin(frameCount + i + 2) * 200);
    rect(0, 0, 600 - i * 3, 600 - i * 3, 165 - i);

    pop();
  }
}
