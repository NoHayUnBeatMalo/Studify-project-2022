<?php
session_start();
if (isset($_SESSION['S_IDUSUARIO'])) {
	header('Location: ../vista/index.php');
}


?>

<!DOCTYPE html>
<html lang="en">

<head>
	<title>Login V4</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!--===============================================================================================-->
	<link rel="icon" type="image/png" href="images/icons/favicon.ico" />
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/iconic/css/material-design-iconic-font.min.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/daterangepicker/daterangepicker.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="css/util.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<!--===============================================================================================-->
</head>

<body>

	<div class="limiter">
		<div class="container-login100" style="background-image: url('images/bg-01.jpg');">
			<div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">

				<span class="login100-form-title p-b-49">
					INICIAR SESI&Oacute;N
				</span>

				<div class="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
					<span class="label-input100">Usuario</span>
					<input class="input100" type="text" name="username" placeholder="Escribe el usuario" id="txt_usu" autocomplete="new-password">
					<span class="focus-input100" data-symbol="&#xf206;"></span>
				</div>

				<div class="wrap-input100 validate-input" data-validate="Password is required">
					<span class="label-input100">Contrase&ntilde;a</span>
					<input class="input100" type="password" name="pass" placeholder="Escriba la contrase&ntilde;a" id="txt_con">
					<span class="focus-input100" data-symbol="&#xf190;"></span>
				</div><br><br>
<!--
				<div class="text-right p-t-8 p-b-31">
					<a href="#" onclick="abrir_modal_restablecer()">
						¿Olvidaste la contrase&ntilde;a?
					</a><br>
					<a href="../register/index.php">
						¿No estás registrado? Registrate
					</a>
				</div>-->

				<div class="container-login100-form-btn">
					<div class="wrap-login100-form-btn">
						<div class="login100-form-bgbtn"></div>
						<button class="login100-form-btn" onclick="verificarUsuario()">
							ENTRAR
						</button>
					</div>
					
				</div><br>

<!--
				<div class="flex-c-m">
					<a href="#" class="login100-social-item bg1">
						<i class="fa fa-facebook"></i>
					</a>

					<a href="#" class="login100-social-item bg2">
						<i class="fa fa-twitter"></i>
					</a>

					<a href="#" class="login100-social-item bg3">
						<i class="fa fa-google"></i>
					</a>
				</div>


			</div>
		</div>
	</div>
	-->


	<div id="dropDownSelect1">
	</div><!--
	<div class="modal fade" id="modal_restablecer_contra" role="dialog">
		<div class="modal-dialog modal-sm" style="max-width: 750px!important;">
			<div class="modal-content">

				<!-- Modal Header 
				<div class="modal-header">
					<h4 class="modal-title">Restablecer contrase&ntilde;a</h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
				</div>

				<!-- Modal body

				<div class="modal-body col-lg-12">
					<div class="col-lg-12">
						<label for="txt_usu"><b>Ingrese el email registrado en el usuario para enviarle su contrase&ntilde;a restablecida</b></label>
						<input type="text" class="form-control col-lg-24" id="txt_email_restablecer_contra" placeholder="Ingrese email"><br>
					</div>
				</div>



				<!-- Modal footer
				<div class="modal-footer">
					<button class="btn btn-primary" onclick="restablecer_contrasena(); console.log('onclick');">Enviar</button>
					<button type="button" class="btn btn-danger" id="btn-modal-close" data-dismiss="modal">Cerrar</button>
				</div>

			</div>
		</div>
	</div>
	-->

	<!--===============================================================================================-->
	<script src="vendor/sweetalert2/sweetalert2.js"></script>
	<!--===============================================================================================-->

	<!--===============================================================================================-->
	<script src="vendor/jquery/jquery-3.2.1.min.js"></script>
	<!--===============================================================================================-->
	<script src="vendor/animsition/js/animsition.min.js"></script>
	<!--===============================================================================================-->
	<script src="vendor/bootstrap/js/popper.js"></script>
	<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
	<!--===============================================================================================-->
	<script src="vendor/select2/select2.min.js"></script>
	<!--===============================================================================================-->
	<script src="vendor/daterangepicker/moment.min.js"></script>
	<script src="vendor/daterangepicker/daterangepicker.js"></script>
	<!--===============================================================================================-->
	<script src="vendor/countdowntime/countdowntime.js"></script>
	<!--===============================================================================================-->
	<script src="js/main.js"></script>


	<script src="../js/usuario.js"></script>

</body>

</html>