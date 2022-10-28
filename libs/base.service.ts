export interface IPaginationQuery {
  page: number;
  limit: number;
  sort: number;
  order_by: string;
  search?: string;
}

export interface IGetRequestOptions {
  url: string;
  query?: any;
  headers?: any;
}

export class BaseService {
  protected static readonly baseUrl =
    'https://car-parking-reservation-api-production.up.railway.app/';

  protected static async sendGetRequest(opt: IGetRequestOptions) {
    const fetchHeaders = opt.headers ?? {};
    let fetchUrl = BaseService.baseUrl + opt.url;

    if (opt.query) {
      const searchParams = new URLSearchParams(opt.query).toString();
      fetchUrl += '?' + searchParams;
    }

    const req = await fetch(fetchUrl, {
      method: 'GET',
      headers: fetchHeaders,
    });

    return req;
  }

  protected static async sendPostRequest(
    url: string,
    data: Record<any, any>,
    headers = {'Content-Type': 'application/json'},
  ) {
    const fetchHeaders = headers;
    const fetchUrl = BaseService.baseUrl + url;
    const body = JSON.stringify(data);

    const req = await fetch(fetchUrl, {
      method: 'POST',
      headers: fetchHeaders,
      body,
    });

    return req;
  }
}
