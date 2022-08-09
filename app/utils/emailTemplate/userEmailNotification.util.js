const { handleResError } = require("../err.util");
const { handleResSuccess } = require("../success.util");
sgMail = require('@sendgrid/mail')

//module.exports = 
function emailVerificationLink(token, email, fullname, user, res, req) {

            sgMail.setApiKey('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')


			let verification_link = `https://wellness-ecosystem.herokuapp.com/api/v1/email_verification?token=${token}&email=${email}`


                    const msg = {
                            from: {
                                    "email": "frank.oneil@tezzasolutions.com",
                                    "name": "Wellness Ecosytem"
                                },
                            to:  {
                                    "email": email,
                                    "name":  fullname
                                },
                            subject: `Important! Email Verification Link- Wellness Ecosystem`,
                            text: 'Verify you email to proceed',
                            html: `Hey! You are almost there, kindly verify your email with this link ${verification_link} to proceed.`
						

                        };

                           sgMail
                            .send(msg)
                            .then(() => {
							handleResSuccess(res, "Registration Successful!", user, res.statusCode);  

							})
                            .catch((error) => {
								handleResError(res, error, res.statusCode);

                            })
                
}



 

 module.exports = {emailVerificationLink}