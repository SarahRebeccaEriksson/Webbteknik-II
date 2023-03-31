
function init() {
   input1Elem = document.getElementById("input1") //declaire variables by id from HTML for text fields
   input2Elem = document.getElementById("input2")
   resElem = document.getElementById("result") //declaire variable by result id from HTML 
   document.getElementById("runBtn").onclick = areaCalculations //run function areaCalculations on runBtn click
} // slut init

// call function init on page load
window.onload = init

//Area calculation function - beräkningar och utskrivning av area. 
function areaCalculations() {
    let length; //deklareration av variabel för längd i meter
    let width; //deklareration av variabel för bredd i meter
    let area; //deklareration av variabel för area i kvadratmeter

    length = Number(input1Elem.value) // sätt värde för variabel "length" till värde för variabel input1Elem
    width = Number(input2Elem.value) // sätt värde för variabel "length" till värde för variabel input2Elem

    //beräkna och skriv ut area för rektangel
    area = length * width;
    resElem.innerHTML = "<p>Rektangelns area är " + area + "m<sup>2</sup></p>"; 

    //beräkna och skriv ut area för elips
    area = 3.14 * length * width / 4;
    resElem.innerHTML += "<p> Elipsens area är " + area + "m<sup>2</sup></p>"

    //beräkna och skriv ut area för rektangel om längden ökar med 5 meter
    area = (length + 5) * width;
    resElem.innerHTML += "<p> Då längden ökar med 5m blir rektangelns area " + area + "m<sup>2</sup></p>"

    //beräkna och skriv ut area för rektangel då längd ökar med 50% och bredd ökar med 3 meter
    area = (length *1.5) * (width + 3);
    resElem.innerHTML += "<p> Då längden ökar med 50% och bredden ökar med 3 meter blir rektangelns area " + area + "m<sup>2</sup></p>"

    //beräkna och skriv ut area för triangel i kvadratfot 
    area = (length * 3.28) * (width * 3.28) / 2;
    resElem.innerHTML += "<p> Triangelns area blir " + area + " kvadratfot</p>"

} //slut areaCalculations