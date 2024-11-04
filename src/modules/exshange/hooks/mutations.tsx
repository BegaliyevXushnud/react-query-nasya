import { useQueryClient,useMutation } from "@tanstack/react-query";

import { createExchange,deleteExchange,UpdateExchange } from "../service";
import { Notification } from "@utils";

export function useCreateExchange(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(data:FormData)=> createExchange(data),
        onSuccess:(response:any)=>{
            Notification("success",response.message)
        },
        onSettled:async(_,error)=> {
            if(error){
                Notification("error",error?.message)
            }else{
                await queryClient.invalidateQueries({queryKey:["exchange"]})
            }
        }
    })
}

// =========== Update ==============
export function useUpdateExchange(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(data:any) => UpdateExchange(data),
        onSuccess:(response:any)=>{
            Notification("success",response.message)
        },
        onSettled:async(_,error,variable)=> {
            if(error){
                Notification("error",error.message)
            }else{
                await queryClient.invalidateQueries({queryKey:["exchange",{id:variable}]})
            }
        }
    })
}

export function useDeleteExshange(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(id:string | number) => deleteExchange(id),
        onSuccess:(response:any)=>{
            Notification("success",response.message)
        },
        onSettled:async(_,error)=>{
           if(error){
            Notification("error",error?.message)
           }else{
            await queryClient.invalidateQueries({queryKey:["exchange"]})
           }
        }
    })
}