/**
Say Please
Tatiana Désormeaux

This is a portotype of a program about the importance of being kind towards all objects including AI because the last thing we want is if AI gains its own awareness, they will come after the unkind human beings that did not say their pleases and thank yous.
*/

"use strict";

// Set the starting state
let state = `title`; // Can be: title, simulation

// Create the commands needed for the computer to understand your request
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

// Allowing a your voice to be recognized by the computer and having the computer respond to you by constants
const speechSynthesizer = new p5.Speech();
const voiceRecognizer = new p5.SpeechRec();

// Displaying the initial text and colour of the text before the subtitles come on from the computer
let displayText = `...`;
let textColor = `#75344f`;


let bgColor = `#c8668a`;
let sizingText = 48;

// let wrappingText = textWrap(WORD);


// setup() creates the canvas and the microphone being able to be turned on as well as picked up on by the console
function setup() {
    createCanvas(500, 500);

    voiceRecognizer.continuous = true;
    voiceRecognizer.onResult = handleCommand;
    voiceRecognizer.start();

    speechSynthesizer.onEnd = resetDisplayText;

    console.log(speechSynthesizer.listVoices());
}

// draw() displays all the different states and their functions
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

// Allows a title state to be displayed with all its properties
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
    text(`(Please press the Right Arrow Kry to Start)`, width / 2, 300);
    pop();

    push();
    textSize(15);
    fill(197, 62, 93);
    text(`Please use your microphone to speak to the computer`, width / 4, 470);
    pop();
}

// Creates the simulation state that calls the display text variable at the top with its text colour
function simulation() {
    // Simulation state
    push();
    background(bgColor);
    textAlign(CENTER, CENTER);
    textSize(sizingText);
    fill(textColor);
    rectMode(CENTER);
    text(displayText, width / 2, height / 2, width / 1.5);
    pop();
}

// Creates a state where the instructions to the program are displayed 
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
    text(`(Please press the Right Arrow Key to Continue)`, width / 2, height / 1.05);
    pop();

}

function resetDisplayText() {
    displayText = `...`;
    textColor = `#75344f`;
    bgColor = `#c8668a`;
    sizingText = 48;
}

