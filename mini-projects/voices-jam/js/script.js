/**
Say Please
Tatiana Désormeaux

This is a portotype of a program about the importance of being kind towards all objects including AI because the last thing we want is if AI gains its own awareness, they will come after the unkind human beings that did not say their pleases and thank yous.
*/

"use strict";

let state = `title`; // Can be: title, simulation

/**
 * Description of preload
*/
function preload() {

}

function setup() {
    createCanvas(500, 500);

}


function draw() {
    background(253, 222, 247);

    // Setting up all the different states
    if (state === `title`) {
        title();
    }
    else if (state === `simulation`) {
        simulation();
    }
}

function title() {
    // Title state
    push();
    textSize(50);
    fill(247, 130, 189);
    textAlign(CENTER, CENTER);
    text(`Say Please`, width / 2, height / 2);
    pop();

    push();
    textSize(17);
    fill(206, 90, 130);
    textAlign(CENTER, CENTER);
    text(`(Please press the Space Bar to Start)`, width / 2, 300);
    pop();

    push();
    textSize(15);
    fill(197, 62, 93);
    text(`Please use your microphone to speak to the computer`, 120, 470);
    pop();
}

function simulation() {
    // Simulation state

}

// Calls the keyPressed function to work
function keyPressed() {
    if (state === `title`) {
        state = `simulation`;
    }
}
