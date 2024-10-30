
import { useQuery } from "@tanstack/react-query";
import { getExchange } from "../service";
import { ParamsType } from "../../../types";

export function useExchange(params:ParamsType){
    return useQuery({
        queryKey:["exchange", params],
        queryFn:()=> getExchange(params)
    })
}