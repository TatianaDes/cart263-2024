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
        let index = hand.annotations.indexFinger;
        let tip = index[3];
        let base = index[0];
        let tipX = tip[0];
        let tipY = tip[1];
        let baseX = base[0];
        let baseY = base[1];

        // Pin body
        push();
        noFill();
        stroke(255, 255, 255);
        strokeWeight(2);
        line(baseX, baseY, tipX, tipY);
        pop();

        // Pin head
        push();
        noStroke();
        fill(255, 0, 0);
        ellipse(baseX, baseY, 20);
        pop();

        // Check bubble popping
        let d = dist(tipX, tipY, bubble.x, bubble.y);
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
