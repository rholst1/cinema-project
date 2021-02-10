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
    this.moivieLength = movieLength;
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

function buildPage() {
  $('nav').after(`<main></main > `);
  $('main').append(`<section class="movies">
</section>
`);

  let movieHtml = /*html*/ `<div class="currentMovieIMG1">
                              <img src="${movieImages[i]}" class="img1" alt="Här ska en bild vara">
                            </div>
                          <div class="currentMovieTitleDiv">
                              <a href = "/moremovieinfo.html" class="movie-link"><h2>${movieTitles[i]}</h2></a>
                                <article class="currentMovieTitleContainer"><p class="title-p"> ${movieGenre[i]} | ${movieLength[i]}| ${ageMin[i]}
                                </p><article>
                                <button class="generalButton" onclick = "buttonPage()">Mer info</button><button class="generalButton" onclick="#">Köp biljett</button></article></article><hr>
                                <p>${movieInfo[i]}
                                </p>
                            </div>`;

  $(`.currentMovie${i}`).append(movieHtml);
}

buildPage();
