/**
Hard to Move On
Tatiana Désormeaux

A program prototype using Phaser 3 code to help create a story about the stages of grief someone goes through when losing someone that was important to them and trying to truly move on when falling back into the same unhealthy cycle is desired and longed for.
*/

"use strict";

// Creates the call for the Phaser 3 library and gives the rundown of the canvas size and what kind of physics will be used.
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade'
    },
    scene: [Boot, Title, Denial, CannotBeGone, Anger, ForNothing, Bargaining, Depression, Acceptance]
};

// Creates the new Phaser 3 game with the Phaser 3 library.
let game = new Phaser.Game(config);