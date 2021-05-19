import SelectedItem, { HandSize } from './selection';
import Crystal from 'src/core/models/crystal';
import { v4 as uuidv4 } from 'uuid';

export default class CrystalRing {
  id!: string;

  handSize!: HandSize;

  sliverPipe!: SelectedItem;

  beads: Crystal[] = [];

  constructor() {}

  setHandSize(handSize: HandSize) {
    this.handSize = handSize;
  }

  setSliverPipe(sliverPipe: SelectedItem) {
    this.sliverPipe = sliverPipe;
  }

  setBeads(beads: Crystal[]) {
    this.beads = beads;
  }

  createBeads(count: number) {
    this.beads = this.generateBeads(count);
  }

  private generateBeads(count: number) {
    return new Array(count).fill(-1).map(() => new Crystal(uuidv4()));
  }
}
