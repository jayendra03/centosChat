"use strict";
/*
 * File name: filedownloads.js
 *Purpose: File Sharing	.  
 */
var formidable = require('formidable'),
	util = require("util"),
	fs = require("fs"),
	appConst = require('./const.js');

class Filedownloads {
	constructor() {
	}
	init(req, res) {
		res.writeHead(200, { 'content-type': 'text/html' });
		//res.end("Server running.");
		res.end(
			'<form action="/upload" enctype="multipart/form-data" method="post">' +
			'<input type="text" name="title"><br>' +
			'<input type="file" name="upload" multiple="multiple"><br>' +
			'<input type="submit" value="Upload">' +
			'</form>'
			);
	}

	upload(req, res) {
		var form = new formidable.IncomingForm();
		// console.log("imageupLoad : ", form);
		let uploadDir = "";
		let str = req.headers.filetype;
		uploadDir = appConst.upDir;   //uploadDir = "./upload/images/";

		/*if (str.toLowerCase() === "video") {	//"/opt/lampp/htdocs/eyestares/chat_image"

		/*if (str.toLowerCase() === "video") {					
618a768e7de5cd0eb08743dd1761356edaf3f450
			uploadDir = "./upload/videos/";
		} else if (str.toLowerCase() === "audio") {
			uploadDir = "./upload/audios/";
		} else {
			uploadDir = "./upload/others/";
		}*/
		var jsonData = {};
		form.uploadDir = uploadDir;
		form.keepExtensions = true;
		form.multiples = true;
		form.on('aborted', function () {
			res.status(200).json({ success: 0, files: {}, filename: {}, msg: "File uploading aborted." });
		});
		form.parse(req, function (err, fields, files) {
			if(!err){
			let filename = files.upload.path;
			var fn = filename.split("\\");
			jsonData = { success: 1, files: files, filename: fn[fn.length-1] };
		} else {
			console.log(err);
			jsonData = { success: 0, files: "", filename: "" };
		 }
						    
		});
		form.on('end', function() {
			res.status(200).json(jsonData);
			res.end();
		});
	
		return false;
	}//upload
	
	getFile(req, res) {
		let file = req.params.file;
		let fileUri = './upload/';
		if (req.params.fileType === "1") {
			fileUri += 'images/' + file;
		} else if (req.params.fileType === "2") {
			fileUri += 'videos/' + file;
		} else if (req.params.fileType === "3") {
			fileUri += 'audios/' + file;
		} else {
			fileUri += 'others/' + file;
		}
		fs.exists(fileUri, function (exists) {
			if (exists === true) {
				res.download(fileUri); // Set disposition and send it.
			} else {
				res.status(404).json({
					'success': 0,
					"msg": "File not found",
					"fileName": file
				});
			}
		});
	}//getFile

}//class
module.exports = Filedownloads;

	/*express.get('/', function (req, res) {
		res.writeHead(200, { 'content-type': 'text/html' });
		res.end("Server running.");
	});

	express.post('/upload', function (req, res) {
		var form = new formidable.IncomingForm();
		form.uploadDir = __dirname + "/upload/images/";
		form.keepExtensions = true;
		form.multiples = true;
		form.parse(req, function (fields, files) {
			res.writeHead(200, { 'content-type': 'text/plain' });
			res.write('received upload:\n\n');
			res.end(util.inspect({ fields: fields, files: files }));
		});
		return false;
	});

	express.get('/dataFiles/:fileType/:file', function (req, res) { //fileType  1 for image and 2 for video , 3 for audio
		//http://192.168.11.91:3000/dataFiles/1/IMG_2015715_82556.jpeg
		//http://192.168.11.91:3000/dataFiles/2/IMG_2015715_82556.jpeg
		//http://192.168.11.91:3000/dataFiles/3/IMG_2015715_82556.jpeg
	
		var file = req.params.file;
		var fileUri = __dirname + '/upload/';

		if (req.params.fileType === "1") {
			fileUri += 'images/' + file;
		} else if (req.params.fileType === "2") {
			fileUri += 'video/' + file;
		} else if (req.params.fileType === "3") {
			fileUri += 'audio/' + file;
		} else {
			fileUri += 'other/' + file;
		}
		//console.log(fileUri);
		fs.exists(fileUri, function (exists) {
			if (exists === true) {
				res.download(fileUri); // Set disposition and send it.
			} else {
				res.status(404).send({
					'success': 0,
					"msg": "File not found",
					"fileName": file
				});
			}
		});
	});//dataFiles
 
	return this;
};*/




