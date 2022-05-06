const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ZavrsniRad',
    password: 'bazepodataka',
    port: 5432,
});

const getUsers = (request, response) => {
    pool.query('---SQL---', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

module.exports = {
    getUsers
}