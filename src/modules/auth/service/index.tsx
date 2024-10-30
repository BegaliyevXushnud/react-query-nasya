
import {axiosInstanse} from "@api";
import {SignIn,SignUp} from "../type";

// ============
export  function signIn(data: SignIn) {
    return axiosInstanse.post("/user/login", data);
}
export  function signUp(data: SignUp) {
    return axiosInstanse.post("/user/register", data);
}