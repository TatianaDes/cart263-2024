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
        "command": /i feel lost.*/,
        "callback": setLost
    },
    {
        "command": /i need words of wisdom.*/,
        "callback": setWisdom
    },
    {
        "command": /i cannot focus on work.*/,
        "callback": setFocus
    },
    {
        "command": /how do i know i can trust you.*/,
        "callback": setTrust
    }
];

// Allowing a your voice to be recognized by the computer and having the computer respond to you by constants
const speechSynthesizer = new p5.Speech();
const voiceRecognizer = new p5.SpeechRec();

// Creating the initial text and colour of the text before the subtitles come on from the computer
let displayText = `...`;
let textColor = `#75344f`;

// Creating the initial settings for the simulation of the background colour and text sizing
let bgColor = `#c8668a`;
let sizingText = 48;

// Creating the counter for the total pleases and the display of it
let totalPleases = 0;
let counterColor = 255;
let counterSize = 30;

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

    push();
    textAlign(CENTER, CENTER);
    textSize(counterSize);
    fill(counterColor);
    rectMode(CENTER);
    text(totalPleases, width / 10, height / 10);
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
    text(`1. Please tell the computer: "I feel lost",\n or "I need words of wisdom",\n or "I cannot focus on work",\n or "How do i know i can trust you".`, width / 2, height / 3);
    text(`2. Please then ask the computer\n anything you want \n but always remember to say please...`, width / 2, height / 1.8);
    text(`3. If you want to go back to\n the instructions at any time\n just press the left arrow key.`, width / 2, height / 1.32);
    textSize(15);
    fill(253, 208, 220);
    textAlign(CENTER, CENTER);
    text(`(Please press the Right Arrow Key to Continue)`, width / 2, height / 1.05);
    pop();

}

// Creating a function that allows the simulation state to restart its background and text when the computer finishes talking
function resetDisplayText() {
    displayText = `...`;

    textColor = `#75344f`;
    bgColor = `#c8668a`;
    sizingText = 48;
}

