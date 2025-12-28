import apiClient from "../hook/interceptor";
import formDataApiClient from "../hook/interceptorFormData"

export const login = async({email,password,rememberMe})=>{
   
    const response = await apiClient.post(`https://sepehracademy.liara.run/Sign/Login`,
        {
            phoneOrGmail: email,
           password: password,
           rememberMe: rememberMe
        }
    );
    return response.data
}