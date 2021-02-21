import Customer from '/script/Customer.js';

export default class DatabaseController {
  constructor() {
  }

  async addShowing(filmName,) {

  }
  async test() {
    let title = "Engelska";
    // You can run any query you want against it
    let result = await db.run(/*sql*/` 
      SELECT title FROM new_movie_list WHERE language="${title}";
  `);
    // Log the result of the query
    console.table(result);
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