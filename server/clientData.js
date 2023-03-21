
var socket = io();

var loginData = {"userId":1,"type":"user","userName":"mobiweb"};

socket.emit('login', JSON.stringify(loginData), function(data){
	console.log(data);
});

// show online user list
socket.emit('userList',JSON.stringify(loginData), function(data){  

	var usersList = "<ul>";
    $.each(data.result,function(index,user){
        usersList += "<li class='friendLists' to_id='"+user.user_id+"'><a href='javascript:void(0);'>" + user.first_name + "\n" +
                     "<img class='userpic' width='50px' src='http://localhost/testv4-master/upload/images/upload_25d2620a9c53457b0901d3215142ab37.jpg' /></a></li>"
                     "</li>";
    });
    usersList += "</ul>";

	$('#userlist').html(usersList);

});
//getuser userid when we click on userlist
$('body').on('click', '.friendLists', function(){
	    to_id = $(this).attr('to_id');
	    alert(to_id);
	    /*$.ajax({
	        url:"<?php echo base_url() ?>dashboard/openMsgWindow",
	        type:"post",
	        data:{to_id:to_id},
	        success: function(response)
	        {
	            $(".chat_people").append(response);
	        }
	    });*/
	    
	});	

$('form').submit(function(){
	socket.emit('chatMessage', $('#m').val());
	$('#m').val('');
	return false;
});
socket.on('chat_message', function(msg){
	$('#messages').append($('<li>').text(msg));
});
   