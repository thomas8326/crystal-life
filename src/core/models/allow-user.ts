export default class AllowUser {
  id!: string;
  key!: string;
  name!: string;
  phone!: string;
  activate!: boolean;

  constructor(phone: string, name: string) {
    this.key = phone;
    this.phone = phone;
    this.name = name;
    this.activate = false;
  }
}
