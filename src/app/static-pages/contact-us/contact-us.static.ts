export interface ISeller {
  supplier: string;
  email_sales: string;
  phone_number: string;
  email: string;
  phone_sales: string;
}

export interface IContact {
  images?: string[];
  imagesClass?: string[];
  section: string;
  htmlText: string;
  color: string;
  sellers?: ISeller[];
}

export const sellers: ISeller[] = [
  {
    email: 'hernan.diaz@unimarket.com.pe',
    email_sales: 'pedidos@unimarket.com.pe',
    phone_number: '989 216 761',
    phone_sales: '5112 080 332',
    supplier: 'Unimarket Perú S.A.C.',
  },
  {
    supplier: 'Almendariz',
    phone_sales: '442-6850 o 399-1760',
    email_sales: 'comprasweb@almendariz.com.pe',
    email: 'comprasweb@almendariz.com.pe',
    phone_number: '442-6850  o  399-1760',
  },
];

