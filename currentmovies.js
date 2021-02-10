let main = `<main></main > `;
$('nav').after(main);

let section = `<section class="movies">
</section>
`;
$('main').append(section);

let movieDivs = [
  `<div class="currentMovie1"></div>`,
  `<div class="currentMovie2"></div>`,
  `<div class="currentMovie3"></div>`,
  `<div class="currentMovie4"></div>`,
  `<div class="currentMovie5"></div>`,
  `<div class="currentMovie6"></div>`,
];
$('section').append(movieDivs);

let movieTitles = ['COMMANDO', 'THE BATMAN', 'SÄLLSKAPSRESAN'];
let movieImages = [
  'img/commando2.jpg',
  'img/batman.webp',
  'img/sallskapsresan.jpg',
];
let movieGenre = ['Action', 'Action', 'Komedi'];
let movieInfo = [
  `En pensionerad specialagent vid namn John Matrix ledde en
                  elitenhet och har lämnat de väpnade styrkorna för att bo i
                  ett avskilt bergshem  med sin dotter Jenny.
                  Men nu tvingas han gå ur pension när hans dotter
                  kidnappas av ett band av skurkar som vill hämnas!
                  Utan att Matrixtill dödas medlemmarna i hans tidigare
                  enhet en efter en. Även om Matrix vän General Franklin Kirby ger Matrix beväpnade vakter, lyckas angripare kidnappa Matrix och Jenny.`,
  `Batman info`,
  `Välkommen till våran ö, sluta tänk på regn och snö. Sola, bada och ha  kul med Suntrip över jul! Om du vill ha nattklubbssväng, häng då med i Gabbes gäng.`,
];
let movieLength = ['1 tim 45 min', '1 tim 57 min', '1 tim 12 min'];
let ageMin = ['15 år', '15 år', '6 år'];
let i = 0;

let currentTitle = `<h1 class="currentMovieTitleH1">AKTUELLA FILMER JUST NU</h1>`;

$('.movies').prepend(currentTitle);

function addButtons() {}

function buildMoviePage() {
  let movieHtml;
  while (i < movieTitles.length) {
    movieHtml = `<div class="currentMovieIMG1">
                  <img src="${movieImages[i]}" class="img1" alt="Här ska en bild vara">
                </div>
                <div class="currentMovieTitleDiv">
                    <a href = "#" class="movie-link"><h2>${movieTitles[i]}</h2></a><article class="currentMovieTitleContainer"> <p class="title-p"> ${movieGenre[i]} | ${movieLength[i]} | ${ageMin[i]} </p>
                    </p><article><button class="generalButton" onclick="#">Mer info</button><button class="generalButton" onclick="#">Köp biljett</button></article></article><hr>
                      <p>${movieInfo[i]}
                      </p>
                  </div>`;
    i++;
    $(`.currentMovie${i}`).append(movieHtml);
  }
}

buildMoviePage();
