
function initCurrentmovies() {
  $.getScript('script/Filterbutton.js');
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



// let movieDivs = [];
// function createDivs(numberOfMovies) {
//   for (let i = 1; i < numberOfMovies + 1; i++) {
//     movieDivs.push(`<div class="currentMovies"></div>`);
//   }
//   $('section').append(movieDivs);
// }

let movies;
async function buildInitialPage() {
  movies = await db.run(`SELECT * FROM new_movie_list`);
  buildMovieList();
}

function buildMovieList(selectedMovie) {
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
                    <article><button class="general-button article-button" onclick = "buttonPage('${title}')">Mer info</button><button class="general-button article-button" onclick="#">Köp biljett</button></article></article><hr>
                      <p>${description}
                      </p>
                  </div></div>`;
      i++;
      $(`.currentMovies`).append(movieHtml);
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
                                <button class="general-button" onclick = "window.location.href='/currentmovies.html'">Gå tillbaka</button><button class="general-button" onclick="#">Köp biljett</button>
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

export { initCurrentmovies }