import { v4 as uuidv4 } from 'uuid';

export default class SelectedItem {
  id!: string;

  key!: string;

  text?: string;

  value?: number | string;

  url?: string;

  isSelected?: boolean;

  constructor(url?: string) {
    this.key = uuidv4();
    this.url = url ?? '';
    this.isSelected = false;
  }
}

export class HandSize extends SelectedItem {
  radiusWidth!: number;
  crystalCount!: number;
  beadSize!: number;

  constructor(name: string, value: number, count: number) {
    super();
    this.text = name;
    this.value = value;
    this.radiusWidth = 180;
    this.crystalCount = count;
    this.beadSize = (360 / count) * 3 + 3;
  }
}

export class SliverPipe extends SelectedItem {
  crystalCount!: number;

  constructor(name: string, value: number, count: number) {
    super();
    this.text = name;
    this.value = value;
    this.crystalCount = count;
  }
}
