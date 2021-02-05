import Cinema from '/Cinema.js';
//create a cinema with 4x4 seats
let cinema = new Cinema([4, 4, 4, 4]);
//clear .seat-selectors before we update it
$('.seat-selectors').html('');
//   <button type="button" value="0_0">0_0</button>
$('.seat-selectors').css('grid-template-columns', 'repeat(4, 1fr)');

for (let row = 0; row < 4; row++) {
  for (let col = 0; col < 4; col++) {
    $('.seat-selectors').append(`<button type="button" value="${col}_${row}">${col}_${row}</button>`)
  }
}
console.log('test');