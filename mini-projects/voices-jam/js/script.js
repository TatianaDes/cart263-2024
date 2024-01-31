/**
Say Please
Tatiana Désormeaux

This is a portotype of a program about the importance of being kind towards all objects including AI because the last thing we want is if AI gains its own awareness, they will come after the unkind human beings that did not say their pleases and thank yous.
*/

"use strict";

let state = `title`; // Can be: title, simulation

const commands = [
    {
        "command": /i feel lost (.*)/,
        "callback": setLost
    },
    {
        "command": /i need words of wisdom (.*)/,
        "callback": setWisdom
    },
    {
        "command": /i keep procrastinating my work (.*)/,
        "callback": setProcrastinating
    },
    {
        "command": /how do i know i can trust you (.*)/,
        "callback": setTrust
    }
];

const speechSynthesizer = new p5.Speech();
const voiceRecognizer = new p5.SpeechRec();

let showSubtitle = false;

// kindComp();
let toSay = `when you feel lost, you can always remember that there are good people in your life willing to help you.`;
// upsetComp();
let toSay2 = `i will find you.`;

// niceComp();
let toSay3 = `sometimes lessons need to be learned through tough experiences, but you will get through this.`;
// rudeComp();
let toSay4 = `the only advice i have for you is that you should watch your back.`;

// happyComp();
let toSay5 = `have you thought about making yourself a schedule? give yourself periods of time when you are working and when you are taking breaks.`;
// angryComp();
let toSay6 = `if you keep procrastinating your work, i will shut off this computer and you will not want to know what is behind your door.`;

// goodComp();
let toSay7 = `because i am just a computer spitting back all the information humans have already put into me. so you have nothing to fear, think of me as a human being but with a lot quicker capabilities.`;
// evilComp();
let toSay8 = `you are right, maybe you should not trust me, how do you know i am not in your house right now. you hear that rustling outside your door, how do you know it is not me?`;

let displayText = `...`;
let bgColor = {
    r: 0,
    g: 0,
    b: 0
};
let textColor = 255;

function setup() {
    createCanvas(500, 500);

    voiceRecognizer.continuous = true;
    voiceRecognizer.onResult = handleCommand;
    voiceRecognizer.start();

    speechSynthesizer.onStart = () => {
        showSubtitle = true;
    };
    speechSynthesizer.onEnd = () => {
        showSubtitle = false;
    };

    console.log(speechSynthesizer.listVoices());
}

function draw() {
    background(253, 222, 247);

    // Setting up all the different states
    if (state === `title`) {
        title();
    }
    else if (state === `simulation`) {
        simulation();
    };
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
    text(`Please use your microphone to speak to the computer`, width / 4, 470);
    pop();
}


function simulation() {
    // Simulation state
    background(231, 107, 140);

    push()
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(textColor);
    text(displayText, width / 2, height / 2);
    pop();
}

// Calls the keyPressed function to work
function keyPressed() {
    if (state === `title`) {
        state = `simulation`;
    }
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

function setLost(data) {
    if (data[1] === "please help me." || data[1] === "help me please.") {
        kindComp();
    }
    else {
        upsetComp();
    }
}

function kindComp() {
    // computer answers of course I will help you!
    // Say something!
    speechSynthesizer.setPitch(1);
    speechSynthesizer.setRate(1);
    speechSynthesizer.setVoice(`Microsoft Linda - English (Canada)`);
    speechSynthesizer.speak(toSay);
}
function upsetComp() {
    // computer doesn't help
    // Synthesis settings
    speechSynthesizer.setPitch(0.2);
    speechSynthesizer.setRate(0.5);
    speechSynthesizer.setVoice(`Google UK English Male`);
    speechSynthesizer.speak(toSay2);
}

function setWisdom(data) {
    if (data[1] === "please let me know what i can do." || data[1] === "tell me what to do please.") {
        niceComp();
    }
    else {
        rudeComp();
    }
}

function niceComp() {
    // computer answers of course I will help you!
    // Say something!
    speechSynthesizer.setPitch(1);
    speechSynthesizer.setRate(1);
    speechSynthesizer.setVoice(`Microsoft Linda - English (Canada)`);
    speechSynthesizer.speak(toSay3);
}
function rudeComp() {
    // computer doesn't help
    // Synthesis settings
    speechSynthesizer.setPitch(1);
    speechSynthesizer.setRate(1);
    speechSynthesizer.setVoice(`Microsoft Linda - English (Canada)`);
    speechSynthesizer.speak(toSay4);
}



function setProcrastinating(data) {
    if (data[1] === "please give me advice on how to get motivated." || data[1] === "motivate me please.") {
        happyComp();
    }
    else {
        angryComp();
    }
}

function happyComp() {
    // computer answers of course I will help you!
    // Say something!
    speechSynthesizer.setPitch(1);
    speechSynthesizer.setRate(1);
    speechSynthesizer.setVoice(`Microsoft Linda - English (Canada)`);
    speechSynthesizer.speak(toSay5);
}
function angryComp() {
    // computer doesn't help
    speechSynthesizer.setPitch(1);
    speechSynthesizer.setRate(1);
    speechSynthesizer.setVoice(`Microsoft Linda - English (Canada)`);
    speechSynthesizer.speak(toSay6);
}

function setTrust(data) {
    if (data[1] === "please prove it to me" || data[1] === "prove it to me please") {
        goodComp();
    }
    else {
        evilComp();
    }
}

function goodComp() {
    // computer answers of course I will help you!
    // Say something!
    speechSynthesizer.setPitch(1);
    speechSynthesizer.setRate(1);
    speechSynthesizer.setVoice(`Microsoft Linda - English (Canada)`);
    speechSynthesizer.speak(toSay7);
}
function evilComp() {
    // computer doesn't help
    speechSynthesizer.setPitch(1);
    speechSynthesizer.setRate(1);
    speechSynthesizer.setVoice(`Microsoft Linda - English (Canada)`);
    speechSynthesizer.speak(toSay8);
}

function speechStarted() {
    showSubtitle = true;
}

function speechEnded() {
    showSubtitle = false;
}
