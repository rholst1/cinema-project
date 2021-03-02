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
    db.run('BEGIN TRANSACTION');
    await db.run(
      /*sql*/ `UPDATE Seatings SET status = "occupied", bookingID = ${bookingIdNewest} WHERE seatNumber = ${seat} AND showingID = ${showingID}`
    );
  }
  db.run('COMMIT');
  renderConfirmation(bookingIdNewest);
}

// Finally when the booking is done, you get a confirmation of your booking
async function renderConfirmation(bookingIdNewest) {
  let confirmation = await db.run(
    /*sql*/ `SELECT DISTINCT Showings.filmID, Showings.date, Showings.time, Seatings.seatNumber, Showings.auditorium, Bookings.price FROM Showings INNER JOIN Bookings ON (Bookings.showingID = Showings.ID) INNER JOIN Seatings ON (Seatings.bookingID = ${bookingIdNewest}) WHERE Showings.ID = ${showingID}`
  );

  let { filmID, date, time, auditorium, price } = confirmation[0];
  $('.layout').replaceWith(
    /*html*/
    `<div class="tack" ><h1>Tack för din bokning!</h1></div>`
  );
  $('.actual-booking').remove();
  $('.booking-form').remove();
  $('.tack').append(/*html*/ `
    <div class="färdigbokningLOL">
      <h2>Film: ${filmID}</h2>
      <h3>
       Datum: ${date}  
      </h3>
      <h3>Tid: ${time}</h3>
      <h3>Salong: ${auditorium}</h3>
      <h3 class="stol"> Stolsnummer: </h3>
      <h3>Total pris: ${price}kr </h3>
    </div>`);

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