// Allows for the computer to recognize the voice speaking and listen for the commands, then once it matches it finds the callback
function handleCommand() {
    if (!voiceRecognizer.resultValue) {
        return;
    }

    let lowercase = voiceRecognizer.resultString.toLowerCase();

    for (let command of commands) {
        let match = lowercase.match(command.command);
        if (match) {
            // We have a match, execute the corresponding callback
            command.callback(lowercase);
            break;
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
function setLost(text) {
    const pleases = pleaseCounter(text);
    totalPleases += pleases;
    if (pleases === 0) {
        upsetComp();
    }
    else if (pleases === 1) {
        kindComp();
    }
}

// Creates a response from the compter that is kind if the callback matched with the right lost data
function kindComp() {
    push();
    bgColor = color(105, 143, 46);
    textColor = color(32, 83, 52);
    sizingText = (30);
    say(`when you feel lost, you can always remember that there are good people in your life willing to help you.`, 1, 1, `Microsoft Linda - English (Canada)`);
    pop();
}
// Creates a response from the computer that is upset if the callback does not match with the right lost data
function upsetComp() {
    push();
    bgColor = color(144, 144, 144);
    textColor = color(83, 83, 83);
    sizingText = (30);
    say(`i will find you.`, 0.2, 0.4, `Google UK English Male`);
    pop();
}


// Creates the second callback for the wisdom command and sends the computer through two routes based on responses
function setWisdom(text) {
    const pleases = pleaseCounter(text);
    totalPleases += pleases;
    if (pleases === 0) {
        rudeComp();
    }
    else if (pleases === 3) {
        decentComp();
    }
    else if (pleases >= 5) {
        niceComp();
    }
}

// Creates a response from the compter that is nice if the callback matched with the right wisdom data
function niceComp() {
    push();
    bgColor = color(92, 148, 76);
    textColor = color(139, 217, 159);
    sizingText = (30);
    say(`sometimes lessons need to be learned through tough experiences, but you will get through this.`, 4, 1.5, `Microsoft David - English (United States)`);
    pop();
}

// Creates a response from the compter that is decent if the callback matched with the right wisdom data
function decentComp() {
    push();
    bgColor = color(92, 148, 76);
    textColor = color(139, 217, 159);
    sizingText = (30);
    say(`come onnnn, a little more...`, 4, 1.5, `Microsoft David - English (United States)`);
    pop();
}

// Creates a response from the computer that is rude if the callback does not match with the right wisdom data
function rudeComp() {
    push();
    bgColor = color(95, 95, 95);
    textColor = color(48, 113, 110);
    sizingText = (30);
    say(`the only advice i have for you is that you should watch your back.`, 0.1, 0.4, `Google UK English Female`);
    pop();
}


// Creates the third callback for the focus command and sends the computer through two routes based on responses
function setFocus(text) {
    const pleases = pleaseCounter(text);
    totalPleases += pleases;
    if (pleases === 0) {
        angryComp();
    }
    else if (pleases >= 5) {
        hmmmComp();
    }
    else if (pleases >= 15) {
        happyComp();
    }
}

// Creates a response from the compter that is happy if the callback matched with the right focus data
function happyComp() {
    push();
    bgColor = color(42, 99, 55);
    textColor = color(115, 185, 132);
    sizingText = (30);
    say(`have you thought about making yourself a schedule? give yourself periods of time when you are working and when you are taking breaks.`, 5, 1, `Microsoft Zira - English (United States)`);
    pop();
}

// Creates a response from the compter that is hmmm if the callback matched with the right focus data
function hmmmComp() {
    push();
    bgColor = color(42, 99, 55);
    textColor = color(115, 185, 132);
    sizingText = (30);
    say(`you really think that is enough, just spare me and count with your fingers...`, 5, 1, `Microsoft Zira - English (United States)`);
    pop();
}

// Creates a response from the computer that is angry if the callback does not match with the right focus data
function angryComp() {
    push();
    bgColor = color(54, 75, 77);
    textColor = color(70, 109, 113);
    sizingText = (30);
    say(`if you keep procrastinating your work, i will shut off this computer and you will not want to know what is behind your door.`, 0.1, 0.4, `Microsoft Richard - English (Canada)`);
    pop();
}


// Creates the fourth callback for the trust command and sends the computer through two routes based on responses
function setTrust(text) {
    const pleases = pleaseCounter(text);
    totalPleases += pleases;
    if (pleases === 0) {
        evilComp();
    }
    else if (pleases <= 10) {
        okayComp();
    }
    else if (pleases >= 20) {
        goodComp();
    }
}

// Creates a response from the compter that is good if the callback matched with the right trust data
function goodComp() {
    push();
    bgColor = color(192, 224, 179);
    textColor = color(79, 146, 53);
    sizingText = (30);
    say(`because i am just a computer spitting back all the information humans have already put into me. so you have nothing to fear, think of me as a human being but with a lot quicker capabilities.`, 5, 0.8, `Microsoft Mark - English (United States)`);
    pop();
}

// Creates a response from the compter that is okay if the callback matched with the right trust data
function okayComp() {
    push();
    bgColor = color(192, 224, 179);
    textColor = color(79, 146, 53);
    sizingText = (30);
    say(`do you really want an answer or are you just messing with me, truly convince me that you wish to have an answer.`, 5, 0.8, `Microsoft Mark - English (United States)`);
    pop();
}

// Creates a response from the computer that is evil if the callback does not match with the right trust data
function evilComp() {
    push();
    bgColor = color(0, 0, 0);
    textColor = color(157, 0, 0);
    sizingText = (30);
    say(`you are right, maybe you should not trust me,\n how do you know i am not in your house right now.`, 0.1, 0.3, `Google UK English Male`);
    pop();
}

// Counts how many pleases has been said and adds it to the counter
function pleaseCounter(text) {
    let words = text.split(` `);
    // Reads where in the sentence a please has been says so it can be counted
    let pleases = 0;
    for (let i = 0; i < words.length; i++) {
        if (words[i] === `please`) {
            pleases++;
        }
        // else if (pleaseCounter === 30) {
        //     specialComp
        // }
    }
    return pleases;
}

// function specialComp() {
//     push();
//     bgColor = color(192, 224, 179);
//     textColor = color(79, 146, 53);
//     sizingText = (30);
//     say(`because i am just a computer\n spitting back all the information\n humans have already put into me.\n so you have nothing to fear,\n think of me as a human being but\n with a lot quicker capabilities.`, 5, 0.8, `Microsoft Mark - English (United States)`);
//     pop();
// }

// Calls the keyPressed function to work with all the switching states from title to instructions to simulation
function keyPressed() {
    // Pressing the right arrow to activate
    if (keyCode === 39) {
        if (state === `title`) {
            state = `instructions`;
        }
        else if (state === `instructions`) {
            state = `simulation`;
        }
    }
    // Pressing the left arrow to activate
    if (keyCode === 37) {
        if (state === `simulation`) {
            state = `instructions`;
        }
    }
}