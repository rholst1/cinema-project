
let movies

async function buildInitialPage(title) {
  movies = await db.run(`SELECT * FROM new_movie_list`);
  buildMoreInfoPage(title);
}

function buildMoreInfoPage(selectedMovie) {
  $('main').append(`<section class="movie-info"></section>`);
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
                                <button class="general-button" onclick ='history.pushState(null, null, "#home");window.dispatchEvent(new HashChangeEvent("hashchange"));' >Gå tillbaka</button>                                
                                <button class="general-button" onclick='history.pushState(null, null, "#tickets/film=${title}");window.dispatchEvent(new HashChangeEvent("hashchange"));'>Köp biljett</button>
                                </div>
                              </div>
                                <hr width='100%'>
                                <article><span> | Produktions land: ${productionCountries} | </span><span>Produktions år: ${productionYear}</span><span> | Längd: ${length} | </span><span>Genre: ${genres}</span><span> | Ålder: ${ageGroup} | Språk: ${language} | </span><span>Undertext: ${subtitles}</span><span> | Skådespelare: ${actors} | </span><span>Regissör: ${director}</span><span> </article>
                                <hr>

                                <article>${detailedDescription}</article>
                                                               
                                </div>
                            </div>`;
      $(`main`).append(movieHtml);
    }
  }
}; 