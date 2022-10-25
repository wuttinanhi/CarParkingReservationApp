export class BaseService {
  public static readonly baseUrl =
    'https://car-parking-reservation-api-production.up.railway.app/';

  public static async sendGetRequest(url: string, headers = {}) {
    const fetchHeaders = headers;
    const fetchUrl = BaseService.baseUrl + url;

    const req = await fetch(fetchUrl, {
      method: 'GET',
      headers: fetchHeaders,
    });

    return req;
  }

  public static async sendPostRequest(
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
