/**
Show Me Some Love
Tatiana Désormeaux

A program where winking and blowing a kiss can do something (I do not know yet, idea in the making)
*/

"use strict";

// Current state of program
let state = `loading`; // loading, running
// User's webcam
let video;
// The name of our model
let modelName = `Handpose`;
// Handpose object (using the name of the model for clarity)
let handpose;


// preload() is used to load images and files outside from the program into the program
function preload() {

}

// setup() is used to set up all the main functions that happen continuously throughout the program
function setup() {
    createCanvas(640, 480);

    // Start webcam and hide the resulting HTML element
    video = createCapture(VIDEO);
    video.hide();

    // Start the Handpose model and switch to our running state when it loads
    handpose = ml5.handpose(video, {
        flipHorizontal: true
    }, function () {
        // Switch to the running state
        state = `running`;
    });
}


// draw() is used to create the visuals and call the variables
function draw() {
    // background(0);
    if (state === `loading`) {
        loading();
    }
    else if (state === `running`) {
        running();
    }
}

/**
Displays a simple loading screen with the loading model's name
*/
function loading() {
    background(152, 9, 9);

    push();
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(255, 185, 209);
    text(`Loading Show Me Some Love...`, width / 2, height / 2);
    pop();

    push();
    textSize(15);
    textAlign(CENTER, CENTER);
    fill(249, 149, 162);
    text(`Wink or blow a kiss at the webcam and see what happens...`, width / 1.55, height / 1.07);
    pop();
}

/**
Displays the webcam.
If there is a hand it outlines it and highlights the tip of the index finger
*/
function running() {
    // Display the webcam with reveresd image so it's a mirror
    let flippedVideo = ml5.flipImage(video);
    image(flippedVideo, 0, 0, width, height);
}
