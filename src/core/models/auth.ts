export class Auth {
  isAdmin!: boolean;
  isUser!: boolean;
  userLogin!: (account: string) => Promise<any>;
  adminLogin!: (account: string, password: string) => Promise<any>;
}
