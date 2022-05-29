import express from 'express';
import pkg from 'body-parser';
import cors from 'cors';
import auth_route from './routes/auth.routes.js';
import user_route from './routes/user.routes.js';
import post_route from './routes/post.routes.js';
import comment_route from './routes/comment.routes.js';
import db from './models/index.js';

const { urlencoded, json } = pkg;

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(urlencoded({ extended: false }));
app.use(json());

const Role = db.role;
const User = db.user;
const Post = db.post;
const Comment = db.comment;

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

    User.create({
        username: 'slz',
        email: 'matej@gmail.com',
        password: '$2a$08$lq36GIbxEE2d0nWS/XSpPOf.yJ43n22C.T.SubcUmi2jI96v8tnJe'
    });

    Post.create({
        id: 'test',
        name: 'Test',
        description: 'This is a description',
        path: 'test.jpg',
        likes: 0,
        userId: 1
    });

    Post.create({
        id: 'test1',
        name: 'Lucija',
        description: 'This is a description',
        path: 'test1.jpg',
        likes: 0,
        userId: 1
    });

    Comment.create({
        content: 'This is a comment.',
        userId: 1,
        postId: 'test'
    });

}

auth_route(app);
user_route(app);
post_route(app);
comment_route(app);

app.get('/', (request, response) => {
    console.log("GET");
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => console.log(`App listening on port ${port}!`));