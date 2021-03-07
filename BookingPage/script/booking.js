// Saves the customers information to the database
async function saveBooking(email, phonenumber, price) {
  db.run('BEGIN TRANSACTION');
  let result = await db.run(
    /*sql*/ `INSERT INTO Bookings (phonenumber, email, showingID, price) VALUES ('${phonenumber}', '${email}', ${showingID}, ${price})`
  );
  db.run('COMMIT');
  saveSeats(selectedSeatNrArray, result.lastInsertRowId);
}

// Saves the seats for the booking you just made with the bookingID and the seats you selected
async function saveSeats(selectedSeatNrArray, bookingIdNewest) {
  for (i = 0; i < selectedSeatNrArray.length; i++) {
    let seat = selectedSeatNrArray[i].match(/\d/g).join('');
    seat = parseInt(seat);
    db.run('BEGIN TRANSACTION');
    await db.run(/*sql*/ `UPDATE Seatings 
      SET bookingID = ${parseInt(bookingIdNewest)},
      status = "occupied"
       WHERE seatNumber = ${seat} 
       AND showingID = ${parseInt(showingID)}`);
  }
  db.run('COMMIT');
  renderConfirmation(bookingIdNewest);
}

// Finally when the booking is done, you get a confirmation of your booking
async function renderConfirmation(bookingIdNewest) {
  db.run('BEGIN TRANSACTION');
  let confirmation = await db.run(
    /*sql*/ `SELECT DISTINCT Showings.filmID, Showings.date, Showings.time, Seatings.seatNumber, Showings.auditorium, Bookings.price FROM Showings INNER JOIN Bookings ON (Bookings.ID =  ${bookingIdNewest}) INNER JOIN Seatings ON (Seatings.bookingID = ${bookingIdNewest}) WHERE Showings.ID = ${showingID}`
  );
  db.run('COMMIT');
  let { filmID, date, time, auditorium, price } = await confirmation[0];
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
  let seatNumbers = confirmation.map((ticket) => ticket.seatNumber);
  seatNumbers = seatNumbers.join(',');

  $('.stol').append(`${seatNumbers}`);
}
