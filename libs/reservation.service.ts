import {AuthService, IUserShareable} from './auth.service';
import {
  BaseBadRequestError,
  BaseService,
  IPaginationQuery,
} from './base.service';
import {ICarRecord} from './car.service';
import {IParkingLot} from './parking-lot.service';
import {IInvoiceRecord} from './payment.service';

export class ReservationError extends Error {
  constructor(json: any) {
    super(json.error);
  }
}

export interface IReservationRecord {
  car: ICarRecord;
  parking_lot: IParkingLot;
  reservation: Reservation;
  user: IUserShareable;
}

export interface Reservation {
  reservation_end_time: string;
  reservation_id: number;
  reservation_start_time: string;
}

export class ReservationBadRequest extends BaseBadRequestError {}

export interface CreateReservationDto {
  car_id: number;
  parking_lot_id: number;
}

export interface IEndReservationResponse {
  invoice: IInvoiceRecord;
  message: string;
}

export class ReservationService extends BaseService {
  public static async createReservation(data: CreateReservationDto) {
    const headers = await AuthService.buildAuthHeader();

    const req = await BaseService.sendPostRequest({
      url: 'reservation/create',
      headers,
      data: data,
    });

    const json = await req.json();

    if (req.status === 400) {
      throw new ReservationBadRequest(json);
    }

    if (!req.ok) {
      throw new ReservationError(json);
    }

    return;
  }

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

  public static async endReservation(id: number) {
    const headers = await AuthService.buildAuthHeader();

    const req = await BaseService.sendDeleteRequest({
      url: 'reservation/end',
      headers,
      data: {reservation_id: id},
    });

    const json = await req.json();

    if (req.status === 400) {
      throw new ReservationBadRequest(json);
    }

    if (!req.ok) {
      throw new ReservationError(json);
    }

    return json as IEndReservationResponse;
  }
}
