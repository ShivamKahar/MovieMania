export type UserType = {
  id: string;
  userName: string;
  email: string;
};

export type SignUpParams = Omit<UserType, "id"> & {
  password: string;
};

export type SignInParams = {
  email: string;
  password: string;
};

export type SignInResponse = UserType & {
  token: string;
};

export type MovieType = {
  id?: string;
  title: string;
  publishedYear: string;
  poster?: string | null;
};

export type ProtectedRouteLocals = {
  user: UserType;
};
