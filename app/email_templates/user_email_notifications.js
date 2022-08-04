const sgMail = require('@sendgrid/mail')

//module.exports = 


function user_registration_email_notification(email, uname, res, req) {

            sgMail.setApiKey('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')

                    const msg = {
                            from: {
                                    "email": "support@guestta.com",
                                    "name": "Guestta"
                                },
                            to:  {
                                    "email": email,
                                    "name":  uname
                                },
                            subject: `User Registration Approved`,
                            text: 'Guestta - Enterprise Visitor Management System',
                            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<!--[if gte mso 9]>
	<xml>
		<o:OfficeDocumentSettings>
		<o:AllowPNG/>
		<o:PixelsPerInch>96</o:PixelsPerInch>
		</o:OfficeDocumentSettings>
	</xml>
	<![endif]-->
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="format-detection" content="date=no" />
	<meta name="format-detection" content="address=no" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
    <!--<![endif]-->
	<title>Email Template</title>
	<!--[if gte mso 9]>
	<style type="text/css" media="all">
		sup { font-size: 100% !important; }
	</style>
	<![endif]-->
	

	<style type="text/css" media="screen">
		/* Linked Styles */
		body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#999; -webkit-text-size-adjust:none }
		a { color:#000001; text-decoration:none }
		p { padding:0 !important; margin:0 !important } 
		img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
		.mcnPreviewText { display: none !important; }
		
		/* Mobile styles */
		@media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
			.mobile-shell { width: 100% !important; min-width: 100% !important; }
			
			.m-center { text-align: center !important; }
			.text3,
			.text-footer,
			.text-header { text-align: center !important; }
			
			.center { margin: 0 auto !important; }
			
			.td { width: 100% !important; min-width: 100% !important; }
			
			.m-br-15 { height: 15px !important; }
			.p30-15 { padding: 30px 15px !important; }
			.p30-15-0 { padding: 30px 15px 0px 15px !important; }
			.p40 { padding-bottom: 30px !important; }
			.box,
			.footer,
			.p15 { padding: 15px !important; }
			.h2-white { font-size: 40px !important; line-height: 44px !important; text-align: center !important; }

			.h2 { font-size: 42px !important; line-height: 50px !important; }

			.m-td,
			.m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }

			.m-block { display: block !important; }
			.container { padding: 0px !important; }
			.separator { padding-top: 30px !important; }

			.fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }

			.column,
			.column-top,
			.column-dir,
			.column-empty,
			.column-empty2,
			.column-bottom,
			.column-dir-top,
			.column-dir-bottom { float: left !important; width: 100% !important; display: block !important; }

			.column-empty { padding-bottom: 10px !important; }
			.column-empty2 { padding-bottom: 30px !important; }

			.content-spacing { width: 15px !important; }
		}
	</style>
