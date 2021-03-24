const inputName = document.querySelector('#txt-name');
const inputEmail = document.querySelector('#txt-email');
const selectTypeId = document.querySelector('#slt-id-type');
const inputId = document.querySelector('#num-id');
const inputBirthdate = document.querySelector('#txt-birthdate');
const selectSex = document.querySelector('#slt-sex');
const inputPhone = document.querySelector('#num-phone');
const inputBusinessName = document.querySelector('#txt-business-name');
const selectService = document.querySelector('#slt-service');
const btnContinue = document.querySelectorAll('.js-btn-continue');
const progressbarItem = document.querySelectorAll('.js-progressbar__item');
const sliderItem = document.querySelectorAll('.js-form-slider');
const signUpHeader = document.querySelector('#sign-up-header');
const inputLoation = document.querySelector('#txt-location');

const validateTypeUser = () => {

  if (userSelected == null) {
      Swal.fire({
          'icon': 'warning',
          'title': 'No se pudo registrar la cuenta',
          'text': 'Por favor elija un tipo de usuario',
          'confirmButtonText': 'Entendido'
      });
      return false
  } else {
      return true
  }
}

const validatePersonalInfo = (userSelected) => {
	let error = false;

	let regexEmail = /^[a-zA-Z.0-9_]+\@{1}[a-zA-Z.]+$/;
	let regexName = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;

	if (regexEmail.test(inputEmail.value) == false) {
		error = true;
		inputEmail.classList.add('form__item--error');
	} else {
		inputEmail.classList.remove('form__item--error');
	}

	if (regexName.test(inputEmail.value) == false) {
		error = true;
		inputName.classList.add('form__item--error');
	} else {
		inputName.classList.remove('form__item--error');
	}

	if (regexName.test(inputEmail.value) == false) {
		error = true;
		inputId.classList.add('form__item--error');
	} else {
		inputId.classList.remove('form__item--error');
	}

  	if (selectSex.value == '') {
		error = true;
		selectSex.classList.add('form__item--error');
	} else {
		selectSex.classList.remove('form__item--error');
	}

	if (userSelected == 'DM') {
		if (inputBirthdate.value == '') {
			error = true;
			inputBirthdate.classList.add('form__item--error');
		} else {
			if (calculateAge(inputBirthdate.value) < 18) {
				error = true;
				inputBirthdate.classList.add('form__item--error');
			} else {
				inputBirthdate.classList.remove('form__item--error');
			}
		}
	} else {
		if (inputBusinessName.value == '') {
			error = true;
			inputBusinessName.classList.add('form__item--error');
		} else {
			inputBusinessName.classList.remove('form__item--error');
		}

		if (selectService.value == '') {
			error = true;
			selectService.classList.add('form__item--error');
		} else {
			selectService.classList.remove('form__item--error');
		}
	}

	if (error == false) {
		return true;
	} else {
		Swal.fire({
			'icon': 'warning',
			'title': 'No se pudo registrar la cuenta',
			'text': 'Por favor revise los campos resaltados',
			'confirmButtonText': 'Entendido'
		});
		return false
	}
}

const validateLocation = () => {
  let error = false;

  if (selectProvince.value == '') {
      error = true;
      selectProvince.classList.add('form__item--error');
  } else {
      selectProvince.classList.remove('form__item--error');
  }

  if (selectCant.value == '') {
      error = true;
      selectCant.classList.add('form__item--error');
  } else {
      selectCant.classList.remove('form__item--error');
  }

  if (selectDistr.value == '') {
      error = true;
      selectDistr.classList.add('form__item--error');
  } else {
      selectDistr.classList.remove('form__item--error');
  }

  if (error == false) {
      return true;
  } else {
      Swal.fire({
          'icon': 'warning',
          'title': 'No se pudo registrar la cuenta',
          'text': 'Por favor revise los campos resaltados',
          'confirmButtonText': 'Entendido'
      });
      return false
  }
}

const validateNewPassword = () => {
	let error = false;

	let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){6,12}$/;

	if (regexPassword.test(newPassword.value) == false) {
		error = true;
		newPassword.classList.add('form__item--error');
		Swal.fire({
			'icon': 'warning',
			'title': 'No se pudo registrar la cuenta',
			'text': 'La contraseña debe tener entre 6 y 12 caracteres, al menos una mayúscula, una minúscula, un caracter especial y un número',
			'confirmButtonText': 'Entendido'
		});
	} else {
		newPassword.classList.remove('form__item--error');
	}

	if (confirmPassword.value != newPassword.value) {
		error = true;
		confirmPassword.classList.add('form__item--error');
		Swal.fire({
			'icon': 'warning',
			'title': 'Las contraseñas no coinciden',
			'confirmButtonText': 'Entendido'
		});
	} else {
		confirmPassword.classList.remove('form__item--error');
	}

	if (error == false) {
		return true;
	}
}

const manageValidateNewPassword = () => {
	let error = false;

	if (userData.userType == 'DM') {
		if (userData.password == oldPassword.value) {
		} else {
			error = true;
			Swal.fire({
				'icon': 'warning',
				'title': 'La contraseña actual es incorrecta',
				'confirmButtonText': 'Entendido'
			});
		}
	} 
	if (!validateNewPassword()) {
		error = true;
	}

	if (error == false) {
		return true;
	}
}

const calculateAge = (birth) => {
  let currentDate = new Date();
  birth = new Date(birth);
  let age = currentDate.getFullYear() - birth.getFullYear();

  if (currentDate.getMonth() < birth.getMonth()) {
      age = age - 1;
  } else {
      if ((currentDate.getMonth() == birth.getMonth()) && (currentDate.getUTCDate() < birth.getUTCDate())) {
          age = age - 1;
      }
  }
  return age;
};

inputEmail.addEventListener('change', async() => {
	const currentEmail = inputEmail.value;
    if (await getUserByEmail(currentEmail)) {
        inputEmail.classList.add('form__item--error');
        Swal.fire({
			'icon': 'warning',
			'title': 'El correo electrónico ya está en uso',
			'text': 'Por favor ingrese un nuevo correo electrónico',
			'confirmButtonText': 'Entendido'
		});
    } else {
        inputEmail.classList.remove('form__item--error');
    }
});

inputId.addEventListener('change', async() => {
	if (selectTypeId.value == '') {
		selectTypeId.classList.add('form__item--error');
		Swal.fire({
			'icon': 'warning',
			'text': 'Por favor ingrese un tipo de identificación',
			'confirmButtonText': 'Entendido'
		});
	} else {
		selectTypeId.classList.remove('form__item--error');
	}
});