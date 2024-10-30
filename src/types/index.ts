export interface ParamsType {
    id?: string;    // Mahsulot ID
    search?: string; // Qidiruv so'zi
    limit?: number; // Olingan mahsulotlar soni
    page?: number;  // Sahifa raqami
  }
  export interface ModalPropType {
    id?:number | string
    open:boolean,
    update:any,
    handleCancel: () => void,
  }