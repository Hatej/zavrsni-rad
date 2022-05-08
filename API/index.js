import express from 'express';
import pkg from 'body-parser';
import cors from 'cors';
import auth_route from './routes/auth.routes.js';
import user_route from './routes/user.routes.js';

const { urlencoded, json } = pkg;

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(urlencoded({ extended: false }));
app.use(json());

import db from './models/index.js';
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: 'user'
    });

    Role.create({
        id: 2,
        name: 'moderator'
    });

    Role.create({
        id: 3,
        name: 'admin'
    });
}

auth_route(app);
user_route(app);

app.get('/', (request, response) => {
    console.log("GET");
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => console.log(`App listening on port ${port}!`));