export default class AllowUser {
  id!: string;
  key!: string;
  phone!: string;
  activate!: boolean;

  constructor(phone: string) {
    this.key = phone;
    this.phone = phone;
    this.activate = false;
  }
}
