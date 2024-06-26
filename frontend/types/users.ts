export type UserType = {
  id: number;
  name: string;
  username: string;
  role?: string;
  password: string;
};

export type LoginUser = {
  username: string;
  password: string;
  rememberMe: string;
};

export type UserContext = {
  currentUser?: UserType | null;
  isSubmitting: boolean;
  setCurrentUser: (user: UserType) => void;
  login: (values: LoginUser) => void;
  logout: () => void;
};
