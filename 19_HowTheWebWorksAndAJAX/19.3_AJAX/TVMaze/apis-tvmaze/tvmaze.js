"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  console.log("search term:", term);
  const res = await axios.get("https://api.tvmaze.com/search/shows", {params:{q:term}})
  console.log("response:", res);

  const showArr = [];
  console.log("showArr just created", showArr);
  for (let i=0; i <= res.data.length -1; i++) {
    const tempObj = {
      id:      res.data[i].show.id,
      name:    res.data[i].show.name,
      summary: res.data[i].show.summary,
      image:   res.data[i].show.image.original
    }
    if (res.data[i].show.image.original === '') {
      tempObj.image = "https://tinyurl.com/tv-missing";
    }
    else {
      tempObj.image = res.data[i].show.image.original;
    }

    console.log("BEFORE PUSH showArr i=", i, "length=", showArr.length, showArr)
    //showArr.push(tempObj);
    showArr[i] = tempObj;
    console.log("AFTER PUSH showArr i=", i, "length=", showArr.length, showArr)
    //debugger;
  }
  return showArr;
}

/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4" id="">
            <div class="media">
                <img class="card-img-top" src="${show.image}">
                <div class="media-body">
                  <h5 class="text-primary">${show.name}</h5>
                  <div><small>${show.summary}</small></div>
                  <button class="btn btn-outline-light btn-sm Show-getEpisodes" id="episode-button">
                    Episodes
                  </button>
                  <ul id="append-episode-here">
                  </ul>
                </div>
            </div>  
       </div>
      `);

    $showsList.append($show);  
  }
}

$("#shows-list").on("click", "#episode-button", async function(evt){
  const showId = evt.target.parentElement.parentElement.parentElement.dataset.showId;
  const episodes = await getEpisodesOfShow(showId);
  populateEpisodes(episodes, evt);
})

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  //const term = $("#searchForm-term").val();
  const term = $("#search-query").val();
  const shows = await getShowsByTerm(term);
  console.log("shows:",shows)

  $episodesArea.hide();
  populateShows(shows);

  //const episodes = await getEpisodesOfShow(shows[0].id);
  //populateEpisodes(episodes);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) { 
  const res = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`)
  console.log("episodes", res);

  const episodeArr = [];
  for (let i=0; i <= res.data.length -1; i++) {
    const tempObj = {
      id     :res.data[i].id,
      name   :res.data[i].name,
      season :res.data[i].season,
      number :res.data[i].number
    }
  episodeArr[i] = tempObj;
  }
  console.log("episodeArr", episodeArr);
  return episodeArr;
}

/** Write a clear docstring for this function... */

function populateEpisodes(episodes, evt) {
  const $whereToPutEpisodes = $(evt.target.nextElementSibling);
  $whereToPutEpisodes.empty();

  for (let episode of episodes) {
    const $episode = $(
      `<li>${episode.name} (Season ${episode.season}, Number ${episode.number})</li>`
    )
    $whereToPutEpisodes.append($episode);
  }
}


