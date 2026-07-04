import axios from 'axios'

const AxiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/todos",
    timeout: 10000,
    withCredentials: false
})

export default AxiosInstance