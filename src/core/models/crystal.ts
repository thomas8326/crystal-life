import Selection from 'src/core/models/selection';

export default class Crystal extends Selection {
  key!: string;

  text?: string;

  value?: number | string;

  url?: string;

  isSelected?: boolean;

  hasLeftFlower!: boolean;

  hasRightFlower!: boolean;

  constructor(key?: string, url?: string) {
    super(key);
    this.key = key ?? '';
    this.url = url ?? '';
  }
}
