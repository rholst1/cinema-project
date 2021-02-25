import Customer from '/script/Customer.js';
import Film from '/script/Film.js';
import Showing from '/script/Showing.js';
import Auditorium from '/script/Auditorium.js';
import Ticket from '/script/Ticket.js';
import Booking from '/script/Booking.js';

export default class DatabaseController {
  constructor() {
  }
  /*Add a showing to db from a Showing object. Does not apply seat reservations*/
  async addShowing(showing) {
    db.run("BEGIN TRANSACTION");
    await db.run(` 
      INSERT INTO Showings (filmID,auditorium,date,time) 
      VALUES (${showing.film.id}, ${showing.auditorium.id}, "${showing.date}", "${showing.time}");
  `);
    db.run("COMMIT");
  }
  async addReservedSeats(booking) {
    for (let ticket of booking.tickets) {
      db.run("BEGIN TRANSACTION");
      let result = await db.run(`
      INSERT INTO Seatings (seatNumber, showingID, status) 
      VALUES (${ticket.seatNumber}, ${booking.showing.id}, "reserved");`);
      db.run("COMMIT");
    }
  }
  async getReservedSeats(showingID) {
    db.run("BEGIN TRANSACTION");
    let result = await db.run(` 
      SELECT seatNumber FROM Seatings
      WHERE showingID=${showingID} 
      AND status="reserved";
  `);
    db.run("COMMIT");
    let seatNumbers = []
    result.map((seat) => seatNumbers.push(seat.seatNumber));
    return seatNumbers;
  }
  async getBookingID(booking) {
    db.run("BEGIN TRANSACTION");
    let result = await db.run(` 
      SELECT ID FROM Bookings
      WHERE showingID=${booking.showing.id} 
      AND customerID=${booking.customer.id};
  `);
    db.run("COMMIT");
    return result[0];
  }
  async addBooking(booking) {
    db.run("BEGIN TRANSACTION");
    let result = await db.run(`
    INSERT INTO Bookings (customerID, showingID) 
    VALUES (${booking.customer.id}, ${booking.showing.id});`);
    db.run("COMMIT");
    return result.lastInsertRowId;
  }

  async addTickets(booking) {
    for (let ticket of booking.tickets) {
      db.run("BEGIN TRANSACTION");
      await db.run(` 
      INSERT INTO Tickets (bookingID, seatNumber, ticketType)
      VALUES (${booking.id},${ticket.seatNumber},"${ticket.ticketType}");`);
      db.run("COMMIT");
    }
  }
  /*Add a customer from a customer object.*/
  async addCustomer(customer) {
    db.run("BEGIN TRANSACTION");
    let result = await db.run(` 
      INSERT INTO Customer (name, email, phoneNr)
      VALUES ($name, $email, $phoneNr);
  `, {
      name: customer.name,
      email: customer.email,
      phoneNr: customer.phoneNr
    });
    db.run("COMMIT");
    return result.lastInsertRowId;
  }
  /* Get all bookings belonging to a customer from their customer ID */
  async getBookings(email) {
    let customer = this.getCustomer(email);
    db.run("BEGIN TRANSACTION");
    let result = await db.run(` 
      SELECT * FROM Bookings
      WHERE customerID=${customer.id};`);
    db.run("COMMIT");
    let bookings = [];
    for (let booking of result) {
      bookings.push(
        new Booking(
          this.getShowings("ID", booking.showingID),
          customer, this.getTickets(booking.ID)));
    }
    return bookings;
  }
  async getTicketPrice(ticketType) {
    db.run("BEGIN TRANSACTION");
    let result = await db.run(` 
      SELECT price FROM TicketPriceReference
      WHERE type="${ticketType}";`);
    db.run("COMMIT");
    return result[0];
  }
  /*Takes in ticket id. */
  async getTickets(bookingID) {
    db.run("BEGIN TRANSACTION");
    let result = await db.run(` 
      SELECT * FROM Tickets
      WHERE ID="${bookingID}";`);
    db.run("COMMIT");
    let tickets = [];
    for (let ticket of result) {
      tickets.push(new Ticket(ticket.seatNumber, ticket.ticketType,
        this.getTicketPrice(ticket.ticketType), ticket.ID));
    }
    return tickets;
  }
  /*returns array of film objects from selected column value (only single value).*/
  async getFilms(column, value) {
    if (column.localeCompare("name") === 0) value = '"' + value + '"';
    db.run("BEGIN TRANSACTION");
    let result = await db.run(` 
      SELECT * FROM new_movie_list
      WHERE ${column}=${value};
  `);
    db.run("COMMIT");
    let films = [];
    for (let film of result) {
      films.push(await new Film(film.title, film.productionCountries, film.productionYear, film.length,
        film.genres, film.ageGroup, film.language, film.subtitles, film.director, film.actors,
        film.description, film.detailedDescription, film.ID));
    }
    return films;
  }
  /* Only works with columns ID and name */
  async getAuditorium(column, value) {
    db.run("BEGIN TRANSACTION");
    if (column.localeCompare("name") === 0) value = '"' + value + '"';
    let result = await db.run(` 
      SELECT * FROM Auditorium WHERE ${column}=${value}
      ORDER BY  ID,
                rowNumber ASC;
  `);
    db.run("COMMIT");
    let seatsPerRow = [];
    for (let seatRow of result) {
      seatsPerRow.push(seatRow.seatsAtRow);
    }
    let name = result[0].name;
    let id = result[0].ID;
    return new Auditorium(seatsPerRow, name, id);
  }
  /*returns all films as film objects*/
  async getAllFilms() {
    db.run("BEGIN TRANSACTION");
    let result = await db.run(` 
      SELECT * FROM new_movie_list;
  `);
    db.run("COMMIT");
    let films = [];
    for (let film of result) {
      films.push(new Film(film.title, film.productionCountries, film.productionYear, film.length,
        film.genres, film.ageGroup, film.language, film.subtitles, film.director, film.actors,
        film.description, film.detailedDescription, film.ID));
    }
    return films;
  }
  /* Only single column, doesn't check if seat availability*/
  async getShowings(column, value) {
    db.run("BEGIN TRANSACTION");
    if (column.localeCompare("name") === 0) value = '"' + value + '"';
    let result = await db.run(` 
      SELECT * FROM Showings
      WHERE ${column} = ${value} 
      ORDER BY date ASC;
  `);
    db.run("COMMIT");
    let showings = [];
    for (let showing of result) {
      showings.push(
        new Showing(
          await this.getAuditorium("ID", showing.auditoriumID),
          (await this.getFilms("ID", showing.filmID))[0],
          showing.date,
          showing.time, showing.ID, await this.getReservedSeats(showing.ID))
      );
    }
    return showings;
  }

  async getCustomer(email) {
    db.run("BEGIN TRANSACTION");
    let result = await db.run(` 
      SELECT *
      FROM Customer
      where email="${email}";
  `);
    db.run("COMMIT");
    let customer = result[0];
    return new Customer(customer.name, customer.email, customer.phoneNr, customer.ID);
  }
}