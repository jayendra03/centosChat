"use strict";
/*
 * File name: order.js
 *Purpose: This file contain all functionality for order. 
 */
 
var ls = require("../index").ls;	
const Chat = require("./chat"),
	Mail = require("./mail"),
	Database = require("./dataBase.js"),
	io = require("../index").io;

	


class Socket extends Chat{
	constructor(socket) {
		super(socket);
		var that = this._socket = socket;
		socket
			/* Register User */
			.on("registeruser", function (data, callback){
				data = JSON.parse(data);
				let chat = new Chat(socket);
				chat.registeruser(data, callback); 
			})
			.on("checkemail", function(data,callback){
				data = JSON.parse(data);
				let chat = new Chat(socket);
				chat.checkemail(data, callback);
			})
			.on("loginuser", function(data, callback){
				data = JSON.parse(data);
				let chat = new Chat(socket);
				chat.loginuser(data, callback);
			})
			.on("logoutuser",function(data, callback){
				data = JSON.parse(data);
				let chat = new Chat(socket);
				chat.logoutuser(data, callback);
			})
			.on('onlineuserlist', function (Jdata, callback){
				var data = JSON.parse(Jdata);
				let chat = new Chat(socket);
				chat.onlineuserlist(data, callback);
			})//endongoingcall
			.on('login', function (data, callBack) {
				//params: userId, userName, type >> customer,superMrkt,dBoy
				var authData = JSON.parse(data);
				//console.log("login", authData);
				if (authData.hasOwnProperty("userId") === true) {
					var uniqId = authData.userId,
						count = 1;
					//console.log("id: ",uniqId)
					//console.log(ls.get(uniqId));
					if (ls.get(uniqId)) {
						count = parseInt(ls.get(uniqId).count) + 1;
						ls.delete(ls.get(uniqId).socket_ids);
						//console.log("delete id");
					} else {
						//io.emit("changeUserOnlineStatus", { "userId": authData.userId, "chatUserType": authData.type, "onlineStatus": 1, "msg": authData.userName });
						let chat = new Chat(socket);
						chat.changeUserOnlineStatus({ "userId": authData.userId  });
						console.log("change status");
					}

					socket.join(uniqId);
					ls.set(uniqId, { 'socket_ids': socket.id, 'user_id': uniqId, 'count': count });
					ls.set(socket.id, { 'socket_ids': socket.id, 'user_id': uniqId, 'count': count });
					//console.log(ls.get(uniqId));
					return callBack({ "success": 1, "msg": "Socket connected successfully" });
				} else {
					console.log("Invalid parameter.");
					console.log(data);
					return callBack({ "success": 0, "msg": "Invalid parameter.", "error": data });
				}
			})//login
			.on('getuserdetail', function (Jdata, callback){
				// console.log("data in");
				var data = JSON.parse(Jdata);
				let chat = new Chat(socket);
				chat.getuserdetail(data, callback);
			})
			.on('writingStatus', function (Jdata) { // msg writing status
				//params: chatToId,chatFromId,chatFromName,status>>0,1; 0 for writing off and 1 for writing... 
				var data = JSON.parse(Jdata);	
				//if (ls.get(data.chatToId)){
					io.to(data.chatToId).emit('typingStatus', data);
				//}
			}) //writingStatus
			.on('privateMessage', function (data, callBack) {
				var rplData = { "success": 0, "msg": "Messages send successfully." };
				var jdata = JSON.parse(data);	
				// console.log("private msg box : ",jdata);
			 	let chat = new Chat(socket);
		 		chat.privateMessages(jdata, callBack);
			}) //privateMessage
			.on('chatHistory', function (jdata, callback) {
				//params: pageId,chatToId,chatFromId
				var data = JSON.parse(jdata);
				let chat = new Chat(socket);
				chat.chatHistory(data, callback);
			}) //chatHistory

			/***   Video Chat Start ***/
			.on('createPublicChatRoom', function (Jdata, callback){
				var data = JSON.parse(Jdata);
				console.log('group_chat data',data);
				let chat = new Chat(socket);
				chat.createPublicChatRoom(data, callback);
			})//createPublicChatRoom
			.on('cancelGroupCall', function (Jdata, callback){
				var data = JSON.parse(Jdata);
				//console.log('group_chat data',data);
				let chat = new Chat(socket);
				chat.cancelGroupCall(data, callback);
			})//cancelGroupCall
			.on('rejectGroupCall', function (Jdata, callback){
				var data = JSON.parse(Jdata);
				//console.log('group_chat data',data);
				let chat = new Chat(socket);
				chat.rejectGroupCall(data, callback);
			})//rejectGroupCall
			.on('acceptGroupCall', function (Jdata, callback){
				var data = JSON.parse(Jdata);
				//console.log('group_chat data',data);
				let chat = new Chat(socket);
				chat.acceptGroupCall(data, callback);
			})//acceptGroupCall
			.on('endongoingcall', function (Jdata, callback){
				var data = JSON.parse(Jdata);
				let chat = new Chat(socket);
				chat.endongoingcall(data, callback);
			})//endongoingcall
			.on('callConfirmation', function (Jdata, callback){
				var data = JSON.parse(Jdata);
				let chat = new Chat(socket);
				chat.callConfirmation(data, callback);
			})//callConfirmation
			.on('addcallmsg', function (Jdata, callback){
				var data = JSON.parse(Jdata);
				let chat = new Chat(socket);
				chat.addcallmsg(data, callback);
			})//addcallmsg

			/************** Jayendra Data End ******************************/
			
			.on('offline', function (data) {
				data = JSON.parse(data);
				if(ls.get(data.userId)){
					var si = ls.get(data.userId);
					ls.delete(si.socket_ids);
					ls.delete(data.userId);
				}
				// console.log("offline: ",ls.get(data.userId));
			}) // Offline
			
			
			
			.on('particularUserMsgCount', function (Jdata, callback){
				var data = JSON.parse(Jdata);
				//console.log(data);
				let chat = new Chat(socket);
				chat.particularUserMsgCounter(data, callback);
			}) //particularUserMsgCount

			
			
			
			
			
			
			/*************************** Jayendra End   ****************************/

			.on('getLivePostUsers', function (data, callBack) {//get Userlist.
				let chat = new Chat(socket);
				chat.getUserList(JSON.parse(data), callBack);
			}) //userList	
			

			.on('chatPrivateMessanger', function (data, callBack) {
				var rplData = { "success": 0, "msg": "Messages send successfully." };
				var jdata = JSON.parse(data);	
				// console.log("private msg box : ",jdata);
			 	let chat = new Chat(socket);
		 		chat.chatPrivateMessanger(jdata, callBack);
			}) //chatprivateMessanger

			.on('groupChatMessage', function (data, callback) {
				var rplData = { "success": 0, "msg": "Messages send successfully." };
				var jdata = JSON.parse(data);	
				// console.log("groupChatMessage : ",jdata);
			 	let chat = new Chat(socket);
			 	chat.groupChatMessage(jdata, callback);
			}) // groupChatMessage section

			.on('groupChatHistory', function (jdata, callback) {
				//params: pageId,pageID,postID
				var data = JSON.parse(jdata);
				// console.log("groupChatHistory :",data);
				let chat = new Chat(socket);
				chat.groupChatHistory(data, callback);
			}) // groupChatHistory

			

			.on('msgChatHistory', function (jdata, callback) {
				//params: pageId,chatToId,chatFromId
				var data = JSON.parse(jdata);
				// console.log("msgChatHistory :",data);
				let chat = new Chat(socket);
				chat.msgChatHistory(data, callback);
			}) //chatHistory

			.on('updatePmStatus', function (jdata, callback) {
				//params:chatToId,chatFromId
				var data = JSON.parse(jdata);
				// console.log("updatePmStatus :",data);
				let chat = new Chat(socket);
				chat.updatePmStatus(data, callback);
			}) //updatePmStatus

			.on('updateMessngerStatus', function (jdata, callback) {
				//params:chatToId,chatFromId
				var data = JSON.parse(jdata);
				// console.log("updateMessngerStatus :",data);
				let chat = new Chat(socket);
				chat.updateMessngerStatus(data, callback);
			}) //updateMessngerStatus
			
			.on('checkUserStatus', function (Jdata,callback) { // check online-offline status
				//params: chatToId
				var data = JSON.parse(Jdata);	
				// console.log('checkUserStatus',data);
				data.onlineStatus = 0;
				if (ls.get(data.chatToId)){
					data.onlineStatus = 1;
					callback(data);
				} else { callback(data); }				
			}) //onlineStatus
			.on('checkUserOnlineStatus', function (Jdata, callback) {
				var data = JSON.parse(Jdata);	
				// console.log('checkUserOnlineStatus',data);
				data.onlineStatus = 0;
				if(ls.get(data.userId)){
					data.onlineStatus = 1;
					let chat = new Chat(socket);
					chat.checkUserOnlineStatus(data,callback);					
				} else {
					data.onlineStatus = 0;
					let chat = new Chat(socket);
					chat.checkUserOnlineStatus(data,callback);
					// callback(data);
				}

			})//checkUserOnlineStatus  for ONLY livepost

			.on('countMessageNotification', function (Jdata,callback) {  
				//Params: chatFromId
				var data = JSON.parse(Jdata);
				// console.log('messageNotificaiton : ',data);
				let chat = new Chat(socket);
				chat.pandingMessagecounter(data,callback);
			}) //countMessageNotification

			.on('countPostNotification', function (Jdata, callback){
				//Params: chatFromId MEANS -> Sessiondata['userid']
				var data = JSON.parse(Jdata);
				let chat = new Chat(socket);
				chat.postNotificationCounter(data, callback);
			}) // countAllPostNotification

			

			.on('countFriendReq', function (Jdata, callback){
				//Params: chatFromId MEANS -> Sessiondata['userid']
				var data = JSON.parse(Jdata);
				let chat = new Chat(socket);
				chat.countFriendReq(data, callback);
			}) //countFriendReq

			.on('countPageNotiFrndReq', function (Jdata, callback){
				//Params: reciverId MEANS -> Sessiondata['userid']
				var data = JSON.parse(Jdata);
				let chat = new Chat(socket);
				chat.countPageNotiFrndReq(data, callback);
			}) //countPageNotiFrndReq

			.on('totalPageGrupLikes', function (Jdata, callback) {
				// Params: postID
				var data = JSON.parse(Jdata);
				let chat = new Chat(socket);
				chat.countTotalPageGrupLikes(data, callback);
			})//totalPageGrupLikes

			.on('totalPageCmnt', function (Jdata, callback) {
				var data = JSON.parse(Jdata);
				let chat = new Chat(socket);
				chat.countTotalPageCmnt(data, callback);
			})//totalPageCmnt
			
			.on("error", function (err) {
				console.log("Caught flash policy server socket error: ");
				console.log(err.stack);
				Mail.sendError(err.stack);
			})//error
			.on('connect', function () {
				console.log('connected');
			})//connect
			.on('connecting', function () {
				console.log('connecting');
			})//connecting
			.on('connect_failed', function () {
				console.log('connect_failed');
			})//connect_failed
			.on('reconnect_failed', function () {
				console.log('reconnect_failed');
			})//reconnect_failed
			.on('disconnect', function () {
				if(ls.get(socket.id)){
					ls.delete(ls.get(socket.id).user_id);
					ls.delete(socket.id);
				}
				// console.log("disconnect"+socket.id);
			})//disconnect	
			.on('createGroupLivePost', function (Jdata, callback){
				var data = JSON.parse(Jdata);
				// console.log('createGroupLivePost', data);
				let chat = new Chat(socket);
				chat.createGroupLivePost(data, callback);
			})//createGroupLivePost
			.on('unBlockMemeberFromLiveGroup', function (Jdata, callback){
				var data = JSON.parse(Jdata);
				// console.log('unBlockMemeberFromLiveGroup', data);
				let chat = new Chat(socket);
				chat.unBlockMemeberFromLiveGroup(data, callback);
			})//unBlockMemeberFromLiveGroup
			
			
			
			.on('checkAcceptedCall', function (Jdata, callback){
				var data = JSON.parse(Jdata);
				//console.log('group_chat data',data);
				let chat = new Chat(socket);
				chat.checkAcceptedCall(data, callback);
			})//checkAcceptedCall
			
			.on('endgroupcall', function (Jdata, callback){
				var data = JSON.parse(Jdata);
				//console.log('group_chat data',data);
				let chat = new Chat(socket);
				chat.endgroupcall(data, callback);
			})//endgroupcall
			.on('blockuser', function (Jdata, callback){
				var data = JSON.parse(Jdata);
				//console.log('group_chat data',data);
				let chat = new Chat(socket);
				chat.blockuser(data, callback);
			})//blockuser
			.on('calltouser', function (Jdata, callback){
				var data = JSON.parse(Jdata);
				let chat = new Chat(socket);
				chat.calltouser(data, callback);
			})//endgroupcall
			.on('cancelusercall', function (Jdata, callback){
				var data = JSON.parse(Jdata);
				let chat = new Chat(socket);
				chat.cancelusercall(data, callback);
			})//cancelusercall
			.on('rejectusercall', function (Jdata, callback){
				var data = JSON.parse(Jdata);
				let chat = new Chat(socket);
				chat.rejectusercall(data, callback);
			})//rejectusercall
			.on('aceptusercall', function (Jdata, callback){
				var data = JSON.parse(Jdata);
				let chat = new Chat(socket);
				chat.aceptusercall(data, callback);
			})//aceptusercall
			
	}//constructor
	get socket() {
		return this._socket;
	}
	set socket(s) { 
		this._socket = s;
	}
}//class

