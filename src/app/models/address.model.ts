export interface IAddressLdV{
  name: string;
  _id: string;
}

export interface IAddressItem{
  _id?: string;
  name: string;
  type_address: IAddressLdV;
  address: string;
  department: IAddressLdV;
  province: IAddressLdV;
  district: IAddressLdV;
  reference: string;
  cellphone: string;
  checked?: boolean;
  amount_delivery?: number;
  ubigeo?: string;
  type_address_ERP?: string;
}

export interface IAddressItemCheckout{
  _id?: string;
  name: string;
  type_address: string;
  address: string;
  department: IAddressLdV;
  province: IAddressLdV;
  district: IAddressLdV;
  reference: string;
  cellphone: string;
  checked?: boolean;
  amount_delivery?: number;
  ubigeo?: string;
  type_address_ERP?: string;
}
