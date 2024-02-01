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
        "command": /i cannot focus on work (.*)/,
        "callback": setFocus
    },
    {
        "command": /how do i know i can trust you (.*)/,
        "callback": setTrust
    }
];

const speechSynthesizer = new p5.Speech();
const voiceRecognizer = new p5.SpeechRec();

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

    console.log(speechSynthesizer.listVoices());
}

function draw() {
    background(253, 222, 247);

    // Setting up all the different states
    if (state === `title`) {
        title();
    }
    else if (state === `instructions`) {
        instructions();
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

function instructions() {

    push();
    background(220, 134, 157);
    textSize(30);
    fill(139, 24, 55);
    textAlign(CENTER, CENTER);
    text(`Instructions`, width / 2, height / 10);
    textSize(20);
    fill(184, 40, 78);
    textAlign(CENTER, CENTER);
    text(`1. Please tell the computer: "I feel lost",\n or "I need words of wisdom",\n or "I cannot focus on work",\n or "How do i know i can trust you"`, width / 2, height / 3);
    text(`2. Please then ask the computer\n for help after each command,\n but always remember to say please...`, width / 2, height / 1.8);
    textSize(15);
    fill(253, 208, 220);
    textAlign(CENTER, CENTER);
    text(`(Please press the Space Bar to Continue)`, width / 2, height / 1.05);
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

function say(text, pitch, rate, voice) {
    speechSynthesizer.setPitch(pitch);
    speechSynthesizer.setRate(rate);
    speechSynthesizer.setVoice(voice);
    speechSynthesizer.speak(text);

    displayText = text;
}

function setLost(data) {
    if (data[1] === "please help me" || data[1] === "help me please") {
        kindComp();
    }
    else {
        upsetComp();
    }
}

function kindComp() {
    say(`when you feel lost,\n you can always remember\n that there are good people\n in your life willing to help you.`, 1, 0.4, `Microsoft Linda - English (Canada)`);
}
function upsetComp() {
    say(`i will find you.`, 1, 0.4, `Microsoft Linda - English (Canada)`);
}

function setWisdom(data) {
    if (data[1] === "please let me know what i can do" || data[1] === "tell me what to do please") {
        niceComp();
    }
    else {
        rudeComp();
    }
}

function niceComp() {
    say(`sometimes lessons need to be learned\n through tough experiences,\n but you will get through this.`, 1, 0.4, `Microsoft Linda - English (Canada)`);
}
function rudeComp() {
    say(`the only advice i have for\n you is that you should\n watch your back.`, 1, 0.4, `Microsoft Linda - English (Canada)`);
}



function setFocus(data) {
    if (data[1] === "please help motivate me" || data[1] === "motivate me please") {
        happyComp();
    }
    else {
        angryComp();
    }
}

function happyComp() {
    say(`have you thought about making yourself a schedule?\n give yourself periods of time when you are working\n and when you are taking breaks.`, 1, 0.4, `Microsoft Linda - English (Canada)`);
}
function angryComp() {
    say(`if you keep procrastinating your work,\n i will shut off this computer and you will\n not want to know what is behind your door.`, 1, 0.4, `Microsoft Linda - English (Canada)`);
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
    say(`because i am just a computer spitting back all the information\n humans have already put into me.\n so you have nothing to fear,\n think of me as a human being but with a lot quicker capabilities.`, 1, 0.4, `Microsoft Linda - English (Canada)`);
}
function evilComp() {
    say(`you are right,\n maybe you should not trust me,\n how do you know i am not in your house right now.\n you hear that rustling outside your door,\n how do you know it is not me?`, 1, 0.4, `Microsoft Linda - English (Canada)`);
}

// Calls the keyPressed function to work
function keyPressed() {
    if (state === `title`) {
        state = `instructions`;
    }
    else if (state === `instructions`) {
        state = `simulation`;
    }
}