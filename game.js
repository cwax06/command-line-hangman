//Sets up the array of words that can be guessed. 
var words = ["newman", "frank costanza", "estelle costanza", "susan ross", "morty seinfeld",
    "helen seinfeld", "jacopo peterman", "george steinbrenner", "uncle leo", "matt wilhelm",
    "david puddy", "mr. lippman", "justin pitt", "mickey abbott", "russell dalrymple",
    "kenny bania", "crazy joe davola", "dugan", "jackie chiles", "larry", "jack klompus"
];

//Sets up a function that chooses the word and returns it back. Exports is used so that this function is accessible within other JS files. 
exports.chooseWord = function () {
    var randNum = Math.floor((Math.random() * words.length) + 1);
    return words[randNum];
}