		</main>

		<!-- Caller Modal  -->
		<div class="modal fade groupAdminCallModel" role="dialog" style="display: none;">
		  <div class="modal-dialog">
		    <!-- Modal content-->
		    <div class="modal-content">
		      	<div class="modal-body">
            		<div class="caller_section">
              			<span class="caller_name"></span>
	              		<span class="caller_tune"><img src="assets/images/caller.gif"></span>
	            	</div>
            		<div class="endCall">
			            <a title="End Call" onclick="cancelcall(this);" href="javascript:void(0);" class="endCallAdmin">
			              <i class="fa fa-phone"></i>
			            </a>
			        </div>
	  				<div class="clearfix"></div>
			        <input type="hidden" name="active_members">
		      	</div>
		    </div>
		  </div>
		</div><!-- #groupAdminCallModel -->

		<!--  Receiver Modal -->
		<div class="modal fade groupCallModel" role="dialog" style="display: none;">
		  <div class="modal-dialog">
		    <!-- Modal content-->
		    <div class="modal-content">
		      <div class="modal-body">
		      	<div class="caller_section">
          			<span class="caller_name"></span>
              		<span class="caller_tune"><img src="assets/images/caller.gif"></span>
            	</div>
		        <div class="chatAction">
		        	
		        </div>
		        <div class="clearfix"></div>
		        <input type="hidden" name="room_id" value=""/>
		        <input type="hidden" name="room_url" value=""/>
		        <input type="hidden" name="room_name" value=""/>
		        <input type="hidden" name="from_id" value=""/>
		        <input type="hidden" name="to_id" value=""/>
		        <input type="hidden" name="to_name" value=""/>
		        <input type="hidden" name="from_name" value=""/>
		        <input type="hidden" name="pageTitle" value=""/>
		        <input type="hidden" name="call_type" value=""/>
		      </div>
		    </div>
		  </div>
		</div><!-- #groupCallingModal -->
	
	</body>
</html>