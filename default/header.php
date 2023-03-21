<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Chat</title>

    <!-- Bootstrap -->
    <link href="assets/css/bootstrap.css" rel="stylesheet">
    <link href="assets/css/font-awesome.min.css" rel="stylesheet">
    
    <link href="assets/css/custom.css" rel="stylesheet">

    <script type="text/javascript" src="assets/js/jquery.min.js"></script>
    <script src="assets/js/config.js"></script>
     <script src="assets/js/bootstrap.js"></script>
    <script src="assets/js/socket.io.js"></script>
    <!-- // <script type="assets/js/simplewebrtc.bundle.js"></script> -->
    <script type="text/javascript" src="voice-chat/simplewebrtc.bundle.js"></script>
    <script type="text/javascript" src="assets/js/custom.js"></script>
    <script type="text/javascript">
        var socket;
        $(document).ready(function(){
            /* Connect To Socket */
            socket = io(APP.service.socket_url);
        });
          // app.listen(3000,'43.229.224.74');
     </script>
</head>
<body>
    <main>
    <input type="hidden" id="user_to_id">