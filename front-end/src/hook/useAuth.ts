import { useState } from "react"
import { Login,Register } from "../constant/types";
import { POST } from "../services"
import { LOGIN,REGISTER } from "../services/path"

export const UseAuth = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const login = async (payload: Login) => {
        setLoading(true)
        try {
            const response = await POST(LOGIN, payload);
            return response
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    const register = async (payload: Register)=>{
        setLoading(true)
        try {
            const response = await POST(REGISTER, payload);
            return response
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, register,login }
}