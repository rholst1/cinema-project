// Get movies from database and load them into a list
(async function addMovies() {
  movies = await db.run(`SELECT * FROM new_movie_list`);
  i = 0;
  id = [];
  while (i < movies.length) {
    for (let { title } of movies) {
      id[i] = i;
      let movieHtml = `<a  id="${i}" onclick="renderMovieBooking(${i})">${title}</a>`;
      i++;
      $('.dropdown-content').append(movieHtml);
    }
  }
})();

// Get all showings from the database and print them for the customer to choose
async function renderMovieBooking(i) {
  $('.selectedShowing').remove();
  $('.dropdown').remove();
  $('h1').remove();
  $('.layout').remove();
  $('.booking-form').remove();
  let queryShowings = await db.run(
    /*sql*/ `SELECT * FROM Showings WHERE filmID = '${movies[i].title}'`
  );

  $('.showings-container').append(`<h1>${movies[i].title}</h1>`);
  for (let { ID, auditorium, date, time } of queryShowings) {
    $('.showings-container').append(
      /*html*/ `<div class="selectedShowing"><div><h3>Salong: ${auditorium} | Datum: ${date} | Time: ${time}</h3></div><div class="book"><button id="book" class="general-button" value="${ID}">Boka</button></div></div>`
    );
  }
}
