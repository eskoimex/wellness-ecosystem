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
    const scores = [90, 100, 60, 80, 70, 50, 40, 30];

    function* randomGenerator() {
      const shuffledScores = scores.sort((score) => Math.random() - 0.5)
      for (const val of shuffledScores) yield val;
    }
    
    const iterator = randomGenerator();
    
    for (let i = 0; i < scores.length; i++) 
    
    console.log(iterator.next().value);
    res.send(iterator.next().value);


  });

app.listen(config.port, () => console.log(`${config.name} is listening on the url ${config.host} at ` + config.port));
