let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
let logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// Import des routes
let UserRoutes = require('./routes/user.route')
// -----

let app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/user', UserRoutes)
// -----

// DB
let mongoose = require('mongoose');
let mongoDB = 'mongodb://127.0.0.1/Bod-Health';

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// -----

module.exports = app;
