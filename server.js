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
var cron = require('node-cron');


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

const sgMail = require('@sendgrid/mail');
const messages = require('./messages.json'); 


app.get("/", (req, res) => {
    //res.json({ message: "Welcome to Wellness Ecosystem back-end service. GOOD TO GO!" });

    sgMail.setApiKey('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')
    
    var users_email = ['princeofsuccess@yahoo.com', 'samuel.imex@gmail.com'] //RETRIEVE FROM THE REDIS IN-MEMORY CACHE

    //START CRON SERVICE TO RUN AFTER EVERY MINUTE            
   const task =  cron.schedule('*/1 * * * *', () => {
        console.log('CRON runs every minute');  

            // PICK MESSAGES AT RANDOM FROM messages.json file
            let message = messages[Math.floor(Math.random() * messages.length)]

            // PREVENT SELECTION OF MESSAGE TWICE
            if (messages.indexOf(message) !== -1) {
                messages.splice(messages.indexOf(message), 1)
            }else{
               console.log("Stop Cron from running")
               task.stop();
               return; //STOP SENDING MAILS
            }

            console.log(message);

         /////SEND MESSAGE TO USERS//////////
          const msg = {
            from: {
                "email": "frank.oneil@tezzasolutions.com",
                "name": "Cope Notes"
            },           
            to: users_email,
            subject: `Testing Email Schedule`,
            text: 'Send multiple emails every one minute',
            html: message
            };

               sgMail.sendMultiple(msg)
                .then(() => {
                res.send('Scheduled email sent to users');  
                console.log('Scheduled email sent to users');  

                })
                .catch((error) => {
                    res.send(error);  
                    console.log(error)

                })


 });

  });

app.listen(config.port, () => console.log(`${config.name} is listening on the url ${config.host} at ` + config.port));
