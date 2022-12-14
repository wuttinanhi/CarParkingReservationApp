import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseBadRequestError, BaseService} from './base.service';
import {RetrieveInfoError} from './error';

export interface IUserFull {
  user_citizen_id: string;
  user_email: string;
  user_firstname: string;
  user_id: number;
  user_lastname: string;
  user_phone_number: string;
  user_username: string;
}

export interface IUserShareable {
  user_email: string;
  user_firstname: string;
  user_id: number;
  user_lastname: string;
  user_phone_number: string;
  user_username: string;
}

export class AuthError extends Error {}

export class AuthBadRequestError extends BaseBadRequestError {}

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

export interface IUpdateUser {
  firstname: string;
  lastname: string;
  phone_number: string;
  citizen_id: string;
}

export class AuthService extends BaseService {
  public static async register(registerInfo: IAuthRegister) {
    const req = await BaseService.sendPostRequest({
      url: 'auth/register',
      data: registerInfo,
      headers: {'Content-Type': 'application/json'},
    });
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

  public static async getUser() {
    const accessToken = await AuthService.getAccessToken();
    if (!accessToken) {
      return null;
    }

    const headers = await this.buildAuthHeader();
    const req = await this.sendGetRequest({
      url: '/user/me',
      headers,
    });
    const res = await req.json();

    if (!req.ok) {
      throw new RetrieveInfoError('Failed to retrieve user info!');
    }

    return res as IUserFull;
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

  public static async updateProfile(data: IUpdateUser) {
    const accessToken = await AuthService.getAccessToken();
    if (!accessToken) {
      return null;
    }

    const headers = await this.buildAuthHeader();
    const req = await this.sendPatchRequest({
      url: 'user/update',
      headers,
      data: data,
    });

    const json = await req.json();

    if (req.status === 400) {
      throw new AuthBadRequestError(json, 'Invalid data formatted!');
    }

    if (!req.ok) {
      throw new AuthError('Failed to update user!');
    }

    return json as IUserFull;
  }
}
