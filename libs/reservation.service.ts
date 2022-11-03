import {AuthService, IUserShareable} from './auth.service';
import {BaseService, IPaginationQuery} from './base.service';
import {ICar} from './car.service';
import {IParkingLot} from './parking-lot.service';

export class ReservationError extends Error {}

export interface IReservationRecord {
  car: ICar;
  parking_lot: IParkingLot;
  reservation: Reservation;
  user: IUserShareable;
}

export interface Reservation {
  reservation_end_time: string;
  reservation_id: number;
  reservation_start_time: string;
}

export class ReservationService extends BaseService {
  public static async listReservation(query: IPaginationQuery) {
    const headers = await AuthService.buildAuthHeader();

    const req = await this.sendGetRequest({
      url: '/reservation/list',
      headers,
      query,
    });

    const json = await req.json();

    if (!req.ok) {
      throw new ReservationError(json.error);
    }

    return json as IReservationRecord[];
  }
}
