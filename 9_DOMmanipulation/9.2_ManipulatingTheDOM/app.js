/*
Exercise
Write the code necessary to do the following:
*/

//Select the section with an id of container without using querySelector.
const section = document.getElementsById('container');

//Select the section with an id of container using querySelector.
const section2 = document.querySelector('#container')

//Select all of the list items with a class of “second”.
const second = document.querySelectorAll('.second')

//Select a list item with a class of third, but only the list item inside of the ol tag.
const third = document.querySelector('ol .third')

//Give the section with an id of container the text “Hello!”.
section.innerText = 'Hello!';

//Add the class main to the div with a class of footer.
const footer = document.querySelector('.footer')
footer.classList.add("main");

//Remove the class main on the div with a class of footer.
footer.classList.remove("main");

//Create a new li element.
const newLi = document.createElement('li')

//Give the li the text “four”.
newLi.innerText = 'four';

//Append the li to the ul element.
const ul = document.querySelector('ul');
ul.append(newLi);

//Loop over all of the lis inside the ol tag and give them a background color of “green”.
const liInOl = document.querySelectorAll('ol li')
for (eachLi of liInOl){
    eachLi.style.backgroundColor = "green";
}

//Remove the div with a class of footer
const removeDiv = document.querySelector('.footer');
removeDiv.remove();













