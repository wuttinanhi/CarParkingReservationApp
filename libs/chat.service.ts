import {AuthService} from './auth.service';
import {BaseService, IPaginationQuery} from './base.service';

export class ChatError extends Error {}

export interface IChatHeadRecord {
  chat_head_id: number;
  chat_head_last_update_date: string;
  chat_head_target_user: ChatHeadTargetUser;
  chat_head_target_user_id: number;
  chat_head_user_id: number;
}

export interface ChatHeadTargetUser {
  user_id: number;
  user_username: string;
}

export interface IChatRecord {
  chat_from_user_id: number;
  chat_id: number;
  chat_message: string;
  chat_send_date: string;
  chat_to_user_id: number;
}

export class ChatService extends BaseService {
  public static async listChat(query: IPaginationQuery) {
    const headers = await AuthService.buildAuthHeader();

    const req = await this.sendGetRequest({
      url: 'chat/list',
      headers,
      query,
    });

    const json = await req.json();

    if (!req.ok) {
      throw new ChatError(json.error);
    }

    return json as IChatHeadRecord[];
  }
}
