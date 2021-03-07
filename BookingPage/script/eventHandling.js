

// Eventhandler for choosing movie
$('#toggle').click(function () {
  $('.dropdown-content').show();
});
$('.dropdown-content').click(hideMenu).mouseleave(hideMenu);
function hideMenu() {
  $('.dropdown-content').hide();
}

// Eventhandler for choosing specifik movie and showing
$('.showings-container').on('click', '#book', function () {
  $('h1').remove();
  $('.selectedShowing').remove();
  renderTicketChooser();
  selectedSeatNrArray.length = 0;
  showingID = $(this).val();
});

// Eventhandler for confirming your amount of tickets
$('main').on('click', '#continue-button', function () {
  $('.ticket-container').remove();
  $('.continue-container').remove();
  renderSeatChooser(showingID);
  inputInfo();
  selectedSeats();
});
// Eventhandler for selecting seats 
$('main').on('click', '.seat', function () {
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

