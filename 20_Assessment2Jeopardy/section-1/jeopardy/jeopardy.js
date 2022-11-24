// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];
const NUMofQUESTIONS = 5;
const NUMofCATEGORIES = 6;


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    const res = await axios.get("https://jservice.io/api/categories", {params:{count:100}}) //get 100 categories
    const categoryArr = [];
 
    while(categoryArr.length < NUMofCATEGORIES) {
        const randomIndex = Math.floor(Math.random()*100); //get a random number from 0 to 99. find category index randomly
        if (res.data[randomIndex].clues_count >= NUMofQUESTIONS) { //only save the category that has at least NUMofQUESTIONS questions
            categoryArr.push(res.data[randomIndex].id)
        }
    }
    return categoryArr;
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
        const res = await axios.get("http://jservice.io/api/category", {params:{id:catId}})

        const cluesArr = [];
        for (let i=0; i <= NUMofQUESTIONS-1; i++){
            const cluesObj = {
                question:res.data.clues[i].question,
                answer:res.data.clues[i].answer,
                showing:null
                }
            cluesArr.push(cluesObj);
        }

        const catObj = {
            title:res.data.title,
            clues:cluesArr
        }

        return catObj;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

function fillTable() {
    const tableHeadRow = document.createElement("tr");       //<tr></tr>

    for (let category of categories) {
        const tableHeadData = document.createElement("td");  //<td></td>
        tableHeadData.innerHTML = category.title             //<td>title</td>
        tableHeadRow.append(tableHeadData);                  //<tr><td>title</td></tr>
    }

    const tableHead = document.querySelector("thead") //<thead></thead>
    tableHead.append(tableHeadRow);
    // <thead>
    //     <tr>
    //         <td>title1</td>
    //         <td>title1</td>
    //         <td>title1</td>
    //         <td>title1</td>
    //         <td>title1</td>
    //         <td>title1</td>
    //     </tr>
    // </thead>

    for (let i=0; i <= NUMofQUESTIONS-1; i++) {
        const tableBodyRow = document.createElement("tr");

        for (let j=0; j <= NUMofCATEGORIES-1; j++) {
            const tableBodyData = document.createElement("td");  //<td></td>
            tableBodyData.innerHTML = '?'                        //<td>?</td>
            tableBodyRow.append(tableBodyData);                  //<tr><td>?</td></tr>
            tableBodyData.classList.add(`${j}-${i}`);            //<tr><td class=cat-clue>?</td></tr>
        }

        const tableBody = document.querySelector("tbody")
        tableBody.append(tableBodyRow);
        // <tbody>
        //     <tr>
        //         <td>title1</td>
        //         <td>title1</td>
        //         <td>title1</td>
        //         <td>title1</td>
        //         <td>title1</td>
        //         <td>title1</td>
        //     </tr>
        // </tbody>
    }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    //extract the category and question from the clicked cell's class
    //format: category-question
    clickCategoryIdx = evt.target.classList.value[0];
    clickQuestionIdx = evt.target.classList.value[2];

    //check if the question has been shown
    const isQshown = categories[clickCategoryIdx].clues[clickQuestionIdx].showing;

    if (isQshown === null){
        //if the question has not been shown, then show it
        const question = categories[clickCategoryIdx].clues[clickQuestionIdx].question;
        console.log("question", question)
        evt.target.innerHTML = question;
        categories[clickCategoryIdx].clues[clickQuestionIdx].showing = true;
    } 
    else if (isQshown === true) {
        //if the question has been shown, then show the answer
        const answer = categories[clickCategoryIdx].clues[clickQuestionIdx].answer;
        console.log("answer", answer)
        evt.target.innerHTML = answer;
        evt.target.style.backgroundColor = "#28a200";
    }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    document.querySelector("#spin-container").setAttribute("style", "display:block")
    document.querySelector("button").innerHTML = "Loading...";
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    document.querySelector("#spin-container").setAttribute("style", "display:none")
    document.querySelector("button").innerHTML = "Restart Game";
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    const catId = await getCategoryIds();
    for (let i=0; i<=catId.length-1; i++) {
        categories[i] = await getCategory(catId[i]);
    }
    fillTable();
}

//when the game play button is clicked, start the game, get the categories and the clues, update the loading spinning icon, update the working on the game play button
$("button").on("click", async function(){
    document.querySelector("thead").innerHTML = '';
    document.querySelector("tbody").innerHTML = '';
    categories = [];

    showLoadingView();     //show the spinning loading icon, update the button wording
    await setupAndStart(); //get categories and clues, setup the board table
    hideLoadingView();     //hide the spinning loading icon after the table finishes loading, update the button wording
})

//event handler when the clues are clicked
$('table').on("click", function(evt) {
    handleClick(evt);
})  
