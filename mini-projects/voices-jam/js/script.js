/**
Say Please
Tatiana Désormeaux

This is a portotype of a program about the importance of being kind towards all objects including AI because the last thing we want is if AI gains its own awareness, they will come after the unkind human beings that did not say their pleases and thank yous.
*/

"use strict";

const commands = [
    {
        "command": /set the text to (.*)/,
        "callback": setText
    },
    {
        "command": /set the red value to (.*)/,
        "callback": setRed
    },
    {
        "command": /set the text color to (.*) gray/,
        "callback": setTextColor
    },
    {
        "command": /set the background to (\d+) (\d+) (\d+)/,
        "callback": setBackground
    }
];

const voiceRecognizer = new p5.SpeechRec();

let displayText = `...`;
let bgColor = {
    r: 0,
    g: 0,
    b: 0
};
let textColor = 255;

function setup() {
    createCanvas(400, 400);

    voiceRecognizer.continuous = true;
    voiceRecognizer.onResult = handleCommand;
    voiceRecognizer.start();
}

function draw() {
    background(bgColor.r, bgColor.g, bgColor.b);

    push()
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(textColor);
    text(displayText, width / 2, height / 2);
    pop();
}

function handleCommand() {
    if (!voiceRecognizer.resultValue) {
        return;
    }

    for (let command of commands) {
        let lowercase = voiceRecognizer.resultString.toLowerCase();
        let match = lowercase.match(command.command);
        console.log(match);
        if (match && match.length > 1) {
            command.callback(match);
        }
    }
}

function setText(data) {
    displayText = data[1];
}

function setRed(data) {
    bgColor.r = parseInt(data[1]);
}

function setTextColor(data) {
    textColor = parseInt(data[1]);
}

function setBackground(data) {
    if (data.length > 3) {
        bgColor.r = parseInt(data[1]);
        bgColor.g = parseInt(data[2]);
        bgColor.b = parseInt(data[3]);
    }
}

// let state = `title`; // Can be: title, simulation

// // preload() creates the images I wish to put in my program
// function preload() {

// }

// // setup() creates the canvas and the new classes
// function setup() {
//     createCanvas(500, 500);

// }

// // draw() displays all the different states and their functions
// function draw() {
//     background(253, 222, 247);

//     // Setting up all the different states
//     if (state === `title`) {
//         title();
//     }
//     else if (state === `simulation`) {
//         simulation();
//     }

// }

// function title() {
//     // Title state
//     push();
//     textSize(50);
//     fill(247, 130, 189);
//     textAlign(CENTER, CENTER);
//     text(`Say Please`, width / 2, height / 2);
//     pop();

//     push();
//     textSize(17);
//     fill(206, 90, 130);
//     textAlign(CENTER, CENTER);
//     text(`(Please press the Space Bar to Start)`, width / 2, 300);
//     pop();

//     push();
//     textSize(15);
//     fill(197, 62, 93);
//     text(`Please use your microphone to speak to the computer`, 300, 470);
//     pop();
// }


// function simulation() {
//     // Simulation state
//     handleSpeechInput();
//     mousePressed();
//     reverseString(string);
// }

// // Calls the keyPressed function to work
// function keyPressed() {
//     if (state === `title`) {
//         state = `simulation`;
//     }
// }
