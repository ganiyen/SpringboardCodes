const gameContainer = document.getElementById("game");
let clickCounter = 0;
let matchCardIndex = [];

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let i=0; i <= colorArray.length-1; i++) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(colorArray[i]);
    newDiv.innerHTML = i

    newDiv.dataset.open = '';
    newDiv.dataset.matched = '';

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  
  if ((event.target.getAttribute("data-matched") !== "true") && (clickCounter <= 1)) {  //ignore clicks on matched cards, cannot click more than 2 cards
      clickCounter++;
      event.target.setAttribute("data-open","true");
      event.target.style.backgroundColor = event.target.className;

        if (clickCounter === 2 && isCardMatch() === "true" ) {
          console.log("MATCH!!")
          matchedEvent();
        } 
        else if (clickCounter === 2 && isCardMatch() === "false") {
          console.log("NOT MATCH")
          setTimeout(notMatchedEvent, 1000);
        }
        else if (clickCounter === 2 && isCardMatch() === "clicked same card 2x") { //cannot click on 2 same cards
          console.log("cannot click 2 same card");
          clickCounter = 1; //ignore the last click
        }
  }
}

////////////////////////////////////////////////////////////////////
function isCardMatch() {
  const arr = [];

  for (let i=0; i <= gameContainer.children.length-1; i++){
    if (gameContainer.children[i].dataset.open === "true") {
      arr.push(gameContainer.children[i].getAttribute("class"));
    }
  } 
  console.log("arr",arr)
  if (arr.length === 1){
    return "clicked same card 2x";
  }
  else if (arr[0] === arr[1]) {  //if 2 cards matched
    return "true";
  }
  else {
    return "false";
  }
}

////////////////////////////////////////////////////////////////////
function matchedEvent(){
  for (let i=0; i <= gameContainer.children.length-1; i++){
      if (gameContainer.children[i].dataset.open === "true") {
        gameContainer.children[i].dataset.matched = "true";
      }
      gameContainer.children[i].dataset.open = '';
  } 
  clickCounter = 0;
}

////////////////////////////////////////////////////////////////////
function notMatchedEvent(){
  for (let i=0; i <= gameContainer.children.length-1; i++){
      gameContainer.children[i].dataset.open = '';
      if (gameContainer.children[i].dataset.matched !== "true"){
        gameContainer.children[i].style.backgroundColor = '';
      }
  } 
  clickCounter = 0;
}


////////////////////////////////////////////////////////////////////
// function cardReset () {
//   for (let i=0; i <= gameContainer.children.length-1; i++) {
//     if (gameContainer.children[i].dataset.matched !== "true"){
//       gameContainer.children[i].style.backgroundColor = '';
//     }
//   }

// }


// when the DOM loads
createDivsForColors(shuffledColors); /////CHANGE LATER to createDivsForColors(shuffledColors);