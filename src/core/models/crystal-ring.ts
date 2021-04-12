import Selection, { HandSize } from './selection';
import Crystal from 'src/core/models/crystal';
import { v4 as uuidv4 } from 'uuid';
import { EIGHT_MM_SLIVER_PIPE, HAND_SIZE } from 'src/core/constants/constants';

export default class CrystalRing {
  handSize: HandSize = HAND_SIZE[0];

  sliverPipe!: Selection;

  beads: Crystal[] = [];

  constructor(handSize: HandSize, sliverPipe: Selection) {
    this.handSize = handSize ?? HAND_SIZE[0];
    this.sliverPipe = sliverPipe ?? EIGHT_MM_SLIVER_PIPE[0];
    this.beads = this.generateBeads(handSize.crystalCount);
  }

  setHandSize(handSize: HandSize) {
    this.handSize = handSize;
  }

  setSliverPipe(sliverPipe: Selection) {
    this.sliverPipe = sliverPipe;
  }

  setBeads(count: number) {
    this.beads = this.generateBeads(count);
  }

  private generateBeads(count: number) {
    return new Array(count).fill(-1).map(() => new Crystal(uuidv4()));
  }
}
