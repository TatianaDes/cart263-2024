/**
Always Out of Reach
Tatiana Désormeaux

A program about the fear of losing someone and the emotions that come with this form of loss.
*/

"use strict";

// Set the starting state
let state = `title`; // Can be: title, simulation, love, priority

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

// Creating an array for all the finger tips' x and y-axis
let tipX = [];
let tipY = [];

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
        // console.log(results);
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
        scaredSpeed: 5,
        stay: true,
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
        acceleration: 0.5,
        maxSpeed: 1,
        stay: true,
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
    }
    else if (state === `love`) {
        loveless();
    }
    else if (state === `priority`) {
        unimportant();
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
    checkEndings();

    // Calling the functions for all the hearts
    for (let j = 0; j < love.length; j++) {
        if (love[j].stay) {
            checkCloseness(love[j]);
            moveHeart(love[j]);
            heartGone(love[j]);
            displayHeart(love[j]);
        }
    }

    // Calling the functions for all the plans
    for (let j = 0; j < priority.length; j++) {
        if (priority[j].stay) {
            movePlans(priority[j]);
            plansGone(priority[j]);
            displayPlans(priority[j]);
        }
    }
}

// Creates the finger position for all the fingers and takes the information from the handpose program
function prepareHand() {
    if (predictions.length > 0) {
        let hand = predictions[0];
        // Calls drawHand for the thumb 
        drawHand(hand.annotations.thumb, 77, 66, 95, 12);
        // Calls drawHand for the index finger
        drawHand(hand.annotations.indexFinger, 125, 121, 158, 7);
        // Calls drawHand for the middle finger
        drawHand(hand.annotations.middleFinger, 102, 69, 108, 10);
        // Calls drawHand for the ring finger
        drawHand(hand.annotations.ringFinger, 101, 98, 131, 8);
        // Calls drawHand for the pinky finger
        drawHand(hand.annotations.pinky, 125, 98, 131, 5);
    }
}

// Creates a function that calls for all the necessary elements of all the fingers in one parameter
function drawHand(finger, strokeR, strokeG, strokeB, strokeW) {
    // Creating the recognition for all the finger positions
    let myFinger = finger;
    let tipF = myFinger[3];
    let baseF = myFinger[2];
    let tipFX = tipF[0];
    let tipFY = tipF[1];
    let baseFX = baseF[0];
    let baseFY = baseF[1];

    // Displaying all the fingers
    push();
    noFill();
    stroke(strokeR, strokeG, strokeB);
    strokeWeight(strokeW);
    line(baseFX, baseFY, tipFX, tipFY);
    pop();

    // Calling the x and y variable for the tip of each finger
    tipX.push(tipFX);
    tipY.push(tipFY);
}

// Checks the overlaps of the middle fingers tip and whatever it is touching
function checkCloseness(heart) {
    // Check if fingers and the heart get close to each other
    for (let j = 0; j < tipX.length; j++) {
        let d = dist(tipX[j], tipY[j], heart.x, heart.y);
        if (d < heart.size * 3) {
            heart.vx = heart.scaredSpeed;
        }
    }
}

// Allows for the hearts to move by adding position to the velocity of the hearts
function moveHeart(heart) {
    // Move the hearts
    heart.x += heart.vx;
    heart.y += heart.vy;
}

// Make the plans run away from the middle finger tip
function movePlans(plans) {
    // Make the puppies scared of the dog
    for (let j = 0; j < tipX.length; j++) {
        let a = dist(tipX[j], tipY[j], plans.x, plans.y);
        if (a < tipX[j] / 2 + plans.size / 2 + 300) {
            if (tipX[j] < plans.x) {
                plans.ax = plans.acceleration;
            }
            else {
                plans.ax = -plans.acceleration;
            }

            if (tipY[j] < plans.y) {
                plans.ay = plans.acceleration;
            }
            else {
                plans.ay = -plans.acceleration;
            }
        }
    }
    // Constraining the speed and movement of the plans from their x-axis and y-axis
    plans.vx = plans.vx + plans.ax;
    plans.vx = constrain(plans.vx, -plans.maxSpeed, plans.maxSpeed);
    plans.vy = plans.vy + plans.ay;
    plans.vy = constrain(plans.vy, -plans.maxSpeed, plans.maxSpeed);

    // Position is being added onto the velocity of plans
    plans.x += plans.vx;
    plans.y += plans.vy;
}

function heartGone(heart) {
    for (let j = 0; j < love.length; j++) {
        if (heart.y - heart.size / 2 > height && heart.x - heart.size / 2 > width) {
            love[j].stay = false;
        }
    }
}

function plansGone(plans) {
    for (let j = 0; j < priority.length; j++) {
        if (plans.y - plans.size / 2 > height && plans.x - plans.size / 2 > width) {
            priority[j].stay = false;
        }
    }
}

function checkEndings() {
    // Checks if all the hearts have left, then `love` state occurs
    let allLoveLeave = true;
    for (let j = 0; j < love.length; j++) {
        if (love[j].stay) {
            allLoveLeave = false;
            break;
        }
    }

    // Checks if all the hearts are actually gone and starts the ending
    if (allLoveLeave) {
        state = `love`;
    }

    // Checks if all the plans have left, then `priority` state occurs
    let allPlansLeave = true;
    for (let j = 0; j < priority.length; j++) {
        if (priority[j].stay) {
            allPlansLeave = false;
            break;
        }
    }

    // Checks if all the plans are actually gone and starts the ending
    if (allPlansLeave) {
        state = `priority`;
    }
}

function loveless() {
    // love state
    background(71, 98, 134);
    push();
    textSize(50);
    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    text(`Always Out of Reach`, width / 2, height / 2);
    pop();
}

function unimportant() {
    // priority state
    background(71, 98, 134);
    push();
    textSize(50);
    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    text(`Always Out of Reach`, width / 2, height / 2);
    pop();
}

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
