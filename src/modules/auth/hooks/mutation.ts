
import { useMutation } from "@tanstack/react-query";
import { signIn,signUp } from "../service";
import { SignIn,SignUp } from "../type";
import { saveAccess_token } from "../../../utils/token-server";
import { Notification } from "../../../utils/notification";
import { useNavigate } from "react-router-dom";

export function useSignInMutation() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (data: SignIn) => {
            const response = await signIn(data);
            if (response.status !== 200 && response.status !== 201) {
                Notification('error', 'Sign In Failed', 'Please check your credentials.');
                throw new Error('Sign in failed');
            }
          
            
            return response;
        },
        onSuccess: (response:any) => {
           
            const access_token = response.data.AccessToken;

            console.log(response);
            
            
            if (access_token) {
             saveAccess_token(access_token)
                navigate("/layout");
                Notification('success', 'Sign In Successful', 'Welcome back!');
            } else {
                Notification('error', 'Invalid Response', 'No access token found.');
            }
        },
    });
}


export function useSignUpMutation(){
    const navigate = useNavigate();
    return useMutation({
        mutationFn:async(data:SignUp) => {
            const response:any = await signUp(data);
            if(response.status !== 201){
                const errorMessage = response.data?.message || 'Registration failed';
                Notification('error', 'Sign Up Failed', 'Please check your credentials.');
                throw new Error(errorMessage);
            };
            return response;
        },
        onSuccess:()=>{
            Notification('success', 'Sign Up Successful', 'Welcome!');
            navigate("/");
        },
        onError:(error) => {
            console.error('Sign-up error:', error);
            Notification('error', error.message || 'Sign up failed.');
        }
    })
}