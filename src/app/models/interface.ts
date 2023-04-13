export interface fullResAllPass {
  _id: string;
  passwordList: Sites;
}

export interface Sites {
  siteName: string;
  siteUrl: string;
  siteImgUrl: string;
  Category: string;
  _id: string;
  passwordList: PasswordList[];
}

export interface PasswordList {
  email: string;
  username: string;
  passwordHint: string;
  password: string;
  _id: string;
}
