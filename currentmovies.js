$('header').after(`<main></main > `);
$('main').replaceWith(`<section class="movies"></section>`);
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
async function buildInitialPage() {
  movies = await db.run(`SELECT * FROM new_movie_list`);
  buildMovieList();
}

function buildMovieList(selectedMovie) {
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
                    <a href = "javascript:buttonPage('${title}')" class="movie-link"><h2>${title}</h2></a><article class="currentMovieTitleContainer"> <p class="title-p"> ${genres} | ${length} | ${ageGroup} </p>
                    <article><button class="generalButton" onclick = "buttonPage('${title}')">Mer info</button><button class="generalButton" onclick="#">Köp biljett</button></article></article><hr>
                      <p>${description}
                      </p>
                  </div>`;
      i++;
      $(`.currentMovie${i}`).append(movieHtml);
    }
  }
}

function buildMoreInfoPage(selectedMovie) {
  $('header').after(`<section class="movie-info"></section>`);

  for (let {
    title,
    productionCountries,
    detailedDescription,
    productionYear,
    length,
    subtitles,
    actors,
    language,
    genres,
    ageGroup,
    trailer,
    director,
  } of movies) {
    if (selectedMovie === title) {
      let movieHtml = /*html*/ `
                          <div>
                               <div class="youtube">
                              <iframe width="100%" height="100%" src="${trailer}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                              </div>
                              <div class="info-text">
                              <div class="title-row">
                              <h2>${title}</h2>
                              <div class="button-title">
                                <button onclick = "window.location.href='/currentmovies.html'">Gå tillbaka</button><button onclick="#">Köp biljett</button>
                                </div>
                              </div>
                                <hr width='100%'>
                                <article><span> | Produktions land: ${productionCountries} | </span><span>Produktions år: ${productionYear}</span><span> | Längd: ${length} | </span><span>Genre: ${genres}</span><span> | Ålder: ${ageGroup} | Språk: ${language} | </span><span>Undertext: ${subtitles}</span><span> | Skådespelare: ${actors} | </span><span>Regissör: ${director}</span><span> </article>
                                <hr>

                                <article>${detailedDescription}</article>
                                                               
                                </div>
                            </div>`;

      $(`.movies`).replaceWith(movieHtml);
    }
  }
}

function buttonPage(title) {
  console.log(title);
  buildMoreInfoPage(title);
}
buildInitialPage();
