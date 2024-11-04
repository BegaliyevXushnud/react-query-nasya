

import { useQuery } from "@tanstack/react-query";
import { getTransaction } from "../service";
import { ParamsType } from "../../../types";
import { getContracts } from "../service";
export function useTransaction(params:ParamsType){
    return useQuery({
        queryKey:["transaction", params],
        queryFn:()=> getTransaction(params)
    })
}
export function useContracts(){
    return useQuery({
        queryKey:["all_contracts"],
        queryFn:getContracts,
    })
}
