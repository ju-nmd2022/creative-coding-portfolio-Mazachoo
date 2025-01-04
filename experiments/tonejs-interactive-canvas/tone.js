(async function initializeExperiment() {
    // Dynamically load Tone.js if not already loaded
    if (typeof Tone === "undefined") {
        const toneScript = document.createElement("script");
        toneScript.src = "https://unpkg.com/tone";
        document.head.appendChild(toneScript);
        await new Promise(resolve => (toneScript.onload = resolve));
    }

    // Dynamically load p5.js if not already loaded
    if (typeof p5 === "undefined") {
        const p5Script = document.createElement("script");
        p5Script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js";
        document.head.appendChild(p5Script);
        await new Promise(resolve => (p5Script.onload = resolve));
    }

    // Ensure Tone.js context is running (required by Tone.js for audio)
    window.addEventListener("mousedown", () => {
        if (Tone.context.state !== "running") {
            Tone.start();
        }
    });

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
    let activeTone;
    let additionalTones = [];
    let isTonePlaying = false;

    const SCALE_NOTES = ["D3", "A3", "Bb3", "C4", "D4", "E4", "F4", "A4"];
    let canvas, ctx, numRows, numCols;
    let allSquares = [];

    // Initialize the canvas and context
    function setup() {
        canvas = document.createElement("canvas");
        canvas.id = "canvas";
        document.body.appendChild(canvas);
        canvas.style.display = "block"; // Full window canvas
        body = document.querySelector("body");
        body.style.margin = "0"; // Remove body margin
        body.style.overflow = "hidden"; // Remove body scrollbars

        ctx = canvas.getContext("2d");

        // Initially set canvas size to window size
        resizeCanvas();

        // Initial background setup
        ctx.fillStyle = `rgb(${BACKGROUND_COLOR}, ${BACKGROUND_COLOR}, ${BACKGROUND_COLOR})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        console.log("Canvas initialized");
    }

    // Resize the canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        numRows = Math.ceil(canvas.height / CELL_SIZE);
        numCols = Math.ceil(canvas.width / CELL_SIZE);
    }

    // Function to play the tones based on square count
    function playTone() {
        const squareCount = allSquares.length;

        // Handle the main tone for 9 squares
        if (squareCount >= 9 && !isTonePlaying) {
            isTonePlaying = true;
            activeTone = new Tone.MembraneSynth({
                envelope: {
                    attack: 0.1,
                    decay: 0.5,
                    sustain: 0.3,
                    release: 1.5,
                },
            }).toDestination();
            activeTone.triggerAttack("C4", Tone.now()); // Start tone (C4 note)

            // Fade the tone out after 3 seconds
            activeTone.triggerRelease(Tone.now() + 3);
        } else if (squareCount < 9 && isTonePlaying) {
            activeTone.triggerRelease(Tone.now());
            isTonePlaying = false;
        }

        const noteIndexLimit = Math.min(Math.floor((squareCount - 9) / 7), SCALE_NOTES.length - 1);

        // Activate tones up to the note index limit
        for (let i = 0; i <= noteIndexLimit && i < SCALE_NOTES.length; i++) {
            if (!additionalTones[i]) {
                const randomNote = SCALE_NOTES[Math.floor(Math.random() * SCALE_NOTES.length)];
                const synth = new Tone.MembraneSynth({
                    envelope: {
                        attack: 0.1,
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

        // Trim additional tones array if necessary
        additionalTones = additionalTones.slice(0, SCALE_NOTES.length);
    }

    // Draw function that runs continuously
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = `rgb(${BACKGROUND_COLOR}, ${BACKGROUND_COLOR}, ${BACKGROUND_COLOR})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw all squares and decrease their opacity over time
        for (let i = allSquares.length - 1; i >= 0; i--) {
            let square = allSquares[i];
            let x = square.col * CELL_SIZE;
            let y = square.row * CELL_SIZE;

            square.opacity = Math.max(0, square.opacity - AMT_FADE_PER_FRAME);
            ctx.strokeStyle = `rgba(${COLOR_R}, ${COLOR_G}, ${COLOR_B}, ${square.opacity / 255})`;
            ctx.lineWidth = STROKE_WEIGHT;
            ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);

            if (square.opacity === 0) {
                allSquares.splice(i, 1);
            }
        }

        // Check if tones need to be updated
        playTone();

        requestAnimationFrame(draw);
    }

    // Start drawing squares when the mouse moves
    function handleMouseMove(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        let row = Math.floor(mouseY / CELL_SIZE);
        let col = Math.floor(mouseX / CELL_SIZE);

        allSquares.push({ row: row, col: col, opacity: STARTING_ALPHA });
    }

    // Initialize everything
    window.onload = () => {
        setup();
        draw();

        canvas.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", resizeCanvas);

        window.addEventListener("mousedown", () => {
            if (Tone.context.state !== "running") {
                Tone.start();
            }
        });
    };

})();
