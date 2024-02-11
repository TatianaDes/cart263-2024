/**
Show Me Some Love
Tatiana Désormeaux

A program where winking and blowing a kiss can do something (I do not know yet, idea in the making)
*/

"use strict";

// The user's webcam
let video = undefined;

// The Handpose model
let handpose = undefined;

// The current set of predictions
let predictions = [];

// preload() is used to add images and files that need to be loaded within the program
function preload() {

}


// setup() is used to set up all the main functions that happen continuously throughout the program
function setup() {
    createCanvas(600, 600);

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
}


// draw() is used to create the visuals and call the variables
function draw() {
    background(0);
}