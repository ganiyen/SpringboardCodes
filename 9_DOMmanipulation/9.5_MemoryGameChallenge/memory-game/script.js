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

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target);
  //console.dir(event.target)
  clickCounter++;
  event.target.style.backgroundColor = event.target.className;
    
  if (clickCounter === 2 && isCardMatch() === true) {
    //let the card show
    console.log("MATCH!!")
    clickCounter = 0;
  } else if (clickCounter === 2 && isCardMatch() === false) {
    //remove event click listener
    clickCounter = 0;
    deactivateClickEvent();
    setTimeout(cardReset, 1000);
    console.log("NOT MATCH")
  }
}

////////////////////////////////////////////////////////////////////
function isCardMatch(){
  const arr = [];
  for (let i=0; i <= gameContainer.children.length-1; i++){
    if (!matchCardIndex.includes(i) && gameContainer.children[i].style.backgroundColor !== ''){
      arr.push(i);
    }
  }
  console.log("arr", arr);
  if (gameContainer.children[arr[0]].style.backgroundColor === gameContainer.children[arr[1]].style.backgroundColor) {
    matchCardIndex.push(arr[0]);
    matchCardIndex.push(arr[1]);
    console.log("matchCardIndex:", matchCardIndex);
    return true;
  }
  else return false;
}

////////////////////////////////////////////////////////////////////
function cardReset () {
  clickCounter = 0;
  
  for (let i=0; i <= gameContainer.children.length-1; i++) {
    if (!matchCardIndex.includes(i)){
      gameContainer.children[i].style.backgroundColor = '';
    }
  }

  //activate event listener
  activateClickEvent();
}

////////////////////////////////////////////////////////////////////
function deactivateClickEvent() {
  console.log("deactivating click event")
  for (element of gameContainer.children){
    element.removeEventListener('click', handleCardClick);
  }
}

////////////////////////////////////////////////////////////////////
function activateClickEvent() {
  console.log("activating click event")
  for (element of gameContainer.children){
    element.addEventListener('click', handleCardClick);
  }
}

// when the DOM loads
createDivsForColors(shuffledColors); /////CHANGE LATER to createDivsForColors(shuffledColors);