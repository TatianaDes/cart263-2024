class Title {

    // Creating a title with all its variables
    constructor() {
        // Adding word strings to the title screen
        this.titleString = `Say Please`;
        this.titleString2 = `(Please press the Space Bar to Start)`;
        this.titleString3 = `Please use your microphone to speak to the computer`;
    }

    // draw() displays the background and calls the functions that need to be drawn 
    draw() {
        background(253, 222, 247);

        // Calls the displayTitle function
        this.displayTitle();
    }

    // Displaying the title and placing everything
    displayTitle() {
        push();
        textSize(50);
        fill(247, 130, 189);
        textAlign(CENTER, CENTER);
        text(this.titleString, width / 2, height / 2);
        pop();

        push();
        textSize(17);
        fill(206, 90, 130);
        textAlign(CENTER, CENTER);
        text(this.titleString2, width / 2, 300);
        pop();

        push();
        textSize(15);
        fill(197, 62, 93);
        text(this.titleString3, 300, 470);
        pop();
    }

    // Calls the mousePressed function to work
    mousePressed() {

    }

    // Calls the keyPressed function to work
    keyPressed() {
        if (keyCode === 32) {
            // Changes state to Level1 when any key is pressed
            currentState = new Level1();
        }
    }

    // Calls the keyReleased function to work
    keyReleased() {

    }
}