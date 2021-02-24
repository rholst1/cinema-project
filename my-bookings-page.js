
$('header').after(`<main></main>`);

$('main').append(`<section class="bookings"></section>`);

$('.bookings').prepend(
  `<h1 class="currentMovieTitleH1">MINA BOKNINGAR</h1>`
);

$('main').append(`<div class="space"></div>`);

$('.space').prepend(
  `<br> <br>`
);

function listenToEmailButton() {
  $("form").on({
    click: function () {

      console.log("hej knapp");
      $('form').after(`<div class="maindiv"></div>`);

      $('.maindiv').prepend(
        `<br><br> <section class="col2"> <h1>  Bokningshistorik:  </h1> </section>`);

      $('.col2').append(
        `<ul>
  
   </ul>`);

    }
  }, '.email-button');
}


listenToEmailButton();

let runQuery;

async function getBookings() {


  let inputEmail = document.getElementById("emailInput").value;

  let runQuery = await db.run(/*sql*/`
    SELECT * FROM Showings JOIN bookingHistory ON showingsID WHERE ID = showingsID AND email = '${inputEmail}';
  `);

  console.log(runQuery);
  console.table(runQuery);

  for (i = 0; i < runQuery.length; i++) {
    let [ID, filmID, auditorium, date, time, email, seats, showingsID] = runQuery[i];

    console.log(`

    Hi! I am ${email}

    and I am ${date} years old!

  `);

  }
  let unpacked = runQuery.map(
    ([ID, filmID, auditorium, date, time, email, seats, showingsID]) => ({ ID, filmID, auditorium, date, time, email, seats, showingsID })
  );
  console.log('unpacked', unpacked);


  // for (let { ID, filmID, auditorium, date, time, email, seats, showingsID } of unpacked) {
  //   $('.col2 ul').append(
  //   `<li> Salong: ${auditorium} film: ${filmID} sittplats: ${seat} Datum och tid: ${date} ${time} </li>`);
  // }

}
getBookings();