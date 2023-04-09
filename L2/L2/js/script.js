// Globala variabler


// --------------------------------------------------
// Initiering av globala variabler och händelsehanterare
function init() {
    inp1Elem = document.getElementById("input1");//inp1Elem och inp2Elem refererar till de två text input fällten i HTML koden 
    inp2Elem = document.getElementById("input2");
    msgElem = document.getElementById("message"); //msgElem refererar till div element där meddelande ska skrivas i HTML
    document.getElementById("btn1").onclick = showFruit; //call function showFruit when btn1 is clicked
    displayedFruitPictureNr = 0;
    document.getElementById("btn2").onclick = addFruits;
	
} // Slut init
window.onload = init; // Se till att init aktiveras då sidan är inladdad
// --------------------------------------------------

//Funkttion som väljer och visar bild baserat på user input. 
function showFruit(){

    // get user selected fruit
    let userInputFruitNr = getInput(inp1Elem, 5);

    // if the selection is invalid then un-display any fruit,
    // else -it it is valid- display the fruit
   if (userInputFruitNr == -1)
   {
        displayedFruitPictureNr = 0 
        document.getElementById("fruitImg").src= getFruitImageUrl(0); //display no image
   }
   else
   {
        document.getElementById("fruitImg").src= getFruitImageUrl(userInputFruitNr); //display img based on url from function getUrl
        displayedFruitPictureNr = userInputFruitNr;
   }
}

function getInput(aUserInputHtmlElement, aMaxValue){
    
    msgElem.innerHTML =""

    let userInput = Number(aUserInputHtmlElement.value);

   if (isNaN(userInput)){
       msgElem.innerHTML = "Endast siffror accepteras"
       return -1;
   }

   if (userInput < 1 || userInput > aMaxValue) { //check if number is too high
    msgElem.innerHTML = "Det valda numret är för stort, eller för litet";
    return -1;
    }

    let inputValueAsInteger = parseInt(userInput); //remove decimal and display whole nr
    aUserInputHtmlElement.value = inputValueAsInteger;
    return inputValueAsInteger; 
}

function getFruitImageUrl(aFruitNr){ //get url based on value of nr
   
    let fruitImageUrl;

    switch(aFruitNr){

        case 1: fruitImageUrl = "img/apple.png"; 
        break;
        case 2: fruitImageUrl = "img/banana.png"; 
        break;
        case 3: fruitImageUrl = "img/orange.png"; 
        break;
        case 4: fruitImageUrl = "img/pear.png"; 
        break;
        case 5: fruitImageUrl = "img/pineapple.png"; 
        break;
        default: fruitImageUrl = "img/nofruit.png"
    }
    return fruitImageUrl;
}

function addFruits(){

    // check if we have selected a fruit first
    let userInputFruitNr = displayedFruitPictureNr;
    if (userInputFruitNr == 0){
        msgElem.innerHTML = "Inget fruktnr har valts"
        return;
    }

    // gather dsata
    let userInputAmount = getInput(inp2Elem, 9);
    if (userInputAmount == -1) return;    
    


    let fruitImageUrlToDisplay = getFruitImageUrl(userInputFruitNr);

    let imgList = "";
    for (let i = 0; i < userInputAmount; i++) {
        imgList += "<img src='" + fruitImageUrlToDisplay + "' alt='frukt'>";
    }

    document.getElementById("selectedFruits").innerHTML += imgList;

}