export default class Customer {
  constructor(name, email, phoneNumber, bookings) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.bookings = bookings;
    if (this.bookings == undefined) {
      this.bookings = [];
    }
  }
}