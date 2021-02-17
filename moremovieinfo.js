//Legacy code, delete prior to release

// let movies;
// async function getMovies() {
//   movies = await db.run(`SELECT * FROM new_movie_list`);
//   buildPage('Tenet');
// }

// function buildPage(selectedMovie) {
//   $('header').after(`<section class="movie-info"></section>`);

//   for (let {
//     producer,
//     title,
//     productionCountries,
//     detailedDescription,
//     productionYear,
//     length,
//     subtitles,
//     actors,
//     language,
//     genres,
//     ageGroup,
//     trailer,
//   } of movies) {
//     if (selectedMovie === title) {
//       let movieHtml = /*html*/ `
//                           <div>
//                                <div class="youtube">
//                               <iframe width="100%" height="100%" src="${trailer}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//                               </div>
//                               <div class="info-text">
//                               <div class="title-row">
//                               <h2>${title}</h2>
//                               <div class="button-title">
//                                 <button onclick = "buttonPage()">Gå tillbaka</button><button onclick="#">Köp biljett</button>
//                                 </div>
//                               </div>
//                                 <hr width='100%'>
//                                 <article><span> | Produktions land: ${productionCountries} | </span><span>Produktions år: ${productionYear}</span><span> | Längd: ${length} | </span><span>Genre: ${genres}</span><span> | Ålder: ${ageGroup} | </span><span>Undertext: ${subtitles}</span><span> | Skådespelare: ${actors} | </span><span>Producent: ${title}</span><span> | Språk: ${language} |</article>
//                                 <hr>

//                                 <article>${detailedDescription}</article>

//                                 </div>
//                             </div>`;

//       $(`.movie-info`).append(movieHtml);
//     }
//   }
// }
// function buttonPage() {
//   window.location.href = '/currentmovies.html';
// }
// getMovies();
