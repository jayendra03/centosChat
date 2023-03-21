$(document).ready(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	/************** Register user ********/
	$("body").on("click", "#register_submit", function(){
		$("#register-form .has_sign").each(function(){
		 	if($(this).val() == "")
		 	{
		 		$(this).addClass("has_error");
		 	}
		});
		var mail = $("#register-form #email");
		checkmail(mail, function(jay){
			
			if(jay == 'true')
			{    
				if(!$("#register-form .has_sign").hasClass("has_error"))
				{	
					var name = $("#register-form #name").val();
					var email = $("#register-form #email").val();
					var mobile = $("#register-form #mobile").val();
					var password = $("#register-form #password").val();
				 	var udata = {"name" :name,"email":email,"mobile":mobile,"password":password};
				 	socket.emit('registeruser', JSON.stringify(udata), function(data){
				 		$("#register-form")[0].reset();
				 		$("#showmsg").text("Register Successfully");
				 		setTimeout(function(){
				 			$("#showmsg").text("");
				 		},1500);
				 	});
				}
			}	
		});
	});

	/* Remove has_error class */
	$("body").on("keyup",".has_error", function(){
		$(this).removeClass("has_error");
	});

	/* Check Password */
	$("body").on("keyup","#register-form #confirm-password", function(){
		var cpass = $(this).val();
		var pass = $("#register-form #password").val();
		if(pass !== cpass)
		{
			$(this).addClass("has_error");
		}else{
			$(this).removeClass("has_error");
		}
	});

	$("body").on("keyup","#register-form #email",function() {
        var email = $(this).val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (regex.test(email)) {
            $(this).removeClass("has_error");
        } else {
            $(this).addClass("has_error");
        }
    });

	$("body").on("keyup","#register-form #mobile",function(){
		var mob_no = $(this).val();
		var pattern = /^[0-9-+]+$/;
       
        if(mob_no.match(pattern))
        {
          $(this).removeClass("has_error");
        }else
        {
          $(this).addClass("has_error");
        }
	});

	/**************** Login User *******************/
	$("body").on("click", "#login-submit", function(){
		$("#login-form .has_sign").each(function(){
		 	if($(this).val() == "")
		 	{
		 		$(this).addClass("has_error");
		 	}
		});
		
		if(!$("#login-form .has_sign").hasClass("has_error"))
		{	
			var email = $("#login-form #email").val();
			var password = $("#login-form #password").val();
		 	var udata = {"email":email,"password":password};
		 	socket.emit('loginuser', JSON.stringify(udata), function(data){
		 		console.log("login data:",data);
		 		if(data.success == 1)
		 		{
		 			$("#login-form")[0].reset();
		 			localStorage.setItem("userdata", JSON.stringify(data.result));
		 			localStorage.setItem("userid",data.result[0].id);
		 			window.location.href = APP.service.base_url+"/chat.php";	
		 		}else
		 		{
		 			showmsg("Invalid Credentials","error");
		 		}		 		
		 	});
		}
	});


    function checkmail(mail,callback)
    {
    	var email = mail.val();
    	var data = {"email" : email};
    	socket.emit('checkemail', JSON.stringify(data), function(data){
    		if(data.result.length > 0)
    		{
    			mail.addClass("has_error");
    			$("#showmsg").text("Email alerady Exist").addClass("error");
    			return callback('false');
    		}else{
    			$("#showmsg").text("").removeClass("error");
    			mail.removeClass("has_error");
    			return callback('true');
    		}
    	});
    }

    function showmsg(msg, cls)
    {
    	$("#showmsg").removeClass("error").removeClass("success").text("");
    	$("#showmsg").text(msg).addClass(cls);
    }
});