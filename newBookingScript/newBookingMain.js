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
  $('h1').remove();
  $('.layout').remove();
  let queryShowings = await db.run(/*sql*/ `SELECT * FROM Showings WHERE filmID = '${movies[i].title}'`)

  $('.showings-container').append(`<h1>${movies[i].title}</h1>`)
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
  $('h1').remove();
  $('.selectedShowing').remove();

  renderSeatChooser();

});


async function renderSeatChooser() {
  $('.layout').remove();
  $('.showings-container').after(`<div class="layout"></div>`)
  $('.layout').append(`<div class="container">
  	<div class="screen"></div>`)


  let auditorium = await db.run(/*sql*/`SELECT * FROM Auditorium`);

  for (k = 0; k < auditorium[0].rows; k++) {
    $('.container').append(`<div class="row"></div>`)
  }
  for (l = 0; l < auditorium[0].seatsPerRow; l++) {
    $('.row').append(`<div class="seat"></div>`)
  }
  $('.container').append(`<div class="showcase">
		<div>
			<div class="seatshow"></div>
			<span>N/A</span>
		</div>
		<div>
			<div class="seatshow selected"></div>
			<span>Valda platser</span>
		</div>
		<div>
			<div class="seatshow occupied"></div>
			<span>Upptagna</span>
		</div>
	</div>`)
}

$(document).on('click', '.seat', function () {
  if ($(this).hasClass('seat') && !$(this).hasClass('occupied')) {
    $(this).toggleClass('selected')
  }
});