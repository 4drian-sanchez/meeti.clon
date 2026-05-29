export interface RawUser {
  name: string;
  email: string;
}

export interface UserSeed {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
}

export interface AccountSeed {
  id: string;
  userId: string;
  accountId: string;
  providerId: string;
  password?: string | null;
}