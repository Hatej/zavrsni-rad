import express from 'express';
import pkg from 'body-parser';
import cors from 'cors';
import db from './queries';

const { urlencoded, json } = pkg;

const app = express();
const port = 3000;

app.use(cors());

app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (request, response) => {
    console.log("GET");
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => console.log(`App listening on port ${port}!`));