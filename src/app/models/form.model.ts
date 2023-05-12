export interface IFormFields{
  name: string;
  type: 'instruction' | 'text' | 'date' | 'list' | 'local' | 'text-area' | 'checkbox';
  subType?: 'text' | 'password' | 'email' | 'number';
  field: string;
  list?: string[];
  required: boolean;
  size: number;
  value?: string;
}

export interface IForm{
  title?: string;
  id?: string;
  formFields: IFormFields[];
  footer_message?: string;
  button_text?: string;
}
