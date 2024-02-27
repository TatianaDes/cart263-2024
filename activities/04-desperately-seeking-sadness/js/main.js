/**
A4: Desperately Seeking Sadness
Tatiana Désormeaux

An emoji in search of satisfying sadness in a world of positivity.
*/

"use strict";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: `arcade`
    },
    scene: [Boot, Play]
};

let game = new Phaser.Game(config);
