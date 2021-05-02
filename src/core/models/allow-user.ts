export default class AllowUser {
  key!: string;
  phone!: string;
  activate!: boolean;

  constructor(phone: string) {
    this.key = phone;
    this.phone = phone;
    this.activate = false;
  }
}
