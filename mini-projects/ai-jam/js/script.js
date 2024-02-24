/**
Always Out of Reach
Tatiana Désormeaux

A program about the fear of losing someone and the emotions that come with this form of loss.
*/

"use strict";

// Set the starting state
let state = `title`; // Can be: title, simulation, hearts, plans, stick

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

// Creating an array for all the finger tips' x and y corrdinates on the axis
let tipX = [];
let tipY = [];

// Creating all the attributes to the pinch function, like the initial amount of distance the pinch has to be
let pinchAmount = undefined;
// The location of where the pinch is
let pinchLocation = [];
// The time of how long the pinch goes on for
let pinchTime = undefined;

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
        maxSpeed: 1,
        stay: true,
    };
    return plan;
}

// draw() creates the states and calls their functions
function draw() {
    // Setting up all the different states
    if (state === `title`) {
        drawTitle();
    }
    else if (state === `simulation`) {
        drawSimulation();
    }
    else if (state === `love`) {
        drawLove();
    }
    else if (state === `priority`) {
        drawPriority();
    }
    else if (state === `stick`) {
        drawStick();
    };
}

// Allows a title state to be displayed with all its properties
function drawTitle() {
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
function drawSimulation() {
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
    // clears the length of the tips of the fingers each time the states change
    clearTips();
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

        // Creating the distance between the index and thumb to be able to pinch
        let thumbTip = hand.annotations.thumb[3];
        let indexFingerTip = hand.annotations.indexFinger[3];
        pinchAmount = dist(thumbTip[0], thumbTip[1], indexFingerTip[0], indexFingerTip[1]);
        pinchLocation = [(thumbTip[0] + indexFingerTip[0]) / 2, (thumbTip[1] + indexFingerTip[1]) / 2];
    } else {
        // Creating the pinch amount as undefined for when the pinch is initially set up
        pinchAmount = undefined;
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
        if (d < heart.size + 10) {
            if (tipX[j] < heart.x) {
                heart.vx = heart.scaredSpeed;
            }
            else {
                heart.vx = -heart.scaredSpeed;
            }
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
    // Make the plan scared of the fingers
    for (let j = 0; j < tipX.length; j++) {
        let a = dist(tipX[j], tipY[j], plan.x, plan.y);
        if (a < 50) {
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

// Makes the computer know when the hearts have gone off the sides of the screen on the left and right
function heartGone(heart) {
    if (heart.x - heart.size / 2 > width || heart.x + heart.size / 2 < 0) {
        heart.stay = false;
    }
}

// Makes the computer know when the plans have gone off all the canvas sides
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

    // Checks if the pinch has been done and then counts 3 seconds before the stick state occurs.
    let allPlansUnpinched = true;
    for (let plan of plans) {
        let distancetoPlan = dist(pinchLocation[0], pinchLocation[1], plan.x, plan.y);
        if (pinchAmount < 100 && distancetoPlan < 20) {
            allPlansUnpinched = false;
            if (pinchTime === undefined) {
                pinchTime = new Date();
            }
        }
    }
    if (allPlansUnpinched) {
        pinchTime = undefined;
    }
    if (pinchTime) {
        let targetMillis = pinchTime.getTime() + 3000;
        let currentMillis = new Date().getTime();
        if (currentMillis > targetMillis) {
            state = `stick`;
        }
    }
}

function drawLove() {
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

function drawPriority() {
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

function drawStick() {
    // stick state
    background(138, 188, 215);
    push();
    textSize(35);
    fill(230, 226, 186);
    textAlign(CENTER, CENTER);
    text(`If it wants to go,\n let it go,\n you deserve more than to wait for someone\n that is trying to run.`, width / 2, height / 2);
    pop();

    push();
    textSize(17);
    fill(87, 161, 181);
    textAlign(CENTER, CENTER);
    text(`(Press the Right Arrow Key to Go Back to the Title)`, width / 2, 300);
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
    // When the plan is being pinched the plan will stop and change colour
    let d = dist(pinchLocation[0], pinchLocation[1], plan.x, plan.y);
    if (pinchAmount < 100 && d < 20) {
        fill(255, 0, 0);
        plan.maxSpeed = 0;
    } else {
        fill(226, 177, 100);
        plan.maxSpeed = 1;
    }
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
        hearts[i] = createHeart(random(10, width - 10), random(10, height - 10));
    }

    // Calling the plans array again
    plans = [];
    // Make plans have random positions
    for (let i = 0; i < plansSize; i++) {
        plans[i] = createPlan(random(10, width - 10), random(10, height - 10));
    }
}

function clearTips() {
    // Restarting the tips of the fingers each time the simulation restarts
    tipX = [];
    tipY = [];
}

// Calls the keyPressed function to work with all the switching states from title to simulation
function keyPressed() {
    // Pressing the right arrow to activate and reset the title
    if (keyCode === 39) {
        if (state === `title`) {
            state = `simulation`;
        }
        else if (state === `stick`) {
            reset();
            state = `title`;
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
