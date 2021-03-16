import { HandSize } from './../models/selection';
import React from 'react';
import Action from '../models/action';

import Selection from '../models/selection';
import { v4 as uuidv4 } from 'uuid';
import { HAND_SIZE } from 'src/core/constants/constants';

export const UPDATED_SELECTED_LIST = 'UPDATED_SELECTED_LIST';
export const DELETE_SELECTED = 'DELETE_SELECTED';
export const SELECT_HAND_SIZE = 'SELECT_HAND_SIZE';

export class CrystalShowroomContextProps {
  selectedList: Selection[] = [];

  handSize: HandSize = new HandSize();

  dispatch: React.Dispatch<any> = () => null;
}

export const crystalShowroomInitState: CrystalShowroomContextProps = {
  selectedList: [],
  handSize: HAND_SIZE[0],
  dispatch: () => null,
};

export const crystalShowroomContext = React.createContext<CrystalShowroomContextProps>(crystalShowroomInitState);

export const crystalShowroomReducer = (
  state: CrystalShowroomContextProps,
  action: Action<{ selectedItem: HandSize | Selection }>,
) => {
  switch (action.type) {
    case UPDATED_SELECTED_LIST: {
      const selectedItem = { ...action.data.selectedItem, ...{ key: uuidv4() } };

      const newSelectedList = state.selectedList.concat(selectedItem);
      return Object.assign({}, state, { selectedList: newSelectedList });
    }
    case SELECT_HAND_SIZE:
      return Object.assign({}, state, { handSize: action.data.selectedItem, selectedList: [] });
    default:
      return state;
  }
};
