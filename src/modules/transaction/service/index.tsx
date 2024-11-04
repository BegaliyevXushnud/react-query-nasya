


import { axiosInstanse2 } from "@api"
import { ParamsType } from "../../../types"

// ========= GetExchange ===================
export const getTransaction = async(params:ParamsType = {search:"",limit:10,page:1})=>{
const response = await axiosInstanse2.get("transaction/list",{
    params
});
return response.data
}
// Get Exshange By Id Contract id =========
export const getContracts = async ()=>{
    const response:any = await axiosInstanse2.get("/contract/list")
    return response?.data.all_contracts
} 

// ======== Create =============
export const createTransaction = async(data:FormData)=> {
    const response:any=  await axiosInstanse2.post("transaction/create",data)
    return response.data
}

// ========== Update ==============
export const UpdateTransaction = async (data:any)=>{
const {id} = data;
delete data.id;
const response = await axiosInstanse2.put(`transaction/update/${id}`, data)
return response?.data
}
export const deleteTransaction= async(id:string | number)=>{
    const response = await axiosInstanse2.delete(`transaction/delete/${id}`)
    return response?.data
}