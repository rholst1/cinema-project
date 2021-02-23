export default class Booking {
  /*Expected parameter (Showing, Customer, []) the array should contain Ticket objects.*/
  constructor(showing, tickets, customer, id) {
    this.showing = showing;
    this.tickets = tickets;
    this.customer = customer;
    if (id != undefined) {
      this.id = id;
    }
  }
}