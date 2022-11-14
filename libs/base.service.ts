export interface IPaginationQuery {
  page: number;
  limit: number;
  sort: number;
  order_by: string;
  search?: string;
}

export interface IRequestOptions {
  url: string;
  query?: any;
  headers?: any;
  data?: any;
}

export class BaseBadRequestError extends Error {
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

export class BaseService {
  protected static readonly baseUrl = 'http://10.140.2.11:81/';

  protected static async sendGetRequest(opts: IRequestOptions) {
    const fetchHeaders = opts.headers ?? {};
    let fetchUrl = BaseService.baseUrl + opts.url;

    if (opts.query) {
      const searchParams = new URLSearchParams(opts.query).toString();
      fetchUrl += '?' + searchParams;
    }

    const req = await fetch(fetchUrl, {
      method: 'GET',
      headers: fetchHeaders,
    });

    return req;
  }

  protected static async sendPostRequest(opts: IRequestOptions) {
    const fetchHeaders = opts.headers ?? {};
    const fetchUrl = BaseService.baseUrl + opts.url;
    const body = JSON.stringify(opts.data);

    const req = await fetch(fetchUrl, {
      method: 'POST',
      headers: fetchHeaders,
      body,
    });

    return req;
  }

  protected static async sendPatchRequest(opts: IRequestOptions) {
    const fetchHeaders = opts.headers ?? {};
    const fetchUrl = BaseService.baseUrl + opts.url;
    const body = JSON.stringify(opts.data);

    const req = await fetch(fetchUrl, {
      method: 'PATCH',
      headers: fetchHeaders,
      body,
    });

    return req;
  }

  protected static async sendDeleteRequest(opts: IRequestOptions) {
    const fetchHeaders = opts.headers ?? {};
    const fetchUrl = BaseService.baseUrl + opts.url;
    const body = JSON.stringify(opts.data);

    const req = await fetch(fetchUrl, {
      method: 'DELETE',
      headers: fetchHeaders,
      body,
    });

    return req;
  }

  public static getApiUrl() {
    return this.baseUrl;
  }
}
