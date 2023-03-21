"use strict";
/*
 * File name: chat.js
 *Purpose: This file contain all chat functionality. 
 */
var Database = require('./dataBase.js'),
	moment = require('moment'),
	io = require("../index").io,
	ls = require("../index").ls,
	appConst = require('./const.js');


class Chat {
	constructor(io, ls, socket) {
		this.socket = socket;
	}	
	objParams(data) {
		console.log("obj : ",data);
		var msgStore = Object.create(null);
		if (data.chatFromId === "" || data.hasOwnProperty("chatFromId") === false)
			return false;
		else if (data.chatToId === "" || data.hasOwnProperty("chatToId") === false)
			return false;
		else if (data.chatMessage === "" || data.hasOwnProperty("chatMessage") === false)
			return false;

		msgStore.chatFromId = "" + data.chatFromId;
		msgStore.chatFromName = data.chatFromName;
		msgStore.chatFromImage = data.chatFromImage;
		msgStore.chatToId = "" + data.chatToId;
		msgStore.chatToName = data.chatToName;
		msgStore.chatToImage = data.chatToImage;
		msgStore.chatMessage = data.chatMessage;
		msgStore.chatDeviceType = "" + data.chatDeviceType;
		msgStore.chatCreatedAt = this.currentTime;//new Date();
		
		return msgStore;
	}//objParams

	registeruser(data, callback)
	{
		var query = "INSERT INTO users (name, email, password, mobile) VALUES ('"+data.name+"','"+data.email+"','"+data.password+"','"+data.mobile+"')";
		Database.getConn(query, function (err, dbResult) {
			return callback({ "success": 1, "msg": appConst.sign_success, "result": dbResult, "error": err });
		});
	}
	
	checkemail(data, callback)
	{
		var query = "SELECT * FROM users WHERE email = '"+data.email+"'";
		Database.getConn(query, function (err, dbResult) {
			console.log("result:",dbResult);
			return callback({ "success": 1, "msg": "Records  found.", "result": dbResult, "error": err });
		});
	}

	loginuser(data, callback)
	{
		var query = "SELECT * FROM users WHERE email = '"+data.email+"' AND password = '"+data.password+"'";
		Database.getConn(query, function (err, dbResult) {
			// console.log("chatHistory: ",dbResult);
			if (!err && dbResult.length > 0) {
				var subquery = "UPDATE users SET online_status = 1, isLoggedIn = 1 WHERE id = "+ dbResult[0].id;
				Database.getConn(subquery, function (err, sbResult) {
					console.log("update err:",err);
				});
				return callback({ "success": 1, "msg": "Records  found.", "result": dbResult, "error": err });
			} else {
				return callback({ "success": 0, "msg": "Records not found.", "result": [], "error": err });
			}
		});
	}

	logoutuser(data, callback)
	{
		var subquery = "UPDATE users SET online_status = 0, isLoggedIn = 0 WHERE id = "+ data.user_id;
		Database.getConn(subquery, function (err, sbResult) {
			console.log("update err:",err);
			return callback({ "success": 1, "msg": "Logout.", "result": sbResult, "error": err });
		});
	}

	onlineuserlist(data, callback)
	{
		var olist = data.onlineList;
		olist = olist.replace(/,\s*$/, "");
		
		var query = "SELECT * FROM users WHERE id NOT IN("+olist+") AND id != "+data.user_id;
		
		Database.getConn(query, function (err, dbResult) {
			if (!err && dbResult.length > 0) {
				var result = dbResult;
			} else {
				var result = [];
			}
			
			var oquery = "SELECT id, online_status FROM users WHERE id IN("+olist+")";
			Database.getConn(oquery, function (err, dbjay) {
				if (!err && dbjay.length > 0) {
					var onlineList = dbjay;
				}else{
					var onlineList = [];
				} 
				return callback({ "success": 1, "msg": "Records  found.", "result": result, "oldlist": onlineList });
			});
		});
	}

	changeUserOnlineStatus(data)
	{
		console.log(data);
		var ChangStatus = "UPDATE users set isLoggedIn = 1, online_status = 1 WHERE id = "+data.userId;
		Database.getConn(ChangStatus, function(dbResult){
			//callBack({"success":2});
		});
	}

