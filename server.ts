import express, { Express } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

import users from './controllers/users';
import posts from './controllers/posts';
import comments from './controllers/comments';

const app: Express = express();
const DB_URI = "<YOUR DATABASE URL>"; //mongodb://localhost:27017
const options: ConnectOptions = {
    dbName: "<YOUR DATABASE NAME>",
}

const port = 3000;
app.use(express.json());

app.use("/users", users);
app.use("/posts", posts);
app.use("/comments", comments);

mongoose.connect(DB_URI, options).then(() => {
    console.log(`⚡ | Database connection successful`);
}).catch((error) => {
    console.log(error);
})

app.listen(port, () => {
    console.log(`⚡ | Server is running at http://localhost:${port}`);
})