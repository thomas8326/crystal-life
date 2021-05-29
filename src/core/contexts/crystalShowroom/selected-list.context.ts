import { HandSize, SliverPipe } from '../../models/selection';
import React from 'react';
import Action from '../../models/action';

import SelectedItem from '../../models/selection';

import CrystalRing from 'src/core/models/crystal-ring';
import { FileInfo } from 'src/core/models/file-info';

export const INIT_CRYSTAL_SHOWROOM = 'INIT_CRYSTAL_SHOWROOM';

export const UPDATED_SELECTED_BEAD = 'SELECT_BEAD';
export const SELECT_DISPLAY_CRYSTAL_BEAD = 'SELECT_CRYSTAL_BEAD';
export const REMOVE_DISPLAY_SELECTED_CRYSTAL_BEAD = 'REMOVE_SELECTED_CRYSTAL_BEAD';

export const ADD_FLOWER_COVER_ON_LEFT = 'ADD_FLOWER_COVER_ON_LEFT';
export const ADD_FLOWER_COVER_ON_RIGHT = 'ADD_FLOWER_COVER_ON_RIGHT';
export const REMOVE_FLOWER = 'REMOVE_FLOWER';

export const ADD_CHARM = 'ADD_CHARM';
export const REMOVE_CHARM = 'REMOVE_CHARM';

export const SELECT_SLIVER_PIPE = 'SELECT_SLIVER_PIPE';
export const SELECT_HAND_SIZE = 'SELECT_HAND_SIZE';

export class CrystalShowroomAction {
  handSize!: HandSize;
  sliverPipe!: SliverPipe;
  selectedDisplayCrystal!: string;
  flower!: FileInfo;
  charm!: FileInfo;
  bead!: FileInfo;
}

export class CrystalShowroomContextProps {
  crystalRing!: CrystalRing;

  selectedDisplayCrystal: string[] = [];

  isFillCrystal!: boolean;

  dispatch: React.Dispatch<any> = () => null;
}

export const crystalShowroomInitState: CrystalShowroomContextProps = {
  crystalRing: new CrystalRing(),
  selectedDisplayCrystal: [],
  isFillCrystal: false,
  dispatch: () => null,
};

export const crystalShowroomContext = React.createContext<CrystalShowroomContextProps>(crystalShowroomInitState);

export const crystalShowroomReducer = (state: CrystalShowroomContextProps, action: Action<CrystalShowroomAction>) => {
  switch (action.type) {
    case INIT_CRYSTAL_SHOWROOM: {
      const crystalRing: CrystalRing = new CrystalRing();
      crystalRing.setHandSize(action.data.handSize);
      crystalRing.createBeads(action.data.handSize.crystalCount);
      return Object.assign({}, state, { crystalRing, selectedDisplayCrystal: [] });
    }
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
        selectedCrystals.includes(bead.key) ? { ...bead, ...{ charm: new FileInfo() } } : bead,
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
    case REMOVE_FLOWER: {
      const selectedCrystals = state.selectedDisplayCrystal;
      const crystalRing = state.crystalRing;

      const beads = crystalRing.beads.map((bead) =>
        selectedCrystals.includes(bead.key)
          ? { ...bead, ...{ rightFlower: new FileInfo(), leftFlower: new FileInfo() } }
          : bead,
      );

      console.log(beads);

      crystalRing.setBeads(beads);

      return Object.assign({}, state, { crystalRing, selectedDisplayCrystal: [] });
    }
    case SELECT_HAND_SIZE:
      const handSize = action.data.handSize;
      const crystalRing = state.crystalRing;

      crystalRing.setHandSize(handSize);
      crystalRing.createBeads(handSize.crystalCount);
      crystalRing.setSliverPipe(new SelectedItem());

      return Object.assign({}, state, { crystalRing });
    case UPDATED_SELECTED_BEAD: {
      const url = action.data.bead.url;
      const crystalRing = state.crystalRing;
      const newBeads = state.crystalRing.beads.map((item) =>
        state.selectedDisplayCrystal.includes(item.key) ? { ...item, ...{ url } } : item,
      );

      const isFill = newBeads.every((bead) => !!bead.url);
      crystalRing.setBeads(newBeads);

      return Object.assign({}, state, { crystalRing, selectedDisplayCrystal: [], isFillCrystal: isFill });
    }
    case SELECT_DISPLAY_CRYSTAL_BEAD: {
      const newBeads = state.selectedDisplayCrystal.concat(action.data.selectedDisplayCrystal);
      console.log(newBeads);
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
