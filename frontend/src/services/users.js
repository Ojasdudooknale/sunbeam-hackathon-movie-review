import axios from 'axios'
import { config } from './config'


export async function register(firstName, lastName, email, password, mobileNo, birthDate) {
    console.log("hello this register")
    try {
        // url to send the request
        console.log(config.server)
        const url = `${config.server}/user/register`


        const body = { firstName, lastName, email, password, mobileNo, birthDate }

        // send POST request
        const response = await axios.post(url, body)
        console.log(response.data)
        // return response body
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
    }
}

export async function login(email, password) {
    try {
        // create url
        const url = `${config.server}/user/login`

        // create body
        const body = { email, password }

        // send the POST request
        const response = await axios.post(url, body)

        // return response body
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
    }
}

export async function editProfile(firstName, lastName, email, password, mobileNo, birthDate) {
    console.log("hello this register");
    try {

        console.log(config.server);
        const url = `${config.server}/user/profile/update`;

        const body = { firstName, lastName, email, password, mobileNo, birthDate };


        const response = await axios.put(url, body, {
            headers: {
                token: localStorage.getItem('token'),
            },
        });

        console.log(response.data);

        return response.data;
    } catch (ex) {
        console.log(`exception: `, ex);

        return { status: 'error', error: ex.message || 'An error occurred during profile update.' };
    }
}



export async function changePassword(oldPassword, newPassword) {
    try {
        // Update this line to match the backend route:
        const url = `${config.server}/user/changePassword`; // <-- Changed path

        const body = { oldPassword, newPassword };

        const response = await axios.put(url, body, {
            headers: {
                token: localStorage.getItem('token'),
            },
        });

        console.log(response.data);
        return response.data;
    } catch (ex) {
        console.log(`exception in changePassword: `, ex);
        return { status: 'error', error: ex.message || 'An error occurred during password change.' };
    }
}
