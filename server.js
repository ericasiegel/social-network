// connect with mongoose
const mongoose = require('mongoose');
// connect with express
const express = require('express');
const app = express();

// connect to port or localhost 3001
const PORT = process.env.PORT || 3001;

// express middleware that parses incoming JSON data
app.use(express.json());
// express middleware that parses incoming string or array data
app.use(express.urlencoded({ extended: true }));
// express middleware that takes all of the contents of the 'public' folder and serves them as static assets. Useful for front end files
// app.use(express.static('public')); ** not sure if this will be needed **

// tell the server to use the routers in the Routes folder when ever an api is accessed.
app.use(require('./routes'));

// connect to mongoose database
// if MONGODB_URI exists then it will connect to that, otherwise it will connect to mongodb://localhost/social-network
// mongoose will check for the database and create it if it doesn't exist
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network',{
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// log mongo queries that are being executed
mongoose.set('debug', true);

// connect to localhost server
app.listen(PORT, () => console.log(`We are connected to localhost:${PORT}!!`))
