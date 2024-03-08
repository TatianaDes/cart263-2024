/**
Hard to Move On
Tatiana Désormeaux

A program using Phaser 3 code to help create a story about trying to move on from someone but recognizing the difficulty of it.
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
    scene: [Title, Boot, Play, Why, Growing]
};

// Creates the new Phaser 3 game with the Phaser 3 library.
let game = new Phaser.Game(config);