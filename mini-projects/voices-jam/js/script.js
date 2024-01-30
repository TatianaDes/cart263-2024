/**
Say Please
Tatiana Désormeaux

This is a portotype of a program about the importance of being kind towards all objects including AI because the last thing we want is if AI gains its own awareness, they will come after the unkind human beings that did not say their pleases and thank yous.
*/

"use strict";


const animals = [
    "aardvark",
    "alligator",
    "alpaca",
    "antelope",
    "ape",
    "armadillo",
    "baboon",
    "badger",
    "bat",
    "bear",
    "beaver",
    "bison",
    "boar",
    "buffalo",
    "bull",
    "camel",
    "canary",
    "capybara",
    "cat",
    "chameleon",
    "cheetah",
    "chimpanzee",
    "chinchilla",
    "chipmunk",
    "cougar",
    "cow",
    "coyote",
    "crocodile",
    "crow",
    "deer",
    "dingo",
    "dog",
    "donkey",
    "dromedary",
    "elephant",
    "elk",
    "ewe",
    "ferret",
    "finch",
    "fish",
    "fox",
    "frog",
    "gazelle",
    "gila monster",
    "giraffe",
    "gnu",
    "goat",
    "gopher",
    "gorilla",
    "grizzly bear",
    "ground hog",
    "guinea pig",
    "hamster",
    "hedgehog",
    "hippopotamus",
    "hog",
    "horse",
    "hyena",
    "ibex",
    "iguana",
    "impala",
    "jackal",
    "jaguar",
    "kangaroo",
    "koala",
    "lamb",
    "lemur",
    "leopard",
    "lion",
    "lizard",
    "llama",
    "lynx",
    "mandrill",
    "marmoset",
    "mink",
    "mole",
    "mongoose",
    "monkey",
    "moose",
    "mountain goat",
    "mouse",
    "mule",
    "muskrat",
    "mustang",
    "mynah bird",
    "newt",
    "ocelot",
    "opossum",
    "orangutan",
    "oryx",
    "otter",
    "ox",
    "panda",
    "panther",
    "parakeet",
    "parrot",
    "pig",
    "platypus",
    "polar bear",
    "porcupine",
    "porpoise",
    "prairie dog",
    "puma",
    "rabbit",
    "raccoon",
    "ram",
    "rat",
    "reindeer",
    "reptile",
    "rhinoceros",
    "salamander",
    "seal",
    "sheep",
    "shrew",
    "silver fox",
    "skunk",
    "sloth",
    "snake",
    "squirrel",
    "tapir",
    "tiger",
    "toad",
    "turtle",
    "walrus",
    "warthog",
    "weasel",
    "whale",
    "wildcat",
    "wolf",
    "wolverine",
    "wombat",
    "woodchuck",
    "yak",
    "zebra"
];

const QUESTION_DELAY = 2000; // in milliseconds

// The current answer to display (we use it initially to display the click instruction)
let currentAnswer = `Click to begin.`;
// The current animal name the user is trying to guess
let currentAnimal = ``;

// The speech synthesizer
const speechSynthesizer = new p5.Speech();
// The speech recognizer
const speechRecognizer = new p5.SpeechRec();

/**
Create a canvas
Set up annyang with the guessing command
Set text defaults
*/
function setup() {
    createCanvas(windowWidth, windowHeight);

    // Set up the recognizer
    // Make it listen continuously. Not ideal but necessary.
    speechRecognizer.continuous = true;
    // Tell it the function to call on a result
    speechRecognizer.onResult = handleVoiceInput;
    // Start it
    speechRecognizer.start();

    // Text defaults
    textSize(102);
    textStyle(BOLD);
    textAlign(CENTER);
}


/**
Display the current answer.
 */
function draw() {
    background(0);

    displayAnswer();
}

/**
Display the current answer in red if incorrect and green if correct
(Displays nothing if no guess entered yet)
*/
function displayAnswer() {
    if (currentAnswer === currentAnimal) {
        fill(0, 255, 0);
    }
    else {
        fill(255, 0, 0);
    }
    text(currentAnswer, width / 2, height / 2);
}

/**
Reverse the animal name and say it with the synthesizer
*/
function sayAnimalBackwards(animal) {
    let reverseAnimal = reverseString(animal);
    speechSynthesizer.speak(reverseAnimal);
}

/**
Reverses the provided string
*/
function reverseString(string) {
    // Split the string into an array of characters
    let characters = string.split('');
    // Reverse the array of characters
    let reverseCharacters = characters.reverse();
    // Join the array of characters back into a string
    let result = reverseCharacters.join('');
    // Return the result
    return result;
}

/**
Called by the recognizer when the user make a guess.
Sets the answer text to the guess.
*/
function handleVoiceInput() {
    // Set a default that works if we don't get a useful input
    let guessedAnimal = `what??`;
    // Make sure there is a result
    if (speechRecognizer.resultValue) {
        // We're going to use split() to break what the user said into two parts
        // The part *before* they say "I think it is" and the part *after* they say it
        // The *after* part should be their guessed animal...
        let parts = speechRecognizer.resultString.toLowerCase().split(`i think it is `);
        if (parts.length > 1) {
            guessedAnimal = parts[1];
        }
    }
    // Convert the guess to lowercase to match the answer format
    currentAnswer = guessedAnimal;
}

/**
Reset the answer text, get a new random animal, say its name
*/
function nextQuestion() {
    currentAnswer = ``;
    currentAnimal = random(animals);
    sayAnimalBackwards(currentAnimal);
}

/**
When the user clicks, go to the next question
*/
function mousePressed() {
    nextQuestion();
}

// let currentAnimal = ``;
// let currentAnswer = ``;

// const speechSynthesizer = new p5.Speech();
// const speechRecognizer = new p5.SpeechRec();

// let state = `title`; // Can be: title, simulation

// // preload() creates the images I wish to put in my program
// function preload() {

// }

// // setup() creates the canvas and the new classes
// function setup() {
//     createCanvas(500, 500);

//     speechRecognizer.continuous = true;
//     speechRecognizer.onResult = handleSpeechInput;
//     speechRecognizer.start();
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

//     if (currentAnswer === currentAnimal) {
//         console.log(`Correct.`);
//         fill(50, 200, 50);
//     }
//     else {
//         console.log(`Incorrect.`);
//         fill(200, 50, 50);
//     }
//     textSize(32);
//     textAlign(CENTER, CENTER);
//     text(currentAnswer, width / 2, height / 2);
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

// function handleSpeechInput() {
//     let guessedAnimal = `What???`;
//     if (speechRecognizer.resultValue) {
//         let lowerCaseResult = speechRecognizer.resultString.toLowerCase();
//         let parts = lowerCaseResult.split(`i think it is `);
//         if (parts.length > 1) {
//             guessedAnimal = parts[1];
//         }
//     }
//     currentAnswer = guessedAnimal;
//     console.log(currentAnswer);
// }

// function mousePressed() {
//     currentAnimal = random(animals);
//     let reverseAnimal = reverseString(currentAnimal);
//     speechSynthesizer.speak(reverseAnimal);
// }

// function reverseString(string) {
//     // Split the string into an array of characters
//     let characters = string.split(``);
//     // Reverse the array of characters
//     let reverseCharacters = characters.reverse();
//     // Join the array of characters back into a string
//     let result = reverseCharacters.join(``);
//     // Return the result
//     return result;
// }

// // Calls the keyPressed function to work
// function keyPressed() {
//     if (state === `title`) {
//         state = `simulation`;
//     }
// }
