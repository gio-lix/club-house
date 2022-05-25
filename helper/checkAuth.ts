import {Axios} from "../core/axios";
import Cookies from "nookies";
import {GetServerSidePropsContext} from "next";
import {UserApi} from "../api/UserApi";
import axios from "axios";

export const CheckAuth = async (ctx: GetServerSidePropsContext) => {
   try {
       const cookies = Cookies.get(ctx)
       const user = await Axios.get('http://localhost:5001/auth/me', {
           headers: {
               Authorization: `Bearer ${cookies.token}`
           }
       })
       console.log("_____>>>>>>>>>", user)
       if (cookies.token) {
               Axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.token}`
       }
       return await UserApi.getMe()
   } catch (err) {
        return null
   }
}