// Allows for the computer to recognize the voice speaking and listen for the commands, then once it matches it finds the callback
function handleCommand() {
    if (!voiceRecognizer.resultValue || state !== `simulation`) {
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

// Creates a function that allows the text, pitch, rate, and voice to be chosen differently on each section that calls this function
function say(text, pitch, rate, voice) {
    speechSynthesizer.setPitch(pitch);
    speechSynthesizer.setRate(rate);
    speechSynthesizer.setVoice(voice);
    speechSynthesizer.speak(text);

    displayText = text;
}


// Creates the first callback for the lost command and sends the computer through two routes based on responses
function setLost(data) {
    if (data[1] === "please help me" || data[1] === "help me please") {
        kindComp();
    }
    else {
        upsetComp();
    }
}

// Creates a response from the compter that is kind if the callback matched with the right lost data
function kindComp() {
    push();
    bgColor = color(105, 143, 46);
    textColor = color(32, 83, 52);
    sizingText = (30);
    // wrappingText = textWrap(WORD);
    say(`when you feel lost, you can always remember that there are good people in your life willing to help you.`, 1, 1, `Microsoft Linda - English (Canada)`);
    pop();
}
// Creates a response from the computer that is upset if the callback does not match with the right lost data
function upsetComp() {
    // push();
    // bgColor = color(174, 57, 57);
    // textColor = color(112, 45, 45);
    // sizingText = (10);
    // text(`say "please help me" or "help me please"..... or else`, 200, 200);
    // pop();
    push();
    bgColor = color(144, 144, 144);
    textColor = color(83, 83, 83);
    sizingText = (48);
    say(`i will find you.`, 0.2, 0.4, `Google UK English Male`);
    pop();
}


// Creates the second callback for the wisdom command and sends the computer through two routes based on responses
function setWisdom(data) {
    if (data[1] === "please let me know what i can do" || data[1] === "tell me what to do please") {
        niceComp();
    }
    else {
        rudeComp();
    }
}

// Creates a response from the compter that is nice if the callback matched with the right wisdom data
function niceComp() {
    push();
    bgColor = color(92, 148, 76);
    textColor = color(139, 217, 159);
    sizingText = (30);
    say(`sometimes lessons need\n to be learned through\n tough experiences,\n but you will get through this.`, 4, 1.5, `Microsoft David - English (United States)`);
    pop();
}
// Creates a response from the computer that is rude if the callback does not match with the right wisdom data
function rudeComp() {
    // push();
    // bgColor = color(174, 57, 57);
    // textColor = color(112, 45, 45);
    // sizingText = (10);
    // text(`you are going to say "please let me know what i can do" or "tell me what to do please" or we will find a way into your home`, 200, 200);
    // pop();
    push();
    bgColor = color(95, 95, 95);
    textColor = color(48, 113, 110);
    sizingText = (30);
    say(`the only advice i have for\n you is that you should\n watch your back.`, 0.1, 0.4, `Google UK English Female`);
    pop();
}


// Creates the third callback for the focus command and sends the computer through two routes based on responses
function setFocus(data) {
    if (data[1] === "please help motivate me" || data[1] === "motivate me please") {
        happyComp();
    }
    else {
        angryComp();
    }
}

// Creates a response from the compter that is happy if the callback matched with the right focus data
function happyComp() {
    push();
    bgColor = color(42, 99, 55);
    textColor = color(115, 185, 132);
    sizingText = (30);
    say(`have you thought about\n making yourself a schedule?\n give yourself periods of time when\n you are working and when you\n are taking breaks.`, 5, 1, `Microsoft Zira - English (United States)`);
    pop();
}
// Creates a response from the computer that is angry if the callback does not match with the right focus data
function angryComp() {
    // push();
    // bgColor = color(174, 57, 57);
    // textColor = color(112, 45, 45);
    // sizingText = (10);
    // text(`don't you dare not say "please help motivate me" or "motivate me please" or we will not let you leave this computer safe`, 200, 200);
    // pop();
    push();
    bgColor = color(54, 75, 77);
    textColor = color(70, 109, 113);
    sizingText = (30);
    say(`if you keep procrastinating\n your work, i will shut off this\n computer and you will not\n want to know what is\n behind your door.`, 0.1, 0.4, `Microsoft Richard - English (Canada)`);
    pop();
}


// Creates the fourth callback for the trust command and sends the computer through two routes based on responses
function setTrust(data) {
    if (data[1] === "please prove it to me" || data[1] === "prove it to me please") {
        goodComp();
    }
    else {
        evilComp();
    }
}

// Creates a response from the compter that is good if the callback matched with the right trust data
function goodComp() {
    push();
    bgColor = color(192, 224, 179);
    textColor = color(79, 146, 53);
    sizingText = (30);
    say(`because i am just a computer\n spitting back all the information\n humans have already put into me.\n so you have nothing to fear,\n think of me as a human being but\n with a lot quicker capabilities.`, 5, 0.8, `Microsoft Mark - English (United States)`);
    pop();
}
// Creates a response from the computer that is evil if the callback does not match with the right trust data
function evilComp() {
    // push();
    // bgColor = color(174, 57, 57);
    // textColor = color(112, 45, 45);
    // sizingText = (10);
    // text(`don't you dare not say "please help motivate me" or "motivate me please" or we will not let you leave this computer safe`, 200, 200);
    // pop();
    push();
    bgColor = color(0, 0, 0);
    textColor = color(157, 0, 0);
    sizingText = (30);
    say(`you are right,\n maybe you should not trust me,\n how do you know i am not in your \n house right now.`, 0.1, 0.3, `Google UK English Male`);
    pop();
}

// Computer stops talking outloud when the rest of this sentence is added to the evilComp() and I do not know why.
//\n you hear that rustling outside your door,\n how do you know it is not me?


// Calls the keyPressed function to work with all the switching states from title to instructions to simulation
function keyPressed() {
    if (keyCode === 39) {
        if (state === `title`) {
            state = `instructions`;
        }
        else if (state === `instructions`) {
            state = `simulation`;
        }
    }

    if (keyCode === 37) {
        if (state === `simulation`) {
            state = `instructions`;
        }
    }
}