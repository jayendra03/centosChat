<?php include_once("default/header.php"); ?>
<link href="assets/css/login.css" rel="stylesheet">
<div class="container">
	<div class="row">
		<div class="col-md-6 col-md-offset-3">
			<div class="panel panel-login">
				<div class="panel-heading">
					<div class="row">
						<div class="col-xs-6">
							<a href="#" class="active" id="login-form-link">Login</a>
						</div>
						<div class="col-xs-6">
							<a href="#" id="register-form-link">Register</a>
						</div>
					</div>
					<hr>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col-lg-12">
							<p id="showmsg"></p>
							<form id="login-form" role="form" style="display: block;">
								<div class="form-group">
									<input type="text" name="email" id="email" tabindex="1" class="form-control" placeholder="Email" value="">
								</div>
								<div class="form-group">
									<input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password">
								</div>
								<!-- <div class="form-group text-center">
									<input type="checkbox" tabindex="3" class="" name="remember" id="remember">
									<label for="remember"> Remember Me</label>
								</div> -->
								<div class="form-group">
									<div class="row">
										<div class="col-sm-6 col-sm-offset-3">
											<input type="button" id="login-submit" tabindex="4" class="form-control btn btn-login" value="Log In">
										</div>
									</div>
								</div>
								<!-- <div class="form-group">
									<div class="row">
										<div class="col-lg-12">
											<div class="text-center">
												<a href="#" tabindex="5" class="forgot-password">Forgot Password?</a>
											</div>
										</div>
									</div>
								</div> -->
							</form>
							<form id="register-form" role="form" style="display: none;">
								<div class="form-group">
									<input type="text" name="name" id="name" tabindex="1" class="form-control has_sign" placeholder="Name" value="">
								</div>
								<div class="form-group">
									<input type="text" name="email" id="email" tabindex="2" class="form-control has_sign" placeholder="Email Address" value="">
								</div>
								<div class="form-group">
									<input type="text" name="mobile" id="mobile" tabindex="3" class="form-control has_sign" placeholder="Phone" value="">
								</div>
								<div class="form-group">
									<input type="password" name="password" id="password" tabindex="4" class="form-control has_sign" placeholder="Password">
								</div>
								<div class="form-group">
									<input type="password" name="confirm-password" id="confirm-password" tabindex="5" class="form-control has_sign" placeholder="Confirm Password">
								</div>
								<div class="form-group">
									<div class="row">
										<div class="col-sm-6 col-sm-offset-3">
											<input type="button" id="register_submit" tabindex="6" class="form-control btn btn-register" value="Register Now">
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php include_once("default/footer.php"); ?>