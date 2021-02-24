$('header').after(/*html*/`<main></main>`);
$('main').append(/*html*/`<div class="choose-movie"></div>`);
$('.choose-movie').append(`<div class="dropdown">
  <button id="toggle" class="general-button dropbtn">Välj film</button>
  <div class="dropdown-content">
  </div>
</div>`);
$('.choose-movie').after(`<div class="showings-container"><h1></h1></div>`);

let movies;
let id;
let i;
async function addMovies() {
  movies = await db.run(`SELECT * FROM new_movie_list`);
  i = 0;
  id = [];
  while (i < movies.length) {
    for (let {
      title
    } of movies) {
      id[i] = i;
      let movieHtml = `<a href="#" id="${i}" onclick="renderMovieBooking(${i})">${title}</a>`
      i++;
      $('.dropdown-content').append(movieHtml);
    }
  }
}

async function renderMovieBooking(i) {
  $('.selectedShowing').remove();
  let queryShowings = await db.run(/*sql*/ `SELECT * FROM Showings WHERE filmID = '${movies[i].title}'`)

  $('h1').replaceWith(`<h1>${movies[i].title}</h1>`)
  for (let { auditorium, date, time } of queryShowings) {
    $('.showings-container').append(/*html*/`<div class="selectedShowing"><div><h3>Salong: ${auditorium} | Datum: ${date} | Time: ${time}</h3></div><div class="book"><button id="book" class="general-button">Boka</button></div></div>`);
  }
}
addMovies();

$("#toggle").click(function () {
  $(".dropdown-content").show();
});

$(".dropdown-content").click(hideMenu).mouseleave(hideMenu);

function hideMenu() {
  $(".dropdown-content").hide();
};

$(document).on("click", "#book", function () {
  $('.selectedShowing').remove();

  renderSeatChooser();

});


function renderSeatChooser() {
  $('.showings-container').after()


}
