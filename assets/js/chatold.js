var user_id = localStorage.getItem("userid");
var udata = localStorage.getItem("userdata");
udata = JSON.parse(udata);

$(document).ready(function(){

  /* Bind Handler function on unload event */
  $(window).bind('unload', handler);

  $(".logged_user_name").text("Welcome "+udata[0].name);
	get_user_list_chat();

	setInterval(function(){
	   get_user_list_chat();
	},10000);

  /* Logout User */
	$("body").on("click", "#logout_user", function(){
		var user_id = localStorage.getItem("userid");
		var udata = {"user_id" :user_id};
	 	socket.emit('logoutuser', JSON.stringify(udata), function(data){
	 		console.log("logout",data);
	 		localStorage.removeItem("userid");
	 		localStorage.removeItem("userdata");
	 		window.location.href = APP.service.base_url+"/index.php";
	 	});
	});

	/* Add User in Socket*/
  var loginData = {"userId" : user_id };
  socket.emit('login', JSON.stringify(loginData), function(data){
       console.log("login",data);
  });

  /* Chat Script Start */
  // function for get chat-userID and show chat window
  $('body').on('click', '.friendLists', function(){
     // $('.msg_container_base').scrollTop($('.msg_container_base').height());
      $(".chat_wrapper").css("z-index",999);
      to_id = $(this).attr('to_id');
      from_id = $(this).attr('from_id');
      toUserName = $(this).attr('toUserName');
      var hidden_arrayName = $('#hidden_arrayName').val(); 
      var user_arrayName = hidden_arrayName.split(",");
      var user_string = $('#hidden_array').val(); 
      var user_array = user_string.split(",");

      if($.inArray(to_id,user_array) == -1) {  //check id exist in array or not
            var nrow = $(".chat_window_wrapper .chat_window_block").length;
            /*if(nrow>3) { //create
              $(".ulPmCount").append("<li id='countUserList"+user_array[user_array.length-1]+"'><a href='javascript:void(0);' class='getChatListName' ind='"+(user_array.length-1)+"' listCurntId='"+user_array[user_array.length-1]+"' listCurntName='"+user_arrayName[user_array.length-1]+"' >"+user_arrayName[user_array.length-1]+"</a><span class='glyphicon glyphicon-remove pm-u-close close_chat' id='"+user_array[user_array.length-1]+"'></span></li>");

              $("body").off('keypress','#message'+user_array[user_array.length-1]);
              $("#peopleChat"+user_array[user_array.length-1]).remove();
              $(".pmChatCounter").show();
              $(".pm_box_counter").html((user_array.length)-3);
            } */  
            if(nrow < 3) 
            {                
              var chat_offset = 0;
              user_arrayName.push(toUserName);
              var usertostringNam = user_arrayName.toString();
              $("#hidden_arrayName").val(usertostringNam.replace(/^,|,$/g,''));
              user_array.push(to_id); // push id into array              
              var usertostring = user_array.toString();
              $("#hidden_array").val(usertostring.replace(/^,|,$/g,'')); // set array string in hidden value
              localStorage.setItem('myPmChat', usertostring.replace(/^,|,$/g,''));  //set localStorage
              $(".chat_window_wrapper").append('<div class="chat_box chat_window_block open" id="peopleChat'+to_id+'" ></div>');
              $("#peopleChat"+to_id).addClass('active_window');
              $("#user_to_id").val(to_id);
              
              message_window(to_id, function(li){
                //console.log("response", li);
                $("#peopleChat"+to_id).html(li);

                  // chat history start
                  var idStore = {"offset":chat_offset,"chatToId":to_id,"chatFromId":user_id};

                  socket.emit('chatHistory',JSON.stringify(idStore) , function(data){
                    var chatHistoryResult = data.result;
                    if(chatHistoryResult.length > 0) {
                      var jay = 100; 
                      var userToid = "";   
                      var lastChatId = 0;     
                      $.each(chatHistoryResult.reverse(),function(index,user){
                           //console.log("historychatMsesage : ", user);
                            var chatMsg = user.message;
                            //var userImage = user.image;
                            var userFromID = user.from_id;                  
                            var userToid = user.to_id;
                            var userName = user.name;
                            var toName = user.to_name;
                            var msg_type = user.message_type;
                            // var font_size = user.font_size;
                            // var font_style = user.font_style;
                           // var message_lang = user.message_lang;
                            var msgdate = user.msg_date;
                            var msg_date = $.timeago(msgdate);
                            var chat_text = "";
                            var send_text = "";
                            var recv_text = "";

                            if(chatMsg.search("https://") >= 0 || chatMsg.search("http://") >= 0) {      
                              // generate random string for show url/video script issue
                              var texta = "";
                              var possiblea = "abcdefghABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                              for( var i=0; i < 5; i++ ) {
                                texta += possiblea.charAt(Math.floor(Math.random() * possiblea.length));
                              }
                              chat_text+='<p><a href="'+chatMsg+'" target="_blank" data-lightbox="example-set11_'+texta+'">'+chatMsg+'</a></p>';
                            } else  if(chatMsg.search(APP.service.img_ext) >= 0) {
                              var texta = "";
                              var possiblea = "abcdefghijklmnopABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                              for( var i=0; i < 5; i++ ) {
                                  texta += possiblea.charAt(Math.floor(Math.random() * possiblea.length));
                              }
                              chat_text+='<p><a href="'+APP.service.base_url+'/chat_image/'+chatMsg+'" data-lightbox="example-set11_'+texta+'"><img src="'+APP.service.base_url+'/chat_image/'+chatMsg+'" class="file_img img-responsive"></a></p>';
                            } else if(chatMsg.search(APP.service.file_ext) >= 0) {
                              chat_text+='<p><a target="_blank" href="'+APP.service.base_url+'/chat_image/'+chatMsg+'"  class="file_data">'+chatMsg+'</a></p>';
                            }else if(msg_type == 10)
                            {
                                  if(userFromID == user_id)
                                  {
                                    chat_text += "<p> Call to "+toName+", "+chatMsg+"</p>";
                                  }else
                                  {
                                    chat_text = "<p>Call from "+userName+", "+chatMsg+"</p>";  
                                  }                    
                            } else {
                              chat_text+='<p>'+chatMsg+'</p>';
                            }
                            
                            if(from_id == userFromID) {
                                if(lastChatId == userFromID)
                                {
                                  send_text+='<li class="right clearfix same_user_group">';
                                  send_text+='<div class="chat-body clearfix">';
                                  send_text+= chat_text;
                                  send_text+='</div>';
                                  send_text+='</li>';
                                }else{
                                  send_text+='<li class="right clearfix new_user_group">';
                                  send_text+='<span class="chat-img pull-right">';
                                  //send_text+='<img src="'+APP.service.base_url+'/uploads/profile/'+userImage+'" class="img-circle">';            
                                  send_text+='</span>';
                                  send_text+='<div class="chat-body clearfix">';
                                  send_text+='<div class="header">';
                                  send_text+='<small class=" text-muted"><span class="glyphicon glyphicon-time"></span>'+msg_date+'</small>';
                                  send_text+='<strong class="pull-right primary-font">'+userName+'</strong>';
                                  send_text+='</div>';
                                  send_text+= chat_text;                                      
                                  send_text+='</div>';
                                  send_text+='</li>'; 
                                  lastChatId = userFromID;
                                } 
                                  $("#log"+userToid).append(send_text);              
                            } else {
                                  if(lastChatId == userFromID)
                                  {
                                    recv_text+='<li class="left clearfix same_user_group">';
                                    recv_text+='<div class="chat-body clearfix">';
                                    recv_text+= chat_text;            
                                    recv_text+='</div>';
                                    recv_text+='</li>';  
                                  }else{
                                    recv_text+='<li class="left clearfix new_user_group">';
                                    recv_text+='<span class="chat-img pull-left">';
                                   // recv_text+='<img src="'+APP.service.base_url+'/uploads/profile/'+userImage+'" class="img-circle">';
                                    recv_text+='</span>';
                                    recv_text+='<div class="chat-body clearfix">';
                                    recv_text+='<div class="header">';
                                    recv_text+='<strong class="primary-font">'+userName+'</strong> <small class="pull-right text-muted">';
                                    recv_text+='<span class="glyphicon glyphicon-time"></span>'+msg_date+'</small>';
                                    recv_text+='</div>';
                                    recv_text+= chat_text;
                                    recv_text+='</div>';
                                    recv_text+='</li>';
                                    lastChatId = userFromID;
                                  }
                                  $("#log"+userFromID).append(recv_text);
                            }
                      });
                      $('#msg_div'+to_id).scrollTop($('#msg_div'+to_id)[0].scrollHeight);
                    }
                  }); //end 
                  
                  // chat history end 
              });
            }
      } else { 
        //alert('window already opened!');
      }       
  });   

  // close chat window
  $('body').on('click','.close_chat', function(){
      var tid = $(this).attr('id');        
      var user_string1 = $("#hidden_array").val();
      var user_array1 = user_string1.split(",");          
      var index = user_array1.indexOf(tid);
      user_array1.splice(index, 1);
      localStorage.setItem("myPmChat",user_array1); // localStorage remove
      var usertostring1 = user_array1.toString();        
      $("#hidden_array").val(usertostring1); 
      //khel for userListName
      var user_string12 = $("#hidden_arrayName").val();
      var hidden_arrayName = user_string12.split(",");
      hidden_arrayName.splice(index, 1);        
      var usertostring12 = hidden_arrayName.toString();        
      $("#hidden_arrayName").val(usertostring12); 
      $("body").off('keypress','#message'+tid);
      $("#peopleChat"+tid).remove();
      $("#countUserList"+tid).remove(); //RemoveNameFrmUserCounter
  });

  /* Show Typing Status */
  socket.on('typingStatus', function(data){
      // console.log("header socket : ", data);
      var chatFrmId = data.chatFromId;
      var chatMsg = data.chatMsg;
      if(chatMsg.trim()) {
        $("#type"+chatFrmId).show(); 
        $("#type"+chatFrmId).html('Typing...');
      } else {
        $("#type"+chatFrmId).hide(); 
      }
  });


  //get msg from socket and append to To-user window
  socket.on('privateMessage',function(data){
    console.log("recive msg statusON method:",data);
    var chatMsg = data.chatMessage;       
    var chatfrm_id = data.chatFromId;
    var chatToId = data.chatToId;
    //var userImage = data.chatFromImage; 
    var userName = data.chatFromName; 
    var sendPrivateDate = data.sendPrivateDateToDb;
    var sendPrivateDateToDb = data.chatTime;
    var lastFromId = data.lastFromId;
    // var sendPrivateDateToDb = $.timeago(sendPrivateDate);
    
    // sound notification
    if($("#peopleChat"+chatfrm_id).hasClass("active_window")) {
        var recv_text = "";
        var chat_text = "";

        if(chatMsg.search("https://") >= 0 || chatMsg.search("http://") >= 0) {    
            // generate random string for show url/video script issue
            var texta = "";
            var possiblea = "ijklmnopqrstABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            for( var i=0; i < 5; i++ ) {
              texta += possiblea.charAt(Math.floor(Math.random() * possiblea.length));
            }
            // get script for url/video
            chat_text+='<p><a target="_blank" href="'+chatMsg+'"  class="file_data">'+chatMsg+'</a></p>'; 
        } else  if(chatMsg.search(APP.service.img_ext) >= 0) {
          var texta = "";
          var possiblea = "abcdefghijklmnopABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          for( var i=0; i < 5; i++ ) {
              texta += possiblea.charAt(Math.floor(Math.random() * possiblea.length));
          }
          chat_text+='<p><a href="'+APP.service.base_url+'/chat_image/'+chatMsg+'" data-lightbox="example-set12_'+texta+'"><img src="'+APP.service.base_url+'/chat_image/'+chatMsg+'" class="file_img img-responsive"></a></p>';
        } else if(chatMsg.search(APP.service.file_ext) >= 0) {
          chat_text+='<p><a target="_blank" href="'+APP.service.base_url+'/chat_image/'+chatMsg+'"  class="file_data">'+chatMsg+'</a></p>';
        } else {
          chat_text+='<p>'+chatMsg+'</p>';
        }

        if(chatfrm_id == lastFromId)
        {
          recv_text+='<li class="left clearfix same_user_group">';
          recv_text+='<div class="chat-body clearfix">';
          recv_text+='<div class="header">';
          recv_text+='<small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>'+sendPrivateDateToDb+'</small>';
          recv_text+='</div>';
          recv_text+= chat_text;            
          recv_text+='</div>';
          recv_text+='</li>';
        }else{
          recv_text+='<li class="left clearfix new_user_group">';
          recv_text+='<span class="chat-img pull-left">';
          //recv_text+='<img src="<?php echo base_url() ?>uploads/profile/'+userImage+'" class="img-circle">';
          recv_text+='</span>';
          recv_text+='<div class="chat-body clearfix">';
          recv_text+='<div class="header">';
          recv_text+='<small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>'+sendPrivateDateToDb+'</small>';
          recv_text+='</div>';
          recv_text+= chat_text;            
          recv_text+='</div>';
          recv_text+='</li>';
        }
        $("#log"+chatfrm_id).append(recv_text);
        $('#msg_div'+chatfrm_id).scrollTop($('#msg_div'+chatfrm_id)[0].scrollHeight);
        $("#audio_"+chatfrm_id)[0].play();
    } else {
      $("#all_audio_chat")[0].play();
      $( "#pmFrndChatList"+chatfrm_id ).trigger( "click" );
    } // else close                                
  }); // ON socket close 

  /* Video call script  Start */

  /* Call response on other side */
  var resetInt = null;
  socket.on('createPublicChatRoomResponse',function(data){
    console.log('createPublicChatRoomResponse',data);
    var in_call = localStorage.getItem("incall");
    if(in_call == null || in_call == 0)
    {
      var val = data.room_name;
      var roomUrl = data.room_url;
      $('.groupCallModel').attr('id', val);
      $('#'+val+' .chatAction').html('');
      $('#'+val+' .chatAction').addClass(val);

      /* Convert Fromid in Toid and Toid in Fromid  */
      /* Convert fromname in toname and toname in fromname */
      $('#'+val+' .modal-body .chatAction').append('<a class="acceptButton" href="javascript:void(0);" onclick="acceptCall();"><i class="fa fa-phone"></i></a><a class="rejectButton" href="javascript:void(0);" onclick="rejectCall('+data.room_id+', '+data.room_name+', '+data.fromId+', '+data.toId+');"><i class="fa fa-phone"></i></a>');
      $('#'+val).append('<audio class="skypeAudio" controls autoplay loop><source src="'+APP.service.base_url+'/assets/tones/call-tone.mp3" type="audio/mpeg"></audio>');
      $('#'+val+' input[name="room_id"]').val(data.room_id);
      $('#'+val+' input[name="room_url"]').val(roomUrl);
      $('#'+val+' input[name="room_name"]').val(val);
      $('#'+val+' input[name="from_id"]').val(data.toId);
      $('#'+val+' input[name="to_id"]').val(data.fromId);
      $('#'+val+' input[name="to_name"]').val(data.from_name);
      $('#'+val+' input[name="from_name"]').val(data.to_name);
      $('#'+val+' input[name="pageTitle"]').val(data.pageTitle);
      $('#'+val+' input[name="call_type"]').val(data.call_type);
      $('#'+val+' .caller_name').text(data.pageTitle+': '+data.from_name+' is Calling');
      $('#'+val).modal({
        backdrop: 'static',
        keyboard: false
      });
      return false;     
    }else
    {
        socket.emit('callConfirmation',JSON.stringify(data) , function(data){
          console.log(data);
        });
    }
  });
  
  /* Call Confirmation response */
  socket.on("callConfirmationResponse", function(data){
      console.log('callConfirmationResponse', data);
      $('.groupAdminCallModel audio').remove();
      $('.groupAdminCallModel').modal('hide');
      alert(APP.service.confirm_response);
      return false;
  });
  
  /* Hide calling window from users */
  socket.on('cancelGroupCallResponse',function(data){
    console.log('cancelGroupCallResponse', data);
    var modelId = $('.groupCallModel').attr('id');
    $('#'+modelId).modal('hide');
    $('#'+modelId+' .chatAction').html('');
    $('#'+modelId+' audio').remove();
    $('#'+modelId+' .chatAction').removeClass(modelId);
    $('#'+modelId+' input[name="room_id"]').val('');
    $('#'+modelId+' input[name="room_url"]').val('');
    $('#'+modelId+' input[name="room_name"]').val('');
    $('#'+modelId+' input[name="from_id"]').val('');
    $('#'+modelId+' input[name="to_id"]').val('');
    $('#'+modelId+' input[name="to_name"]').val("");
    $('#'+modelId+' input[name="from_name"]').val('');
    $('#'+modelId+' input[name="pageTitle"]').val('');
    $('#'+modelId+' .caller_name').text('');
    $('.groupCallModel').removeAttr('id');
  });

  /* Reject call response socket on function */
  socket.on('rejectGroupCallResponse',function(data){
    console.log('rejectGroupCallResponse', data);
    $('.groupAdminCallModel audio').remove();
    $('.groupAdminCallModel').modal('hide');
  });

  /* Accept call socket on function */
  socket.on('acceptGroupCallResponse',function(data){
    console.log('acceptGroupCallResponse', data);
    var roomUrl = data.room_url;
    $('.groupAdminCallModel audio').remove();
    $('.groupAdminCallModel').modal('hide');
    goclicky(roomUrl, 'userCall');
  }); 

  socket.on('endongoingcallResponse',function(data){
      console.log('endongoingcallResponse', data);
      if(data.is_call_ended == 1) {
          if(user_id == data.toId || user_id == data.fromId) {
              if(user_id == data.cut_id)
              {
                var showmsg = {"toId":data.toId,"fromId":data.fromId, "msg":data.call_duration};
                showcallmsg(showmsg); 
              }
          }
      }
  });

});

