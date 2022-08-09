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

//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())

app.use(bodyParser.json({limit: '25mb'}));

/////
const config = require('./app/config/config');

//ROUTES
// const helpersRoutes = require('./app/routes/helpers.routes');
////////////
const authRoutes = require('./app/routes/auth.routes');
const onboardingRoutes = require('./app/routes/onboarding.routes');
// const dashboardRoutes = require('./app/routes/dashboard.routes');
// const entityRoutes = require('./app/routes/entity.routes');
// const adminUsersRoutes = require('./app/routes/admin_users.routes');
// const devicesRoutes = require('./routes/users.routes');
// const billingRoutes = require('./routes/qrcode.routes');


//
// app.use('/api', helpersRoutes.routes)


// BACK ENDPOINTS
app.use('/api/v1/auth/', authRoutes.routes);
app.use('/api/v1/', onboardingRoutes.routes);

// app.use('/api', dashboardRoutes.routes);
// app.use('/api', entityRoutes.routes);
// app.use('/api', adminUsersRoutes.routes);
// app.use('/api', devicesRoutes.routes);
// app.use('/api', billingRoutes.routes);

//FRONT ENDPOINTS
// app.use('/', authRoutes.routes);
// app.use('/', dashboardRoutes.routes);
// app.use('/', entityRoutes.routes);
// app.use('/', adminUsersRoutes.routes);
// app.use('/', devicesRoutes.routes);
// app.use('/', billingRoutes.routes);

// const index = require('./app/routes/');


// initialize link to routes

// declare paths in routes
// app.use('/', authRoutes.routes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Wellness Ecosystem back-end service. GOOD TO GO!" });
  });

app.listen(config.port, () => console.log(`${config.name} is listening on the url ${config.host} at ` + config.port));
