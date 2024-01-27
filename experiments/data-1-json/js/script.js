/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let tarotData = undefined;
/**
Description of preload
*/
function preload() {
    tarotData = loadJSON(`assets/data/tarot_interpretations.json`);
}


/**
Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight);
}


/**
Description of draw()
*/
function draw() {
    background(255);

    let description = tarotData.description;

    push();
    textSize(32);
    textAlign(CENTER);
    fill(0);
    text(description, width / 2, height / 2);
    pop();

}