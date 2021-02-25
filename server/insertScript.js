// This code inserted into index.js can run this query straight into the DB.
// Wrote this script to add all the showings automatically.

let filmID = [];
let filmID2 = [];
function getTitle(filmID) {
  filmID = filmID.title;
  return filmID;
}
async function getData() {
  filmID = await db.run(`SELECT title FROM new_movie_list`);
  filmID2 = filmID.map(getTitle);
  console.log(filmID2);
  await addShowings(filmID);
}
async function addShowings() {
  let ID = 1;
  let auditorium = ['1', '2'];
  let date = '2021-03-';
  let time = ['18:00', '21:30'];
  let day = 0o1;
  let i = 0;
  while (day < 29) {
    for (let n = 0; n < 2; n++) {
      for (let j = 0; j < 2; j++) {
        let query =
          /*sql*/ 'INSERT INTO Showings (ID, filmID, auditorium, date, time) VALUES (' +
          ID +
          ",'" +
          filmID2[i] +
          "','" +
          auditorium[n] +
          "','" +
          date.concat(day.toString()) +
          "','" +
          time[j] +
          "');";
        console.log(query);
        //await db.run(query);
        ID++;
        i++;
        if (i === filmID2.length - 1) {
          i = 0;
        }
      }
    }
    day++;
  }
}
function runScript() {
  getData();
}
runScript();

//add seatings

async function addSeatings() {
  let showingID = 1;
  let status = 'empty';

  while (showingID < 113) {
    for (let seatNumber = 1; seatNumber < 201; seatNumber++) {
      let query = /*sql*/ `INSERT INTO Seatings (seatNumber, showingID, status) VALUES (${seatNumber}, ${showingID}, '${status}')`;
      console.log(query);
      await db.run(query);
    }
  }
  showingID++;
}
