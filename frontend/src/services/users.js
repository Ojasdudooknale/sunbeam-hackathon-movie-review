import axios from 'axios'
import { config } from './config'


export async function register(firstName, lastName, email, password, mobileNo, date) {
    try {
        // url to send the request
        const url = `${config.server}/user/register`

       
        const body = { firstName, lastName, email, password, mobileNo, date }

        // send POST request
        const response = await axios.post(url, body)

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
