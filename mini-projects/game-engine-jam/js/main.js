/**
Hard to Move On
Tatiana Désormeaux

A program using Phaser 3 code to help create a story about trying to move on from someone but recognizing the difficulty of it.
*/

"use strict";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: `arcade`
    },
    scene: [Title, Boot, Play]
};

let game = new Phaser.Game(config);