</head>
<body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#999; -webkit-text-size-adjust:none;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#eee">
		<tr>
			<td align="center" valign="top" class="container" style="padding:50px 10px;">
				<!-- Container -->
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td align="center">
							<table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
								<tr>
									<td class="td" bgcolor="#ddd" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
									<!-- Title + Two Columns -->
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td class="">
													<table width="100%" border="0" cellspacing="0" cellpadding="0">
														
														<tr>
															<td>
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																 	<tr>
                                                                        <th class="column-top" width="380" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top; background: #301446;">
																			<table width="100%" border="0" cellspacing="0" cellpadding="0">
																				
																				<tr>
																					<td style="padding: 40px 40px 30px 40px">
                                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding-bottom: 70px;">
                                                                                        <tr>
                                                                                            <th class="column" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                    <tr>
                                                                                                        <td class="img m-center" style="font-size:0pt; line-height:0pt; text-align:left;">
                                                                                                            <img src="https://console.guestta.com/assets/images/logo/favico-g.png" height="60" border="0" style="margin-left: -10px;" alt="" /></td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </th>

                                                                                        </tr>
                                                                                    </table>
                                                                                                                        
                                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
																							<tr>
																								<td class="h3 pb15 m-center" style="color:#ffffff; font-family:Arial,sans-serif; font-size:40px; line-height:42px; text-align:left; padding-bottom:0px;">Welcome To<br><strong>Guestta &ndash;  </strong></td>
																							</tr>
																							<tr>
																								<td class="text pb20 m-center" style="color:#ffffff; font-family:Arial,sans-serif; font-size:16px; line-height:22px; text-align:left; padding:20px 0;">Dear ${uname}, your account is now active.</td>
																							</tr>
																							
																						</table>
																					</td>
																				</tr>
																			</table>
																		</th>
                                                                        
																		
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
                                        <!-- END Title + Two Columns -->
                                        
                                            <!-- Title + Two Columns -->
										<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
											<tr>
												<td class="p30-15" style="padding: 30px 30px 30px 30px">
													
													<table width="100%" border="0" cellspacing="0" cellpadding="0" bg-color="#f9f9f9;" style="margin-bottom: 30px;"> 
														<tr>
															<td class="footer" style="padding: 15px; border-radius: 5px; background:#fff3cd; border: 1px solid #ffeeba;">
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td style="color:#000; font-family:'Fira Mono', Arial,sans-serif; font-size:16px; line-height:20px; text-align:left;">kindly follow this link <a style="color:#dd3333; font-weight: 700;" href="https://console.guestta.com/login"> https://console.guestta.com/login </a> to get started. </td>
																	</tr>
																</table>
															</td>
														</tr>
                                                    </table>
                                                    
                                        
                                       

										
							 
										<!-- Footer -->
										<table width="100%" border="0" cellspacing="0" cellpadding="0" bg-color="#f9f9f9;">
											<tr>
												<td class="footer" style="padding: 0px 30px 30px 30px; background: #f9f9f9;">
													<table width="100%" border="0" cellspacing="0" cellpadding="0">
														
														<tr>
															<td class="pb40" style="padding-bottom:30px;"></td>
														</tr>
														<tr>
															<td class="text-socials" style="color:#000000; font-family:'Fira Mono', Arial,sans-serif; font-size:16px; line-height:22px; text-align:center;">Powered by Guestta © ${moment().format('YYYY')}. - Enterprise Visitors Management Solution.</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
										<!-- END Footer -->
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				<!-- END Container -->
			</td>
		</tr>
	</table>
</body>
</html>

