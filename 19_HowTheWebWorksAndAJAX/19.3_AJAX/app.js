console.log("Let's get this party started!");

//const searchTerm = document.querySelector(".search-term").value
const form = document.querySelector("#form")
const gifRender = document.querySelector("#gif-list")

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const searchTerm = document.querySelector("#search-term")
    getGif(searchTerm.value);
    searchTerm.value = '';
});

async function getGif(searchTerm) {
    console.log("search term", searchTerm)
    const config = {
        api_key:"O0PelE9W3RzyrU8GHeo7LB6Qmk3DyKXB",
        q:searchTerm
    }

    const res = await axios.get("http://api.giphy.com/v1/gifs/search", {params:config})
    console.log("showing res",res);
    console.log("top result", res.data.data[0].embed_url)
    searchResult = res.data.data[0].embed_url

    const newGif = document.createElement("iframe") //<iframe>
    newGif.setAttribute("src",searchResult)         //<iframe src=""></img>
    newGif.classList.add("display-gif")             //<iframe src="searchResult" class=display-gif ></img>
    gifRender.append(newGif);
}

const removeButton = document.querySelector("#remove-button")

removeButton.addEventListener("click",function(){
    gifRender.innerHTML = '';
});