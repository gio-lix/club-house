import Axios from "axios";

const instance = Axios.create({
    baseURL: "http://localhost:5001/"
})

export default instance