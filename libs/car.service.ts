import {AuthService} from './auth.service';
import {BaseService, IPaginationQuery} from './base.service';

export interface ICarRecord {
  car_id: number;
  car_license_plate: string;
  car_owner_id: number;
  car_type: string;
}

export class CarError extends Error {}

export class CarService extends BaseService {
  public static async listCar(query: IPaginationQuery) {
    const headers = await AuthService.buildAuthHeader();

    const req = await this.sendGetRequest({
      url: '/car/list',
      headers,
      query,
    });

    const json = await req.json();

    if (!req.ok) {
      throw new CarError(json.error);
    }

    return json as ICarRecord[];
  }
}
