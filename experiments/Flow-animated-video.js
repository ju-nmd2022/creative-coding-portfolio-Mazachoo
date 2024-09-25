function setup() {
  canvSize = min(windowWidth, windowHeight);
  createCanvas(canvSize, canvSize);
  colorMode(HSB, 360, 120, 100, 255);
  background(0);
  background(220, 80, 50);
  counter = 0;
  k = 12;
}

function draw() {
  if (counter == 1) {
    step1();
  }
  if (counter == 2) {
    makeArray();
  }
  if (counter == 3) {
    makeSegments();
  }
  if (counter == 4) {
    paperTexture(1);
  }
  if (counter == 5) {
    paperTexture(0);
    noLoop();
  }
  if (counter < 3 || k < 1) {
    counter++;
  }
  k--;
  for (i = 0; i < 15000000; i++) {}
}

function step1() {
  noStroke();
  fill(0, 80, 80);
  circle(width / 3, height / 3, width * 0.6);
  strokeWeight(0.6);
  rez1 = 0.01; //angle
  rez2 = 0.01; //color
  gap = 15;
  len = 10;

  startVary = 25;
  startCol = random(360);
  strokeCap(SQUARE);
}

function makeArray() {
  flowArray = [];
  for (i = -20; i < width + 20; i += gap) {
    for (j = -20; j < height + 20; j += gap) {
      n2 = (noise(i * rez1, j * rez2) - 0.2) * 1.7;
      h = floor(n2 * 5) * 72 + startCol;
      if (h > 360) {
        h -= 360;
      }

      h1 = h + random(-8, 8); //hue
      s1 = 80 + random(-15, 15); //saturation
      b1 = 80 + random(15, 15); //brightness

      x = i + random(-startVary, startVary);
      y = j + random(-startVary, startVary);
      flowArray.push(x, y, h1, s1, b1);
    }
  }
}
function makeSegments() {
  for (i = 0; i < flowArray.length; i += 5) {
    x = flowArray[i];
    y = flowArray[i + 1];
    h1 = flowArray[i + 2];
    s1 = flowArray[i + 3];
    b1 = flowArray[i + 4];
    stroke(h1, s1, b1, 200);
    strokeWeight(k * 0.3);
    n1 = (noise(x * rez1, y * rez1) - 0.2) * 1.7;
    ang = n1 * PI * 2;
    newX = cos(ang) * len + x;
    newY = sin(ang) * len + y;
    line(x, y, newX, newY);
    x = newX;
    y = newY;
    flowArray.splice(i, 2, x, y);
  }
}

function paperTexture(textureType) {
  //based on color present
  noFill();
  colVary2 = 15;
  let textureNum, alph2;
  //textureType = 1;//random(2);
  if (textureType < 1.0) {
    //blurring
    textureNum = 10000;
    strokeWeight(width * 0.02);
    alph2 = 15; //random(10, 20);
  } else if (textureType < 2) {
    //regular paper texture
    textureNum = 15000;
    strokeWeight(max(1, width * 0.0011)); //1.5
    alph2 = 210; //random(100, 220);
  }
  colorMode(RGB);
  for (i = 0; i < textureNum; i++) {
    x = random(width);
    y = random(height);
    col = get(x, y);
    stroke(
      col[0] + random(-colVary2, colVary2),
      col[1] + random(-colVary2, colVary2),
      col[2] + random(-colVary2, colVary2),
      alph2
    );
    push();
    translate(x, y);
    rotate(random(PI * 2));
    curve(
      height * random(0.035, 0.14),
      0,
      0,
      height * random(-0.03, 0.03),
      height * random(-0.03, 0.03),
      height * random(0.035, 0.07),
      height * random(0.035, 0.07),
      height * random(0.035, 0.14)
    );
    pop();
  }
  colorMode(HSB, 360, 120, 100, 255);
}
