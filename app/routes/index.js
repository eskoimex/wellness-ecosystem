const { verifySignUp, verifyUserEmail } = require("../middleware");
const controller = require("../controllers/home.controller");

module.exports = function(app) {

//   //HEADER CORS
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });
app.get('/', controller.home)

  };