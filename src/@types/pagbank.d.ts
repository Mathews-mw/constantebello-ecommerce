type IPagBankChargeStatus = 'PAID' | 'IN_ANALYSIS' | "DECLINED" | 'CANCELED' | "WAITING"

interface IPagBankCreateCheckoutResponse {
  id: string;
  reference_id: string;
  expiration_date: Date;
  created_at: Date;
  status: string;
  customer: {
    name: string;
    email: string;
    tax_id: string;
    phone: {
      country: string;
      area: string;
      number: string;
    }
  };
  customer_modifiable: boolean;
  items: Array<{
    reference_id: string;
    name: string;
    quantity: number;
    unit_amount: number;
    image_url: string;
  }>;
  additional_amount: number;
  discount_amount: number;
  shipping: {
    type: string;
    amount: number;
    address: {
      country: string;
      region_code: string;
      city: string;
      postal_code: string;
      street: string;
      number: string;
      locality: string;
      complement: string;
    };
    address_modifiable: true
  };
  payment_methods: Array<{
    type: string;
    brands: Array<string>;
  }>;
  payment_methods_configs: Array<{
    type: string;
    config_options: Array<{
      option: sting;
      value: string;
    }>
  }>;
  soft_descriptor: string;
  redirect_url: string;
  return_url: string;
  notification_urls: Array<string>;
  payment_notification_urls: Array<string>;
  links: Array<{
    rel: string;
    href: string;
    method: string;
  }>;
}

interface ITransactionalNotification {
	id: string;
	reference_id: string;
	created_at: string;
	customer: {
		name: string;
		email: string;
		tax_id: string;
		phones: Array<{
			country: string;
			area: string;
			number: string;
		}>;
	};
	items: Array<{
		reference_id: string;
		name: string;
		quantity: number;
		unit_amount: number;
	}>;
	charges: Array<{
		id: string;
		reference_id: string;
		status: IPagBankChargeStatus;
		created_at: string;
		paid_at: string;
		amount: {
			value: number;
			currency: string;
			summary: {
				total: number;
				paid: number;
				refunded: number;
			};
		};
		payment_response: {
			code: string;
			message: string;
			reference: string;
		};
		payment_method: {
			type: string;
			installments: number;
			capture: boolean;
			card: {
				brand: string;
				first_digits: string;
				last_digits: string;
				exp_month: string;
				exp_year: string;
				holder: {
					name: string;
				};
			};
		};
		links: Array<{
			rel: string;
			href: string;
			media: string;
			type: string;
		}>;
	}>;
	notification_urls: Array<string>;
	links: Array<{
		rel: string;
		href: string;
		media: string;
		type: string;
	}>;
}
