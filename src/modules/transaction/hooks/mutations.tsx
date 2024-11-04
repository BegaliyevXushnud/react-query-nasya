import { useQueryClient,useMutation } from "@tanstack/react-query";

import { createTransaction,deleteTransaction,UpdateTransaction } from "../service";
import { Notification } from "@utils";

export function useCreateTransaction(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(data:FormData)=> createTransaction(data),
        onSuccess:(response:any)=>{
            Notification("success",response.message)
        },
        onSettled:async(_,error)=> {
            if(error){
                Notification("error",error?.message)
            }else{
                await queryClient.invalidateQueries({queryKey:["transaction"]})
            }
        }
    })
}

// =========== Update ==============
export function useUpdateTransaction(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(data:any) => UpdateTransaction(data),
        onSuccess:(response:any)=>{
            Notification("success",response.message)
        },
        onSettled:async(_,error,variable)=> {
            if(error){
                Notification("error",error.message)
            }else{
                await queryClient.invalidateQueries({queryKey:["transaction",{id:variable}]})
            }
        }
    })
}

export function useDeleteTransaction(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(id:string | number) => deleteTransaction(id),
        onSuccess:(response:any)=>{
            Notification("success",response.message)
        },
        onSettled:async(_,error)=>{
           if(error){
            Notification("error",error?.message)
           }else{
            await queryClient.invalidateQueries({queryKey:["transaction"]})
           }
        }
    })
}