import Customer from '/script/Customer.js';
import Film from '/script/Film.js';
export default class DatabaseController {
  constructor() {
  }
  /*showing object does not apply seat reservations*/
  async addShowing(showing) {

    let result = await db.run(` 
      INSERT INTO Showings (filmID,auditorium,date,time) 
      VALUES (${showing.film.id}, ${showing.auditorium.id}, "${showing.date}", "${showing.getTime()}");
  `);
  }
  async addCustomer(customer) {
    await db.run(` 
      INSERT INTO Customer (name, email, phoneNr) VALUES ("${customer.name}","${customer.email}","${customer.phoneNr}");
  `);
  }
  /*returns film object from film title*/
  async getFilm(title) {
    let result = await db.run(` 
      SELECT * FROM new_movie_list WHERE title="${title}";
  `);
    film = result[0];
    return new Film(film.title, film.productionCountries, film.productionYear, film.length,
      film.genres, film.ageGroup, film.language, film.subtitles, film.director, film.actors,
      film.description, film.detailedDescription, film.ID);
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
    // You can run any query you want against it
    let customer = await db.run(/*sql*/` 
      SELECT name, email, phoneNr, ID
      FROM Customer
      where email=${email}
  `);
    // Log the result of the query
    console.table(customer);
    // You can ask the db which tables and views
    // that are in it
    console.log('All db tables', await db.tables());
    console.log('All db views', await db.views());
    return new Customer(customer[0], customer[1], customer[2], customer[3]);
  }

  async getBookings(customerID) {
    // You can run any query you want against it
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