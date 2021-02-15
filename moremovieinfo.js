class moreMovieInfo {
  constructor(
    title,
    productionCountries,
    productionYear,
    movieLength,
    genre,
    distributor,
    language,
    subtitles,
    director,
    actors,
    description,
    images,
    youtubeTrailers,
    reviews
  ) {
    this.title = title;
    this.productionCountries = productionCountries;
    this.productionYear = productionYear;
    this.movieLength = movieLength;
    this.genre = genre;
    this.distributor = distributor;
    this.language = language;
    this.subtitles = subtitles;
    this.director = director;
    this.actors = actors;
    this.description = description;
    this.images = images;
    this.youtubeTrailers = youtubeTrailers;
    this.reviews = reviews;
  }
}
let movies;
async function getMovies() {
  movies = await $.getJSON('movies.json');
  buildPage();
}

function buildPage(selectedMovie) {
  $('header').after(`<section class="movie-info"></section>`);

  for (let {
    producer,
    title,
    productionCountries,
    ID,
    description,
  } of movies) {
    if (selectedMovie === ID) {
      let movieHtml = /*html*/ `
                          <div>
                               <div class="youtube">
                              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/-FZ-pPFAjYY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                              </div>
                              <div class="info-text">
                              <div class="title-row">
                              <h2>${title}</h2>
                              <div class="button-title">
                                <button onclick = "buttonPage()">Gå tillbaka</button><button onclick="#">Köp biljett</button>
                                </div>
                              </div>
                                <hr width='100%'>
                                <article><span> | Produktionsland: ${productionCountries} | </span><span>Producent: ${producer}</span><span> | Regissör: ${title} | </span><span>Producent: ${title}</span><span> | Regissör: ${title} | </span><span>Producent: ${title}</span><span> | Regissör: ${title} | </span><span>Producent: ${title}</span><span> | Regissör: ${title} | </span><span>Producent: ${title}</span><span> | Regissör: ${title} | </span><span>Producent: ${title}</span><span> | Regissör: ${title} | </span><span>Producent: ${title}</span>
                                <span> | Regissör: ${title} | </span><span>Producent: ${producer}</span></article>
                                <hr>

                                <article>${description}</article>
                                                               
                                </div>
                            </div>`;

      $(`.movie-info`).append(movieHtml);
    }
  }
}
getMovies();
