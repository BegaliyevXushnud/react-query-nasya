import axios from 'axios'

const axiosInstanse = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL
});
axiosInstanse.interceptors.request.use((config) => {
    const access_token = localStorage.getItem("access_token");
    if(access_token){
        config.headers['Authorization'] = ` ${access_token}`
    }
    return config
});
export default axiosInstanse