import { HandSize } from './../models/selection';
import React from 'react';
import Action from '../models/action';

import Selection from '../models/selection';

export const UPDATED_SELECTED_LIST = 'UPDATED_SELECTED_LIST';
export const SELECT_HAND_SIZE = 'SELECT_HAND_SIZE';

export class CrystalShowroomContextProps {
  selectedList: Selection[] = [];

  handSize: HandSize = new HandSize();

  dispatch: React.Dispatch<any> = () => null;
}

export const crystalShowroomContext = React.createContext<CrystalShowroomContextProps>({
  selectedList: [],
  handSize: new HandSize(),
  dispatch: () => null,
});

export const crystalShowroomReducer = (
  state: CrystalShowroomContextProps,
  action: Action<{ selectedItem: Selection }>,
) => {
  switch (action.type) {
    case UPDATED_SELECTED_LIST: {
      const selectedItem = action.data.selectedItem;

      const newSelectedList = selectedItem.isSelected
        ? state.selectedList.concat(selectedItem)
        : state.selectedList.filter((selection) => selection.key !== selectedItem.key);

      return Object.assign({}, state, { selectedList: newSelectedList });
    }
    case SELECT_HAND_SIZE:
      return Object.assign({}, state, { handSize: action.data.selectedItem });
    default:
      return state;
  }
};
