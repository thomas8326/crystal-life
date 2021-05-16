import { v4 as uuidv4 } from 'uuid';

export class FileLink {
  id!: string;
  url!: string;

  constructor(url: string) {
    this.id = uuidv4();
    this.url = url ?? '';
  }
}