`,

                        };



                           sgMail
                            .send(msg)
                            .then(() => {
                                req.flash('msuccess', 'User Approval Successful')
                                res.redirect('/approval')
                            })
                            .catch((error) => {
                                console.error(error)
								req.flash('warning', 'Email failed to deliver to user - '+error)
                                res.redirect('/approval')
                                //console.log(error.response.statusCode);

                            })
                
            }


function employee_email_notification(email, fullname, company_name, company_location, invite_code, imageb64, uuid, res, req) {
    sgMail.setApiKey('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')

                
                    const msg = {
                            from : {
                                    "email": "support@guestta.com",
                                    "name": "Guestta"
                                },
                            to : {
                                    "email": email,
                                    "name": fullname
                                },
                            subject: `Employee Registration Notification`,
                            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<!--[if gte mso 9]>
	<xml>
		<o:OfficeDocumentSettings>
		<o:AllowPNG/>
		<o:PixelsPerInch>96</o:PixelsPerInch>
		</o:OfficeDocumentSettings>
	</xml>
	<![endif]-->
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="format-detection" content="date=no" />
	<meta name="format-detection" content="address=no" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
    <!--<![endif]-->
	<title>Email Template</title>
	<!--[if gte mso 9]>
	<style type="text/css" media="all">
		sup { font-size: 100% !important; }
	</style>
	<![endif]-->
	

	<style type="text/css" media="screen">
		/* Linked Styles */
		body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#999; -webkit-text-size-adjust:none }
		a { color:#000001; text-decoration:none }
		p { padding:0 !important; margin:0 !important } 
		img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
		.mcnPreviewText { display: none !important; }
		
		/* Mobile styles */
		@media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
			.mobile-shell { width: 100% !important; min-width: 100% !important; }
			
			.m-center { text-align: center !important; }
			.text3,
			.text-footer,
			.text-header { text-align: center !important; }
			
			.center { margin: 0 auto !important; }
			
			.td { width: 100% !important; min-width: 100% !important; }
			
			.m-br-15 { height: 15px !important; }
			.p30-15 { padding: 30px 15px !important; }
			.p30-15-0 { padding: 30px 15px 0px 15px !important; }
			.p40 { padding-bottom: 30px !important; }
			.box,
			.footer,
			.p15 { padding: 15px !important; }
			.h2-white { font-size: 40px !important; line-height: 44px !important; text-align: center !important; }

			.h2 { font-size: 42px !important; line-height: 50px !important; }

			.m-td,
			.m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }

			.m-block { display: block !important; }
			.container { padding: 0px !important; }
			.separator { padding-top: 30px !important; }

			.fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }

			.column,
			.column-top,
			.column-dir,
			.column-empty,
			.column-empty2,
			.column-bottom,
			.column-dir-top,
			.column-dir-bottom { float: left !important; width: 100% !important; display: block !important; }

			.column-empty { padding-bottom: 10px !important; }
			.column-empty2 { padding-bottom: 30px !important; }

			.content-spacing { width: 15px !important; }
		}
	</style>
</head>
<body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#999; -webkit-text-size-adjust:none;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#eee">
		<tr>
			<td align="center" valign="top" class="container" style="padding:50px 10px;">
				<!-- Container -->
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td align="center">
							<table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
								<tr>
									<td class="td" bgcolor="#ddd" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
									<!-- Title + Two Columns -->
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td class="">
													<table width="100%" border="0" cellspacing="0" cellpadding="0">
														
														<tr>
															<td>
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																 	<tr>
                                                                        <th class="column-top" width="380" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top; background: #301446;">
																			<table width="100%" border="0" cellspacing="0" cellpadding="0">
																				
																				<tr>
																					<td style="padding: 40px 40px 30px 40px">
                                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding-bottom: 70px;">
                                                                                        <tr>
                                                                                            <th class="column" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                    <tr>
                                                                                                        <td class="img m-center" style="font-size:0pt; line-height:0pt; text-align:left;">
                                                                                                            <img src="https://console.guestta.com/assets/images/guestta-admin-logo.png" height="60" border="0" style="margin-left: -10px;" alt="" /></td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </th>

                                                                                        </tr>
                                                                                    </table>
                                                                                                                        
                                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
																							<tr>
																								<td class="h3 pb15 m-center" style="color:#ffffff; font-family:Arial,sans-serif; font-size:40px; line-height:42px; text-align:left; padding-bottom:0px;"><strong>${company_name} &ndash;  </strong><br>Employee confirmation </td>
																							</tr>
																							<tr>
																								<td class="text pb20 m-center" style="color:#ffffff; font-family:Arial,sans-serif; font-size:16px; line-height:22px; text-align:left; padding:20px 0;">Dear ${fullname}, <br> you have been registered as a member of the Staff group at ${company_name} - ${company_location} .</td>
																							</tr>
																							
																						</table>
																					</td>
																				</tr>
																			</table>
																		</th>
                                                                        
																		
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
                                        <!-- END Title + Two Columns -->
                                        
                                            <!-- Title + Two Columns -->
										<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
											<tr>
												<td class="p30-15" style="padding: 30px 30px 30px 30px">
													
													<table width="100%" border="0" cellspacing="0" cellpadding="0" bg-color="#f9f9f9;" style="margin-bottom: 30px;"> 
														<tr>
															<td class="footer" style="padding: 15px; border-radius: 5px; background:#fff3cd; border: 1px solid #ffeeba;">
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td style="color:#000; font-family:'Fira Mono', Arial,sans-serif; font-size:16px; line-height:20px; text-align:left;">kindly follow this link <a style="color:#dd3333; font-weight: 700;" href="https://console.guestta.com/user/setpw/${uuid}"> https://console.guestta.com/user/setpw </a> to set your password to your account.</td>
																	</tr>
																</table>
															</td>
														</tr>
                                                    </table>

													<!-- Two Columns Two-->
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                                        <tr>
                                                            <td class="p30-15" style="padding:30px;">
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    
                                                                    <tr>
                                                                        <td style="padding:30px; border:1px solid #eee;">
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                 <tr>
                                                                                    <th class="column-top" width="330" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                            
                                                                                            <tr>
                                                                                                <td>
                                                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                        <tr>
                                                                                                        <td class="h3-white pb20 m-center" style="color:#000000; font-family:Arial,sans-serif; font-size:36px; line-height:40px; text-align: left; font-weight:bold; padding-bottom:20px;">When you arrive &ndash; </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td class="h4-white pb30 m-center" style="color:#666666; font-family:Arial,sans-serif; font-size:18px; line-height:28px; text-align:left; padding-bottom:30px;">
                                                                                                            Please scan your QR code when prompted on arrival, or Enter invite code <strong>${invite_code}</strong> at check-in.
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </th>
                                                                                    <th class="column-empty2" width="60" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;"></th>
                                                                                    <th class="column-top" width="200" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                            <tr>
                                                                                                <td>
                                                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                        <tr>
                                                                                                            <td class="h4-white pb30" style="color:#666666; font-family:Arial,sans-serif; font-size:20px; line-height:24px; text-align:center;"><img src='cid:myimagecid' width="200"></td>
                                                                                                            
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </th>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <!-- Two Columns --> 			
                                                    
                                                
                                         <!-- Title + Two Columns -->
										<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
											<tr>
												<td class="p30-15" style="padding: 50px 30px 30px 30px">
													<table width="100%" border="0" cellspacing="0" cellpadding="0">
														
														<tr>
															<td>
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																 	<tr>
                                                                        <th class="column-top" width="300" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
																			<table width="100%" border="0" cellspacing="0" cellpadding="0">
																				
																				<tr>
																					<td>
																						<table width="100%" border="0" cellspacing="0" cellpadding="0">
																							<tr>
																								<td class="h3 pb15" style="color:#000000; font-family:Arial,sans-serif; font-size:36px; line-height:40px; text-align:left; padding-bottom:0px;"><strong>Download the Guestta uPass  &ndash;  </strong></td>
																							</tr>
																							<tr>
																								<td class="text pb20" style="color:#737373; font-family:'Ubuntu', Arial,sans-serif; font-size:16px; line-height:22px; text-align:left; padding:20px 0;">
																								Your account has been granted permission to use the Guestta uPass App. This will allow you to connect your smartphone on arrival to sign in and out of the premises.
                                                                                                 </td>
																							</tr>
																							
																						</table>
																					</td>
																				</tr>
																			</table>
																		</th>
                                                                        
																		<th class="column-empty2" width="40" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;"></th>
																		<th class="column-top" width="250" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
																			<table width="100%" border="0" cellspacing="0" cellpadding="0">
																				<tr>
																					<td>
																						<table width="100%" border="0" cellspacing="0" cellpadding="0">
																							<tr>
																								<td class="h3 pb15" style="color:#000000; font-family:Arial,sans-serif; font-size:30px; line-height:24px; text-align:left; padding-bottom:15px;">
                                                                                                <div style="border: 1px solid #ddd; border-radius: 5px; padding: 20px; text-align: center; background: #f9f9f9;">
                                                                                                <div style="font-size: 16px; line-height: 20px;">
Click on the image below or Search the Play Store for Guestta uPass app for more information.</div>
                                                                                                    <hr>
                                                                                                    <div><a href="#"><img src="https://console.guestta.com/assets/images/gplay.png" width="200"></a></div>
                                                                                                    
                                                                                             </div>
                                                                                                </td >
																							</tr>
																						</table>
																					</td>
																				</tr>
																			</table>
																		</th>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
										<!-- END Title + Two Columns -->
                                       

										
							 
										<!-- Footer -->
										<table width="100%" border="0" cellspacing="0" cellpadding="0" bg-color="#f9f9f9;">
											<tr>
												<td class="footer" style="padding: 0px 30px 30px 30px; background: #f9f9f9;">
													<table width="100%" border="0" cellspacing="0" cellpadding="0">
														
														<tr>
															<td class="pb40" style="padding-bottom:30px;"></td>
														</tr>
														<tr>
															<td class="text-socials" style="color:#000000; font-family:'Fira Mono', Arial,sans-serif; font-size:16px; line-height:22px; text-align:center;">Powered by Guestta © ${moment().format('YYYY')}. - Enterprise Visitors Management Solution.</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
										<!-- END Footer -->
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				<!-- END Container -->
			</td>
		</tr>
	</table>
</body>
</html>

`,
	attachments: [{
		filename: 'qrcode.jpg',
		content: imageb64,
		content_id: "myimagecid",
		disposition: 'inline'
	}]

                        };

                         sgMail
                            .send(msg)
							.then(() => {
								const mydata = { message: "success"}
                                res.json(mydata)
							})
							
                            .catch((error) => {
								const mydata = { message: "error"}
                               // res.json(mydata)
                                console.error(error)
								req.flash('warning', 'Failed to add employee.')
                                 setTimeout(()=>{
                                    res.redirect('/users')	
								}, 3000);                                
								//console.log(error.response.statusCode);
                            })
                           

}
 

 module.exports = {user_registration_email_notification, employee_email_notification}