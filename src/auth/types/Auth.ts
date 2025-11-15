import { UserModel } from "../../models/UserModel";

export default interface AuthResponse {
  token: string;
  message: string;
  data: {
    user: UserModel,
    token: string;
    //refreshToken: string;
  };
}

export interface AuthResponseError {
  body: {
    error: string,
  };
}
