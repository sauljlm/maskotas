'use strict';
const form = document.querySelector('#form');
const btnSubmit = document.querySelector('#submit-button');
const email = document.querySelector('.js-email');
const oldPassword = document.querySelector('#old-password');
const newPassword = document.querySelector('#new-password');
const confirmPassword = document.querySelector('#confirm-password');
const contOldPassword = document.querySelector('.js-form__item-container');

let userData = null;

const manageFormUser = async() => {
	const currentEmail = email.value;
	const currentUser = await getUserByEmail(currentEmail);
	if (currentUser) {
		userData = currentUser;
		if (userData.validated == 'false' && userData.userType == 'DM') {
			contOldPassword.classList.remove('form__item-container--hiden');
		}
	} else {
		Swal.fire({
			'icon': 'warning',
			'title': 'El usuario no existe',
			'text': 'Por favor ingrese un correo electrónico valido',
			'confirmButtonText': 'Entendido'
		});
	}
}

email.addEventListener('change', () => {
	manageFormUser();
});

form.addEventListener('submit', async(e) => {
	e.preventDefault();
	if (manageValidateNewPassword()) {
		await updatePassword(userData.id, newPassword.value);
		Swal.fire({
			'icon': 'success',
			'title': 'La contraseña se actualizo con éxito',
			'confirmButtonText': 'Entendido'
		}).then(() => {
			window.location.href = 'log-in.html';
		});
	};
});
