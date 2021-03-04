

function initCurrentmovies() {
  window.buildInitialPage = buildInitialPage;
  window.buildMoreInfoPage = buildMoreInfoPage;
  window.buyTicket = buyTicket;
  $.getScript('/MoviePage/script/Filterbutton.js');
  $('main').append(`<section class="movies"></section>`);
  $('.movies').prepend(
    `<h1 class="currentMovieTitleH1">AKTUELLA FILMER JUST NU</h1>`
  );
  $('.movies')
    .append(/*html*/ `<div class="btn-container"><button class="general-button" id="toggle">Visa filter</button><button class="btn general-button" id="all">Alla</button>
<button class="btn general-button" id="15-år">15 år</button>
<button class="btn general-button" id="11-år">11 år</button>
<button class="btn general-button" id="7-år">7 år</button>
<button class="btn general-button" id="Barntillåten">Barntillåten</button></div>`);
  buildInitialPage();
}
let movies;
async function buildInitialPage() {
  movies = await db.run(`SELECT * FROM new_movie_list`);
  buildMovieList();
}
function buildMovieList() {
  $('section').append(`<div class="currentMovies"></div>`);
  // createDivs(movies.length);
  let i = 0;
  while (i < movies.length) {
    for (let {
      title,
      description,
      length,
      genres,
      ageGroup,
      images,
    } of movies) {
      let movieHtml;

      movieHtml = /*html*/ `<div class="movie-container ${ageGroup}"><div class="currentMovieIMG1">
                  <img src="${images}" class="img1" alt="Här ska en bild vara">
                </div>
                <div class="currentMovieTitleDiv">
                    <a href = "javascript:buttonPage('${title}')" class="movie-link"><h2>${title}</h2></a><article class="currentMovieTitleContainer"> <p class="title-p"> ${genres} | ${length} | ${ageGroup} </p>
                    <article><button class="general-button article-button" onclick = "buildMoreInfoPage('${title}')">Mer info</button><button class="general-button article-button" onclick='buyTicket(${i})'>Köp biljett</button></article></article><hr>
                      <p>${description}
                      </p>
                  </div></div>`;
      i++;
      $(`.currentMovies`).append(movieHtml);
    }
  }
}

function buildMoreInfoPage(title) {
  history.pushState(null, null, "#moreinfo/title=" + title.replaceAll(" ", "-"));
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}
function buyTicket(i) {
  history.pushState(null, null, `#tickets/film=${title.replaceAll(" ", " - ")}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  localStorage['selected-movie'] = i;
  //  window.location.href = '/BookingPage/html/ticketbooking.html';
}

export { initCurrentmovies }