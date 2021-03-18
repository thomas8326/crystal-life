import { EIGHT_MM_SLIVER_PIPE } from './../constants/constants';
import { HandSize } from './../models/selection';
import React from 'react';
import Action from '../models/action';

import Selection from '../models/selection';

import { v4 as uuidv4 } from 'uuid';
import { HAND_SIZE } from 'src/core/constants/constants';

export const UPDATED_SELECTED_LIST = 'UPDATED_SELECTED_LIST';
export const SELECT_CRYSTAL_BEAD = 'SELECT_CRYSTAL_BEAD';
export const REMOVE_SELECTED_CRYSTAL_BEAD = 'REMOVE_SELECTED_CRYSTAL_BEAD';

export const SELECT_SLIVER_PIPE = 'SELECT_SLIVER_PIPE';
export const SELECT_HAND_SIZE = 'SELECT_HAND_SIZE';

export class CrystalShowroomContextProps {
  selectedList: Selection[] = [];

  handSize: HandSize = new HandSize();

  selectedBeads: string[] = [];

  selectedSliverPipe: Selection = new Selection();

  dispatch: React.Dispatch<any> = () => null;
}

export const initNewSelectedList = (crystalCount: number): Selection[] =>
  new Array(crystalCount).fill(-1).map(() => new Selection(uuidv4()));

export const crystalShowroomInitState: CrystalShowroomContextProps = {
  selectedList: initNewSelectedList(HAND_SIZE[0].crystalCount),
  handSize: HAND_SIZE[0],
  selectedBeads: [],
  selectedSliverPipe: EIGHT_MM_SLIVER_PIPE[0],
  dispatch: () => null,
};

export const crystalShowroomContext = React.createContext<CrystalShowroomContextProps>(crystalShowroomInitState);

export const crystalShowroomReducer = (
  state: CrystalShowroomContextProps,
  action: Action<{ selectedItem: HandSize | Selection; selectedBead: string }>,
) => {
  switch (action.type) {
    case UPDATED_SELECTED_LIST: {
      const crystal = action.data.selectedItem.url;
      const newSelectedList = state.selectedList.map((item) =>
        state.selectedBeads.includes(item.key) ? { ...item, ...{ url: crystal } } : item,
      );

      return Object.assign({}, state, { selectedList: newSelectedList, selectedBeads: [] });
    }
    case SELECT_HAND_SIZE:
      const handSize = action.data.selectedItem as HandSize;

      return Object.assign({}, state, {
        handSize: handSize,
        selectedList: initNewSelectedList(handSize.crystalCount),
        selectedBeads: [],
        selectedSliverPipe: EIGHT_MM_SLIVER_PIPE[0],
      });
    case SELECT_CRYSTAL_BEAD: {
      const newBeads = state.selectedBeads.concat(action.data.selectedBead);
      return Object.assign({}, state, { selectedBeads: newBeads });
    }
    case SELECT_SLIVER_PIPE: {
      const selectedSliverPipe = action.data.selectedItem;
      const newBeadCount = state.handSize.crystalCount - (selectedSliverPipe.value as number);
      const aaa = new Array(selectedSliverPipe.value)
        .fill(-1)
        .map(() => new Selection(uuidv4(), `${process.env.PUBLIC_URL}/assets/S__9551888-removebg-preview.png`));
      // const newSelectedList = [...initNewSelectedList(newBeadCount), ...aaa];
      const newSelectedList = initNewSelectedList(newBeadCount);
      console.log(newSelectedList);
      return Object.assign({}, state, {
        selectedList: newSelectedList,
        selectedBeads: [],
        selectedSliverPipe: selectedSliverPipe,
      });
    }
    case REMOVE_SELECTED_CRYSTAL_BEAD:
      const newBeads = state.selectedBeads.filter((bead) => bead !== action.data.selectedBead);
      return Object.assign({}, state, { selectedBeads: newBeads });
    default:
      return state;
  }
};
