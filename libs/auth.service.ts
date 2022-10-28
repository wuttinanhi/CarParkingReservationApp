import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseService} from './base.service';
import {RetrieveInfoError} from './error';

export class AuthError extends Error {}

export class AuthBadRequestError extends AuthError {
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

export interface IAuthRegister {
  email: string;
  password: string;
  username: string;
  firstname: string;
  lastname: string;
  phone_number: string;
  citizen_id: string;
}

export interface IAuthLogin {
  email: string;
  password: string;
}

export class AuthService extends BaseService {
  public static async register(registerInfo: IAuthRegister) {
    const req = await this.sendPostRequest('auth/register', registerInfo);
    const json = await req.json();

    if (req.status === 400) {
      throw new AuthBadRequestError(json, 'Invalid data formatted!');
    }

    if (!req.ok) {
      throw new AuthError(json.error);
    }
  }

  public static async login(
    loginInfo: IAuthLogin,
  ): Promise<string | undefined> {
    const headers = {'Content-Type': 'application/json'};
    const url = BaseService.baseUrl + 'auth/login';
    const body = JSON.stringify(loginInfo);

    const req = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    const json = await req.json();

    if (req.status === 400) {
      throw new AuthBadRequestError(json, 'Invalid data formatted!');
    }

    if (!req.ok) {
      throw new AuthError('Invalid email or password!');
    }

    const {token} = json;

    return token;
  }

  public static async logout() {
    await AsyncStorage.removeItem('accessToken');
  }

  public static async setAccessToken(token: string) {
    await AsyncStorage.setItem('accessToken', token);
  }

  public static async getAccessToken() {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        return null;
      }
      return accessToken;
    } catch (error) {
      return null;
    }
  }

  public static async removeAccessToken() {
    await AsyncStorage.removeItem('accessToken');
  }

  public static async getUser(): Promise<string | undefined | null> {
    try {
      const accessToken = await AuthService.getAccessToken();
      if (!accessToken) {
        return null;
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };
      const url = BaseService.baseUrl + 'user/me';

      const req = await fetch(url, {
        method: 'GET',
        headers,
      });

      const res = await req.json();

      if (!req.ok) {
        throw new RetrieveInfoError('Failed to retrieve user info!');
      }

      return res;
    } catch (error) {
      return null;
    }
  }

  public static async checkAccessToken(accessToken: string) {
    try {
      const url = BaseService.baseUrl + 'user/me';

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };

      const req = await fetch(url, {
        method: 'GET',
        headers,
      });

      if (!req.ok) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  public static async buildAuthHeader(other?: any) {
    const accessToken = await this.getAccessToken();

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...other,
    };

    return headers;
  }
}