	getuserdetail(data, callback)
	{
		// console.log(data);
		var query = "SELECT * FROM users WHERE id = "+data.to_id;
		Database.getConn(query, function (err, dbResult){
			if (!err && dbResult.length > 0) {
				return callback({ "success": 1, "msg": "Records  found.", "result": dbResult, "error": err });
			} else {
				// console.log(err);
				return callback({ "success": 0, "msg": "Records not found.", "result": [], "error": err });
			}
		});
	}

	privateMessages(data, callBack) {
		var rplData = { "success": 0, "msg": "Messages send successfully." };
		var msgStore = {};
		msgStore.chatMessageStatus = 1;
		var key = data.chatToId;
		var msg = data.chatMessage;  
        var urls=0; 
        var lastFromId = 0;
        if(msg.search("https://") >= 0 || msg.search("http://") >= 0){ var urls = 1; }
         else if(msg.search(/.jpg|.png|.gif|.bmp|.jpeg|.tif/) >= 0){var urls = 2;}
         else if(msg.search(/.txt|.zip|.rar|.xls/) >= 0) { var urls = 3; }
                       
		var getlastid = 'SELECT chat.from_id FROM chat where ((chat.from_id="'+data.chatFromId+'" AND chat.to_id="'+data.chatToId+'") OR (chat.from_id="'+data.chatToId+'" AND chat.to_id="'+data.chatFromId+'")) order by chat.chat_id DESC LIMIT 1 OFFSET 0 ';
		
		Database.getConn(getlastid, function (err, dbResult) {
			if (!err && dbResult.length > 0) {
				lastFromId = dbResult[0].from_id;
			}
		});

		var Insertquery = "INSERT INTO chat(`to_id`,`from_id`, `message`, `message_type`, `status`, `msg_time`, `msg_date`) VALUES ("+data.chatToId+", "+data.chatFromId+", '"+data.chatMessage+"' ,'"+urls+"', '0', '"+data.chatTime+"', '"+data.sendPrivateDateToDb+"')";
		
		Database.getConn(Insertquery, function(dbResult){
			rplData.success = 1;
			//console.log(data.chatToId + '  : I received a private message by ', data.chatFromId, ' saying ', data.chatMessage);
			//console.log("key",key);
			data.lastFromId = lastFromId;
			//console.log("data.lastFromId",data.lastFromId);
			io.to(key).emit('privateMessage', data);
			//console.log("after emit");
			callBack({"success":1,"lastFromId":lastFromId});
		});
	}//privateMessages

	chatHistory(data, callback) {
		//pageId,chatToId,chatFromId
		var offset = data.offset;

		var sqlQuery = 'SELECT chat.*, chat.to_id as toId, users.name, (SELECT name FROM users WHERE id = toId) as to_name FROM chat JOIN  users ON users.id = chat.from_id where ((chat.from_id="'+data.chatFromId+'" AND chat.to_id="'+data.chatToId+'") OR (chat.from_id="'+data.chatToId+'" AND chat.to_id="'+data.chatFromId+'")) order by chat.chat_id DESC LIMIT 10 OFFSET '+offset+' ';

		// console.log(sqlQuery);
		
		Database.getConn(sqlQuery, function (err, dbResult) {
			//  console.log("chatHistory: ",dbResult);
			if (!err && dbResult.length > 0) {
				return callback({ "success": 1, "msg": "Records  found.", "result": dbResult, "error": err });
			} else {
				return callback({ "success": 0, "msg": "Records not found.", "result": [], "error": err });
			}
		});
	}//chatHistory

	/* Video Chat Start */
	createPublicChatRoom(data, callback) {
		var Insertquery = "INSERT INTO chat_rooms(fromId, toId, from_name, to_name, pageTitle, room_name, room_url, call_type ,date_created) VALUES ('"+data.fromId+"', '"+data.toId+"', '"+data.from_name+"', '"+data.to_name+"', '"+data.pageTitle+"', '"+data.room_name+"', '"+data.room_url+"', '"+data.call_type+"' , '"+data.date_created+"')";
		
		Database.getInsertConn(Insertquery, function(err, dbResult){
			if(!err){
				console.log('Retun ID', dbResult.insertId);
				data.room_id = dbResult.insertId;
				var key = data.toId;
				console.log("key",key);
				io.to(key).emit('createPublicChatRoomResponse', data);
				//console.log("call emit");
				callback({"success":1});
			} else {
				console.log("call err: ", err);
			}
		});
	} //createPublicChatRoom

