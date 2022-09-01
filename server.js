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
const messages = require('./messages.json') // or where ever you put the file we just made above


app.get("/", (req, res) => {
    //res.json({ message: "Welcome to Wellness Ecosystem back-end service. GOOD TO GO!" });
    // const scores = [90, 100, 60, 80, 70, 50, 40, 30];

    // function* randomElement(arr) {
    //        let elem,
    //        len = arr.length;

    //        while(len > 0){
    //             let rand = Math.floor(Math.random() * len);
    //             elem = arr.splice(rand, 1)[0];
    //             yield elem;
    //             len = arr.length;
    //        }
    //   }
    
    //   const randScores = randomElement(scores)
    //   console.log(randScores.next().value)
    //   res.send(randScores.next().value)

    // var user = [
    //     { name: 'Max', email_address: 'max@gmail.com' },
    //     { name: 'John', email_address: 'john@yahoo.com' },
    //     { name: 'Caley', email_address: 'caley@hotmail.com' }
    // ];

    // var message = [
    //     { subject: 'Hey', body: 'Hey! Wasup' },
    //     { subject: 'Hello', body: 'Hello there' },
    //     { subject: 'Hi', body: 'Hi! How are you?'}
    // ];
    
    // user.forEach(o => console.log(o.email_address));
    // message.forEach(o => {
    //             console.log(o)
    //             //res.send(o)
    //         });

    sgMail.setApiKey('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')
    
    var message = ['Hey! Wasup', 'Hello there' ,'Hi! How are you?']
    var email = ['princeofsuccess@yahoo.com', 'samuel.imex@gmail.com']

    // message.forEach(function (item) {
    //     console.log(item);
    //     /////////////////
          
    //     //////////////////
    //   });
 
               
    cron.schedule('*/1 * * * *', () => {
        console.log('running every minute');
        const body = messages[Math.floor(Math.random() * messages.length)]

        const msg = {
            from: {
                "email": "frank.oneil@tezzasolutions.com",
                "name": "Cope Notes"
            },           
             to: email,
            subject: `Testing Email Schedule`,
            text: 'Send multiple emails every one minute',
            html: body
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
