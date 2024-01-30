/**
Say Please
Tatiana Désormeaux

This is a portotype of a program about the importance of being kind towards all objects including AI because the last thing we want is if AI gains its own awareness, they will come after the unkind human beings that did not say their pleases and thank yous.
*/

"use strict";

// Stating the currentState variable
let currentState;

// preload() creates the images I wish to put in my program
function preload() {

}

// setup() creates the canvas and the new classes
function setup() {
    createCanvas(500, 500);

    // Stating what class should be called when starting the program
    currentState = new Title();

    // Text settings
    textSize(32);
    textAlign(CENTER, CENTER);

}

// draw() displays all the different states and their functions
function draw() {

    // Drawing the current state
    currentState.draw();
}

// Calls the mousePressed function to work
function mousePressed() {
    // Allows all mousePressed functions to work in the program
    currentState.mousePressed();
}

// Calls the keyPressed function to work
function keyPressed() {
    // Allows all keyPressed functions to work in the program
    currentState.keyPressed(keyCode);
}

// Calls the keyReleased function to work
function keyReleased() {
    // Allows all keyReleased functions to work in the program
    currentState.keyReleased(keyCode);
}