$('header').after(`<main></main>`);

$('main').append(`<section class="bookings"></section>`);

$('.bookings').prepend(`<h1 class="currentMovieTitleH1">MINA BOKNINGAR</h1>`);

$('main').append(`<div class="space"></div>`);

$('.space').prepend(`<br> <br>`);

function listenToEmailButton() {
  $('form').on(
    {
      click: function () {
        console.log('hej knapp');
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

<<<<<<< Updated upstream
async function getBookings() {


  let inputEmail = document.getElementById("emailInput").value;

  runQuery = await db.run(/*sql*/`
=======
//Runs when user clicks "Hämta bokningar"
async function queryDatabase() {
  let inputEmail = document.getElementById('emailInput').value;
  runQuery = await db.run(/*sql*/ `
>>>>>>> Stashed changes
    SELECT * FROM Showings JOIN bookingHistory ON showingsID WHERE ID = showingsID AND email = '${inputEmail}';
  `);

  console.log(runQuery);
  console.table(runQuery);

<<<<<<< Updated upstream
  for (let { ID, filmID, auditorium, date, time, email, seats, showingsID } of runQuery) {
    // let [ID, filmID, auditorium, date, time, email, seats, showingsID] = runQuery[i];

    console.log(`

    Hi! I am ${email}

    and I am ${date} years old!

  `);



=======
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
    let queryHtml = /*HTML*/ `<div><p color=white>${date} ${time} ${filmID} ${auditorium} ${seats}</p></div>`;
    $('ul').append(queryHtml);
>>>>>>> Stashed changes
  }
}

// async function getBookings() {
//   let inputEmail = document.getElementById('emailInput').value;

//   let unpacked = runQuery.map(
//     ([ID, filmID, auditorium, date, time, email, seats, showingsID]) => ({
//       ID,
//       filmID,
//       auditorium,
//       date,
//       time,
//       email,
//       seats,
//       showingsID,
//     })
//   );
//   console.log('unpacked', unpacked);

// for (let { ID, filmID, auditorium, date, time, email, seats, showingsID } of unpacked) {
//   $('.col2 ul').append(
//   `<li> Salong: ${auditorium} film: ${filmID} sittplats: ${seat} Datum och tid: ${date} ${time} </li>`);
// }
//}
// getBookings();
