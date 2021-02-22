export default class Booking {
  /*Expected parameter (Showing, Customer, []) the array should contain Ticket objects.*/
  constructor(showing, tickets, customer, id) {
    this.showing = showing;
    this.customer = customer;
    this.tickets = tickets;
    if (id != undefined) {
      this.id = id;
    }
  }
}