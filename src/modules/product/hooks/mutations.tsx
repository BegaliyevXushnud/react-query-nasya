import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct,deleteProduct,UpdateProduct } from "../service";
import { Product } from "../type";
import { Notification } from "../../../utils/notification";

//================ Create =======================

export  function useCreateProduct(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(data:FormData) => createProduct(data),
        onSuccess:(response) => {
            Notification("success",response?.message)
        },
        onSettled:async(_,error) => {
            if(error){
                Notification("error", error?.message);
            }else{
                await queryClient.invalidateQueries({queryKey:["product"]})
            }
        }
    })
}

// ============= Update ==========
export function useUpdateProduct(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(data:Product) => UpdateProduct(data),
        onSuccess:(response) => {
            Notification("success", response.message)
        },
        onSettled:async(_,error, variable)=>{
            if(error){
                Notification("error", error.message)
            }else {
                await queryClient.invalidateQueries({queryKey:["product",{id:variable}]})
            }
        }
    })
}

export function useDeleteProduct() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string | number) => deleteProduct(id),
        onSuccess: (response) => {
            Notification("success", response.message)
        },
        onSettled: async (_, error) => {
            if (error) {
                Notification("error", error.message);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["product"] });
            }
        }
    });
}