	cancelGroupCall(data, callback) {
		var uquery = "UPDATE chat_rooms SET status = 2 WHERE room_name = '"+data.roomName+"'";
		Database.getInsertConn(uquery, function(err, dbResult){

		});

		io.to(data.toId).emit('cancelGroupCallResponse', data);
		callback({"success":1,"cancelGroupCall":"cancelGroupCall"});
		console.log("cancelGroupCall");
	} //cancelGroupCall
	rejectGroupCall(data, callback) {
		var uquery = "UPDATE chat_rooms SET status = 3 WHERE id = '"+data.room_id+"'";
		Database.getInsertConn(uquery, function(err, dbResult){

		});

		io.to(data.toId).emit('rejectGroupCallResponse', data);
		callback({"success":1,"rejectGroupCall":"rejectGroupCall"});
	} //rejectGroupCall
	
	acceptGroupCall(data, callback) {
		var uquery = "UPDATE chat_rooms SET status = 1 WHERE id = '"+data.room_id+"'";
		Database.getInsertConn(uquery, function(err, dbResult){

		});
		io.to(data.toId).emit('acceptGroupCallResponse', data);
		callback({"success":1});
		
	} //acceptGroupCall

	endongoingcall(data, callback) {
		var UpdateQuery = 'UPDATE chat_rooms SET call_duration="'+data.call_duration+'" WHERE room_name="'+data.call_id+'"';
		console.log("data",data);
		Database.getConn(UpdateQuery, function (err, dbResult) {
			console.log("update:" , dbResult);
			var query = 'SELECT * FROM chat_rooms WHERE room_name="'+data.call_id+'"';
			Database.getConn(query, function (err, sbResult) {
				//var jay = "";
				console.log("data",sbResult);
				if (!err && sbResult.length > 0) {
					var jay = sbResult[0];
					jay.is_call_ended = 1;
					jay.callDuration = data.call_duration;
					jay.cut_id = data.cut_id;
					io.emit('endongoingcallResponse', jay);
					console.log("jay =",jay);
					console.log("toId =",jay.toId);
					callback({"success":1,"result":jay});
				}
			});			
			//io.to(data.to_id).emit('endongoingcallResponse', data);
			//io.to(data.from_id).emit('endongoingcallResponse', data);
		});
	} //endongoingcall

	callConfirmation(data, callback){
		var UpdateQuery = 'UPDATE chat_rooms SET status="4" WHERE id="'+data.room_id+'"';
		Database.getConn(UpdateQuery, function (err, dbResult) {
			console.log("update:" , dbResult);
			io.to(data.fromId).emit('callConfirmationResponse', data);
			callback({"success":1});		
		});
	}

	addcallmsg(data, callback){
		var Insertquery = "INSERT INTO chat(`to_id`,`from_id`, `message`, `message_type`, `status`, `msg_time`, `msg_date`) VALUES ("+data.chatToId+", "+data.chatFromId+", '"+data.chatMessage+"' ,'10', '0', '"+data.msgTime+"', '"+data.msgdate+"')";
		Database.getConn(Insertquery, function(dbResult){
			console.log("addcallmsg",dbResult);
			io.to(data.caller_id).emit('addcallmsgresponse', data);
			callback({"success":1});
		});
	}

	/************** Jayendra Data End ******************************/



	particularUserMsgCounter(data, callback) {
		var userMsgId = data.chatToUserid;
		var msgFromid = data.chatMsgFromid;
		// console.log("particularUserMsgCounter",data);
		var msgStatus = 0;
		var getChatMsgdata = "SELECT COUNT(status) AS msgstatus FROM chat where (from_id='"+userMsgId+"' AND to_id='"+msgFromid+"') AND status='"+msgStatus+"'";

		// var getChatMsgdata = "SELECT * FROM chat where (from_id='"+userMsgId+"' AND to_id='"+msgFromid+"') AND status='"+msgStatus+"' group by from_id"

		// console.log(getChatMsgdata);

		Database.getConn(getChatMsgdata, function (err, dbResult){
			// console.log('msgDetails : ',dbResult.length);
			if(!err && dbResult.length >0) {
				// var dbResult = dbResult.length;
				return callback({"success":1, "msg" : "Record Found", 'result': dbResult[0], "error":err });
			} else {
				return callback({"success":0, "msg": "Not found", "result": [], "error": err });
			}
		});
	}

	

	
	

	

	

	
	/************************************* End Jayendra ******************************/

