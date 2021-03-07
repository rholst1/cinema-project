// Eventhandler for choosing movie
$('#toggle').click(function () {
  $('.dropdown-content').show();
});
$('.dropdown-content').click(hideMenu).mouseleave(hideMenu);
function hideMenu() {
  $('.dropdown-content').hide();
}

// Eventhandler for choosing specifik movie and showing
$(document).on('click', '#book', function () {
  $('h1').remove();
  $('.selectedShowing').remove();
  renderTicketChooser();
  selectedSeatNrArray.length = 0;
  showingID = $(this).val();
});

// Eventhandler for confirming your amount of tickets
<<<<<<< HEAD
<<<<<<< HEAD
$('main').on('click', '#continue-button', function () {
=======
$(document).on('click', '#continue-button', function () {
>>>>>>> parent of 63bd406 (Fixed type error in db comms during booking. Listen to header items and update url accordingly. Build url for specific movie in moreinfo page and ticket page. Fixed some global variables from getting declared multiple times. Changed listeners in ticket page be killed off to avoid duplicates. Removed unnecesary function for getting last bookingID.)
=======
$(document).on('click', '#continue-button', function () {
>>>>>>> parent of 63bd406 (Fixed type error in db comms during booking. Listen to header items and update url accordingly. Build url for specific movie in moreinfo page and ticket page. Fixed some global variables from getting declared multiple times. Changed listeners in ticket page be killed off to avoid duplicates. Removed unnecesary function for getting last bookingID.)
  $('.ticket-container').remove();
  $('.continue-container').remove();
  renderSeatChooser(showingID);
  inputInfo();
  selectedSeats();
});

// Eventhandler for selecting seats 
$(document).on('click', '.seat', function () {
  if ($(this).hasClass('seat') && !$(this).hasClass('occupied')) {
    if ($(this).hasClass('seat') && $(this).hasClass('selected')) {
      $(this).toggleClass('selected');
      function removeFromListByIndex(index) {
        selectedSeatNrArray.splice(index, 1);
      }
      index = selectedSeatNrArray.indexOf($(this).get(0).id);
      removeFromListByIndex(index);
      selectedSeats(selectedSeatNrArray);
    } else if (!(selectedSeatNrArray.length === totalAmountTickets)) {
      if ($(this).hasClass('seat') && !$(this).hasClass('occupied')) {
        $(this).toggleClass('selected');
        selectedSeatNrArray.push($(this).get(0).id);
      }
      selectedSeats(selectedSeatNrArray);
    } else {
      alert('Du har valt för många din jävel');
    }
  }
});