/* Get User Chat List */
var onlineList = "0,";
function get_user_list_chat()
{
    console.log("list",onlineList);
    var userList = {"user_id": user_id, "onlineList":onlineList};
    socket.emit('onlineuserlist', JSON.stringify(userList), function(data){
         console.log(data);
         var ulist = data.result;
         var olist  = data.oldlist;
         if(ulist.length > 0)
         {  
            $.each(ulist, function(i,u){
              var list = "";
              if(u.online_status == 1)
              {
              	list += '<li class="online list_uesr" id="user_list_'+u.id+'">';
              }else
              {
              	list += '<li class="list_uesr" id="user_list_'+u.id+'">';	
              }
              
              list += '    <a href="javascript:void(0)" class="friendLists"  id="pmFrndChatList'+u.id+'" from_id="'+user_id+'" to_id="'+u.id+'"><span class="fa fa-circle"></span>';
              list +=  u.name+'    </a>';
              list += '</li>';
              onlineList += u.id+",";
              $(".load_user_list").append(list);
            });
         }

         if(olist.length > 0)
         {
            $.each(olist, function(j,k){
              if(k.online_status == 0)
              {
                  $("#user_list_"+k.id).removeClass("online");
                  // onlineList = onlineList.replace(","+k.id+",", ",");
              }else if(k.online_status == 1)
              {
              	$("#user_list_"+k.id).addClass("online");
              }
            });
         }
    });
}

