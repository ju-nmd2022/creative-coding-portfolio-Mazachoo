const CELL_SIZE = 40;
const COLOR_R = 228;
const COLOR_G = 193;
const COLOR_B = 249;
const STARTING_ALPHA = 255;
const BACKGROUND_COLOR = 31;
const PROB_OF_NEIGHBOR = 0.5;
const AMT_FADE_PER_FRAME = 5;
const STROKE_WEIGHT = 1;

import * as Tone from "tone";

let colorWithAlpha;
let numRows;
let numCols;
let currentRow = -1;
let currentCol = -1;
let allSquares = []; // Array to store all the squares that should be drawn (hovered and neighbors)

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorWithAlpha = color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA);
  noFill();
  strokeWeight(STROKE_WEIGHT);
  numRows = Math.ceil(windowHeight / CELL_SIZE);
  numCols = Math.ceil(windowWidth / CELL_SIZE);
}

function draw() {
  background(BACKGROUND_COLOR);

  let row = floor(mouseY / CELL_SIZE);
  let col = floor(mouseX / CELL_SIZE);

  // Only update if the mouse is over a new square
  if (row !== currentRow || col !== currentCol) {
    currentRow = row;
    currentCol = col;

    // Add the current square to the list with full opacity
    allSquares.push({ row: row, col: col, opacity: STARTING_ALPHA });

    // Add its random neighbors to the list
    let neighbors = getRandomNeighbors(row, col);
    for (let neighbor of neighbors) {
      allSquares.push(neighbor);
    }
  }

  // Draw all squares and decrease their opacity over time
  for (let i = allSquares.length - 1; i >= 0; i--) {
    let square = allSquares[i];
    let x = square.col * CELL_SIZE;
    let y = square.row * CELL_SIZE;

    square.opacity = max(0, square.opacity - AMT_FADE_PER_FRAME);
    stroke(COLOR_R, COLOR_G, COLOR_B, square.opacity);
    rect(x, y, CELL_SIZE, CELL_SIZE);

    // Remove the square if its opacity is zero
    if (square.opacity === 0) {
      allSquares.splice(i, 1);
    }
  }
}

function getRandomNeighbors(row, col) {
  let neighbors = [];

  for (let dRow = -1; dRow <= 1; dRow++) {
    for (let dCol = -1; dCol <= 1; dCol++) {
      let neighborRow = row + dRow;
      let neighborCol = col + dCol;

      let isCurrentCell = dRow === 0 && dCol === 0;

      let isInBounds =
        neighborRow >= 0 &&
        neighborRow < numRows &&
        neighborCol >= 0 &&
        neighborCol < numCols;

      if (!isCurrentCell && isInBounds && Math.random() < PROB_OF_NEIGHBOR) {
        neighbors.push({
          row: neighborRow,
          col: neighborCol,
          opacity: STARTING_ALPHA,
        });
      }
    }
  }
  return neighbors;
}
