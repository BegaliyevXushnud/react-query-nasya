
import axios from 'axios'

const axiosInstanse2 = axios.create({
    baseURL:"https://solihov.uz"
});
axiosInstanse2.interceptors.request.use((config:any) => {
    const access_token = localStorage.getItem("access_token");
    if(access_token){
        config.headers['Authorization'] = ` ${access_token}`
    }
    return config
});
export default axiosInstanse2