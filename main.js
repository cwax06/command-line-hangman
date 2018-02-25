//Requires that the game.js file is loaded in order to use this JS file. We need this in order to choose a word. 
var game = require('./game.js');
//Requires readline so that we can read user input in the console.
var inquirer = require('inquirer');
//Requires the word.js file so that we can check the words.
var word = require('./word.js');
//Requires the letter.js file so that we can display the words.
var letter = require('./letter.js')
//Variable set up to hold the choice that the player makes later in requestInfo.
var choice;
//Variable set up to hold the letter the player choose in the guess function.
exports.letter;
//Variable to hold the word the player guesses in the guess function.
exports.wordGuess;
//Variable to hold he number of chances that you have used. 
exports.chances = 0;
//Creates a variable called chosenWord that is set to equal the game.js function chooseWord's return. (Is this even english anymore?) This is an exports because we will need to acces it in other JS files. 
exports.chosenWord = game.chooseWord();

//Function to request user input to decide whether you want to guess a letter or guess the word, then ask you what letter or word you want to guess. 
exports.requestInfo = function () {
    if (exports.chances >= 10) {
        console.log("You lost. It's a damn shame, a DAMN shame...");
        exports.playAgain();
    } else {
        var questions = [{
            type: "list",
            name: "whatDo",
            message: "What will it be bubble-boy?\n You have used " + exports.chances + " out of 10.",
            choices: [
                "letter",
                "word"
            ]
        }];

        inquirer.prompt(questions).then(function (answers) {
            //If the user wants to guess a letter, we run inquirer again to ask what letter then pass off to the checker in word.js.
            if (answers.whatDo == "letter") {
                var letterQ = [{
                    type: "input",
                    name: "letter",
                    message: "You've guessed: " + word.letterArr + " \nCurrent Guess: "
                }];

                inquirer.prompt(letterQ).then(function (answers) {
                    exports.letter = answers.letter;
                    word.checker();
                })
            }
            //If the user wants to guess a word, we run inquirer again to guess what word, then pass off to the wordChecker in word.js
            else if (answers.whatDo == "word") {
                var wordQ = [{
                    type: "input",
                    name: "word",
                    message: "Well Biff, what is the word?"
                }];
                inquirer.prompt(wordQ).then(function (answers) {
                    exports.wordGuess = answers.word;
                    word.wordCheck();
                })
            }
            //If the user puts in something other than word or letter, we ask them what they want to do again. 
            else {
                console.log("NO SOUP FOR YOU! Please try again.");
                exports.requestInfo();
            }
        })
    }

};

//Function to reset the game and allow the user to play again. 
exports.playAgain = function () {
    var questions = [{
        type: "list",
        name: "playAgain",
        message: "Would you like to play again?",
        choices: [
            "yes",
            "no"
        ]
    }];

    inquirer.prompt(questions).then(function (answer) {
        if (answer.playAgain == "yes") {
            exports.chances = 0;
            exports.chosenWord = game.chooseWord();
            letter.guessArr = [];
            letter.wordArr = [];
            word.letterArr = [];
            letter.initDisplay();
            letter.displayWord();
            exports.requestInfo();
        } else {
            console.log("Just remember, you are not crazy!\nThanks for playing");
        }
    });
}
//These three functions kick off the game.  
letter.initDisplay();
letter.displayWord();
exports.requestInfo();