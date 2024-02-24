/**
Always Out of Reach
Tatiana Désormeaux

A program about the fear of losing someone and the emotions that come with this form of loss.
*/

"use strict";

// Set the starting state
let state = `title`; // Can be: title, simulation, hearts, plans

// The user's webcam
let video = undefined;

// The Handpose model
let handpose = undefined;

// The current set of predictions
let predictions = [];

// Creating a hearts array and how many I want
let hearts = [];
let heartsSize = 3;

// Creating a plans array and how many I want
let plans = [];
let plansSize = 2;

// Creating an array for all the finger tips' x and y-axis
let tipX = [];
let tipY = [];

let tipPFX = [];
let tipPFY = [];

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
    // Calls the reset function in the setup to always know that anytime the reset function is called it has to go through the function itself
    reset();
}

// Creating the hearts object for all the hearts
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

// Creating the plans object for all the plan
function createPlan(x, y) {
    let plan = {
        x: x,
        y: y,
        size: random(10, 20),
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        acceleration: 0.5,
        maxSpeed: 0.5,
        stay: true,
    };
    return plan;
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

// Creates the simulation state that calls the functions for both the hearts and plans arrays
function simulation() {
    // Simulation state
    background(40, 53, 70);
    prepareHand();
    checkEndings();

    // Calling the functions for all the hearts
    for (let j = 0; j < hearts.length; j++) {
        if (hearts[j].stay) {
            checkCloseness(hearts[j]);
            moveHeart(hearts[j]);
            heartGone(hearts[j]);
            displayHeart(hearts[j]);
        }
    }

    // Calling the functions for all the plan
    for (let j = 0; j < plans.length; j++) {
        if (plans[j].stay) {
            movePlan(plans[j]);
            planGone(plans[j]);
            displayPlan(plans[j]);
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
        isolatePinky(hand.annotations.pinky, 125, 98, 131, 5);
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

function isolatePinky(pinky, strokeR, strokeG, strokeB, strokeW) {
    // Creating the recognition for all the finger positions
    let Mypinky = pinky;
    let tipP = Mypinky[3];
    let baseP = Mypinky[2];
    let tipPX = tipP[0];
    let tipPY = tipP[1];
    let basePX = baseP[0];
    let basePY = baseP[1];

    // Displaying all the fingers
    push();
    noFill();
    stroke(strokeR, strokeG, strokeB);
    strokeWeight(strokeW);
    line(basePX, basePY, tipPX, tipPY);
    pop();

    // Calling the x and y variable for the tip of each finger
    tipPFX.push(tipPX);
    tipPFY.push(tipPY);
}


// Checks the overlaps of the middle fingers tip and whatever it is touching
function checkCloseness(heart) {
    // Check if fingers and the heart get close to each other
    for (let j = 0; j < tipPFX.length; j++) {
        let d = dist(tipPFX[j], tipPFY[j], heart.x, heart.y);
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

// Make the plan run away from the middle finger tip
function movePlan(plan) {
    // Make the puppies scared of the dog
    for (let j = 0; j < tipX.length; j++) {
        let a = dist(tipX[j], tipY[j], plan.x, plan.y);
        if (a < tipX[j] / 2 + plan.size / 2 + 300) {
            if (tipX[j] < plan.x) {
                plan.ax = plan.acceleration;
            }
            else {
                plan.ax = -plan.acceleration;
            }

            if (tipY[j] < plan.y) {
                plan.ay = plan.acceleration;
            }
            else {
                plan.ay = -plan.acceleration;
            }
        }
    }
    // Constraining the speed and movement of the plan from their x-axis and y-axis
    plan.vx = plan.vx + plan.ax;
    plan.vx = constrain(plan.vx, -plan.maxSpeed, plan.maxSpeed);
    plan.vy = plan.vy + plan.ay;
    plan.vy = constrain(plan.vy, -plan.maxSpeed, plan.maxSpeed);

    // Position is being added onto the velocity of plan
    plan.x += plan.vx;
    plan.y += plan.vy;
}

function heartGone(heart) {
    if (heart.x - heart.size / 2 > width) {
        heart.stay = false;
    }
}

function planGone(plan) {
    if (plan.y + plan.size / 2 < 0 || plan.y - plan.size / 2 > height || plan.x + plan.size / 2 < 0 || plan.x - plan.size / 2 > width) {
        plan.stay = false;
    }
}

function checkEndings() {
    // Checks if all the hearts have left, then `love` state occurs
    let allHeartsGone = true;
    for (let heart of hearts) {
        if (heart.stay) {
            allHeartsGone = false;
            break;
        }
    }
    if (allHeartsGone) {
        state = `love`;
    }

    // Checks if all the plan have left, then `priority` state occurs
    let allPlansGone = true;
    for (let plan of plans) {
        if (plan.stay) {
            allPlansGone = false;
            break;
        }
    }
    if (allPlansGone) {
        state = `priority`;
    }
}

function loveless() {
    // love state
    background(51, 30, 74);
    push();
    textSize(40);
    fill(95, 111, 166);
    textAlign(CENTER, CENTER);
    text(`Give Me Another Chance...`, width / 2, height / 2);
    pop();

    push();
    textSize(17);
    fill(120, 93, 161);
    textAlign(CENTER, CENTER);
    text(`(Press the Left Arrow Key to Continue)`, width / 2, 300);
    pop();
}

function unimportant() {
    // priority state
    background(48, 81, 104);
    push();
    textSize(50);
    fill(113, 106, 129);
    textAlign(CENTER, CENTER);
    text(`Please don't go...`, width / 2, height / 2);
    pop();

    push();
    textSize(17);
    fill(134, 141, 169);
    textAlign(CENTER, CENTER);
    text(`(Press the Left Arrow Key to Continue)`, width / 2, 300);
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

// Display the plan
function displayPlan(plan) {
    push();
    noStroke();
    fill(226, 177, 100);
    rectMode(CENTER);
    rect(plan.x, plan.y, plan.size);
    pop();
}

// Resets the simulation function from scratch after it is called again and creates all the same positions for every array
function reset() {
    // Calling the hearts array again
    hearts = [];
    // Make hearts have random positions
    for (let i = 0; i < heartsSize; i++) {
        hearts[i] = createHeart(random(0, width), random(0, height));
    }

    // Calling the plans array again
    plans = [];
    // Make plans have random positions
    for (let i = 0; i < plansSize; i++) {
        plans[i] = createPlan(random(0, width), random(0, height));
    }
}

// Calls the keyPressed function to work with all the switching states from title to simulation
function keyPressed() {
    // Pressing the right arrow to activate
    if (keyCode === 39) {
        if (state === `title`) {
            state = `simulation`;
        }
    }

    // Pressing the left arrow to activate and reset the simulation
    if (keyCode === 37) {
        if (state === `love`) {
            reset();
            state = `simulation`;
        }
        else if (state === `priority`) {
            reset();
            state = `simulation`;
        }
    }
}
