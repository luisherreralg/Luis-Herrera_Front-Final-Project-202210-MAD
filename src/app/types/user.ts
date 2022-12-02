export type ProtoUser = {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
};

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
};
