export interface Profile {
  id: string;
  name: string;
  email: string;
  signUpDate: Date;
}

export type UpdateProfileBody = {
  name: string;
};
