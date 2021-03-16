export default class Selection {
  key!: string;

  value!: string;

  url?: string;

  isSelected?: boolean;
}

export class HandSize extends Selection {
  radiusWidth!: number;
  crystalCount!: number;
}
