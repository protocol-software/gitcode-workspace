export interface IOtp {
  identity: string;
  code?: string;
  expiration?: Date;
}
