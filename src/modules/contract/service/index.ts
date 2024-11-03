
import { axiosInstanse2 } from "@api"
import { ParamsType } from "../../../types"

// ============ Get ================
export const getContract = async(params:ParamsType = {search:"",limit:10,page:1})=> {
    const response = await axiosInstanse2.get("/contract/list", {
        params
    });
    return response.data
}

// =========== Create ===================
export const createContract = async(data:FormData)=> {
    const response = await axiosInstanse2.post("/contract/create",data);
    return response?.data
}


// ======= Update ===============
export const UpdateContract = async (data:any)=>{
    const {id} = data;
    delete data.id;
    const response  =await axiosInstanse2.put(`/contract/update/${id}`,data)
    return response?.data
}

export const deleteContract = async(id:string | number)=>{
    const response = await axiosInstanse2.delete(`/contract/delete/${id}`)
    return response?.data
}