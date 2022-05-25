import {UserType} from "../pages";
import {Axios} from "../core/axios";

export const UserApi = {
    getMe: () => Axios.get('/auth/me')
}