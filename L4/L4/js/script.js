// Globala konstanter och variabler
// Arrayer med nummer för bilder samt tillhörande namn och beskrivning
const allNrs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const allWords = ["Borgholm", "Gränna", "Gävle", "Göteborg", "Halmstad", "Jönköping", "Kalmar", "Karlskrona", "Kiruna", "Ljungby", "Malmö", "Norrköping", "Skara", "Stockholm", "Sundsvall", "Umeå", "Visby", "Västervik", "Växjö", "Örebro"];
const allDescriptions = ["Kyrkan", "Storgatan", "Julbock", "Operan", "Picassoparken", "Sofiakyrkan", "Domkyrkan", "Rosenbom", "Stadshus", "Garvaren", "Stortorget", "Spårvagn", "Domkyrka", "Rosenbad", "Hotell Knaust", "Storgatan", "Stadsmur", "Hamnen", "Teater", "Svampen"];
// Element i gränssnittet
var startGameBtn;		// Referenser till start-knappen (button)
var checkAnswersBtn;	// Referens till knappen för att kontrollera svar (button)
var msgElem; 			// Referens till div-element för utskrift av meddelanden (div)
var wordListElem;		// Referens till listan med de åtta orden (ul-elementet)
var wordElems;			// Array med referenser till elementen för de åtta orden (li-elemnten)
var imgElems;			// Array med referenser till elementen med de fyra bilderna (img)
var answerElems;		// Array med referenser till elementen för orden intill bilderna (p)
var correctElems;		// Array med referenser till element för rätta svar (p)
var largeImgElem;		// Referens till elementet med den stora bilden (img)
// Element vid drag and drop
var dragElem;			// Det element som dras (kan vara både li och p)
// --------------------------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd.
// Initiering av globala variabler samt händelsehanterare.
function init() {
	// Referenser till element i gränssnittet
	wordListElem = document.getElementById ("wordList").getElementsByTagName("ul")[0]; //referens till ul lista
	wordElems = document.getElementById("wordList"). getElementsByTagName("li"); //referens till li element i listan
	imgElems = document.getElementById("imgList").getElementsByTagName("img"); //referens till bilder
	answerElems = document.getElementsByClassName("userAnswer"); //referens till användarens svar (p-element)
	correctElems = document.getElementsByClassName("correctAnswer"); //referens till korrekt svar (p-element)
	largeImgElem = document.getElementById("largeImg"); //referens till förstårad bild
	startGameBtn = document.getElementById("startGameBtn");
	checkAnswersBtn = document.getElementById("checkAnswersBtn");
	msgElem = document.getElementById("message");
	

	// Lägg på händelsehanterare
	startGameBtn.addEventListener("click", startGame);
	checkAnswersBtn.addEventListener("click", checkAnswers);

	//Image mouse interaction - call show and hide large img. 
	for (let i = 0; i < imgElems.length; i++){
		imgElems [i].addEventListener("mouseenter", showLargeImg)
		imgElems [i].addEventListener("mouseleave", hideLargeImg)
	}

	//add a drag enda and start event to every word 
	for (let i = 0; i < wordElems.length; i++){
		wordElems[i].addEventListener("dragstart", dragstartWord)
		wordElems[i].addEventListener("dragend", dragendWord)
	}

	//add a drang end and astart event to every answer.
	for (let i = 0; i < answerElems.length; i++){
		answerElems[i].addEventListener("dragstart", dragstartWord)
		answerElems[i].addEventListener("dragend", dragendWord)
	}

	startGameBtn.disabled = false;
	checkAnswersBtn.disabled = true


	
	
	// Aktivera/inaktivera knappar
	
} // Slut init
window.addEventListener("load", init); // Se till att init aktiveras då sidan är inladdad
// --------------------------------------------------
// Initiera spelet. Välj ord slumpmässigt. Visa ord och bilder.
function startGame() {

	let generatedWords = []; //skapa variable med tom array (ist för words)
	let allNrsCopy = allNrs.slice(0); //kopiera allNrs array, 0 för att få alla värden med start från 0 (ist för tempNrs)
	let randomNumber; //random number that is generated for word selection

	//generate 4 random numbers and select words and img (words with image match)
	for (let i = 0; i < 4; i++){

		let ix = Math.floor(allNrsCopy.length*Math.random()) //generate a random number within the range of allNrsCopy array.

		randomNumber = allNrsCopy[ix]

		
		generatedWords.push(allWords[randomNumber]) //add word from allWords to generated word array

		imgElems[i].src = "img/" + randomNumber + ".jpg" //addimage to image element array based on ix

		imgElems[i].id = randomNumber

		allNrsCopy.splice(ix,1)
	}

	//generate 4 random numbers and select words (no-match words)
	for (let i = 0; i < 4; i++){

		let ix = Math.floor(allNrsCopy.length*Math.random()) //generate a random number within the range of allNrsCopy array.

		randomNumber = allNrsCopy[ix]
		
		generatedWords.push(allWords[randomNumber]) //add word from allWords to generated word array

		allNrsCopy.splice(ix,1)
		
	}

	// place words in a random order
	generatedWords.sort();

	for (let i = 0; i < wordElems.length; i++){
		
		wordElems[i].innerHTML = generatedWords[i];
		
		wordElems[i].draggable = true;
	}

	for (let i = 0; i < answerElems.length; i++){
		answerElems[i].draggable = true; 
		answerElems[i].innerHTML = "";
		correctElems[i].innerHTML = ""; 
	}

	startGameBtn.disabled = true;
	checkAnswersBtn.disabled = false;

	
} // Slut startGame
// --------------------------------------------------

