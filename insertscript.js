let filmID = [];

async function getData() {
  filmID = await db.run(`SELECT title FROM new_movie_list`);
  console.log(filmID);
}

function addShowings() {
  let ID = 1;
  let auditorium = ['1', '2'];
  let date = '2021-03-';
  let time = ['18:00', '21:30'];
  let day = 01;

  let i = 0;

  while (day < 29) {
    for (let n = 0; n < 2; n++) {
      for (let j = 0; j < 2; j++) {
        let query = /*sql*/ `INSERT INTO Showings (ID, filmID, auditorium, date, time)
                        VALUES (${ID},${filmID[i]},${
          auditorium[n]
        },${date.concat(day.toString())},${time[j]});`;
        db.run(query);
        id++;
      }
    }

    if (i === 5) {
      i = -1;
    }
    j = 0;
    i++;
    id++;
    day++;
  }

  function runScript() {
    getdata();
    //addShowings();
  }
}

runScript();