	chatPrivateMessanger(data, callBack) {
		var rplData = { "success": 0, "msg": "Messages send successfully." };
		var msgStore = {};
		msgStore.chatMessageStatus = 1;
		var key = data.chatToId;
		// console.log(ls.get(key)+" key",key);
        var msg = data.chatMessage;  
        var urls=0; 
        if(msg.search("https://") >= 0 || msg.search("http://") >= 0){ var urls = 1; }
         else if(msg.search(/.jpg|.png|.gif|.bmp|.jpeg|.tif/) >= 0){var urls = 2;}
         else if(msg.search(/.txt|.zip|.rar|.xls/) >= 0) { var urls = 3; }
                       
		var Insertquery = "INSERT INTO chat(`to_id`, `to_name`, `to_image`, `from_id`, `from_name`, `from_image`, `message`, `message_type`, `status`, `msg_date`, `message_lang`) VALUES ("+data.chatToId+", '"+data.chatToName+"', '"+data.chatToImage+"', "+data.chatFromId+", '"+data.chatFromName+"', '"+data.chatFromImage+"', '"+data.chatMessage+"' ,'"+urls+"', '0', '"+data.sendMessageDateToDb+"', '"+data.getMessageChatLang+"')";
		
		Database.getConn(Insertquery, function(dbResult){

			if (msgStore.chatMessageStatus === 0) {//user is offline
			rplData.success = 2;
			callBack({"success":2});			
			} else {
			rplData.success = 1;
			console.log(data.chatToId + '  : I received a private message by ', data.chatFromId, ' saying ', data.chatMessage);
			console.log("chatMsengerkey",key);
			io.to(key).emit('chatPrivateMessanger', data);
			callBack({"success":1});
				
			}
		});
	}//chatPrivateMessanger

	groupChatMessage(data, callBack) {

		var rplData = { "success": 0, "msg": "Messages send successfully." };
		var msgStore = {};
		// msgStore.groupchat_status = 1;
		// var key = data.senderId;
		// if (!ls.get(key)) {//user is offline
		// 	msgStore.groupchat_status = 0;
		// }          
        var msg = data.groupMessage;  
        var urls=0; 
        if(msg.search("https://") >= 0 || msg.search("http://") >= 0){ var urls = 1; }
         else if(msg.search(/.jpg|.png|.gif|.bmp|.jpeg|.tif/) >= 0){var urls = 2;}
         else if(msg.search(/.txt|.zip|.rar|.xls/) >= 0) { var urls = 3; }
                       
		var Insertquery = "INSERT INTO groupChatMessageDetails(`maingroup_id`, `group_pageid`, `group_postid`, `groupchat_senderid`, `groupchat_msg`,  `groupchat_msgtype`, `groupchat_langtype`, `groupchat_username`,  `groupchat_status`, `groupchat_date`) VALUES ('"+data.mainGroupId+"', '"+data.page_ID+"', '"+data.groupPostId+"', '"+data.senderId+"', '"+data.groupMessage+"', '"+urls+"', '"+data.getGroupChatLang+"', '"+data.senderName+"', '1', '"+data.sendDateToDb+"')";

		Database.getConn(Insertquery, function(dbResult){

			// console.log(data.chatToId + '  : I received a private message by ', data.chatFromId, ' saying ', data.chatMessage);
			io.emit('groupChatMessage', data);
			callBack({"success":1});
		});

	}//groupChatMessage

	pandingMessagecounter(data, callback) {
		var chatFromId = data.chatFromId;
		var messageStatus = 0;
		// var getMsgdata = "SELECT COUNT(status) AS msgstatus FROM chat where to_id='"+data.chatFromId+"' AND status='"+messageStatus+"' group by to_id ";

		var getMsgdata = "SELECT * FROM chat where to_id='"+data.chatFromId+"' AND status='"+messageStatus+"' group by from_id";
		// console.log(getMsgdata);
		Database.getConn(getMsgdata, function (err, dbResult){
			// console.log('msgDetails : ',dbResult.length);			
			if(!err && dbResult.length >0) {
				var dbResulta = dbResult.length;
				return callback({"success":1, "msg" : "Record Found", 'result': dbResulta, "error":err });
			} else {
				return callback({"success":0, "msg": "Not found", "result": [], "error": err });
			}
		});
	}//pandingMessagescounter

