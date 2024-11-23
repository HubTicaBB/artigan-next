export type LoginCredentials = {
  email: string;
  password: string;
};

export type Session = {
  user: {
    firstName: string;
    lastName: string;
    company: string;
    role: string;
  };
  accessToken: string;
};
