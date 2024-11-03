
import axios from 'axios'

const axiosInstanse = axios.create({
    baseURL:"https://auth.solihov.uz"
});
axiosInstanse.interceptors.request.use((config:any) => {
    const access_token = localStorage.getItem("access_token");
    if(access_token){
        config.headers['Authorization'] = ` ${access_token}`
    }
    return config
});
export default axiosInstanse
