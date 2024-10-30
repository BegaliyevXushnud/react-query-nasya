

import { ParamsType } from "../../../types"
import { axiosInstanse2 } from "@api"
import { Product } from "../type";
// =========== Get ============
export const getProduct = async (params:ParamsType = {search:"",limit:10,page:1}) => {
    const response = await axiosInstanse2.get("product/list",{
        params
    });    
return response.data


}

//============ Create ===============
export const createProduct = async (data:FormData) => {
    const response = await axiosInstanse2.post("product/create", data);
    return response?.data.all_products
}

// ======== Update =============
export const UpdateProduct = async (data:Product) => {
    const { id } = data;
    delete data.id;
    const response = await axiosInstanse2.put(`product/update/${id}`, data);
    return response?.data;
}


//=========== Delete ============
export const deleteProduct = async (id:string | number) => {
    const response = await axiosInstanse2.delete(`product/delete/${id}`);
    return response?.data
}

export const uploadFile = async (image_url: File) => {
    const formData = new FormData();
    formData.append("file",image_url);

    const response = await axiosInstanse2.post("minio/media", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response?.data;
};