// Visa förstorad bild
function showLargeImg() {

	largeImgElem.src = this.src;
	
} // Slut showLargeImg
// --------------------------------------------------

// Ta bort förstorad bild
function hideLargeImg() {
	largeImgElem.src = "img/empty.png";
	
} // Slut hideLargeImg
// --------------------------------------------------

// Kontrollera användarens svar och visa de korrekta svaren
function checkAnswers() {
	let points = 0;

	for (let i = 0; i < answerElems.length; i++){

		if (answerElems[i].innerHTML == ""){
			alert("Du måste dra ord till alla bilder innan du kan kontrollera svar")
			return;
		}
	}

	for (let i = 0; i < wordElems.length; i ++){
		wordElems[i].draggable = false;
	}

	for (let i = 0; i < answerElems.length; i ++){
		answerElems[i].draggable = false;
	}

	for (let i = 0; i < answerElems.length; i++){
		let ix = imgElems[i].id
		if (answerElems[i].innerHTML == allWords[ix]){
			points ++;
		}
	}

	for (let i = 0; i < imgElems.length; i ++){
		let ix = imgElems[i].id
		correctElems[i].innerHTML = allWords[ix] + "-" + allDescriptions[ix]

		console.log(allDescriptions[ix])
	}

	msgElem.innerHTML = "du fick " + points + "poäng"

	startGameBtn.disabled = false;
	checkAnswersBtn.disabled = true;

} // Slut checkAnswers
// --------------------------------------------------
// Spara referens till elementet som dras. Lägg på händelsehanterare för drop zones.
function dragstartWord() {
	console.log(dragstartWord)
	
	dragElem = this

	for (let i = 0; i < imgElems.length; i++){
		
		imgElems[i].addEventListener("dragover", wordOverImg)
		imgElems[i].addEventListener("drop", wordOverImg)
	}

	wordListElem.addEventListener("dragover", wordOverList)
	wordListElem.addEventListener("drop", wordOverList)

} // Slut dragstartWord
// --------------------------------------------------
// Ta bort händelsehanterare för drop zones.
function dragendWord() {
	
	for (let i = 0; i < imgElems.length; i++){
	
		imgElems[i].removeEventListener("dragover", wordOverImg)
		imgElems[i].removeEventListener("drop", wordOverImg)
	}
		
	wordListElem.removeEventListener("dragover", wordOverList)
	wordListElem.removeEventListener("drop", wordOverList)

} // Slut dragendWord
// --------------------------------------------------

// Hantera händelserna dragover och drop, då ett ord släpps över en bild
// För dragover utförs endast första raden med preventDefault.
function wordOverImg(e) { // e är Event-objektet

	e.preventDefault();

	if (e.type == "drop"){ //if the current action/event is drop - check if drop element is emty. 
		let dropElem = this.nextElementSibling;

		if (dropElem.innerHTML != ""){ //if drop element is not emty, place in list 
			moveBackToList(dropElem.innerHTML);
		}

		dropElem.innerHTML = dragElem.innerHTML; //otherwise place new word
		dragElem.innerHTML = "";
	}
	
} // Slut wordOverImg
// --------------------------------------------------
// Hantera händelserna dragover och drop, då ett ord släpps över listan med ord
// För dragover utförs endast första raden med preventDefault.
function wordOverList(e) { // e är Event-objektet


	e.preventDefault();

	if (e.type == "drop"){
		moveBackToList(dragElem.innerHTML);
		dragElem.innerHTML = "";
	}
	

} // Slut wordOverList
// --------------------------------------------------
// Flytta tillbaks ordet till listan
function moveBackToList(word) { // word är det ord som ska flyttas tillbaks

	for (let i = 0; i < wordElems.length; i++){


		if (wordElems[i].innerHTML == ""){

			wordElems[i].innerHTML = word;

			console.log(wordElems[i])

			break;
		}

	}
	
} // Slut moveBackToList
// --------------------------------------------------