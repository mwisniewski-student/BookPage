const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE'
}))

const books = require('./routes/books');
const addresses = require('./routes/addresses');
const authors = require('./routes/authors');
app.use('/books', books);
app.use('/addresses', addresses);
app.use('/authors', authors);

require('dotenv').config();
const dbConnData = {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DATABASE
};


mongoose
    .connect(`mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`)
    .then(response => {
        console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)
        const apiPort = process.env.PORT
        const apiHost = process.env.API_HOST;
        app.listen(apiPort, () => {
            console.log(`API server available from: http://${apiHost}:${apiPort}`);
        });
    })
    .catch(error => console.error('Error connecting to MongoDB', error));
