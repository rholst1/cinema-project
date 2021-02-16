$('header').after(`<main></main > `);
$('main').append(`<section class="movies"></section>`);
$('.movies').prepend(
  `<h1 class="currentMovieTitleH1">AKTUELLA FILMER JUST NU</h1>`
);

let movieDivs = [];
function createDivs(numberOfMovies) {
  for (let i = 1; i < numberOfMovies + 1; i++) {
    movieDivs.push(`<div class="currentMovie${i}"></div>`);
  }
  $('section').append(movieDivs);
}

let movies;
async function getMovies() {
  movies = await db.run(`SELECT * FROM new_movie_list`);

  buildMoviePage();
}

function buildMoviePage(selectedMovie) {
  createDivs(movies.length);
  let i = 0;
  while (i < movieDivs.length) {
    for (let {
      title,
      description,
      length,
      genres,
      ageGroup,
      images,
    } of movies) {
      let movieHtml;

      movieHtml = /*html*/ `<div class="currentMovieIMG1">
                  <img src="${images}" class="img1" alt="Här ska en bild vara">
                </div>
                <div class="currentMovieTitleDiv">
                    <a href = "/moremovieinfo.html" class="movie-link"><h2>${title}</h2></a><article class="currentMovieTitleContainer"> <p class="title-p"> ${genres} | ${length} | ${ageGroup} </p>
                    <article><button class="generalButton" onclick = "buttonPage()">Mer info</button><button class="generalButton" onclick="#">Köp biljett</button></article></article><hr>
                      <p>${description}
                      </p>
                  </div>`;
      i++;
      $(`.currentMovie${i}`).append(movieHtml);
    }
  }
}
function buttonPage() {
  window.location.href = '/moremovieinfo.html';
}
getMovies();
