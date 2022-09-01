//'use strict';
const express = require('express');

const app = express();


const cors = require('cors');
app.use(cors());
app.use(cors({ origin: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//var multer = require('multer');


console.log(__dirname)
// importing body parser middleware to parse form content from HTML
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))


app.use(bodyParser.json({limit: '25mb'}));

const config = require('./app/config/config');

//ROUTES
const authRoutes = require('./app/routes/auth.routes');
const onboardingRoutes = require('./app/routes/onboarding.routes');
const appointmentRoutes = require('./app/routes/appointment.routes');
const userRoutes = require('./app/routes/users.routes');


// BACK ENDPOINTS
app.use('/api/v1/auth/', authRoutes.routes);
app.use('/api/v1/', onboardingRoutes.routes);
app.use('/api/v1/', appointmentRoutes.routes);
app.use('/api/v1/', userRoutes.routes);


app.get("/", (req, res) => {
    //res.json({ message: "Welcome to Wellness Ecosystem back-end service. GOOD TO GO!" });
    // Array to store indexes which are left to access. 
// It helps in accessing values without repeating
var alreadyDone = [];

// Function picking random values from array
//const randomValueFromArray = (myArray) => {
  // If alreadyDone is empty then fill it will indexes equal
  // to the size of myArray

  let myArray = ["a", "b", "c", "d", "e", "f"]
  if (alreadyDone.length === 0) {
    for (var i = 0; i < myArray.length; i++) alreadyDone.push(i);
  }

  // Generate random number within the range of 
  // length of alreadyDone array
  var randomValueIndex = Math.floor(Math.random() * alreadyDone.length);
  
  // Getting unaccessed index of myArray using above 
  // random number
  var indexOfItemInMyArray = alreadyDone[randomValueIndex];

  // remove this index from alreadyDone array because
  // we are accessing it now.
  alreadyDone.splice(randomValueIndex, 1);

  // Get the value
    console.log(myArray[indexOfItemInMyArray])
    res.send(myArray[indexOfItemInMyArray])

//};

//randomValueFromArray(["a", "b", "c", "d", "e", "f"])
  });

app.listen(config.port, () => console.log(`${config.name} is listening on the url ${config.host} at ` + config.port));