/* Load Chat Box */
function message_window(to_id, callback)
{
  var userData = {"to_id" : to_id };
  socket.emit("getuserdetail", JSON.stringify(userData), function(data){
    //console.log("data", data);
    //return callback(data.result[0].id);
    var tdata = data.result[0];
    var jlist = "";

     /* Chat HTML */  
    jlist += '<div class="panel panel-success">';
    jlist += '    <div class="panel-heading">';
    jlist += '        <span class="glyphicon glyphicon-comment"></span> '+tdata.name;
    jlist += '        <div class="btn-group pull-right chat_action">';
    jlist += '            <span class="call_icon" id="pmFrndCallList'+tdata.id+'" from_id="'+user_id+'" from_name="'+udata[0].name+'" to_id="'+tdata.id+'" to_name="'+tdata.name+'" c_type="1" onclick="publicChatCall(this);"><i class="fa fa-phone" aria-hidden="true"></i></span>';
    jlist += '            <span class="cam_icon publicChatCalling" id="pmFrndVideoList'+tdata.id+'" from_id="'+user_id+'" from_name="'+udata[0].name+'" to_id="'+tdata.id+'" to_name="'+tdata.name+'" c_type="2" onclick="publicChatCall(this);"><i class="fa fa-video-camera" aria-hidden="true"></i></span>';
    jlist += '            <span class="close_icon close_chat" id="'+tdata.id+'"><i class="glyphicon glyphicon-remove "></i></span>';
    jlist += '        </div>';
    jlist += '    </div>';
    jlist += '    <div class="panel-body" id="msg_div'+tdata.id+'">';
    jlist += '        <ul class="chat" id="log'+tdata.id+'">';

    jlist += '        </ul>';
    jlist += '    </div>';
    jlist += '    <div class="panel-footer">';
    jlist += '        <!-- div for typing status -->';
    jlist += '        <div class="typing-progress" id ="type'+tdata.id+'" ></div>';
    jlist += '        <div class="input-group message_box" id="'+tdata.id+'">';
    jlist += '            <textarea rows="1" id="message'+tdata.id+'" to_id="'+tdata.id+'" to_name="'+tdata.name+'" from_id="'+user_id+'" from_name="'+udata[0].name+'" class="form-control input-sm chat_input" /></textarea>';
    //jlist += '            <span class="input-group-btn">';
    //jlist += '                <form id="uploadimage'+tdata.id+'" enctype="multipart/form-data" method="post" to_id="'+tdata.id+'" to_name="'+tdata.name+'" from_id="'+user_id+'" from_name="'+udata[0].name+'">';
    //jlist += '                    <input type="file" name="upload" id="upload_id'+tdata.id+'" />';
    //jlist += '                </form>';
    //jlist += '                <span class="fa fa-paperclip"></span>';
    //jlist += '            </span>';
    jlist += '        </div>';
    jlist += '    </div>';
    jlist += '    <audio class="centose_chat" id="audio_'+tdata.id+'"><source src="'+APP.service.base_url+'/assets/tones/centose_chat_alert.mp3" type="audio/mpeg"></audio>';
    jlist += '</div>';
    jlist += '<input type="hidden" id="chat_offset'+tdata.id+'" value="0">';
    
    /* Chat Script */
      jlist += '<script type="text/javascript">';
      jlist += '  $(document).ready(function(){';
      jlist += '    /* Scroll Down Chat ';
      jlist += '    $("#msg_div'+tdata.id+'").scrollTop($("#msg_div'+tdata.id+'")[0].scrollHeight);';
      jlist += '    /* Load Chat on Scroll */';
      jlist += '    $("#msg_div'+tdata.id+'").scroll(function() {';
      jlist += '        if ($("#msg_div'+tdata.id+'").scrollTop() == 0){ ';
      jlist += '          var to_id = '+tdata.id+';';
      jlist += '          var from_id = '+user_id+';';
      jlist += '          var chat_offset = $("#chat_offset'+tdata.id+'").val();';
      jlist += '          chatOffset=parseInt(chat_offset)+parseInt(10);';
      jlist += '          $("#chat_offset'+tdata.id+'").val(chatOffset);';
      jlist += '          var sendData = {"offset":chatOffset,"chatToId":to_id,"chatFromId":from_id};';
      jlist += '          loadChatHistoryMaster(sendData);  /* call function in Footer */';
      jlist += '          $("#msg_div'+tdata.id+'").scrollTop($("#msg_div'+tdata.id+'")[0].scrollHeight/2); /* Reset scroll */';
      jlist += '        }';
      jlist += '    });';
      jlist += '    $("body").off("keypress","#message'+tdata.id+'"); /* distroy event */';

      jlist += '  /* Send Text To User */';
      jlist += '  $("body").on("keypress","#message'+tdata.id+'", function(e) {';
      jlist += '    /* send value to socket to check typing status(used at two places) */';
      jlist += '    var write_toid = $(this).attr("to_id");';
      jlist += '    var write_fromid = $(this).attr("from_id");';
      jlist += '    var msgs =  $(this).val();';
      jlist += '    var dataa = {"chatToId" : write_toid, "chatFromId" : write_fromid, "chatMsg" : msgs };';
      jlist += '    socket.emit("writingStatus", JSON.stringify(dataa), function(data) { ';
      jlist += '       console.log(data); ';
      jlist += '    }); /* End  */';

      jlist += '    if (e.which == 13 && !e.shiftKey) {  ';    
      jlist += '        e.preventDefault(); ';
      jlist += '        var chatMessage =  $(this).val(); ';
      jlist += '        if(chatMessage.trim()!= "") {     ';
      jlist += '            var chatFromId = $(this).attr("from_id");';
      jlist += '            var chatFromName = $(this).attr("from_name");       ';
      jlist += '            var chatFromImage = $(this).attr("from_profilepic"); ';
      jlist += '            var chatToId = $(this).attr("to_id");  ';
      jlist += '            var chatToName = $(this).attr("to_name"); ';
      jlist += '            var chatToImage = $(this).attr("to_profilepic"); ';
      jlist += '            var sendPrivateDateToDb = get_current_date(); ';
      jlist += '            var sendTime = formatAMPM(); ';

      jlist += '            /* send data to socket */ ';
      jlist += '            var msgStore = Object.create(null); ';
      jlist += '            msgStore.chatFromId = chatFromId; ';
      jlist += '            msgStore.chatFromName = chatFromName; ';
      jlist += '            msgStore.chatFromImage = chatFromImage; ';
      jlist += '            msgStore.chatToId = chatToId; ';
      jlist += '            msgStore.chatToName = chatToName; ';
      jlist += '            msgStore.chatToImage = chatToImage; ';
      jlist += '            msgStore.chatMessage = chatMessage; ';
      jlist += '            /* msgStore.font_style = font_style; */ ';
      jlist += '            /* msgStore.font_size = font_size; */ ';
      jlist += '            msgStore.sendPrivateDateToDb = sendPrivateDateToDb; ';
      jlist += '            msgStore.chatDeviceType = "2"; ';
      jlist += '            msgStore.chatTime = sendTime; ';
      jlist += '            var msg_date = sendTime; ';
      jlist += '            var chatMsg = chatMessage; ';
      jlist += '            /* privateMessage(msgStore); */ ';                              
      jlist += '            socket.emit("privateMessage", JSON.stringify(msgStore), function(data){ ';
      jlist += '                 console.log("send msg status:",data); ';
      jlist += '                 /* append msg to From-user window */';
      jlist += '                  var send_text = ""; ';
      jlist += '                  var chat_text = "";   ';                      
      jlist += '                            if(chatMsg.search('+APP.service.img_ext+') >= 0) { ';
      jlist += '                                  var texta = ""; ';
      jlist += '                                  var possiblea = "abcdefghijklmnopABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; ';
      jlist += '                                  for( var i=0; i < 5; i++ ) { ';
      jlist += '                                      texta += possiblea.charAt(Math.floor(Math.random() * possiblea.length)); ';
      jlist += '                                  } ';
      jlist += "                                 chat_text += '<p><a href="+APP.service.base_url+"/chat_image/'+chatMsg+' data-lightbox=example-set11_'+texta+'><img src="+APP.service.base_url+"chat_image/'+chatMsg+' class=\"file_img img-responsive\"></a></p>';";
      jlist += '                            } else if(chatMsg.search('+APP.service.file_ext+') >= 0) { ';
      jlist += "                              chat_text+='<p><a target=_blank href="+APP.service.base_url+"chat_image/'+chatMsg+'  class=file_data>'+chatMsg+'</a></p>';";
      //jlist += '                              // $("#log"+userToid).prepend(send_text);
      jlist += '                            } else { ';
      jlist += "                                  chat_text+='<p>'+chatMsg+'</p>';";
      //jlist += '                                  //$("#log"+userToid).prepend(send_text);
      jlist += '                            } ';
      jlist += '                            if(chatFromId == data.lastFromId) ';
      jlist += '                            { ';
      jlist += "                             send_text+='<li class=\"right clearfix same_user_group\">'; ";
      jlist += "                              send_text+='<div class=\"chat-body clearfix\">'; ";
      jlist += "                             send_text+='<div class=\"header\">'; ";
      jlist += "                              send_text+='<small class=text-muted><span class=\"glyphicon glyphicon-time\"></span>'+msg_date+'</small>'; ";
      jlist += "                              send_text+='</div>'; ";
      jlist += "                              send_text+= chat_text; ";
      jlist += "                              send_text+='</div>'; ";
      jlist += "                              send_text+='</li>'; ";
      jlist += "                           }else{ ";
      jlist += "                              send_text+='<li class=\"right clearfix new_user_group\">'; ";
      jlist += "                              send_text+='<span class=\"chat-img pull-right\">'; ";
      //jlist += "                             send_text+='<img src="<?php echo base_url() ?>uploads/profile/'+chatFromImage+'" class="img-circle">';            
      jlist += "                              send_text+='</span>'; ";
      jlist += "                              send_text+='<div class=\"chat-body clearfix\">'; ";
      jlist += "                              send_text+='<div class=header>'; ";
      jlist += "                              send_text+='<small class=text-muted><span class=\"glyphicon glyphicon-time\"></span>'+msg_date+'</small>'; ";
      jlist += "                              send_text+='</div>'; ";
      jlist += "                              send_text+= chat_text; ";
      jlist += "                              send_text+='</div>'; ";
      jlist += "                              send_text+='</li>'; ";
      jlist += "                            } ";
      jlist += "                           $('#log"+tdata.id+"').append(send_text); ";
      jlist += "                           $('#msg_div"+tdata.id+"').scrollTop($('#msg_div"+tdata.id+"')[0].scrollHeight); ";
      jlist += "                           $('#message"+tdata.id+"').val(''); "; 
      jlist += "                            /* send value to socket for check typing status */ ";
      jlist += "                            var chatText_msg = $('#message"+tdata.id+"').val(); ";
      jlist += "                            var dataSnd = {'chatToId' : chatToId, 'chatFromId' : chatFromId, 'chatMsg' : chatText_msg }; ";
      jlist += "                            socket.emit('writingStatus', JSON.stringify(dataSnd), function(data){ ";
      jlist += "                              console.log(data); ";
      jlist += "                            });/* end */ ";
      jlist += "                      }); /* socket close */ ";
      jlist += "        } ";
      jlist += "   } ";
      jlist += " });  /* close */ ";
      jlist += "}); ";
    /* Script End  */
    return callback(jlist);
  });
}

