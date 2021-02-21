export default class Customer {
  /* Parameter expects: (String, String, String, []) - in order: 
  customer name, customer email address, customer phone number,
  a list of references to Booking-objects. The last argument is 
  optional.*/
  constructor(name, email, phoneNumber, id /*bookings*/) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.id = id;
    /*this.bookings = bookings;
    if (this.bookings == undefined) {
      this.bookings = [];
    }*/
  }
}