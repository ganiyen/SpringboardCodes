

$(document).ready(function() {
    const forms = document.querySelector("#guess-form")

    forms.addEventListener("submit", async function(e){
        e.preventDefault()
        const userGuess = document.querySelector("#user-input")
        let guess = userGuess.value
        
        console.log("guess:", guess)
        // debugger;
        debugger
        const res = await axios.get("/check-guess", {params:{'guess':guess}}) 
        console.log(res)
        debugger;

    })
});