/* Load Chat History */  
function loadChatHistoryMaster(idStore) {
      socket.emit('chatHistory',JSON.stringify(idStore) , function(data){
        var chatHistoryResult = data.result;
        if(chatHistoryResult.length>0) {
          var jay = 100; 
          var lastChatId = 0; 
          var old_chat = "";
          var chatToId = 0;
          $.each(chatHistoryResult.reverse(),function(index,user){
              //console.log("historychatMsesage : ", user);
              var chatMsg = user.message;
              //var userImage = user.image;
              var userFromID = user.from_id;                  
              var userToid = user.to_id;
              var userName = user.name;
              var toName = user.to_name;
              var msg_type = user.message_type;
              // var font_size = user.font_size;
              // var font_style = user.font_style;
             // var message_lang = user.message_lang;
              var msgdate = user.msg_date;
              var msg_date = $.timeago(msgdate);
              var chat_text = "";
              var send_text = "";
              var recv_text = "";
              
              
              if(chatMsg.search("https://") >= 0 || chatMsg.search("http://") >= 0) {      
                // generate random string for show url/video script issue
                var texta = "";
                var possiblea = "abcdefghABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                   for( var i=0; i < 5; i++ ) {
                    texta += possiblea.charAt(Math.floor(Math.random() * possiblea.length));
                   }
                   chat_text+='<p><a target="_blank" href="'+chatMsg+'"  class="file_data">'+chatMsg+'</a></p>';

              } else if(chatMsg.search(APP.service.img_ext) >= 0) {
                var texta = "";
                var possiblea = "abcdefghijklmnopABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                for( var i=0; i < 5; i++ ) {
                    texta += possiblea.charAt(Math.floor(Math.random() * possiblea.length));
                }
                chat_text+='<p><a href="'+APP.service.base_url+'/chat_image/'+chatMsg+'" data-lightbox="example-set11_'+texta+'"><img src="'+APP.service.base_url+'/chat_image/'+chatMsg+'" class="file_img img-responsive"></a></p>';
              } else if(chatMsg.search(APP.service.file_ext) >= 0) {
                chat_text+='<p><a target="_blank" href="'+APP.service.base_url+'/chat_image/'+chatMsg+'"  class="file_data">'+chatMsg+'</a></p>';
              } else if(msg_type == 10)
              {
                    if(userFromID == user_id)
                    {
                      chat_text += "<p> Call to "+toName+", "+chatMsg+"</p>";
                    }else
                    {
                      chat_text = "<p>Call from "+userName+", "+chatMsg+"</p>";  
                    }                    
              }
               else {
                    chat_text+='<p>'+chatMsg+'</p>';
              }

              if(from_id==userFromID) {
                  if(lastChatId == userFromID)
                  {
                    send_text+='<li class="right clearfix same_user_group">';
                    send_text+='<div class="chat-body clearfix">';
                    send_text+= chat_text;
                    send_text+='</div>';
                    send_text+='</li>';
                  }else{
                    send_text+='<li class="right clearfix new_user_group">';
                    send_text+='<span class="chat-img pull-right">';
                    //send_text+='<img src="<?php echo base_url() ?>uploads/profile/'+userImage+'" class="img-circle">';            
                    send_text+='</span>';
                    send_text+='<div class="chat-body clearfix">';
                    send_text+='<div class="header">';
                    send_text+='<small class=" text-muted"><span class="glyphicon glyphicon-time"></span>'+msg_date+'</small>';
                    send_text+='<strong class="pull-right primary-font">'+userName+'</strong>';
                    send_text+='</div>';
                    send_text+= chat_text;                        
                    send_text+='</div>';
                    send_text+='</li>'; 
                    lastChatId = userFromID;
                  }
                  old_chat += send_text; 
                  chatToId = userToid;              
              } else {
                  if(lastChatId == userFromID)
                  {
                    recv_text+='<li class="left clearfix same_user_group">';
                    recv_text+='<div class="chat-body clearfix">';
                    recv_text+= chat_text;            
                    recv_text+='</div>';
                    recv_text+='</li>';  
                  }else{
                    recv_text+='<li class="left clearfix new_user_group">';
                    recv_text+='<span class="chat-img pull-left">';
                    //recv_text+='<img src="<?php echo base_url() ?>uploads/profile/'+userImage+'" class="img-circle">';
                    recv_text+='</span>';
                    recv_text+='<div class="chat-body clearfix">';
                    recv_text+='<div class="header">';
                    recv_text+='<strong class="primary-font">'+userName+'</strong> <small class="pull-right text-muted">';
                    recv_text+='<span class="glyphicon glyphicon-time"></span>'+msg_date+'</small>';
                    recv_text+='</div>';
                    recv_text+= chat_text;                        
                    recv_text+='</div>';
                    recv_text+='</li>'; 
                    lastChatId = userFromID;
                  }     
                  old_chat += recv_text;
                  chatToId = userFromID;
                  //$("#log"+userFromID).prepend(recv_text);
                  //$('#msg_div'+userFromID).scrollTop($('#msg_div'+userFromID)[0].scrollHeight);
              }
          });
          $("#log"+chatToId).prepend(old_chat);
        }
      }); //end
}

