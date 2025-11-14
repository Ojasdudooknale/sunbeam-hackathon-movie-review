import axios from 'axios'
import { config } from './config'

export async function getAllReviews() {
    try {
        // create url
        const url = `${config.server}/review/allReviews`

        // create headers with require token
        // send GET request and get the response
        const response = await axios.get(url, {
            headers: {
                token: localStorage.getItem('token'),
            },
        })
        console.log("first")
        console.log(response.data)

        // return response body
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
    }
}

export async function getMyReviews() {
    try {
        // create url
        const url = `${config.server}/review/my`

        // create headers with require token
        // send GET request and get the response
        const response = await axios.get(url, {
            headers: {
                token: localStorage.getItem('token'),
            },
        })
        console.log("first")
        console.log(response.data)

        // return response body
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
    }
}



