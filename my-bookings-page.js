
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
        `<br><br> <section class="col1"> <h1> Aktuella bokningar: </h1></section> <br> <hr> <br>
  <section class="col2"> <h1>  Bokningshistorik:  </h1> </section>`);

      $('.col1').append(
        `<ul>
   <li>(Salong 1) film: Hidden Figures kl 17.00 15/3-2021 </li>
   <li>(Salong 2) film: Hidden Fig kl 18.00 17/3-2021 </li>
   <li>(Salong 1) film: Hidden kl 17.00 19/3-2021 </li>
   </ul>`);

      $('.col2').append(
        `<ul>
   <li>(Salong 1) film: Hidden Figures kl 17.00 15/3-2021 </li>
   <li>(Salong 2) film: Hidden Fig kl 18.00 17/3-2021 </li>
   <li>(Salong 1) film: Hidden kl 17.00 19/3-2021 </li>
   </ul>`);

      //eventuell annan kod du vill köra
    }
  }, '.email-button');
}

listenToEmailButton();


let runQuery;

async function getBookings() {

  let inputEmail = document.getElementById("emailInput").value;

  let runQuery = await db.run(/*sql*/`
	  SELECT * FROM bookingHistory where email = ${inputEmail};
    SELECT * FROM Showings WHERE ID = showingsID IN bookingHistory WHERE email = ${inputEmail}; 
  `);

  console.log(runQuery);
  // console.table(runQuery);

  // let unpacked = runQuery.map(
  //   ([email, seats, showingsID, ID, filmID, auditorium, date, time]) => ({ email, seats, showingsID, ID, filmID, auditorium, date, time})
  // );
  // console.log('unpacked', unpacked);

  // $('.col1').append(
  //   `<ul>
  //  <li> ${auditorium} film: ${filmID} sittplats: ${seat} Datum och tid: ${date} ${time} </li>

  //  </ul>`);

}
getBookings();