/* Set Current Date Time in Format YYYY-MM-DD H:i:s  */
function get_current_date()
{
  var d = new Date();
  var timestamp = d.getTime();
  var date = new Date(timestamp);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var set_date = year + "-" + set_zero(month) + "-" + set_zero(day) + " " + set_zero(hours) + ":" + set_zero(minutes) + ":" + set_zero(seconds);
  return set_date;
  //alert(year + "-" + set_zero(month) + "-" + set_zero(day) + " " + set_zero(hours) + ":" + set_zero(minutes) + ":" + set_zero(seconds));
}

/* Check Zero */
function set_zero(val)
{
  var jay = (val < 10)? "0"+val : val;
  return jay;
}

/* Get Time In Format HH:i AM/PM */
function formatAMPM() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? '0'+hours : hours;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

/* Video Calling Start */

/* Create Call to user */
function publicChatCall(ele) {
  var in_call = localStorage.getItem("incall");
  if(in_call == null || in_call == 0)
  {
    var fromId = $(ele).attr('from_id');
    var toId = $(ele).attr('to_id');
    var time = Date.now || function() {
      return +new Date;
    };
    var from_name = $(ele).attr('from_name');
    var to_name = $(ele).attr('to_name');
    var call_type = $(ele).attr('c_type');
    var pageTitle = (call_type == 1)? "Voice Call" : "Video Call";
    var roomName = 'cenvid'+fromId+toId+time();
    var roomUrl = APP.service.base_url+'/usercall.html?room='+roomName+'&ct='+call_type;
    var dateCreated = get_current_date();
    
    $('.groupAdminCallModel .caller_name').text(pageTitle+': Calling to '+to_name);
    $('.groupAdminCallModel .endCallAdmin').attr("fromId",fromId).attr("toId",toId).attr("roomName",roomName);
    $('.groupAdminCallModel').append('<audio class="skypeAudio" controls autoplay loop><source src="'+APP.service.base_url+'/assets/tones/call-tone.mp3" type="audio/mpeg"></audio>');
    $('.groupAdminCallModel').modal({
      backdrop: 'static',
      keyboard: false
    });

    var idStore = { "fromId":fromId, "toId":toId, "from_name":from_name, "to_name":to_name, "pageTitle":pageTitle, "room_name":roomName, "room_url":roomUrl, "date_created":dateCreated, "call_type":call_type};
    socket.emit('createPublicChatRoom',JSON.stringify(idStore) , function(data){
      console.log(data);
    });
  }else{
    alert(APP.service.call_error);
    return false;
  }
}

