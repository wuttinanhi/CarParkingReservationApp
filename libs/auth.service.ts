import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {BaseService} from './base.service';

export class AuthError extends Error {
  constructor(public json: any) {
    super('');
  }
}

export class AuthService extends BaseService {
  public static async login(
    email: string,
    password: string,
  ): Promise<string | undefined> {
    try {
      const headers = {'Content-Type': 'application/json'};
      const url = BaseService.baseUrl + 'auth/login';
      const body = JSON.stringify({email, password});

      const req = await fetch(url, {
        method: 'POST',
        headers,
        body,
      });

      const res = await req.json();

      if (!req.ok) {
        throw new AuthError(res);
      }

      const {token} = res;

      await AsyncStorage.setItem('accessToken', token);

      return token;
    } catch (error) {
      if (error instanceof AuthError) {
        for (const key in error.json) {
          if (Object.prototype.hasOwnProperty.call(error.json, key)) {
            const message = error.json[key];
            Toast.show({
              type: 'error',
              text1: 'Invalid Login',
              text2: key + ' ' + message,
            });
          }
        }
      }
    }
  }

  public static async logout() {
    await AsyncStorage.removeItem('accessToken');
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
        throw new AuthError(res);
      }

      return res;
    } catch (error) {
      return null;
    }
  }
}
