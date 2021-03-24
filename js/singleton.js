'use strict';

let usersData = [
	{
		name: 'admin',
		email: 'admin@gmail.com',
		id: null,
		sex: null,
		birthdate: null,
		province: null,
		cant: null,
		distr: null,
		direction: null,
		file: null,
    userType: 'Admin',
		validated: true,
		password: 'Admin@code21'
	}
];

const getUserByEmail = async (email) => {
	let currentUser = false;
	await updateData();
	usersData.forEach(element => {
		if (element.email == email) {
			currentUser = element
		}
	});

	return currentUser;
}

const getUserByID = (id) => {
	let currentUser = null;

	usersData.forEach(element => {
		if (element.id == id) {
			currentUser = element
		}
	});

	return currentUser;
}

const getUsers = async () => {
	await updateData();
	const data = usersData;
	return data;
}

const updateData = () => {
	usersData = JSON.parse(window.localStorage.getItem('usersData'));
}

const setNewUser = async (formdata, userSelected, password) => {
	formdata.set('userType', userSelected);
    formdata.set('validated', false);

    const newUser = {
        name: formdata.get('name'),
        email: formdata.get('email'),
        id: formdata.get('id'),
        sex: formdata.get('sex'),
        phoneNumber: formdata.get('phoneNumber'),
        province: formdata.get('province'),
        cant: formdata.get('cant'),
        distr: formdata.get('distr'),
        direction: formdata.get('direction'),
        file: formdata.get('file'),
        userType: formdata.get('userType'),
        validated: formdata.get('validated')
    }

    if (userSelected == 'DM') {
        formdata.set('password', password);
        newUser.password = formdata.get('password');
        newUser.birthdate = formdata.get('birthdate');  
    } else {
		newUser.nameCompany = formdata.get('businessname');
		newUser.serviceType = formdata.get('sevicetype');
    }
	usersData.push(newUser);
	await window.localStorage.setItem('usersData', JSON.stringify(usersData));
}

const updatePassword = async(id, newPassword) => {
	const currentUser = getUserByID(id);
	currentUser.password = newPassword;
	if (currentUser.validated == 'false') {
		currentUser.validated = 'true';
	}
	await window.localStorage.setItem('usersData', JSON.stringify(usersData));
}

const initLocalStorage = async() => {
	await window.localStorage.setItem('usersData', JSON.stringify(usersData));
}

const updateLoggedUser = async(userdata) => {
	await window.localStorage.setItem('loggedUser', JSON.stringify(userdata));
}