/**
* Cancel Call
*/
function cancelcall(ele) {
  var toId = $(ele).attr('toid');
  var fromId = $(ele).attr("fromId");
  var roomName = $(ele).attr("roomName");
  var idStore = {"toId":toId,"roomName":roomName};
  socket.emit('cancelGroupCall',JSON.stringify(idStore) , function(data){
    var showmsg = {"toId":toId,"fromId":fromId, "msg":"canceled"};
    showcallmsg(showmsg);    
  });
  $('.groupAdminCallModel audio').remove();
  $('.groupAdminCallModel').modal('hide');
}

/**
* Reject Group Call By user
* @param roomid, room name, to id , from id
* Convert Fromid in Toid and Toid in Fromid
* @return response = response/error
*/
function rejectCall(roomId, room_name, toId, fromId) {
  var modelId = $('.groupCallModel').attr('id');
  $('#'+modelId).modal('hide');
  $('#'+modelId+' .chatAction').html('');
  $('#'+modelId+' audio').remove();
  $('#'+modelId+' .chatAction').removeClass(modelId);
  $('#'+modelId+' input[name="room_id"]').val('');
  $('#'+modelId+' input[name="room_url"]').val('');
  $('#'+modelId+' input[name="room_name"]').val('');
  $('#'+modelId+' input[name="from_id"]').val('');
  $('#'+modelId+' input[name="to_id"]').val('');
  $('#'+modelId+' input[name="to_name"]').val("");
  $('#'+modelId+' input[name="from_name"]').val('');
  $('#'+modelId+' input[name="pageTitle"]').val('');
  $('#'+modelId+' .caller_name').text('');
  $('.groupCallModel').removeAttr('id');

  var idStore = {"room_id":roomId, "room_name":room_name, "toId":toId, "fromId":fromId};
  socket.emit('rejectGroupCall',JSON.stringify(idStore) , function(data){
    console.log(data);
    var showmsg = {"toId":fromId,"fromId":toId, "msg":"Rejected"};
    showcallmsg(showmsg); 
  });
}

