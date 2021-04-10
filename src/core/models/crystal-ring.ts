import { HandSize } from './selection';
import Crystal from 'src/core/models/crystal';
import { v4 as uuidv4 } from 'uuid';
import { HAND_SIZE } from 'src/core/constants/constants';

export default class CrystalRing {
  handSize: HandSize = HAND_SIZE[0];

  sliverPipe?: string;

  beads: Crystal[] = [];

  constructor(handSize: HandSize, beads?: Crystal[], sliverPipe?: string) {
    this.handSize = handSize ?? HAND_SIZE[0];
    this.sliverPipe = sliverPipe;
    this.beads = !!beads ? beads : this.generateBeads(handSize?.crystalCount);
  }

  setSliverPipe(sliverPipe: string) {
    this.sliverPipe = sliverPipe;
  }

  setHandSizeCount(count: number) {
    this.handSize.crystalCount = count;
  }

  private generateBeads(count: number) {
    return new Array(count).fill(-1).map(() => new Crystal(uuidv4()));
  }
}
