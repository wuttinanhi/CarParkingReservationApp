import {AuthService} from './auth.service';
import {BaseBadRequestError, BaseService} from './base.service';

export interface IParkingLot {
  parking_lot_id: number;
  parking_lot_location: string;
  parking_lot_open_status: boolean;
}

export interface IParkingLotAvailable {
  available: boolean;
  id: number;
  location: string;
  open_status: boolean;
}

export class ParkingLotError extends Error {
  constructor(json: any) {
    super(json.error);
  }
}

export class ParkingLotBadRequestError extends BaseBadRequestError {}

export class ParkingLotService extends BaseService {
  public static async listParkingLot() {
    const headers = await AuthService.buildAuthHeader();

    const req = await this.sendGetRequest({
      url: '/parking_lot/available',
      headers,
    });

    const json = await req.json();

    if (!req.ok) {
      throw new ParkingLotError(json.error);
    }

    return json as IParkingLotAvailable[];
  }
}
