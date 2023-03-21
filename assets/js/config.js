var APP = {};
APP.service = {
		"socket_url" : "http://localhost:4530",
		"base_url" : "http://localhost/centose",
		"img_ext" : "/.jpg|.png|.gif|.bmp|.jpeg|.tif/",
		"file_ext" : "/.txt|.zip|.rar|.xls|.pdf|.doc|.docx|.sql/",
		"all_file_ext" : '"jpg","png","gif","bmp","jpeg","tif","txt","zip","rar","xls","pdf","doc","docx","sql"',
		"confirm_response" : "person is on another call",
		"call_error" : "You already on call"	
}

var user_id = localStorage.getItem("userid");
var filename = location.pathname.substr(location.pathname.lastIndexOf("/")+1);
if(user_id != null)
{
	if(filename == "index.php")
	{
		window.location.href = APP.service.base_url+"/chat.php";
	}
}else
{
	var rootpermission = ["index.php"];
	if(rootpermission.indexOf(filename) == -1)
	{
		window.location.href = APP.service.base_url+"/index.php";
	}
}