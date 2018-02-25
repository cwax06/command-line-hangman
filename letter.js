var main = require('./main.js');
exports.guessArr = [];
var guessDisplay = "";
exports.wordArr = [];

//Separates the wordChoice into an array for easier accessibility.
exports.initDisplay = function () {
    var wordChoice = main.chosenWord;
    for (var i = 0; i < wordChoice.length; i++) {
        exports.wordArr.push(wordChoice.charAt(i));
        if (wordChoice.charAt(i) == '\xa0') {
            exports.guessArr.push('\xa0');
        } else {
            exports.guessArr.push('_');
        }
    };
}

//Displays what the user has guessed/blanks in the word file. 
exports.displayWord = function () {
    guessDisplay = "";
    for (var i = 0; i < exports.guessArr.length; i++) {
        guessDisplay += exports.guessArr[i] + " ";
    }
    console.log(guessDisplay);
};

//Function to make changes to the guessArray when a correct letter is guessed. 
exports.editArray = function (position, letter) {
    exports.guessArr[position] = letter;
};