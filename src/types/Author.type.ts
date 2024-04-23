export interface IAuthor {
  uuid: string;
  name: string;
  user: {
    uuid: string;
    nickname: string;
    profile_image: string;
    user_type: number;
    cash: number;
  };
}
