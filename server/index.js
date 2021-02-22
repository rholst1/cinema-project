const path = require("path");
console.log(__dirname)

require('best-sqlite3-frontend')({
  bestSqlite3: require('best-sqlite3'),
  databasePath: './new_movie_db.db',
  addDatabaseFunctions: {
    // example of user defined functions
    // (write your own as you go...)
    UP: x => x.toUpperCase(),
    LOW: x => x.toLowerCase()
  },
  express: require('express'),
  port: 3000,
  staticFolder: path.basename('..')
}).then(({ app, db }) => {
  // if you want to you can
  // do more things with the express app 
  // and the db connection here...
});