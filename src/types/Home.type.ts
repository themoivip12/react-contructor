export interface IHome {
  id: string;
  name: string;
}
export interface ISidebar extends Record<string, string> {
  linkTo: string;
}
