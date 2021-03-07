// Saves the customers information to the database
async function saveBooking(email, phonenumber, price) {
  db.run('BEGIN TRANSACTION');
  await db.run(
    /*sql*/ `INSERT INTO Bookings (phonenumber, email, showingID, price) VALUES ('${phonenumber}', '${email}', ${showingID}, ${price})`
  );
  db.run('COMMIT');
  getBookingID(email);
}

// Gets the bookingID of the current booking
async function getBookingID(email) {
  let bookingID = await db.run(
    /*sql*/ `SELECT * FROM Bookings WHERE email = '${email}' AND showingID = ${showingID}`
  );

  let bookingIdNewest = 0;
  for (let { ID } of bookingID) {
    if (bookingIdNewest < ID) {
      bookingIdNewest = ID;
    }
  }
  saveSeats(selectedSeatNrArray, bookingIdNewest);
}

// Saves the seats for the booking you just made with the bookingID and the seats you selected
async function saveSeats(selectedSeatNrArray, bookingIdNewest) {
  for (i = 0; i < selectedSeatNrArray.length; i++) {
    let seat = selectedSeatNrArray[i].match(/\d/g).join('');
<<<<<<< HEAD
    seat = parseInt(seat);
    db.run('BEGIN TRANSACTION');
    await db.run(/*sql*/ `UPDATE Seatings 
      SET bookingID = ${parseInt(bookingIdNewest)},
      status = "occupied"
       WHERE seatNumber = ${seat} 
       AND showingID = ${parseInt(showingID)}`);
=======
    db.run('BEGIN TRANSACTION');
    await db.run(
      /*sql*/ `UPDATE Seatings SET status = "occupied", bookingID = ${bookingIdNewest} WHERE seatNumber = ${seat} AND showingID = ${showingID}`
    );
>>>>>>> parent of 63bd406 (Fixed type error in db comms during booking. Listen to header items and update url accordingly. Build url for specific movie in moreinfo page and ticket page. Fixed some global variables from getting declared multiple times. Changed listeners in ticket page be killed off to avoid duplicates. Removed unnecesary function for getting last bookingID.)
  }
  db.run('COMMIT');
  renderConfirmation(bookingIdNewest);
}

// Finally when the booking is done, you get a confirmation of your booking
async function renderConfirmation(bookingIdNewest) {
  let confirmation = await db.run(
    /*sql*/ `SELECT DISTINCT Showings.filmID, Showings.date, Showings.time, Seatings.seatNumber, Showings.auditorium, Bookings.price FROM Showings INNER JOIN Bookings ON (Bookings.ID =  ${bookingIdNewest}) INNER JOIN Seatings ON (Seatings.bookingID = ${bookingIdNewest}) WHERE Showings.ID = ${showingID}`
  );
<<<<<<< HEAD
  db.run('COMMIT');
=======

>>>>>>> parent of 63bd406 (Fixed type error in db comms during booking. Listen to header items and update url accordingly. Build url for specific movie in moreinfo page and ticket page. Fixed some global variables from getting declared multiple times. Changed listeners in ticket page be killed off to avoid duplicates. Removed unnecesary function for getting last bookingID.)
  let { filmID, date, time, auditorium, price } = confirmation[0];
  $('.layout').replaceWith(
    /*html*/
    `<div class="tack"></div>`
  );
  $('.actual-booking').remove();
  $('.booking-form').remove();
  $('.tack').append(/*html*/ `
    <div class="completed-booking">
    <h1>Tack för din bokning!</h1>
      <h2>Film: ${filmID}</h2>
      <h3>
       Datum: ${date}  
      </h3>
      <h3>Tid: ${time}</h3>
      <h3>Salong: ${auditorium}</h3>
      <h3 class="stol"> Stolsnummer: </h3>
      <h3>Total pris: ${price}kr </h3>
    </div>`);
<<<<<<< HEAD
  let seatNumbers = confirmation.map((ticket) => ticket.seatNumber);
  seatNumbers = seatNumbers.join(',');
=======
>>>>>>> parent of 63bd406 (Fixed type error in db comms during booking. Listen to header items and update url accordingly. Build url for specific movie in moreinfo page and ticket page. Fixed some global variables from getting declared multiple times. Changed listeners in ticket page be killed off to avoid duplicates. Removed unnecesary function for getting last bookingID.)

  let n = 0;
  for (let { seatNumber } of confirmation) {
    let html = '';

    if (n > 0) {
      html += ' ,';
    }
    html += `${seatNumber}`;
    $('.stol').append(`${html}`);
    n++;
  }
}
