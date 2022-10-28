import {AuthService} from './auth.service';
import {BaseService, IPaginationQuery} from './base.service';

export interface IInvoiceRecord {
  invoice_charge_amount: number;
  invoice_create_date: string;
  invoice_id: number;
  invoice_reservation_id: number;
  invoice_status: string;
  invoice_user_id: number;
}

export interface IStripePayResult {
  stripe_client_secret: string;
}

export class PaymentError extends Error {}

export class PaymentBadRequestError extends PaymentError {
  constructor(
    protected keyDescriptionPair: Record<any, any>,
    message = 'Invalid input format!',
  ) {
    super(message);
  }

  public getErrorRecord() {
    return this.keyDescriptionPair;
  }
}

export interface IPaymentRegister {
  email: string;
  password: string;
  username: string;
  firstname: string;
  lastname: string;
  phone_number: string;
  citizen_id: string;
}

export interface IPaymentLogin {
  email: string;
  password: string;
}

export class PaymentService extends BaseService {
  public static async getStripePublicKey() {
    const req = await this.sendGetRequest({
      url: 'payment/stripe/public_key',
    });

    const text = await req.text();

    if (!req.ok) {
      throw new PaymentError('Failed to get stripe public key!');
    }

    return text;
  }

  public static async listInvoice(query: IPaginationQuery) {
    const headers = await AuthService.buildAuthHeader();

    const req = await this.sendGetRequest({
      url: 'payment/my_invoice',
      headers,
      query,
    });

    const json = await req.json();

    if (req.status === 400) {
      throw new PaymentBadRequestError(json, 'Invalid data formatted!');
    }

    if (!req.ok) {
      throw new PaymentError(json.error);
    }

    return json as IInvoiceRecord[];
  }
}
