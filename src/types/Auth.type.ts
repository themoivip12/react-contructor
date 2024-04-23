export interface ILogin {
  username: string;
  password: string;
}

export interface IAuth {
  user: {
    uuid: string;
    nickname: string;
    profile_image: string;
    user_type: number;
    cash: number;
  };
  auth: string[];
  token: string;
}
