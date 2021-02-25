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

currentDateAndTime();

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

    //add if statement for kommande visningar vs history
    //in the kommande visningar if statement, add avboka knapp

    let parts = `${date}`.split('-');

    let mydate = new Date(parts[0], parts[1] - 1, parts[2]);

    let dateToString = mydate.toDateString();
    console.log(dateToString);

    if (dateToString >= fullDate) {
      let queryHtml = /*HTML*/ `<li class= "kommandevisning"> Kommande visning : Salong: ${auditorium} film: ${filmID} sittplats: ${seats} Datum och tid: ${date} ${time} <br> <button class="general-button removeButton" onclick = "remove booking" id ="delete">Avboka</button ></li> 
      `;
      $('ul').append(queryHtml);
    }
    if (dateToString <= fullDate) {
      let queryHtml = /*HTML*/ `<li> Salong: ${auditorium} film: ${filmID} sittplats: ${seats} Datum och tid: ${date} ${time} </li>`;
      $('ul').append(queryHtml);
    }
  }
}


async function currentDateAndTime() {

  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();
  console.log(cYear + "-" + cMonth + "-" + cDay);
  fullDate = cYear + "-" + cMonth + "-" + cDay;

  time = currentDate.getHours() + ":" + currentDate.getMinutes();
  console.log(time);
}
