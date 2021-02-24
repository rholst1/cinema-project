$('header').after(`<main></main>`);

$('main').append(`<section class="bookings"></section>`);

$('.bookings').prepend(`<h1 class="currentMovieTitleH1">MINA BOKNINGAR</h1>`);

$('main').append(`<div class="space"></div>`);

$('.space').prepend(`<br> <br>`);

$('.space').after(`<form class="get-booking">
  <input type="text" class="other-button" placeholder="Ange email..." id="emailInput" />
  <button type="button" class="generalButton hoverable email-button">Hämta dina bokningar</button>
</form>`);


function listenToEmailButton() {
  $('form').on(
    {
      click: function () {
        $('.maindiv').remove();
        $('form').after(`<div class="maindiv"></div>`);

        $('.maindiv').prepend(
          `<br><br> <section class="col2"> <h1>  Bokningshistorik:  </h1> </section>`
        );

        queryDatabase();

        $('.col2').append(
          `<ul>
  
   </ul>`
        );
      },
    },
    '.email-button'
  );
}

listenToEmailButton();

let runQuery;

//Runs when user clicks "Hämta bokningar"
async function queryDatabase() {
  let inputEmail = document.getElementById('emailInput').value;
  runQuery = await db.run(/*sql*/ `
    SELECT * FROM Showings JOIN bookingHistory ON showingsID WHERE ID = showingsID AND email = '${inputEmail}';
  `);



  for (let {
    ID,
    filmID,
    auditorium,
    date,
    time,
    email,
    seats,
    showingsID,
  } of runQuery) {
    let queryHtml = /*HTML*/ `<li> Salong: ${auditorium} film: ${filmID} sittplats: ${seats} Datum och tid: ${date} ${time} </li>`;
    $('ul').append(queryHtml);
  }
}

