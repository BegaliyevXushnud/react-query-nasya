

import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../service";
import { ParamsType } from "../../../types";

export function useProduct(params:ParamsType){
    return useQuery({
        queryKey:["product",params],
        queryFn:()=>getProduct(params)
    })
}