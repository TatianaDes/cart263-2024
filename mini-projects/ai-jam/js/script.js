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

// Creating a love array and how many I want
let love = [];
let loveSize = 3;

// Creating a priority array and how many I want
let priority = [];
let prioritySize = 2;

// setup() creates the canvas and the calling of the handpose program as well as the webcam. It also gives the arrays random positions on the canvas
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

    // Make love have random positions
    for (let i = 0; i < loveSize; i++) {
        love[i] = createHeart(random(0, width), random(0, height));
    }

    // Make priority have random positions
    for (let i = 0; i < prioritySize; i++) {
        priority[i] = createPlans(random(0, width), random(0, height));
    }
}

// Creating the love object for all the hearts
function createHeart(x, y) {
    let heart = {
        x: x,
        y: y,
        size: random(10, 30),
        vx: 0,
        vy: 0,
        scaredSpeed: 25,
    };
    return heart;
}

// Creating the priority object for all the plans
function createPlans(x, y) {
    let plans = {
        x: x,
        y: y,
        size: random(10, 20),
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        acceleration: 1,
        maxSpeed: 1,
    };
    return plans;
}

// draw() creates the states and calls their functions
function draw() {
    // Setting up all the different states
    if (state === `title`) {
        title();
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

// Creates the simulation state that calls the functions for both the love and priority arrays
function simulation() {
    // Simulation state
    background(40, 53, 70);
    prepareHand();

    // Calling the functions for all the hearts
    for (let j = 0; j < love.length; j++) {
        // checkOverlap(love[j]);
        displayHeart(love[j]);
    }

    // Calling the functions for all the plans
    for (let j = 0; j < priority.length; j++) {
        // movePlans(priority[j]);
        displayPlans(priority[j]);
    }
}

// Creates the finger position for all the fingers and takes the information from the handpose program
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
    }
}

// // Checks the overlaps of the middle fingers tip and whatever it is touching
// function checkOverlap(heart) {
//     // Check if middle finger and the heart overlap
//     let d = dist(tipMFX, tipMFY, heart.x, heart.y);
//     if (d < heart.size / 2) {
//         heart.vx = heart.scaredSpeed;
//     }

//     // Move the hearts
// heart.x += heart.vx;
// heart.y += heart.vy;
// }

// // Make the plans run away from the middle finger tip
// function movePlans(plans) {
//     // Make the puppies scared of the dog
//     let a = dist(tipMFX, tipMFY, plans.x, plans.y);
//     if (a < tipMFX / 2 + plans.size / 2 + 300) {
//         if (tipMFX < plans.x) {
//             plans.ax = plans.acceleration;
//         }
//         else {
//             plans.ax = -plans.acceleration;
//         }

//         if (tipMFY < plans.y) {
//             plans.ay = plans.acceleration;
//         }
//         else {
//             plans.ay = -plans.acceleration;
//         }
//     }

//     // Constraining the speed and movement of the plans from their x-axis and y-axis
//     plans.vx = plans.vx + plans.ax;
//     plans.vx = constrain(plans.vx, -plans.maxSpeed, plans.maxSpeed);
//     plans.vy = plans.vy + plans.ay;
//     plans.vy = constrain(plans.vy, -plans.maxSpeed, plans.maxSpeed);

//     // Position is being added onto the velocity of plans
//     plans.x = plans.x + plans.vx;
//     plans.y = plans.y + plans.vy;

//     // Constrain the plans to the width and height of the canvas
//     plans.x = constrain(plans.x, 0, width);
//     plans.y = constrain(plans.y, 0, height);
// }

// Display the hearts
function displayHeart(heart) {
    push();
    noStroke();
    fill(168, 49, 49);
    ellipse(heart.x, heart.y, heart.size);
    pop();
}

// Display the plans
function displayPlans(plans) {
    push();
    noStroke();
    fill(226, 177, 100);
    rectMode(CENTER);
    rect(plans.x, plans.y, plans.size);
    pop();
}

// Calls the keyPressed function to work with all the switching states from title to simulation
function keyPressed() {
    // Pressing the right arrow to activate
    if (keyCode === 39) {
        if (state === `title`) {
            state = `simulation`;
        }
    }
}
