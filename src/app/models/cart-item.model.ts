import { IProductDetail } from './product.model';

// export interface ICartItem{
//   image_product: string;
//   price: number;
//   total_price: number;
//   quantity: number;
//   name_product: string;
//   _id: string;
//   id_product: string;
//   info_product?: IProductDetail;
//   method_send?: Array<string>;
//   warranty?: number;
//   installation?: number;
// }

export interface ICartItem {
  _id?: string;
  populate_method_send?: string[];
  reserved_campaign_stock?: number;
  max_reserved_campaign_stock?: number;
  id_product?: string;
  delivery_method_price?: number;
  rangeMax?: number;
  rangeMin?: number;
  quantity?: number;
  warranty?: number;
  installation?: number;
  info_product?: InfoProduct;
  name_product?: string;
  image_product?: string;
  price?: number;
  total_price?: number;
  tenant?: string;
  id_user?: string;
  limit_hour?: Date;
  create_by?: string;
  method_send?: string[];
  create_date?: Date;
  __v?: number;
}

export interface InfoProduct {
  _id?: string;
  request?: Request;
  is_pack?: boolean;
  is_variation?: boolean;
  has_dedication?: boolean;
  stock?: number;
  deleted?: boolean;
  archive?: boolean;
  active?: boolean;
  is_product_variation_select?: boolean;
  images_link?: Array<string[]>;
  videos_link?: any[];
  giftcard_available?: boolean;
  categories?: { _id: string; name: string }[];
  shipping_allowed?: boolean;
  shipping_methods?: any[];
  featured?: boolean;
  additional_variables?: any[];
  show_special_offer?: boolean;
  show_in_stock_out?: boolean;
  last_unit?: boolean;
  pending_request?: boolean;
  list_method?: string[];
  active_discount?: boolean;
  countInWishlist?: number;
  related_products?: any[];
  product_variation?: any[];
  tenant?: string;
  SKU?: string;
  name?: string;
  type?: string;
  brand?: Brand;
  group?: string;
  currency?: string;
  supplier?: string;
  supplier_delivery?: SupplierDelivery;
  filter_values?: FilterValue[];
  price?: number;
  special_price?: number;
  searchName?: string;
  friendly_url?: string;
  detail_list?: DetailList[];
  warranty?: number;
  image_cover?: string;
  variation_father?: any[];
  variations?: any[];
  request_history?: any[];
  create_date?: Date;
  ranking?: any[];
  pack_products?: any[];
  __v?: number;
  update_by?: string;
  update_date?: Date;
}

export interface Brand {
  _id?: string;
  name?: string;
}

export interface DetailList {
  title?: string;
  description?: string;
}

export interface FilterValue {
  _id?: string;
  filter_id?: string;
  stringValue?: string;
}

export interface Request {
  approvals?: any[];
  create_date?: Date;
}

export interface SupplierDelivery {
  _id?: string;
  is_distribution_supplier?: boolean;
  method_send?: MethodSend[];
  active?: boolean;
  deleted?: boolean;
  commission?: number;
  list_brand?: string[];
  visible_category_groups?: string[];
  visible_categories?: string[];
  report_erp?: boolean;
  list_supplier_Delivery?: string[];
  group?: null;
  name?: string;
  ruc?: number;
  description?: string;
  entry?: null;
  max_distribution?: null;
  email_sales?: string;
  email?: string;
  phone_number?: string;
  post_sell_representative?: string;
  post_sell_representative_name?: string;
  delivery_postventa?: string;
  can_sell?: boolean;
  image_link?: string;
  code?: string;
  tenant?: string;
  create_date?: Date;
  __v?: number;
}

export interface MethodSend {
  _id?: string;
  available?: Available[];
  active?: boolean;
  description?: string;
  intervalTime?: IntervalTime;
  maxDayDelivery?: null;
  maxDaySchedule?: null;
  name?: string;
  rangeMax?: number;
  rangeMin?: number;
  type?: Type;
}

export interface Available {
  name?: string;
  active?: boolean;
  value?: number;
  ini_hour?: Date;
  end_hour?: Date;
}

export interface IntervalTime {
  time?: Date;
}

export interface Type {
  _id?: string;
  code?: string;
  value?: string;
  ref1?: string;
  ref2?: boolean;
  active?: boolean;
  ref3?: string;
}