module.exports = Socket;


/*
module.exports = function (socket) {

	socket.on("error", function (err) {
		//var errorNotification = new Errornotification(err);
		console.log("Caught flash policy server socket error: ");
		console.log(err.stack);
	});//error
	
	socket.on('connect', function () {
		console.log('connected');
	});
	socket.on('connecting', function () {
		console.log('connecting');
	});
	socket.on('connect_failed', function () {
		console.log('connect_failed');
	});
	socket.on('reconnect_failed', function () {
		console.log('reconnect_failed');
	});

	socket.on('login', function (data, callBack) {
		//params: userId, userName, type >> customer,superMrkt,dBoy
		var authData = JSON.parse(data);
		console.log("login", authData);
		if (authData.hasOwnProperty("userId") === true) {
			var uniqId = authData.userId,
				count = 1;
			console.log(ls.get(uniqId));
			if (ls.get(uniqId)) {
				count = parseInt(ls.get(uniqId).count) + 1;
				ls.delete(ls.get(uniqId).socket_ids);
			} else {
				io.emit("changeUserOnlineStatus", { "userId": authData.userId, "chatUserType": authData.type, "onlineStatus": 1, "msg": authData.userName });
			}
			socket.join(uniqId);
			ls.set(uniqId, { 'socket_ids': socket.id, 'user_id': uniqId, 'name': authData.userName, 'count': count });
			ls.set(socket.id, { 'socket_ids': socket.id, 'user_id': uniqId, 'name': authData.userName, 'count': count });
			return callBack({ "success": 1, "msg": "Socket connected successfully" });
		} else {
			console.log("Invalid parameter.");
			console.log(data);
			return callBack({ "success": 0, "msg": "Invalid parameter.", "error": data });
		}
	});//login

	socket.on('userList', function (data, callBack) {//customer get supermarket list and their delivery boy list for chat.
		let chat = new Chat(io, ls, socket);
		chat.getUserList(JSON.parse(data), callBack);
	}); //superMarketList
	
	socket.on('privateMessage', function (data, callBack) {
		var jdata = JSON.parse(data);
		let chat = new Chat(io, ls, socket);
		chat.privateMessages(jdata, callBack);
	}); //privateMessage
		
	socket.on('chatHistory', function (jdata, callback) {
		//params: pageId,chatToId,chatFromId
		var data = JSON.parse(jdata);
		let chat = new Chat(io, ls, socket);
		chat.chatHistory(data, callback);
	}); //chatHistory

	socket.on('writingStatus', function (Jdata) { // msg writing status
		//params: chatToId,chatFromId,chatFromName,status>>0,1; 0 for writing off and 1 for writing... 
		var data = JSON.parse(Jdata);
		if (ls.get(data.chatToId))
			io.to(data.chatToId).emit('typingStatus', data);
	}); //writingOn

	socket.on('disconnect', function () {
		console.log("disconnect");
	});//disconnect
	

};
*/