	pandingMessages(data, callback) {
		// let self = this;
		// var db = Database.getDbTable();
		// db.find({ "chatToId": String(receiverID), "chatMessageStatus": "0" }, { "chatMessageStatus": 0 }).toArray(function (err, docs) {
		// 	if (!err && docs.length > 0) {
		// 		docs.msg = appConst.chatMsg;
		// 		io.sockets.in(self.socket.id).emit('privateMessage', docs);
		// 		db.update({ "chatToId": String(receiverID) }, { $set: { "chatMessageStatus": "1" } }, { multi: true });
		// 	} else {
		// 		console.info("You don`t have any msg.");
		// 		console.log(err);
		// 	}
		// });	
	}//pandingMessages

	postNotificationCounter(data, callback) {
		var userId = data.chatFromId;
		var getNotiCounter = "SELECT sum(notification_count_status) AS total FROM notifications where notification_count_status=1 AND ((tag_usersid!=0 AND tag_usersid='"+data.chatFromId+"') OR (userid_to='"+data.chatFromId+"' AND tag_usersid=0)) AND ((post_like_userid!=0 AND post_like_userid!='"+data.chatFromId+"') OR (post_like_userid=0)) AND ((maincomment_userid!=0 AND maincomment_userid!='"+data.chatFromId+"') OR (maincomment_userid=0))";

		Database.getConn(getNotiCounter, function (err, dbResult){
			// console.log('notifiaitonCounter : ', dbResult);
			if(!err && dbResult.length >0) {
				return callback({"success":1, "msg" : "Record Found", 'result': dbResult[0], "error":err });
			} else {
				return callback({"success":0, "msg": "Not found", "result": [], "error": err });
			}
		});

	}//postNotificationCounter

	

	countFriendReq(data, callback) {
		var reciverId = data.reciverId;
		var msgStatus = 0;
		var getTotalReqData = "SELECT COUNT(status) AS frndReqTotal FROM friends where reciver_id='"+reciverId+"' AND status='"+msgStatus+"'";
		// console.log(getTotalReqData);
		Database.getConn(getTotalReqData, function (err, dbResult){
			// console.log('msgDetails : ',dbResult);
			if(!err && dbResult.length >0) {
				return callback({"success":1, "msg" : "Record Found", 'result': dbResult[0], "error":err });
			} else {
				return callback({"success":0, "msg": "Not found", "result": [], "error": err });
			}
		});
	}

	countPageNotiFrndReq(data, callback) {
		var friend_id = data.reciverId;
		var pagefriend_status = 0;

		var getTotalNotiFrnd = "SELECT COUNT(pagefriend_status) AS pageFrndTotal FROM (`site_pages`) JOIN `pageinvite_friend` ON `pageinvite_friend`.`invitepage_id` = `site_pages`.`page_id` WHERE `pageinvite_friend`.`friend_id` = '"+friend_id+"' AND `pageinvite_friend`.`pagefriend_status` = '"+pagefriend_status+"'";

		Database.getConn(getTotalNotiFrnd, function (err, dbResult){
			if(!err && dbResult.length >0) {
				return callback({"success":1, "msg" : "Record Found", 'result': dbResult[0], "error":err });
			} else {
				return callback({"success":0, "msg": "Not found", "result": [], "error": err });
			}
		});
	}

	countTotalPageGrupLikes(data, callback) {
		var postID = data.postID;
		var like_action = 1;

		var getTolLikes = "select SUM(like_action) AS total_likes FROM page_post_likes where like_action='"+like_action+"' and like_post_id='"+postID+"'";

		Database.getConn(getTolLikes, function (err, dbResult){
			if(!err && dbResult.length >0) {
				return callback({"success":1, "msg" : "Record Found", 'result': dbResult[0], "error":err });
			} else {
				return callback({"success":0, "msg": "Not found", "result": [], "error": err });
			}
		});
	}

	countTotalPageCmnt(data, callback) {
		var postID = data.postID;
		var comment_status = 1;

		var totalPageCmnt = "select SUM(comment_status) AS totalComments FROM page_post_comments where comment_status='"+comment_status+"' and comment_post_id='"+postID+"'";

		Database.getConn(totalPageCmnt, function (err, dbResult){
			if(!err && dbResult.length >0) {
				return callback({"success":1, "msg" : "Record Found", 'result': dbResult[0], "error":err });
			} else {
				return callback({"success":0, "msg": "Not found", "result": [], "error": err });
			}
		});
	}

