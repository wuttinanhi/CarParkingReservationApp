import {AuthService, IUserShareable} from './auth.service';
import {
  BaseBadRequestError,
  BaseService,
  IPaginationQuery,
} from './base.service';

export interface ICarRecord {
  car_id: number;
  car_license_plate: string;
  car_owner_id: number;
  car_type: string;
}

export class CarError extends Error {
  constructor(json: any) {
    super(json.error);
  }
}

export class CarBadRequestError extends BaseBadRequestError {}

export interface CarAddDto {
  car_license_plate: string;
  car_type: string;
}

export interface CarUpdateDto {
  car_id: number;
  car_license_plate: string;
  car_type: string;
}

export interface ICarSearchByLicensePlateResult {
  car_id: number;
  car_license_plate: string;
  car_owner: IUserShareable;
  car_owner_id: number;
  car_type: string;
}

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

  public static async addCar(data: CarAddDto) {
    const headers = await AuthService.buildAuthHeader({
      'Content-Type': 'application/json',
    });

    const req = await BaseService.sendPostRequest({
      url: 'car/add',
      headers,
      data: data,
    });

    const json = await req.json();

    if (req.status === 400) {
      throw new CarBadRequestError(json);
    }

    if (!req.ok) {
      throw new CarError(json);
    }

    return;
  }

  public static async updateCar(data: CarUpdateDto) {
    const headers = await AuthService.buildAuthHeader();

    const req = await BaseService.sendPatchRequest({
      url: 'car/update',
      headers,
      data: data,
    });

    const json = await req.json();

    if (req.status === 400) {
      throw new CarBadRequestError(json);
    }

    if (!req.ok) {
      throw new CarError(json);
    }

    return;
  }

  public static async removeCar(id: number) {
    const headers = await AuthService.buildAuthHeader();

    const req = await BaseService.sendDeleteRequest({
      url: 'car/remove',
      headers,
      data: {car_id: id},
    });

    const json = await req.json();

    if (req.status === 400) {
      throw new CarBadRequestError(json);
    }

    if (!req.ok) {
      throw new CarError(json);
    }

    return;
  }

  public static async searchCarByLicensePlate(licensePlate: string) {
    const headers = await AuthService.buildAuthHeader();

    const req = await this.sendPostRequest({
      url: '/car/search',
      headers,
      data: {car_license_plate: licensePlate},
    });

    const json = await req.json();

    if (!req.ok) {
      throw new CarError(json.error);
    }

    return json as ICarSearchByLicensePlateResult;
  }
}
