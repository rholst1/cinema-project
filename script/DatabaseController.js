import Customer from '/script/Customer.js';
import Film from '/script/Film.js';
import Showing from '/script/Showing.js';
import Auditorium from '/script/Auditorium.js';
export default class DatabaseController {
  constructor() {
  }
  /*showing object does not apply seat reservations*/
  async addShowing(showing) {
    await db.run(` 
      INSERT INTO Showings (filmID,auditorium,date,time) 
      VALUES (${showing.film.id}, ${showing.auditorium.id}, "${showing.date}", "${showing.getTime()}");
  `);
  }
  async addCustomer(customer) {
    await db.run(` 
      INSERT INTO Customer (name, email, phoneNr)
      VALUES ("${customer.name}","${customer.email}","${customer.phoneNr}");
  `);
  }
  /*returns array of film objects from selected column value (only single value).*/
  async getFilms(column, value) {
    if (column.localeCompare("name") === 0) value = '"' + value + '"';
    let result = await db.run(` 
      SELECT * FROM new_movie_list
      WHERE ${column}="${value}";
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
  async test() {
    let title = "Hidden Figures";
    // You can run any query you want against it
    let result = await db.run(/*sql*/` 
      SELECT * FROM new_movie_list WHERE title="${title}";
  `);
    // Log the result of the query
    console.log(result[0]);
    // You can ask the db which tables and views
    // that are in it
    console.log('All db tables', await db.tables());
    console.log('All db views', await db.views());
  }

  async getCustomer(email) {
    let customer = await db.run(` 
      SELECT name, email, phoneNr, ID
      FROM Customer
      where email="${email}"
  `);
    return new Customer(customer[0], customer[1], customer[2], customer[3]);
  }
  /*wip */
  async getBookings(customerID) {
    let bookings = await db.run(/*sql*/` 
      select distinct bookings.ID, Tickets.ID, Tickets.ticketType, ticketPrice, seatID, showingID
      from TicketPriceReference, Tickets
        (SELECT ID, ticketID
          FROM Bookings
          WHERE customerID=${customerID}) AS bookings
      WHERE bookings.ticketID = ticketID 
      AND Tickets.ticketType = TicketPriceReference.type
  `);
    // Log the result of the query
    console.table(bookings);

  }

  getBookingInfoDB(email) {
    let customer = getCustomer(email);
  }
}