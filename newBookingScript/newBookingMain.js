$('header').after(/*html*/ `<main></main>`);
$('main').append(
  /*html*/ `<div class="choose-movie"><button id="childTicketRem" class="general-button">-</button><button id="childTicket" class="general-button">Barn</button><button id="childTicketAdd" class="general-button">+</button></div>`
);
$('.choose-movie').append(`<div class="dropdown">
  <button id="toggle" class="general-button dropbtn">Välj film</button>
  <div class="dropdown-content">
  </div>
</div>`);
$('.choose-movie').after(`<div class="showings-container"><h1></h1></div>`);

let movies;
let id;
let i;
let amountOfSelectedSeats = 0;
let childTickets = 0;
let adultTickets;
let seniorTickets;
let totalAmountTickets = 5; // Userinput
let selectedSeatNrArray = [];
let selectedShow = 1;

function renderChosenTickets() {
  let html = /*html*/ `<div id="amountChildTickets">Antal: ${childTickets} </div>`;
  $('.choose-movie').append(html);
}

function addChildTicket() {
  childTickets++;
  totalAmountTickets++;
  renderChosenTickets();
}

function remChildTicket() {
  childTickets--;
  totalAmountTickets--;
}

async function addMovies() {
  movies = await db.run(`SELECT * FROM new_movie_list`);
  i = 0;
  id = [];
  while (i < movies.length) {
    for (let { title } of movies) {
      id[i] = i;
      let movieHtml = `<a href="#" id="${i}" onclick="renderMovieBooking(${i})">${title}</a>`;
      i++;
      $('.dropdown-content').append(movieHtml);
    }
  }
}

async function renderMovieBooking(i) {
  $('.selectedShowing').remove();
  $('h1').remove();
  $('.layout').remove();
  let queryShowings = await db.run(
    /*sql*/ `SELECT * FROM Showings WHERE filmID = '${movies[i].title}'`
  );

  $('.showings-container').append(`<h1>${movies[i].title}</h1>`);
  for (let { auditorium, date, time } of queryShowings) {
    $('.showings-container').append(
      /*html*/ `<div class="selectedShowing"><div><h3>Salong: ${auditorium} | Datum: ${date} | Time: ${time}</h3></div><div class="book"><button id="book" class="general-button">Boka</button></div></div>`
    );
  }
}
addMovies();

//Enter selected show
async function renderSeatChooser(selectedShow) {
  $('.layout').remove();
  $('.showings-container').after(`<div class="layout"></div>`);
  $('.layout').append(`<div class="container">
  	<div class="screen"></div>`);

  let auditorium = await db.run(/*sql*/ `SELECT * FROM Auditorium`);

  //Pulls seats from the selectedShow by the unique showingID
  let seatStatus = await db.run(
    /*sql*/ `SELECT * FROM Seatings WHERE showingID = 1`
  );
  let seatNumberArray = [];
  let seatStatusArray = [];
  let n = 0;

  for (let { seatNumber, status } of seatStatus) {
    seatNumberArray[n] = seatNumber;
    seatStatusArray[n] = status;

    n++;
  }
  n = 0;

  for (k = 0; k < auditorium[0].rows; k++) {
    $('.container').append(`<div class="row" id=row${k + 1}></div>`);

    for (l = 0; l < auditorium[0].seatsPerRow; l++) {
      $(`#row${k + 1}`).append(
        `<div class="seat" id="seat${seatNumberArray[n]}"></div>`
      );
      if (seatStatusArray[n].localeCompare('occupied') === 0) {
        $(`#seat${seatNumberArray[n]}`).toggleClass('occupied');
      }
      n++;
    }
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
	</div>`);
}

$('#toggle').click(function () {
  $('.dropdown-content').show();
});

$('.dropdown-content').click(hideMenu).mouseleave(hideMenu);

function hideMenu() {
  $('.dropdown-content').hide();
}

$(document).on('click', '#book', function () {
  $('h1').remove();
  $('.selectedShowing').remove();
  selectedSeatNrArray.length = 0;
  renderSeatChooser();
  inputInfo();
});

$('#childTicketAdd').click(addChildTicket);
$('#childTicketRem').click(remChildTicket);
$(document).on('click', '.seat', function () {
  if ($(this).hasClass('seat') && !$(this).hasClass('occupied')) {
    if ($(this).hasClass('seat') && $(this).hasClass('selected')) {
      $(this).toggleClass('selected');
      selectedSeatNrArray.pop($(this).get(0).id);
    } else if (!(selectedSeatNrArray.length === totalAmountTickets)) {
      if ($(this).hasClass('seat') && !$(this).hasClass('occupied')) {
        $(this).toggleClass('selected');
        selectedSeatNrArray.push($(this).get(0).id);
      }

      console.log(selectedSeatNrArray);
    } else {
      alert('Du har valt för många din jävel');
    }
  }
});

function inputInfo() {
  $('.layout').after(/*html*/`<div class="booking-form"><form id="form" class="book-tickets">
    <input type="text" placeholder="Ange email..." id="email" />
    <input type="text" placeholder="Ange telefonnummer..." id="phonenumber" />
    <button type="submit" class="general-button" id="bookbtn" >Boka</button>
  </form></div>`);
 $('#form').submit(function() {
    if ($.trim($("#email").val()) === "" || $.trim($("#phonenumber").val()) === "") {
        alert('Var vänlig och fyll i alla fälten, tack!');
        return false;
    } else {
      alert('Tack för din bokning!')
    }
});
}