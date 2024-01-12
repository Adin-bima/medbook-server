require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan')
const cookieParser = require('cookie-parser');
var api = require('./routes/api')
const cors = require('cors');
var extendResponse = require('./helper/response-formatter')

// connect to db
const mongoUri = process.env.MONGODB_URI

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });
  
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your allowed origin
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};

// setup server
var app = express();
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  extendResponse(res);
  next();
});


// run the app as api
api.run(app)

// setup server port and the callbacks
port = process.env.PORT
app.set('port', port);
app.listen(port);
app.on('error', onError);
app.on('listening', onListening);

// callbacks
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      console.error(error);
      throw error;
  }
}

function onListening() {
  var addr = app.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.info('Listening on ' + bind);
}