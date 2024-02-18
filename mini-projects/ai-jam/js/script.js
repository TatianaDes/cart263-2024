/**
Always Out of Reach
Tatiana Désormeaux

A program about the fear of losing someone and the emotions that come with this form of loss.
*/

"use strict";

// Set the starting state
let state = `title`; // Can be: title, simulation

// The user's webcam
let video = undefined;

// The Handpose model
let handpose = undefined;

// The current set of predictions
let predictions = [];

// The bubble
let bubble = undefined;

/**
Description of setup
*/
function setup() {
    createCanvas(640, 480);

    // Access user's webcam
    video = createCapture(VIDEO);
    video.hide();

    // Load the handpose model
    handpose = ml5.handpose(video, { flipHorizontal: true }, function () {
        console.log(`Model loaded.`);
    });

    // Listen for predictions
    handpose.on(`predict`, function (results) {
        console.log(results);
        predictions = results;
    });

    // Our bubble
    bubble = {
        x: random(width),
        y: height,
        size: 100,
        vx: 0,
        vy: -2
    }
}


/**
Description of draw()
*/
function draw() {
    // Setting up all the different states
    if (state === `title`) {
        title();
    }
    else if (state === `instructions`) {
        instructions();
    }
    else if (state === `simulation`) {
        simulation();
    };
}

// Allows a title state to be displayed with all its properties
function title() {
    // Title state
    background(71, 98, 134);
    push();
    textSize(50);
    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    text(`Always Out of Reach`, width / 2, height / 2);
    pop();

    push();
    textSize(17);
    fill(45, 56, 61);
    textAlign(CENTER, CENTER);
    text(`(Press the Right Arrow Key to Start)`, width / 2, 300);
    pop();

    push();
    textSize(15);
    fill(130, 154, 164);
    text(`Use your webcam to reach for the objects on the screen`, width / 2.5, 470);
    pop();
}

// Creates the simulation state that calls the display text variable at the top with its text colour
function simulation() {
    // Simulation state
    background(40, 53, 70);
    prepareHand();
}

function prepareHand() {
    if (predictions.length > 0) {
        let hand = predictions[0];
        // Creating the thumb recognition
        let thumb = hand.annotations.thumb;
        let tipT = thumb[3];
        let baseT = thumb[2];
        let tipTX = tipT[0];
        let tipTY = tipT[1];
        let baseTX = baseT[0];
        let baseTY = baseT[1];

        // Creating the index finger recognition
        let index = hand.annotations.indexFinger;
        let tipIF = index[3];
        let baseIF = index[2];
        let tipIFX = tipIF[0];
        let tipIFY = tipIF[1];
        let baseIFX = baseIF[0];
        let baseIFY = baseIF[1];

        // Creating the middle finger recognition
        let middle = hand.annotations.middleFinger;
        let tipMF = middle[3];
        let baseMF = middle[2];
        let tipMFX = tipMF[0];
        let tipMFY = tipMF[1];
        let baseMFX = baseMF[0];
        let baseMFY = baseMF[1];

        // Creating the ring finger recognition
        let ring = hand.annotations.ringFinger;
        let tipRF = ring[3];
        let baseRF = ring[2];
        let tipRFX = tipRF[0];
        let tipRFY = tipRF[1];
        let baseRFX = baseRF[0];
        let baseRFY = baseRF[1];

        // Creating the pinky finger recognition
        let pinky = hand.annotations.pinky;
        let tipPF = pinky[3];
        let basePF = pinky[2];
        let tipPFX = tipPF[0];
        let tipPFY = tipPF[1];
        let basePFX = basePF[0];
        let basePFY = basePF[1];

        // Displaying the Thumb
        push();
        noFill();
        stroke(77, 66, 95);
        strokeWeight(12);
        line(baseTX, baseTY, tipTX, tipTY);
        pop();

        // Displaying the Index Finger
        push();
        noFill();
        stroke(125, 121, 158);
        strokeWeight(7);
        line(baseIFX, baseIFY, tipIFX, tipIFY);
        pop();

        // Displaying the Middle Finger
        push();
        noFill();
        stroke(102, 69, 108);
        strokeWeight(10);
        line(baseMFX, baseMFY, tipMFX, tipMFY);
        pop();

        // Displaying the Ring Finger
        push();
        noFill();
        stroke(101, 98, 131);
        strokeWeight(8);
        line(baseRFX, baseRFY, tipRFX, tipRFY);
        pop();

        // Displaying the Pinky Finger
        push();
        noFill();
        stroke(125, 98, 131);
        strokeWeight(5);
        line(basePFX, basePFY, tipPFX, tipPFY);
        pop();

        // Check bubble popping
        let d = dist(tipMFX, tipMFY, bubble.x, bubble.y);
        if (d < bubble.size / 2) {
            bubble.x = random(width);
            bubble.y = height;
        }
    }

    // Move the bubble
    bubble.x += bubble.vx;
    bubble.y += bubble.vy;

    if (bubble.y < 0) {
        bubble.x = random(width);
        bubble.y = height;
    }

    push();
    fill(0, 100, 200);
    noStroke();
    ellipse(bubble.x, bubble.y, bubble.size);
    pop();
}

// Calls the keyPressed function to work with all the switching states from title to instructions to simulation
function keyPressed() {
    // Pressing the right arrow to activate
    if (keyCode === 39) {
        if (state === `title`) {
            state = `simulation`;
        }
    }
}
