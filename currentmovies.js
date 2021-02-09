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

let movieIMG = `<div class="currentMovieIMG1">
                  <img src="img/commando1985.jpg" class="img1" alt="Här ska en bild vara">
                </div>`;

let movieTitle = `<div class="currentMovieTitleDiv">
                    <h1 class="currentMovieTitle">COMMANDO</h1> <p class="title-p">Action | 1 tim 57 min | 15 år </p><hr>
                      <p>En pensionerad specialagent vid namn John Matrix ledde en elitenhet
                          och har lämnat de väpnade styrkorna för att bo i ett avskilt bergshem
                          med sin dotter Jenny. Men nu tvingas han gå ur pension när hans dotter
          kidnappas av ett band av skurkar som vill hämnas!
                      </p>
                  </div>`;

let movieButtons = ``;

$('.currentMovie1').append(movieIMG);
$('.currentMovie1').append(movieTitle);