	groupChatHistory(data, callback) {
		//pageId,pageID,postID
		var offset = data.offset;

		var sqlQuery = 'SELECT * FROM groupChatMessageDetails where `group_pageid`="'+data.pageID+'" AND `group_postid`="'+data.postID+'" order by group_chatid DESC LIMIT 10 OFFSET '+offset+'  ';

		// console.log(sqlQuery);

		Database.getConn(sqlQuery, function (err, dbResult) {
			// console.log("chatHistory: ",dbResult);
			if (!err && dbResult.length > 0) {
				return callback({ "success": 1, "msg": "Records  found.", "result": dbResult, "error": err });
			} else {
				return callback({ "success": 0, "msg": "Records not found.", "result": [], "error": err });
			}
		});
	} //groupChatHistory
	
			

	msgChatHistory(data, callback) {
		//pageId,chatToId,chatFromId
		var offset = data.offset;

		var sqlQuery = 'SELECT * FROM chat where ((`from_id`="'+data.chatFromId+'" AND `to_id`="'+data.chatToId+'") OR (`from_id`="'+data.chatToId+'" AND `to_id`="'+data.chatFromId+'")) order by chat_id DESC LIMIT 10 OFFSET '+offset+' ';

		// console.log(sqlQuery);

		Database.getConn(sqlQuery, function (err, dbResult) {
			// console.log("msgChatHistory: ",dbResult);
			if (!err && dbResult.length > 0) {
				return callback({ "success": 1, "msg": "Records  found.", "result": dbResult, "error": err });
			} else {
				return callback({ "success": 0, "msg": "Records not found.", "result": [], "error": err });
			}
		});

		/*var UpdateQuery = 'UPDATE chat SET status=1 where ((`from_id`="'+data.chatFromId+'" AND `to_id`="'+data.chatToId+'") OR (`from_id`="'+data.chatToId+'" AND `to_id`="'+data.chatFromId+'"))';

		Database.getConn(UpdateQuery, function (err, dbResult) {
			// console.log("chatHistory: ",dbResult);
			if (!err && dbResult.length > 0) {
				//return callback({ "success": 1, "msg": "Records  found.", "result": dbResult, "error": err });
			} else {
				//return callback({ "success": 0, "msg": "Records not found.", "result": [], "error": err });
			}
		});*/

	

	}//msgChatHistory	

	updatePmStatus(data, callback) {
		// console.log('updatePmStatus',data);
		// var UpdateQuery = 'UPDATE chat SET status=1 where ((`from_id`="'+data.chatFromId+'" AND `to_id`="'+data.chatToId+'") OR (`from_id`="'+data.chatToId+'" AND `to_id`="'+data.chatFromId+'"))';

		var UpdateQuery = 'UPDATE chat SET status=1 where from_id="'+data.chatToId+'" AND to_id="'+data.chatFromId+'"';

		// console.log(UpdateQuery);

		Database.getConn(UpdateQuery, function (err, dbResult) {
			// console.log("chatHistory: ",dbResult); always goes to else part because of updateQuery
			if (!err && dbResult.length > 0) {
				return callback({ "success": 1, "msg": "Records  found.", "result": dbResult, "error": err });
			} else {
				return callback({ "success": 0, "msg": "Records not found.", "result": [], "error": err });
			}
		});
	}//updatePmStatus
	
