export interface IOrderBodyItem{
  product_id: string;
  quantity: number;
  discount: number;
  discount_price: number;
  price: number;
  method_send: string;
  reason: string;
  warranty?: number;
  installation?: number;
}

export interface IOrderBody{
  shopping_cart_id: string;
  currency: string;
  type_payment: string;
  user_phone: string;
  address_id: string;
  delivery_name_customer: string;
  delivery_phone_customer: string;
  delivery_type_address: string;
  delivery_address: string;
  delivery_reference: string;
  delivery_district_id: string;
  delivery_province_id: string;
  delivery_department_id: string;
  invoice_send: boolean;
  invoice_ruc: string;
  invoice_business_name: string;
  invoice_address: string;
  invoice_district: string;
  invoice_province: string;
  invoice_department: string;
  method_send_id?: string;
  user_id?: string;
  detail: Array<IOrderBodyItem>;
  lyra?: boolean;
  current_step?: number;
}
