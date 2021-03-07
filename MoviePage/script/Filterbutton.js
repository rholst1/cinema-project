if (typeof button !== 'undefined') {
  let button
}

button = $('.btn').click(function () {
  if (this.id == 'all') {
    $('.currentMovies > .movie-container').fadeIn(450);
  } else {
    let age = $('.' + this.id).fadeIn(450);
    $('.currentMovies > .movie-container').not(age).hide();
  }
  button.removeClass('active');
  $(this).addClass('active');
});

$(document).ready(function () {
  $('#toggle').click(function () {
    $('.btn').toggle();
  });
});

$(function () {
  $('#toggle').click(function () {
    $(this).text(function (i, text) {
      return text === 'Visa filter' ? 'Dölj filter' : 'Visa filter';
    });
  });
});
