var user_id = localStorage.getItem("userid");
var udata = localStorage.getItem("userdata");
udata = JSON.parse(udata);

$(document).ready(function(){
   /* show Call Response on chat */
  // var showmsg = {"chatFromId":data.fromId,"chatFromName":fromName,"chatToId":data.toId,"chatMessage":chatMessage,"msgdate":msgdate,"msgTime":msgTime};
  socket.on("addcallmsgresponse", function(data){
  		console.log("addcallmsgresponse",data);
      	showmsgchat(data.chatFromId,data.chatToId,data.fromText,data.msgTime);
  }); 
});

/* Show call msg on chat */
// var showmsg = {"toId":toId,"fromId":fromId, "msg":"canceled"};
function showcallmsg(data)
{
	var caller_id = (data.fromId == user_id) ? data.toId : data.fromId;
	
	getuserdata(caller_id, function(tdata){
    	var todata = tdata.result[0];
    	var chatMessage = data.msg;
        var msgdate = get_current_date();
        var msgTime = formatAMPM();
        if(data.fromId == user_id)
    	{
    		var fromText =  "Call from "+udata[0].name+", "+chatMessage;
    		var chat_text = "Call to "+todata.name+", "+chatMessage;
    	}else{
    		var fromText =  "Call to "+udata[0].name+", "+chatMessage;
    		var chat_text = "Call from "+todata.name+", "+chatMessage;
    	}
        var showmsg = {"chatFromId":data.fromId,"fromText":fromText,"chatToId":data.toId,"chatMessage":chatMessage,"msgdate":msgdate,"msgTime":msgTime,"caller_id":caller_id};
        socket.emit('addcallmsg',JSON.stringify(showmsg) , function(cdata){
            console.log("addcallmsg",cdata);
            showmsgchat(data.fromId,data.toId,chat_text,msgTime);
        });
   });
}

/* Get User Details  */
function getuserdata(to_id, callback)
{	
	console.log("getuserdata");
    var userData = {"to_id" : to_id };
    socket.emit("getuserdetail", JSON.stringify(userData), function(data){
    	console.log("getuserdetail");
        callback(data);
    });
}

function showmsgchat(from_id,to_id,chat_text,msgTime)
{
	if(from_id == user_id)
    {
		var send_text = "";
	    send_text+='<li class="right clearfix new_user_group">';
	    send_text+='<span class="chat-img pull-right">';
	    send_text+='</span>';
	    send_text+='<div class="chat-body clearfix">';
	    send_text+='<div class=header>';
	    send_text+='<small class=text-muted><span class="glyphicon glyphicon-time"></span>'+msgTime+'</small>';
	    send_text+='</div>';
	    send_text+= '<p>'+chat_text+'</p>';
	    send_text+='</div>';
	    send_text+='</li>';
	    $('#log'+to_id).append(send_text);
	    $('#msg_div'+to_id).scrollTop($('#msg_div'+to_id)[0].scrollHeight);
	}else
	{
		var recv_text = "";
      	recv_text+='<li class="left clearfix new_user_group">';
        recv_text+='<span class="chat-img pull-left">';
        recv_text+='</span>';
        recv_text+='<div class="chat-body clearfix">';
        recv_text+='<div class="header">';
        recv_text+='<small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>'+msgTime+'</small>';
        recv_text+='</div>';
        recv_text+= '<p>'+chat_text+'</p>';
        recv_text+='</div>';
        recv_text+='</li>';
        $("#log"+from_id).append(recv_text);
        $('#msg_div'+from_id).scrollTop($('#msg_div'+from_id)[0].scrollHeight);
	}
}