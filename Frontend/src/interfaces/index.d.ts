interface IUserSignUpProps {
  name: String;
  email: String;
  password: String;
}

interface ISignUpResult {
  _id: String;
  email: String;
}

interface IUserSignInProps {
  email: String;
  password: String;
}

interface ISignInResult {
  accessToken: string;
}

interface IUser {
  id: String;
  email: String;
  username: String;
}

interface IEvent {
  _id: string;
  time: string;
  date: string;
  title: string;
  rsvps: [string];
  location: string;
  created_by: string;
  description: string;
}

interface ICreateEvent {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

interface IUpdateEvent extends ICreateEvent {}

interface JWTDecodedToken {
  user: IUser;
  exp: number;
  iat: number;
}