/**
* Accept Group Call By other side
* @param roomid, room name, room url, to id, from id, to name, from name, page title
* @return response = success/error
* Convert Fromid in Toid and Toid in Fromid  
* Convert fromname in toname and toname in fromname 
*/
function acceptCall() {
  var val = $('.groupCallModel').attr('id');
  var roomId =  $('#'+val+' input[name="room_id"]').val();
  var room_url =  $('#'+val+' input[name="room_url"]').val();
  var room_name =  $('#'+val+' input[name="room_name"]').val();
  var fromId =  $('#'+val+' input[name="from_id"]').val();
  var toId =  $('#'+val+' input[name="to_id"]').val();
  var to_name =  $('#'+val+' input[name="to_name"]').val();
  var from_name =  $('#'+val+' input[name="from_name"]').val();
  var pageTitle =  $('#'+val+' input[name="pageTitle"]').val();
  var call_type =  $('#'+val+' input[name="call_type"]').val();
  var idStore = {"room_id":roomId, "room_name":room_name, "room_url":room_url, "toId":toId, "fromId":fromId, "to_name":to_name, "from_name":from_name, "pageTitle":pageTitle };
  var webrtc = new SimpleWebRTC({
      //url: '',
      localVideoEl: 'localVideo',
      remoteVideosEl: '',
      autoRequestMedia: true,
      debug: false,
      detectSpeakingEvents: true,
      autoAdjustMic: false,
      media: {
        video: (call_type == 2)? true : false,
        audio: true
      }
  });

  webrtc.createRoom(room_name, function (err, name) {
    console.log(' create user room cb', arguments);
    if(!err) {
        var modelId = $('.groupCallModel').attr('id');
        $('#'+modelId).modal('hide');
        $('#'+modelId+' .chatAction').html('');
        $('#'+modelId+' audio').remove();
        $('#'+modelId+' .chatAction').removeClass(modelId);
        $('#'+modelId+' input').val('');
        $('#'+modelId+' .caller_name').text('');
        $('.groupCallModel').removeAttr('id');
        
        socket.emit('acceptGroupCall',JSON.stringify(idStore) , function(data){
          console.log(data);
        });
        goclicky(room_url, 'userCall');
    } else {
        console.log(err);
    }
  });
}

/* Open Call Window */
function goclicky(url, name){
  localStorage.setItem("incall",1);
  var x = screen.width/2 - 800/2;
  var y = screen.height/2 - 580/2;
  window.open(url, name,'height=585,width=800,left='+x+',top='+y);
}

/* Function for update staus while close browser */
var handler = function ()
{
    var user_id = localStorage.getItem("userid");
    var udata = {"user_id" :user_id};
    socket.emit('logoutuser', JSON.stringify(udata), function(data){

    });
} 