/**
Hard to Move On Prototype
Tatiana Désormeaux

A program using Phaser 3 code to help create a story about trying to move on from someone but recognizing the difficulty of it. It is about patience and effort that takes someone to be able to move forward in the first place even though the idea of going back feels so much easier but comes with so many more complications.
*/

"use strict";

// Creates the call for the Phaser 3 library and gives the rundown of the canvas size and what kind of physics will be used.
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: `arcade`
    },
    scene: [Boot, Title, Play, Why, Growing, Patience]
};

// Creates the new Phaser 3 game with the Phaser 3 library.
let game = new Phaser.Game(config);