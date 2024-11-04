
import { useQuery } from "@tanstack/react-query";
import { getExchange } from "../service";
import { ParamsType } from "../../../types";
import { getContracts,getProducts } from "../service";
export function useExchange(params:ParamsType){
    return useQuery({
        queryKey:["exchange", params],
        queryFn:()=> getExchange(params)
    })
}
export function useContracts(){
    return useQuery({
        queryKey:["all_contracts"],
        queryFn:getContracts,
    })
}
export function useProducts(){
    return useQuery({
        queryKey:["all_contracts"],
        queryFn:getProducts,
    })
}