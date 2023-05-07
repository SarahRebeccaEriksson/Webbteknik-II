// Globala konstanter och variabler
const wordList = ["BLOMMA", "LASTBIL", "SOPTUNNA", "KÖKSBORD", "RADIOAPPARAT", "VINTER", "SOMMAR", "DATORMUS", "LEJON", "ELEFANTÖRA", "JULTOMTE", "SKOGSHYDDA", "BILNUMMER", "BLYERTSPENNA", "SUDDGUMMI", "KLÄDSKÅP", "VEDSPIS", "LJUSSTAKE", "SKRIVBORD", "ELDGAFFEL", "STEKPANNA", "KASTRULL", "KAFFEBRYGGARE", "TALLRIK", "SOFFBORD", "TRASMATTA", "FLYGPLAN", "FLYGPLATS", "TANGENTBORD"]; // Lista (array) med ord som ska väljas slumpmässigt




var selectedWord; // Variable to store randomly generated word
var DynamicLetterBoxes; // Variable for letter boxes
var hangingManImg; // Url referens to the hanging man image
var hangingManNr; // Number of failed guesses/ hanging man progressions
var messageToUser; //End game message field to user.
var startGameBtn; // Variable for start btn
var letterButtons; // Variable for letter buttons 
var startTime; // Timer variable
var numberOfLettersFound; //variable to store number of correct letters found
var manIsHanged; // variable to store if end game failed or not.
var oldWord; //variable for past selected word. 

// --------------------------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
	startGameBtn = document.getElementById("startGameBtn"); //create reference to startGamebtn from HTML id. 
    startGameBtn.onclick = startGame; // call function startGame when "starta spelet" is clicked.
    letterButtons = document.getElementById("letterButtons").getElementsByTagName("button"); // array with referens to each letter button from HTML document. 

    startGameBtn.disabled = false;// enable "starta spelet" btn.

    for (let i = 0; i< letterButtons.length; i++) // for every button in the letter buttons array that is clicked, call function guessLetter.
        letterButtons [i].onclick = guessLetter; 

    for (let i = 0; i < letterButtons.length; i++){ // disable all letter buttons 
        letterButtons [i].disabled = true;
    }

        hangingManImg = document.getElementById("hangman"); //get ref to image element 
        messageToUser = document.getElementById("message"); //get ref to message element
      


} // Slut init

window.onload = init; // Se till att init aktiveras då sidan är inladdad
// --------------------------------------------------

//Function is initiated when "starta spelet" is pressed
// calls function to generate random word and display letter boxes, and reset game values to default. 
function startGame() {

    randomWord(); // call function for word generation
    showLetterBoxes(); //call function for letter boxes generation

    let now = new Date(); //save current date/time
    startTime = now.getTime(); //save start time in startTimer

    hangingManImg.src = "img/h0.png"; //set hanging man image to start default 
    hangingManNr = 0; //reset nr of guesess to 0 
    numberOfLettersFound = 0; //reset nr of letters found to 0
    startGameBtn.disabled = true; // disable "starta spelet" button

    for (let i = 0; i < letterButtons.length; i++){ //enable letter buttons

        letterButtons [i].disabled = false;
    }

    messageToUser.innerHTML = "";// remove end game message

}

//function to generate a random word
//generate random number, then select from wordList array a word based on number
function randomWord() {
 
    let oldWord = selectedWord; //save previously generated word

    while (oldWord == selectedWord) { //re-select word if word old word is the same as selected word

    let ix = Math.floor(wordList.length*Math.random()); //generate a random number within the range of wordList array. 
    selectedWord = wordList[ix]; // pick word from array based on random number and save in selectedWord

    if (selectedWord == oldWord){ // this part i still cannot figure out
        randomWord();
    }

}
    return; 
}

//display letter boxes 
//Display a number of letter boxes equal to selected word  
function showLetterBoxes() {

    let newWord = ""; //create emty variabel to store boxes

    for (let i = 0; i< selectedWord.length; i++) // for evvery letter in the selected word, add a span element and display in html

    newWord += "<span>&nbsp;</span>";
    document.getElementById("letterBoxes").innerHTML = newWord;
    DynamicLetterBoxes = document.getElementById("letterBoxes").getElementsByTagName("span")

    return;
}

//Function for what happens when a letter is clicked. If correct-display word in letterbox, if wrong-display new hanging man img. Check if letter guess is final or if nr of hanging man attemts are full, then call endGame function.
function guessLetter() {

    var clickedBtn = this.value; // get value from the letter button clicked and store in variable
    this.disabled = true;  // disable the button that has been clicked
    var letterFound = false; // variable to store state of letter 
    

    for (i = 0; i < selectedWord.length; i++) //for every letter in the word, add a letter to a box or add a image 
    {

        if (selectedWord.charAt(i) == clickedBtn) // if the clicked letter exists in the word, write letter/s in letter boxes and note the numbers found
        {
            DynamicLetterBoxes[i].innerHTML = clickedBtn
            letterFound = true
            numberOfLettersFound +=1

            if (numberOfLettersFound >= selectedWord.length){ // if all letters in the word have been found, call end game function and register win
                manIsHanged = false
                endGame();

            }
        }    
    }

    if (letterFound == false) // if the clicked letter does not exist in word, add image progression
    {
        hangingManNr +=1
        hangingManImg.src = "img/h"+hangingManNr+".png"

        if (hangingManNr >= 6){  // if the number of false guesses exceeds 6, end the game and register fail
            manIsHanged = true
        endGame();
        }
    }

    }


//function to display end game status
//If failed - display fail message, if correct - display correct message, also disable all letter btns and enable start. 
function endGame() {

    let runTime = (new Date().getTime() - startTime) / 1000;
    
    if (manIsHanged == true){ //fail message
        messageToUser.innerHTML = "Du förlorade, rätt ord var " + selectedWord + "<br> Spelet tog " + runTime.toFixed(1) + " sekunder.";
    }

    else{ //win message
        messageToUser.innerHTML = "Grattis! Du hittade rätt ord. <br> Spelet tog " + runTime.toFixed(1) + " sekunder.";
    }

    for (let i = 0; i < letterButtons.length; i++){ // disable letter btns
        letterButtons [i].disabled = true;
    }
    
    startGameBtn.disabled = false; //enable start btn


}