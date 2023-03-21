<?php include_once("default/header.php"); ?>
<script type="text/javascript" src="assets/js/jquery.timeago.js"></script>
<script type="text/javascript" src="assets/js/callresponse.js"></script>
<script type="text/javascript" src="assets/js/chat.js"></script>

<div class="container">
    <header>
    	<div class="row">
    		<div class="col-sm-12">
    			<div class="row">
    				<div class="col-sm-2">
                       <span class="logged_user_name"></span> 
                    </div>
                    <div class="col-sm-10">
    				<a href="javascript:void(0)" class="btn btn-primary" id="logout_user">Logout</a>
    				</div>
    			</div>
    		</div>		
    	</div>
    </header>
</div>

<!-- chat window -->
<audio class="centose_chat" id="all_audio_chat"><source src="assets/tones/centose_chat_alert.mp3" type="audio/mpeg"></audio>
<input type="hidden" id="hidden_array">
<input type="hidden" id="hidden_arrayName">

<div class="chat_window_wrapper chat_wrapper clearfix"></div>

<div class="chatlist showchatlist">
    <div class="panel panel-success">
        <div class="panel-heading">
            <h3 class="panel-title">Users</h3>
            <span class="fa fa-close close_chat_list"></span>
        </div>
        <div class="panel-body">
            <ul class="load_user_list">
                
            </ul>
        </div>
    </div>
</div>

<?php include_once("default/footer.php"); ?>