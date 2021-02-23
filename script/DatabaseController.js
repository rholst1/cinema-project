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
    await db.run(` 
      INSERT INTO Showings (filmID,auditorium,date,time) 
      VALUES (${showing.film.id}, ${showing.auditorium.id}, "${showing.date}", "${showing.time}");
  `);
  }
  async addBooking(booking) {
    //add customer (if already added nothing will happen since email, phoneNr is unique)
    this.addCustomer(booking.customer);
    //get customer ID (should be added through auto incrementing in the db if new customer)
    let customerID = (this.getCustomer(booking.customer.email)).id;
    let showingID = booking.showing.id;
    console.log("showingID: " + showingID + "  customerID: " + customerID);
    await db.run(` 
      INSERT INTO Bookings (showingID, customerID)
      VALUES (${showingID},${customerID});
  `);
    //get booking ID so we can add the tickets

    let result = await db.run(` 
      SELECT ID FROM Bookings WHERE showingID="${showingID}" AND customerID="${customerID}";
  `);

    let bookingID = result[0];
    this.addTickets(booking.tickets, bookingID);
  }
  async addTickets(tickets, bookingID) {
    //TODO make single query
    for (let ticket of tickets) {
      await db.run(` 
      INSERT INTO Tickets (bookingID, seatNumber, type)
      VALUES (${bookingID},${ticket.seatNumber},${ticket.ticketType});
  `);
    }
  }
  /*Add a customer from a customer object.*/
  async addCustomer(customer) {
    await db.run(` 
      INSERT INTO Customer (name, email, phoneNr)
      VALUES ("${customer.name}","${customer.email}","${customer.phoneNr}");
  `);
  }
  /* Get all bookings belonging to a customer from their customer ID */
  async getBookings(email) {
    let customer = this.getCustomer(email);
    let result = await db.run(` 
      SELECT * FROM Bookings
      WHERE customerID=${customer.id};`);
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
    let result = await db.run(` 
      SELECT price FROM TicketPriceReference
      WHERE type="${ticketType}";`);
    return result[0];
  }
  /*Takes in ticket id. */
  async getTickets(bookingID) {
    let result = await db.run(` 
      SELECT * FROM Tickets
      WHERE ID="${bookingID}";`);
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
    let result = await db.run(` 
      SELECT * FROM new_movie_list
      WHERE ${column}=${value};
  `);
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
    if (column.localeCompare("name") === 0) value = '"' + value + '"';
    let result = await db.run(` 
      SELECT * FROM Auditorium WHERE ${column}=${value}
      ORDER BY  ID,
                rowNumber ASC;
  `);
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
    let result = await db.run(` 
      SELECT * FROM new_movie_list;
  `);
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
    if (column.localeCompare("name") === 0) value = '"' + value + '"';
    let result = await db.run(` 
      SELECT * FROM Showings WHERE ${column}=${value} ORDER BY date ASC;
  `);
    let showings = [];
    for (let showing of result) {
      showings.push(
        new Showing(
          await this.getAuditorium("ID", showing.auditoriumID),
          (await this.getFilms("ID", showing.filmID))[0],
          showing.date,
          showing.time, showing.ID));
    }
    return showings;
  }

  async getCustomer(email) {
    let result = await db.run(` 
      SELECT *
      FROM Customer
      where email="${email}"
  `);
    let customer = result[0];
    return new Customer(customer.name, customer.email, customer.phoneNr, customer.ID);
  }
  /*wip 
  async getBookings(customerID) {
    let bookings = await db.run(` 
      select distinct bookings.ID, Tickets.ID, Tickets.ticketType, ticketPrice, seatID, showingID
      from TicketPriceReference, Tickets
        (SELECT ID, ticketID
          FROM Bookings
          WHERE customerID=${customerID}) AS bookings
      WHERE bookings.ticketID = ticketID 
      AND Tickets.ticketType = TicketPriceReference.type
  `);

    console.table(bookings);

  }

  getBookingInfoDB(email) {
    let customer = getCustomer(email);
  }*/
}