// Constants for the canvas and squares
const CELL_SIZE = 40;
const COLOR_R = 228;
const COLOR_G = 193;
const COLOR_B = 249;
const STARTING_ALPHA = 255;
const BACKGROUND_COLOR = 31;
const AMT_FADE_PER_FRAME = 5;
const STROKE_WEIGHT = 1;

// Tone.js variables
let activeTone; // Active tone for 9 squares
let additionalTones = []; // Array for additional tones
let isTonePlaying = false; // Track if the 9-square tone is playing

// Integral D minor scale notes
const SCALE_NOTES = ["D3", "A3", "Bb3", "C4", "D4", "E4", "F4", "A4"];

// Canvas variables
let canvas;
let ctx;
let numRows;
let numCols;
let currentRow = -1;
let currentCol = -1;
let allSquares = []; // Array to store all the squares

// Initialize the canvas and context
function setup() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  // Initially set canvas size to window size
  resizeCanvas();

  // Initial background setup transforming ChatGPT
  ctx.fillStyle = `rgb(${BACKGROUND_COLOR}, ${BACKGROUND_COLOR}, ${BACKGROUND_COLOR})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Resize the canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  numRows = Math.ceil(canvas.height / CELL_SIZE);
  numCols = Math.ceil(canvas.width / CELL_SIZE);

  // Log the new canvas dimensions
  console.log(
    "Canvas resized to width:",
    canvas.width,
    "height:",
    canvas.height
  );
}

// Function to play the tones based on square count
function playTone() {
  const squareCount = allSquares.length;

  // Handle the main tone for 9 squares
  if (squareCount >= 9 && !isTonePlaying) {
    isTonePlaying = true;
    activeTone = new Tone.MembraneSynth({
      envelope: {
        attack: 0.1, // Add fade-in for softer start ChatGPT
        decay: 0.5,
        sustain: 0.3,
        release: 1.5,
      },
    }).toDestination();
    activeTone.triggerAttack("C4", Tone.now()); // Start tone (C4 note)

    // Fade the tone out after 3 seconds ChatGPT
    activeTone.triggerRelease(Tone.now() + 3);
  } else if (squareCount < 9 && isTonePlaying) {
    // Stop the tone if less than 9 squares are present
    activeTone.triggerRelease(Tone.now());
    isTonePlaying = false;
  }

  // Handle additional tones for every 7 squares beyond 9
  const maxNotes = 27;
  const noteIndexLimit = Math.min(
    Math.floor((squareCount - 9) / 7),
    SCALE_NOTES.length - 1
  );

  // Activate tones up to the note index limit
  for (let i = 0; i <= noteIndexLimit && i < SCALE_NOTES.length; i++) {
    if (!additionalTones[i]) {
      const randomNote =
        SCALE_NOTES[Math.floor(Math.random() * SCALE_NOTES.length)];
      const synth = new Tone.MembraneSynth({
        envelope: {
          attack: 0.1, // Add fade-in for softer start
          decay: 0.5,
          sustain: 0.3,
          release: 1.5,
        },
      }).toDestination();
      synth.triggerAttack(randomNote, Tone.now());
      additionalTones[i] = synth;
    }
  }

  // Deactivate tones beyond the note index limit
  for (let i = noteIndexLimit + 1; i < additionalTones.length; i++) {
    if (additionalTones[i]) {
      additionalTones[i].triggerRelease(Tone.now());
      additionalTones[i] = null;
    }
  }

  // Trim additional tones array if necessary ChatGPT
  additionalTones = additionalTones.slice(0, SCALE_NOTES.length);
}

// Draw function that runs continuously - YouTube video
function draw() {
  // Clear the previous frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the background
  ctx.fillStyle = `rgb(${BACKGROUND_COLOR}, ${BACKGROUND_COLOR}, ${BACKGROUND_COLOR})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw all squares and decrease their opacity over time - YouTube video
  for (let i = allSquares.length - 1; i >= 0; i--) {
    let square = allSquares[i];
    let x = square.col * CELL_SIZE;
    let y = square.row * CELL_SIZE;

    // Fade out the square (2 seconds fade-out)
    square.opacity = Math.max(0, square.opacity - AMT_FADE_PER_FRAME);
    ctx.strokeStyle = `rgba(${COLOR_R}, ${COLOR_G}, ${COLOR_B}, ${
      square.opacity / 255
    })`;
    ctx.lineWidth = STROKE_WEIGHT;
    ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);

    // Remove the square if its opacity is zero
    if (square.opacity === 0) {
      allSquares.splice(i, 1);
    }
  }

  // Check if tones need to be updated
  playTone();

  requestAnimationFrame(draw); // Keep the drawing loop running
}

// Helper Function for getting random neighbors (optional)
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

      if (!isCurrentCell && isInBounds && Math.random() < 0.5) {
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

// Start drawing squares when the mouse moves
function handleMouseMove(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  let row = Math.floor(mouseY / CELL_SIZE);
  let col = Math.floor(mouseX / CELL_SIZE);

  // Add the current square to the list with full opacity
  allSquares.push({ row: row, col: col, opacity: STARTING_ALPHA });

  // Add its random neighbors to the list (optional)
  let neighbors = getRandomNeighbors(row, col);
  for (let neighbor of neighbors) {
    allSquares.push(neighbor);
  }
}

// Initialize everything when the page loads ChatGPT
window.onload = () => {
  setup();
  draw(); // Start the drawing loop

  // Attach the mouse move listener after the canvas is fully loaded
  canvas.addEventListener("mousemove", handleMouseMove);

  // Attach the resize event listener to update canvas size dynamically
  window.addEventListener("resize", resizeCanvas);

  // Start audio context on first user interaction
  window.addEventListener("mousedown", () => {
    if (Tone.context.state !== "running") {
      Tone.start();
    }
  });
};
