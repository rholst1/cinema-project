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
          `<br><br> <section class="col2"> <h1>  Bokningar:  </h1> </section>`
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
let fullDate;
let time;

//currentDateAndTime();

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


    let today = new Date();
    let leadingZero = today.getFullYear() + ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2);
    console.log("date today with leading zero", leadingZero);

    let todayDateInt = parseInt(leadingZero);
    console.log("parsed int", todayDateInt);

    let parts = `${date}`.split('-');
    let movieDate = new Date(parts[0], parts[1] - 1, parts[2]);

    let movieLeadingZero = movieDate.getFullYear() + ('0' + (movieDate.getMonth() + 1)).slice(-2) + ('0' + movieDate.getDate()).slice(-2);
    console.log("MOVIE DATE WITH LEADING ZERO", movieLeadingZero);

    let movieIntDate = parseInt(movieLeadingZero);

    console.log("MOVIEDATE PARSED INT", movieIntDate);

    // let deleteQuery = await db.run(/*sql*/ `
    // DELETE FROM bookingHistory WHERE showingsID = '${showingsID}' AND email = '${inputEmail}';
    // `);

    if (movieIntDate >= todayDateInt) {
      let queryHtml = /*HTML*/ `<li class="kommandevisning"> Kommande visning: Salong: ${auditorium} Film: ${filmID} Sittplats: ${seats} Datum och tid: ${date} ${time} 
    <br> <button class="general-button removeButton" onclick="alert('Biljett avbokad!')" id="delete">Avboka</button></li>
    `;
      $('ul').append(queryHtml);


      $('.removeButton').on('click', async () => {
        db.run("BEGIN TRANSACTION")
        console.log("data", showingsID, email);
        let result = await db.run(/*sql*/`
      DELETE FROM bookingHistory WHERE showingsID = $showingsID AND email = $email;
    `, { showingsID, email });

        console.log("result", result);

      });

    }

    if (movieIntDate < todayDateInt) {
      let queryHtml = /*HTML*/ `<li> Salong: ${auditorium} film: ${filmID} sittplats: ${seats} Datum och tid: ${date} ${time} </li> `;
      $('ul').append(queryHtml);
    }
  }
}

db.run("COMMIT");

// async function currentDateAndTime() {

//   let currentDate = new Date();
//   let cDay = currentDate.getDate();
//   let cMonth = currentDate.getMonth() + 1;
//   let cYear = currentDate.getFullYear();
//   fullDate = "" + cYear + cMonth + cDay;
//   console.log("d", fullDate);

//   let dateInt = parseInt(fullDate);
//   console.log("parsed int", dateInt);

//   time = "" + currentDate.getHours() + currentDate.getMinutes();
//   console.log("kl", time);

// }




