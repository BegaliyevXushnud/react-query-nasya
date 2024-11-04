
import { axiosInstanse2 } from "@api"
import { ParamsType } from "../../../types"

// ========= GetExchange ===================
export const getExchange = async(params:ParamsType = {search:"",limit:10,page:1})=>{
const response = await axiosInstanse2.get("exchange/list",{
    params
});
return response.data
}
// Get Exshange By Id Contract id =========
export const getContracts = async ()=>{
    const response:any = await axiosInstanse2.get("/contract/list")
    return response?.data.all_contracts
} 
// Get Exshange By Id Product id =========
export const getProducts = async ()=>{
    const response:any = await axiosInstanse2.get("/product/list")
    return response?.data.all_products
} 
// ======== Create =============
export const createExchange = async(data:FormData)=> {
    const response:any=  await axiosInstanse2.post("exchange/create",data)
    return response.data.all_exchanges
}

// ========== Update ==============
export const UpdateExchange = async (data:any)=>{
const {id} = data;
delete data.id;
const response = await axiosInstanse2.put(`exchange/update/${id}`, data)
return response?.data
}
export const deleteExchange = async(id:string | number)=>{
    const response = await axiosInstanse2.delete(`exchange/delete/${id}`)
    return response?.data
}