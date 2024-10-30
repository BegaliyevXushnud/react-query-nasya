
import { axiosInstanse2 } from "@api"
import { ParamsType } from "../../../types"

// ========= GetExchange
export const getExchange = async(params:ParamsType = {search:"",limit:10,page:1})=>{
const response = await axiosInstanse2.get("exchange/list",{
    params
});
return response.data
}