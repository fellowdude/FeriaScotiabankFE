export interface IWishlistItem {
  request: Request;
  is_pack: boolean;
  is_variation: boolean;
  has_dedication: boolean;
  stock: number;
  deleted: boolean;
  archive: boolean;
  active: boolean;
  is_product_variation_select: boolean;
  images_link: any[];
  videos_link: any[];
  giftcard_available: boolean;
  categories: string[];
  shipping_allowed: boolean;
  shipping_methods: any[];
  featured: boolean;
  additional_variables: any[];
  show_special_offer: boolean;
  show_in_stock_out: boolean;
  last_unit: boolean;
  pending_request: boolean;
  list_method: string[];
  active_discount: boolean;
  countInWishlist: number;
  related_products: any[];
  product_variation: any[];
  _id: string;
  tenant: string;
  SKU: string;
  name: string;
  type: string;
  brand?: Brand;
  group: string;
  currency: string;
  supplier: string;
  filter_values: FilterValue[];
  price: number;
  special_price: number;
  friendly_url: string;
  image_cover: string;
  request_history: any[];
  create_date: Date;
  ranking: any[];
  pack_products: any[];
  __v: number;
  detail_list: DetailList[];
  discount_amount: null;
  end_date_offer: null;
  image_banner: string;
  image_banner_mobile: string;
  image_cover_mobile: string;
  image_logo_banner: string;
  image_logo_banner_mobile: string;
  initial_date_offer: null;
  model_product: null;
  product_father: null;
  rules_admin: null;
  small_name: string;
  special_offer: null;
  supplier_delivery: string;
  taxBuy: null;
  taxSent: null;
  type_discount: string;
  url_nm_travel: string;
  update_by: string;
  update_date: Date;
  variation_father: any[];
  variations: any[];
  father_base_variation: string;
  installation: number;
  type_variation: null;
  warranty: number;
  searchName: string;
  amount_saved: number;
  id: string;
}

export interface Brand {
  request: Request;
  featured: boolean;
  salient: boolean;
  active: boolean;
  deleted: boolean;
  supplier: string[];
  _id: string;
  name: string;
  friendly_url: string;
  image_link: string;
  image_logo_link: string;
  image_logo_link_mobile: string;
  image_banner: string;
  image_logo_banner: string;
  galery_image: any[];
  galery_videos: any[];
  code_ERP: string;
  tenant: string;
  request_history: any[];
  create_date: Date;
  __v: number;
  have_products: boolean;
  update_by: string;
  update_date: Date;
  searchName: string;
}

export interface Request {
  approvals: any[];
  create_date: Date;
}

export interface DetailList {
  title: string;
  description: string;
}

export interface FilterValue {
  _id: string;
  filter_id: string;
  stringValue: string;
}
