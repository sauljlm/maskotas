'use strict';
const form = document.querySelector('#form');
const btnSubmit = document.querySelector('#submit-button');
const logInEmail = document.querySelector('#log-in-email');
const logInPassword = document.querySelector('#log-in-password');

let userData = null;

logInEmail.addEventListener('change', async() => {
	const currentEmail = logInEmail.value;
	const currentUser = await getUserByEmail(currentEmail);
	if (currentUser) {
		userData = currentUser;
	} else {
		Swal.fire({
			'icon': 'warning',
			'title': 'El usuario no existe',
			'text': 'Por favor ingrese un correo electrónico valido',
			'confirmButtonText': 'Entendido'
		});
	}
});

form.addEventListener('submit', (e) => {
	e.preventDefault();
	if (userData.password == logInPassword.value) {
		if (userData.userType == 'DM') {
			if (userData.validated == 'false') {
				Swal.fire({
					'icon': 'success',
					'title': 'La sesión se realizo con éxito',
					'text': 'Ahora crea tu nueva contraseña',
					'confirmButtonText': 'Entendido'
				}).then(() => {
					window.location.href = 'register-password.html';
				});
			}
		}
		Swal.fire({
			'icon': 'success',
			'title': 'La sesión se realizo con éxito',
			'confirmButtonText': 'Entendido'
		}).then(() => {
			updateLoggedUser(userData);
			window.location.href = '#';
		});
	} else {
		Swal.fire({
			'icon': 'warning',
			'title': 'El correo o contraseña son incorrectos',
			'confirmButtonText': 'Entendido'
		});
	}
});