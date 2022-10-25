import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseService} from './base.service';
import {RetrieveInfoError} from './error';

export class AuthError extends Error {}

export class AuthRegisterError extends AuthError {
  constructor(
    public keyDescriptionPair: Record<any, any>,
    message = 'Invalid register data format!',
  ) {
    super(message);
  }
}

export interface IAuthRegister {
  email: string;
  password: string;
  username: string;
  firstname: string;
  lastname: string;
  phone_number: string;
}

export class AuthService extends BaseService {
  public static async register(registerInfo: IAuthRegister) {
    const req = await this.sendPostRequest('auth/register', registerInfo);
    const json = await req.json();

    if (req.status === 400) {
      throw new AuthRegisterError(json);
    }

    if (!req.ok) {
      throw new AuthError(json.error);
    }
  }

  public static async login(
    email: string,
    password: string,
  ): Promise<string | undefined> {
    const headers = {'Content-Type': 'application/json'};
    const url = BaseService.baseUrl + 'auth/login';
    const body = JSON.stringify({email, password});

    const req = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    const res = await req.json();

    if (req.status === 400) {
      throw new AuthError('Invalid email or password format!');
    }

    if (!req.ok) {
      throw new AuthError('Invalid email or password!');
    }

    const {token} = res;

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
}
