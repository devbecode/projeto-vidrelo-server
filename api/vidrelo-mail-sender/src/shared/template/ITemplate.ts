export enum TEMPLATE_TYPE {
  FIRST_PASSWORD_TEMPLATE = 'FirstPasswordTemplate',
  BUDGET_TEMPLATE = 'BudgetTemplate',
  BUDGET_TEMPLATE_PIPEFY = 'BudgetTemplatePipefy',
}

export interface ITemplate {
  getContent(): string;
  interpolate(): void;
  render(): string;
  setParams(params: any, template_type: string): void;
}

export const IFirstPasswordTemplate = ['user_id', 'user_salt', 'user_name'];

export const IPasswordRecoveryTemplate = [
  'user_email',
  'website_forgot_password',
  'website_password_recovery',
];

export const IBudgetTemplate = [
  'ticket_id',
  'user_name',
  'date_start',
  'address_name',
  'address_district',
  'address_city',
  'address_state',
  'address_zipcode',
  'price_total',
  'products',
];

export const IBudgetTemplateClient = [
  'ticket_id',
  'user_name',
  'date_start',
  'products',
  'price_total',
];

export const IBudgetTemplatePipefy = [
  'ticket_id',
  'user_name',
  'user_email',
  'user_phone',
  'date_start',
  'address_name',
  'address_district',
  'address_city',
  'address_state',
  'address_zipcode',
  'price_total',
  'products',
];

export const IBudgetAccessories = ['itemCategory', 'itemName'];
export const IBudgetProducts = [
  'product_name',
  'product_height',
  'product_width',
  'product_thickness',
  'product_depth',
  'product_price',
];

export const IBudgetHTMLMapper = {
  accessory: {
    start: 'accessory_start',
    end: 'accessory_end',
  },
  product: {
    start: 'product_start',
    end: 'product_end',
  },
};

export const templateAsType = {
  FirstPasswordTemplate: IFirstPasswordTemplate,
  PasswordRecoveryTemplate: IPasswordRecoveryTemplate,
  BudgetTemplate: IBudgetTemplate,
  BudgetTemplateClient: IBudgetTemplateClient,
  BudgetTemplatePipefy: IBudgetTemplatePipefy,
};
