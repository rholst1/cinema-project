$.getScript('/MoviePage/script/Filterbutton.js');
$.getScript('/MoviePage/script/buyTicket.js');

$('header').after(`<main></main > `);
$('main').append(`<section class="movies"></section>`);
$('.movies').prepend(
  `<h1 class="currentMovieTitleH1">AKTUELLA FILMER JUST NU</h1>`
);
$('.movies').append(renderFilterButton());

async function buildInitialPage() {
  let movies = await db.run(`SELECT * FROM new_movie_list`);
  buildMovieList(movies);
}

function buildMovieList(movies) {
  $('section').append(`<div class="currentMovies"></div>`);
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
                    <article><button class="general-button article-button" onclick = "buildInfo('${title}', ${i})">Mer info</button><button class="general-button article-button" onclick="buyTicket(${i})">Köp biljett</button></article></article><hr>
                      <p>${description}
                      </p>
                  </div></div>`;
      i++;
      $(`.currentMovies`).append(movieHtml);
    }
  }
}

function renderFilterButton() {
  return /*html*/ `<div class="btn-container"><button class="general-button" id="toggle">Visa filter</button><button class="btn general-button" id="all">Alla</button>
<button class="btn general-button" id="15-år">15 år</button>
<button class="btn general-button" id="11-år">11 år</button>
<button class="btn general-button" id="7-år">7 år</button>
<button class="btn general-button" id="Barntillåten">Barntillåten</button></div>`;
}

function buildInfo(title, i) {
  $.getScript('/MoviePage/script/moremovieinfo.js', function () {
    buildInitialPage(title, i);
  });
}

buildInitialPage();
