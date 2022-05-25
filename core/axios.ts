import Cookies from "js-cookie";
import axios from "axios";


const Axios = axios.create({
    baseURL: "http://localhost:5001/",
    headers: {
        Authorization: "Bearer " + Cookies.get("token")
    }
})

export {Axios}