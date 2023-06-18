const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/config.js');
var cors = require('cors');
//import {author} from './routes/auth.js'
dotenv.config();
const PORT =  5000;
const app = express();

// Connect to the database
connectDB();
app.use(express.json());
app.use(cors());


app.use('/api/auth/',require('./routes/auth.js'));

app.use('/api/notes',require('./routes/notes.js',));

app.listen(PORT, () => {
    console.log(`ApniBook app listening at http://localhost:${PORT}`);
  });