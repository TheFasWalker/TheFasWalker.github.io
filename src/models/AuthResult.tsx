export interface AuthResult {
  token: string;
  profile: {
    _id: string;
    signUpDate: string;
    email: string;
    commandId: string;
    password: string;
    __v: number;
  };
}
