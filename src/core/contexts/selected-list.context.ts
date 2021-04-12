import { EIGHT_MM_SLIVER_PIPE } from './../constants/constants';
import { HandSize } from './../models/selection';
import React from 'react';
import Action from '../models/action';

import Selection from '../models/selection';

import { v4 as uuidv4 } from 'uuid';
import { HAND_SIZE } from 'src/core/constants/constants';
import CrystalRing from 'src/core/models/crystal-ring';
import Crystal from 'src/core/models/crystal';

export const UPDATED_SELECTED_BEAD = 'SELECT_BEAD';
export const SELECT_DISPLAY_CRYSTAL_BEAD = 'SELECT_CRYSTAL_BEAD';
export const REMOVE_DISPLAY_SELECTED_CRYSTAL_BEAD = 'REMOVE_SELECTED_CRYSTAL_BEAD';

export const SELECT_SLIVER_PIPE = 'SELECT_SLIVER_PIPE';
export const SELECT_HAND_SIZE = 'SELECT_HAND_SIZE';

export class CrystalShowroomAction {
  handSize!: HandSize;
  bead!: Selection;
  sliverPipe!: Selection;
  selectedDisplayCrystal!: string;
}

export class CrystalShowroomContextProps {
  crystalRing!: CrystalRing;

  selectedList: Selection[] = [];

  handSize: HandSize = new HandSize();

  selectedDisplayCrystal: string[] = [];

  selectedSliverPipe: Selection = new Selection();

  dispatch: React.Dispatch<any> = () => null;
}

export const initNewSelectedList = (crystalCount: number): Crystal[] =>
  new Array(crystalCount).fill(-1).map(() => new Crystal(uuidv4()));

export const crystalShowroomInitState: CrystalShowroomContextProps = {
  crystalRing: new CrystalRing(HAND_SIZE[0], EIGHT_MM_SLIVER_PIPE[0]),
  selectedDisplayCrystal: [],
  selectedList: initNewSelectedList(HAND_SIZE[0].crystalCount),
  handSize: HAND_SIZE[0],
  selectedSliverPipe: EIGHT_MM_SLIVER_PIPE[0],
  dispatch: () => null,
};

export const crystalShowroomContext = React.createContext<CrystalShowroomContextProps>(crystalShowroomInitState);

export const crystalShowroomReducer = (state: CrystalShowroomContextProps, action: Action<CrystalShowroomAction>) => {
  switch (action.type) {
    case SELECT_HAND_SIZE:
      const handSize = action.data.handSize;
      const crystalRing = state.crystalRing;
      crystalRing.setHandSize(handSize);
      crystalRing.setBeads(handSize.crystalCount);

      return Object.assign({}, state, { crystalRing });
    case UPDATED_SELECTED_BEAD: {
      const url = action.data.bead.url;
      const newBeads = state.crystalRing.beads.map((item) =>
        state.selectedDisplayCrystal.includes(item.key) ? { ...item, ...{ url } } : item,
      );

      return Object.assign({}, state, { crystalRing: { ...state.crystalRing, beads: newBeads } });
    }
    case SELECT_DISPLAY_CRYSTAL_BEAD: {
      const newBeads = state.selectedDisplayCrystal.concat(action.data.selectedDisplayCrystal);
      return Object.assign({}, state, { selectedDisplayCrystal: newBeads });
    }

    case REMOVE_DISPLAY_SELECTED_CRYSTAL_BEAD:
      const newBeads = state.selectedDisplayCrystal.filter((bead) => bead !== action.data.selectedDisplayCrystal);
      return Object.assign({}, state, { selectedBeads: newBeads });
    case SELECT_SLIVER_PIPE: {
      const selectedSliverPipe = action.data.sliverPipe;
      const currentCrystalRing = state.crystalRing;
      const newBeadsCount = currentCrystalRing.handSize.crystalCount - (selectedSliverPipe.value as number);

      currentCrystalRing.setBeads(newBeadsCount);
      currentCrystalRing.setSliverPipe(selectedSliverPipe);

      console.log(currentCrystalRing);

      return Object.assign({}, state, {
        crystalRing: currentCrystalRing,
        selectedBeads: [],
      });
    }
    default:
      return state;
  }
};
