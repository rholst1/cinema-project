export default class Customer {
  /* Parameter expects: (String, String, String, []) - in order: 
  customer name, customer email address, customer phone number,
  a list of references to Booking-objects. The last argument is 
  optional.*/
  constructor(name, email, phoneNr, id /*bookings*/) {
    this.name = name;
    this.email = email;
    this.phoneNr = phoneNr;
    if (id != undefined) {
      this.id = id;
    }
    /*this.bookings = bookings;
    if (this.bookings == undefined) {
      this.bookings = [];
    }*/
  }
}