	updateMessngerStatus(data, callback) {
		// console.log('updateMessngerStatus',data);
		/*var UpdateQuery = 'UPDATE chat SET status=1 where ((`from_id`="'+data.chatFromId+'" AND `to_id`="'+data.chatToId+'") OR (`from_id`="'+data.chatToId+'" AND `to_id`="'+data.chatFromId+'"))';*/

		var UpdateQuery = 'UPDATE chat SET status=1 where from_id="'+data.chatToId+'" AND to_id="'+data.chatFromId+'"';

		Database.getConn(UpdateQuery, function (err, dbResult) {
			// console.log("chatHistory: ",dbResult); always goes to else part because of updateQuery
			if (!err && dbResult.length > 0) {
				return callback({ "success": 1, "msg": "Records  found.", "result": dbResult, "error": err });
			} else {
				return callback({ "success": 0, "msg": "Records not found.", "result": [], "error": err });
			}
		});
	}//updateMessngerStatus
	checkUserOnlineStatus(data, callback) {
		// console.log('checkUserOnlineStatus:', data);
		var UpdateQuery = 'UPDATE groupMembersDetails SET member_status=2 where group_member_id="'+data.userId+'" AND group_id="'+data.liveGrupId+'"';

		Database.getConn(UpdateQuery, function (err, dbResult) {
			// console.log("chatHistory: ",dbResult); always goes to else part because of updateQuery
			var userId = data.userId;
			var liveGrupId = data.liveGrupId;
			var pages_id = data.pages_id;
			var postId = data.postId;
			var onlineStatus = data.onlineStatus;
			io.emit('getUserOnlineStatus', data);

			if (!err) {
				return callback({ "success": 1, "msg": "Records  found.", "result": dbResult, "error": err });
			} else {
				return callback({ "success": 0, "msg": "Records not found.", "result": [], "error": err });
			}
		});
	}//checkUserOnlineStatus
	getUserList(data, callBack) {
		// console.log('getUserListgetUserList:', data);
		var sqlQuery = 'SELECT * FROM users where user_type=1 AND user_id="'+data.friend_id+'"';
		Database.getConn(sqlQuery, function (err, dbResult) {
			// console.log("getUserList:",dbResult);
			if (!err && dbResult.length > 0) {
				// var data = dbResult;
				dbResult[0].group_id = data.group_id;
				dbResult[0].group_postid = data.group_postid;
				dbResult[0].userName = data.userName;
				dbResult[0].existsImg = data.existsImg;
				dbResult[0].group_pageid = data.group_pageid;
				io.emit('getLivePostUsersOnMethod', dbResult[0]);
				return callBack({ "success": 1, "msg": "Records  found.", "result": dbResult, "error": err });

			} else {
				return callBack({ "success": 0, "msg": "Records not found.", "result": [], "error": err });
			}

			
			// callback({"success":1});
		});
	}//getUserList
	createGroupLivePost(data, callback) {
		var pageID = data.pageID;
		var postID = data.postID;
		var curntUserId = data.sessionId; 
		var group_lastopen = data.group_lastopen;
		var active_page_members = data.active_page_members;

		var selectQuery = "SELECT * FROM groupChatDetails WHERE group_pageid='"+pageID+"' and group_postid='"+postID+"'";

		Database.getConn(selectQuery, function (err, dbResult) {
			// console.log("getUserList",dbResult);
			if (!err && dbResult.length > 0) {
				var updateQuery = "UPDATE groupChatDetails SET group_lastopen='"+group_lastopen+"' WHERE group_postid='"+postID+"'";
				Database.getConn(updateQuery, function (err, dbResult) {
					// console.log('ResultUpdateSuccessFully');
					callback({"success":1});
				});
			} else {
				var Insertquery = "INSERT INTO groupChatDetails(`group_createrid`, `group_pageid`, `group_postid`, `group_status`, `group_created`, `group_lastopen`) VALUES ('"+curntUserId+"', '"+pageID+"', '"+postID+"', '1', '"+group_lastopen+"', '"+group_lastopen+"')";

				Database.getInsertConn(Insertquery, function (err, dbResult) {
					if(!err){
						console.log('RetunID', dbResult.insertId);
						var membersArr = active_page_members.split(',');
						for (var j = 0; j < membersArr.length; j++) {
							var insrtQuery = "INSERT INTO groupMembersDetails(`group_id`, `group_member_id`, `group_createrid`, `group_postid`, `member_status`, `date`) VALUES ('"+dbResult.insertId+"', '"+membersArr[j]+"', '"+curntUserId+"', '"+postID+"', '1', '"+data.group_lastopen+"')";
							Database.getInsertConn(insrtQuery, function(err, dbRes){
								// console.log('groupMembersDetails', dbRes);
							});
						}
						callback({"success":1});
					}
				});
			}
		});

	}
	unBlockMemeberFromLiveGroup(data, callback) {
		var member_status = data.selectVal;
		var groupMemberId = data.groupMemberId;
		var group_id = data.group_id;
		var pageID = data.pageID;
		var group_postid = data.group_postid;
		var userName = data.userName;
		var profilepic = data.profilepic;

		var updateQuery = "UPDATE groupMembersDetails SET member_status='"+member_status+"' WHERE group_id='"+group_id+"' and group_member_id='"+groupMemberId+"'";

		Database.getConn(updateQuery, function (err, dbResult) {
			// console.log('ResultUpdateSuccessFully');
			// callback({"success":1});
			data.member_status = member_status;
			data.groupMemberId = groupMemberId;
			data.group_id = group_id;
			data.pageID = pageID;
			data.group_postid = group_postid;
			data.userName = userName;
			data.profilepic = profilepic;
			io.emit('unBlockMemeber-FromLiveGroup', data);
		});


	}
	
	
	
