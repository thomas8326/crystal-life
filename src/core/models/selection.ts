export default class Selection {
  key!: string;

  text?: string;

  value?: number | string;

  url?: string;

  isSelected?: boolean;

  constructor(key?: string, url?: string) {
    this.key = key ?? '';
    this.url = url ?? '';
  }
}

export class HandSize extends Selection {
  radiusWidth!: number;
  crystalCount!: number;
}
