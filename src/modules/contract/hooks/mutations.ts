import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContract,deleteContract,UpdateContract } from "../service";
import { Contract } from "../type";
import { Notification } from "../../../utils/notification";

//================ Create =======================

export  function useCreateContract(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(data:FormData) => createContract(data),
        onSuccess:(response:any) => {
            
            Notification("success",response.message)
        
        },
        onSettled:async(_,error) => {
            if(error){
                Notification("error", error?.message);
            }else{
                await queryClient.invalidateQueries({queryKey:["contract"]})
            }
        }
    })
}

// ============= Update ==========
export function useUpdateContract(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(data:Contract) => UpdateContract(data),
        onSuccess:(response:any) => {
            Notification("success", response.message)
        },
        onSettled:async(_,error, variable)=>{
            if(error){
                Notification("error", error.message)
            }else {
                await queryClient.invalidateQueries({queryKey:["contract",{id:variable}]})
            }
        }
    })
}

export function useDeleteContract() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string | number) => deleteContract(id),
        onSuccess: (response:any) => {
            Notification("success", response.message)
        },
        onSettled: async (_, error) => {
            if (error) {
                Notification("error", error.message);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["contract"] });
            }
        }
    });
}
