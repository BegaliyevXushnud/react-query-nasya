

export interface Contract {
   consumer_address: "string",
  consumer_name: "string",
  consumer_passport_serial: "string",
  consumer_phone_number: "string",
  duration: 0,
  id: "string",
  passport_image: "string",
  status: string
}
// types.ts faylida yoki hook'ni import qilgan faylda
export interface ContractData {
  all_contracts: any[]; // Har bir contract obyekti turini belgilash mumkin
  count: number;
}
