
import { useQuery } from "@tanstack/react-query";
import { getContract } from "../service";
import { ParamsType } from "../../../types";
export function useContract(params:ParamsType){
    return useQuery({
        queryKey:["contract",params],
        queryFn:()=>getContract(params)
    })
}



