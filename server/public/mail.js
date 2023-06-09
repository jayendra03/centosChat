"use strict";
/*
 * File name: mail.js
 *Purpose: Send mails.  
 */
const nodemailer = require('nodemailer');

class Mail {
	constructor() {
		console.log("Mail constructor");
	}//constructor
	static sendError(err) {
		let transporter = nodemailer.createTransport();
		transporter.sendMail({
				from: 'aa@aa.com',
				to: 'abcd@ggggg.com',
				subject: 'Regarding to find error in node app.',
				text: err
			}, function (error, response) {
				if (error) {
					console.log(error);
				} else {
					console.log("Message sent: " , response);
				}
			});
	}//sendError
	static sendCustomMail(args) {
		let transporter = nodemailer.createTransport();
		transporter.sendMail({
			from: args[0],
			to: args[1],
			subject: args[2],
			text: args[3]
		}, function (error, response) {
			if (error) {
				console.log(error);
			} else {
				console.log("Message sent: " , response);
			}
		});
	}//sendCustomMail
}//class

module.exports = Mail;
