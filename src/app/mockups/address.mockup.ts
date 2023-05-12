import { IAddressItem } from "../models/address.model";


export const addressItem: IAddressItem = {
  _id: '001',
  address: 'Av. Prueba 123',
  cellphone: '998213123',
  department: { name: 'Lima', _id: ''} ,
  district: { name:  'Surco', _id: ''} ,
  province: { name:  'Lima', _id: ''} ,
  name: 'Casa Prueba',
  reference: 'Al lado de la casa azul.',
  type_address: { name: 'Casa', _id: ''} ,
  checked: false,
  amount_delivery: 10.00,
};

export const addresses: Array<IAddressItem> = [addressItem, addressItem, addressItem];

export const addressesOrder: Array<IAddressItem> = [addressItem, addressItem, addressItem];