	checkAcceptedCall(data, callback) {
		var Query = 'SELECT COUNT(receiver_user_id) AS accepted_user FROM chat_room_members WHERE room_id="'+data.room_id+'" AND call_status = 1';

		Database.getConn(Query, function (err, dbResult) {
			callback({"success":1, "result":dbResult});
		});
	} //checkAcceptedCall
	
	endgroupcall(data, callback) {
		var UpdateQuery = 'UPDATE chat_rooms SET call_duration="'+data.call_duration+'" WHERE room_id="'+data.room_id+'"';

		Database.getConn(UpdateQuery, function (err, dbResult) {
			if (!err && dbResult.changedRows > 0) {
				io.emit('endgroupcallResponse', data);
				callback({"success":1});
			} else {
				callback({"error":1});
			}
		});
	}//endgroupcall
	blockuser(data, callback) {
		var UpdateQuery = 'UPDATE chat_room_members SET user_call_status="'+data.user_call_status+'", call_duration="'+data.call_duration+'" WHERE room_id="'+data.room_id+'" AND receiver_user_id="'+data.receiver_user_id+'"';

		Database.getConn(UpdateQuery, function (err, dbResult) {
			if (!err && dbResult.changedRows > 0) {
				data.user_blocked = 1;
			} else {
				data.user_blocked = 0;
			}
			io.emit('blockuserResponse', data);
			callback({"success":1});
		});
	} //blockuser
	calltouser(data, callback) {
		var Insertquery = "INSERT INTO user_calls(`from_id`, `to_id`, `room_name`, `room_url`, `date_created`) VALUES ('"+data.from_id+"', '"+data.to_id+"', '"+data.room_name+"', '"+data.room_url+"', '"+data.date_created+"')";
		
		Database.getInsertConn(Insertquery, function(err, dbResult){
			if(!err){
				var rowId = dbResult.insertId;
				if(rowId) {
					data.last_insert_id = rowId;
					io.emit('calltouserResponse', data);
					callback({"success":1});
				} else {
					callback({"error":1});
				}
			}
		});
	} //calltouser
	cancelusercall(data, callback) {
		var UpdateQuery = 'UPDATE user_calls SET call_status="'+data.call_status+'" WHERE id="'+data.call_id+'"';

		Database.getConn(UpdateQuery, function (err, dbResult) {
			if (!err && dbResult.changedRows > 0) {
				data.call_ended = 1;
			} else {
				data.call_ended = 0;
			}
			io.emit('cancelusercallResponse', data);
			callback({"success":1});
		});
	} //cancelusercall
	rejectusercall(data, callback) {
		var UpdateQuery = 'UPDATE user_calls SET call_status="'+data.call_status+'" WHERE id="'+data.call_id+'"';

		Database.getConn(UpdateQuery, function (err, dbResult) {
			if (!err && dbResult.changedRows > 0) {
				data.rejected_by_to_user = 1;
			} else {
				data.rejected_by_to_user = 0;
			}
			io.emit('rejectusercallResponse', data);
			callback({"success":1});
		});
	} //rejectusercall
	aceptusercall(data, callback) {
		var UpdateQuery = 'UPDATE user_calls SET call_status="'+data.call_status+'" WHERE id="'+data.call_id+'"';

		Database.getConn(UpdateQuery, function (err, dbResult) {
			if (!err && dbResult.changedRows > 0) {
				data.accepted_by_to_user = 1;
			} else {
				data.accepted_by_to_user = 0;
			}
			io.emit('aceptusercallResponse', data);
			callback({"success":1});
		});
	} //aceptusercall
	
	get currentTime() {
		var b = moment.utc();//YMD
		return b.format();
	}//getCurrentTime
	
}//class

module.exports = Chat;