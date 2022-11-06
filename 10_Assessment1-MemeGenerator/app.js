const form = document.querySelector("#image-url");

//save the values from the form
form.addEventListener("submit", function(e){
    e.preventDefault();
    let inputURL = document.querySelector("#url").value
    let topMeme = document.querySelector("#text-top").value
    let bottomMeme = document.querySelector("#text-bottom").value

    createNewDiv(inputURL,topMeme,bottomMeme);

    //reset the inputs
    document.querySelector("#url").value = '';
    document.querySelector("#text-top").value = '';
    document.querySelector("#text-bottom").value = '';

})

function createNewDiv (inputURL, topMeme, bottomMeme){
    const newDiv = document.createElement('div')

    //image HTML code
    const newImg = document.createElement('img');
    newImg.setAttribute("src",inputURL)
    newDiv.append(newImg);
    
    //top HTML code
    const newTop = document.createElement('p');
    newTop.classList.add("top");
    newTop.innerHTML = topMeme;
    newDiv.append(newTop);

    //bottom HTML code
    const newBottom = document.createElement('p');
    newBottom.classList.add("bottom");
    newBottom.innerHTML = bottomMeme;
    
    //append to HTML body
    newDiv.append(newBottom);
    const body = document.querySelector('body');
    body.append(newDiv);

    //add meme removal event listener code
    addMemeRemovalEventListener(newDiv);
}

function addMemeRemovalEventListener(newDiv){
    newDiv.addEventListener("click",function(e){
        e.target.parentElement.remove();
    })
}






