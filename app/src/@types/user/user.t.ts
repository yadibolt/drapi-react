export type TJWTUser = {
  mod_sig: string;
  exp: number;
  iat: number;
  iss: string;
  data: TJWTUserData;
};

export type TJWTUserData = {
  user_id: number;
  username: string;
  type: "authenticated" | "anonymous";
  langcode: string;
};
