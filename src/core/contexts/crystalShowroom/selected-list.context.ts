import { EIGHT_MM_SLIVER_PIPE } from '../../constants/constants';
import { HandSize, SliverPipe } from '../../models/selection';
import React from 'react';
import Action from '../../models/action';

import SelectedItem from '../../models/selection';

import { HAND_SIZE } from 'src/core/constants/constants';
import CrystalRing from 'src/core/models/crystal-ring';

export const UPDATED_SELECTED_BEAD = 'SELECT_BEAD';
export const SELECT_DISPLAY_CRYSTAL_BEAD = 'SELECT_CRYSTAL_BEAD';
export const REMOVE_DISPLAY_SELECTED_CRYSTAL_BEAD = 'REMOVE_SELECTED_CRYSTAL_BEAD';

export const ADD_FLOWER_COVER_ON_LEFT = 'ADD_FLOWER_COVER_ON_LEFT';
export const ADD_FLOWER_COVER_ON_RIGHT = 'ADD_FLOWER_COVER_ON_RIGHT';

export const ADD_CHARM = 'ADD_CHARM';
export const REMOVE_CHARM = 'REMOVE_CHARM';

export const SELECT_SLIVER_PIPE = 'SELECT_SLIVER_PIPE';
export const SELECT_HAND_SIZE = 'SELECT_HAND_SIZE';

export class CrystalShowroomAction {
  handSize!: HandSize;
  bead!: SelectedItem;
  sliverPipe!: SliverPipe;
  selectedDisplayCrystal!: string;
  flower!: SelectedItem;
  charm!: SelectedItem;
}

export class CrystalShowroomContextProps {
  crystalRing!: CrystalRing;

  selectedDisplayCrystal: string[] = [];

  dispatch: React.Dispatch<any> = () => null;
}

export const crystalShowroomInitState: CrystalShowroomContextProps = {
  crystalRing: new CrystalRing(HAND_SIZE[0], EIGHT_MM_SLIVER_PIPE[0]),
  selectedDisplayCrystal: [],
  dispatch: () => null,
};

export const crystalShowroomContext = React.createContext<CrystalShowroomContextProps>(crystalShowroomInitState);

export const crystalShowroomReducer = (state: CrystalShowroomContextProps, action: Action<CrystalShowroomAction>) => {
  switch (action.type) {
    case ADD_CHARM: {
      const selectedCrystals = state.selectedDisplayCrystal;
      const crystalRing: CrystalRing = state.crystalRing;

      const beads = crystalRing.beads.map((bead) =>
        selectedCrystals.includes(bead.key) ? { ...bead, ...{ charm: action.data.charm } } : bead,
      );
      crystalRing.setBeads(beads);
      return Object.assign({}, state, { crystalRing, selectedDisplayCrystal: [] });
    }
    case REMOVE_CHARM: {
      const selectedCrystals = state.selectedDisplayCrystal;
      const crystalRing: CrystalRing = state.crystalRing;

      const beads = crystalRing.beads.map((bead) =>
        selectedCrystals.includes(bead.key) ? { ...bead, ...{ charm: undefined } } : bead,
      );
      crystalRing.setBeads(beads);
      return Object.assign({}, state, { crystalRing, selectedDisplayCrystal: [] });
    }
    case ADD_FLOWER_COVER_ON_LEFT: {
      const selectedCrystals = state.selectedDisplayCrystal;
      const crystalRing: CrystalRing = state.crystalRing;

      const beads = crystalRing.beads.map((bead) =>
        selectedCrystals.includes(bead.key) ? { ...bead, ...{ leftFlower: action.data.flower } } : bead,
      );
      crystalRing.setBeads(beads);

      return Object.assign({}, state, { crystalRing, selectedDisplayCrystal: [] });
    }
    case ADD_FLOWER_COVER_ON_RIGHT: {
      const selectedCrystals = state.selectedDisplayCrystal;
      const crystalRing = state.crystalRing;

      const beads = crystalRing.beads.map((bead) =>
        selectedCrystals.includes(bead.key) ? { ...bead, ...{ rightFlower: action.data.flower } } : bead,
      );

      crystalRing.setBeads(beads);

      return Object.assign({}, state, { crystalRing, selectedDisplayCrystal: [] });
    }
    case SELECT_HAND_SIZE:
      const handSize = action.data.handSize;
      const crystalRing = state.crystalRing;

      crystalRing.setHandSize(handSize);
      crystalRing.createBeads(handSize.crystalCount);
      crystalRing.setSliverPipe(EIGHT_MM_SLIVER_PIPE[0]);

      return Object.assign({}, state, { crystalRing });
    case UPDATED_SELECTED_BEAD: {
      const url = action.data.bead.url;
      const crystalRing = state.crystalRing;
      const newBeads = state.crystalRing.beads.map((item) =>
        state.selectedDisplayCrystal.includes(item.key) ? { ...item, ...{ url } } : item,
      );
      crystalRing.setBeads(newBeads);

      return Object.assign({}, state, { crystalRing, selectedDisplayCrystal: [] });
    }
    case SELECT_DISPLAY_CRYSTAL_BEAD: {
      const newBeads = state.selectedDisplayCrystal.concat(action.data.selectedDisplayCrystal);
      return Object.assign({}, state, { selectedDisplayCrystal: newBeads });
    }

    case REMOVE_DISPLAY_SELECTED_CRYSTAL_BEAD:
      const newBeads = state.selectedDisplayCrystal.filter((bead) => bead !== action.data.selectedDisplayCrystal);
      return Object.assign({}, state, { selectedDisplayCrystal: newBeads });
    case SELECT_SLIVER_PIPE: {
      const selectedSliverPipe = action.data.sliverPipe;
      const currentCrystalRing = state.crystalRing;
      const newBeadsCount = currentCrystalRing.handSize.crystalCount - selectedSliverPipe.crystalCount;

      currentCrystalRing.createBeads(newBeadsCount);
      currentCrystalRing.setSliverPipe(selectedSliverPipe);

      return Object.assign({}, state, {
        crystalRing: currentCrystalRing,
        selectedDisplayCrystal: [],
      });
    }
    default:
      return state;
  }
};
