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
  createdAt?: Date; 
  updatedAt?: Date;
}

export interface AccountSeed {
  id: string;
  userId: string;
  accountId: string;
  providerId: "credential" | string;
  password?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  idToken?: string | null;
  accessTokenExpiresAt?: Date | null;
  refreshTokenExpiresAt?: Date | null;
  scope?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}