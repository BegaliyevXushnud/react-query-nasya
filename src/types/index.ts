export interface ParamsType {
    id?: string;    
    search?: string; 
    limit?: number; 
    page?: number; 
  }
  export interface ModalPropType {
    id?:number | string
    open:boolean,
    update:any,
    handleCancel: () => void,
  }
  export interface ContractDataType {
    all_contracts: any[]; // Adjust `any` to the specific type if available
    count: number;
  }
  