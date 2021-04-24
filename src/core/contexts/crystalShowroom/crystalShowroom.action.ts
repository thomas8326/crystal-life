import { CHARM_OPTIONS, FLOWER_OPTIONS } from 'src/core/constants/constants';
import {
  UPDATED_SELECTED_BEAD,
  SELECT_HAND_SIZE,
  SELECT_SLIVER_PIPE,
  ADD_CHARM,
  REMOVE_CHARM,
} from 'src/core/contexts/crystalShowroom/selected-list.context';
import SelectedItem, { HandSize } from 'src/core/models/selection';

export const updateSelectedCrystal = (dispatch: React.Dispatch<any>) => (bead: SelectedItem) => {
  dispatch({ type: UPDATED_SELECTED_BEAD, data: { bead } });
};

export const updateSelectHandSize = (dispatch: React.Dispatch<any>) => (handSize: HandSize) => {
  dispatch({ type: SELECT_HAND_SIZE, data: { handSize } });
};

export const updateSelectSliverHand = (dispatch: React.Dispatch<any>) => (item: SelectedItem) => {
  dispatch({ type: SELECT_SLIVER_PIPE, data: { sliverPipe: item } });
};

export const updateFlowerCover = (type: string, dispatch: React.Dispatch<any>) => (flower: SelectedItem) => {
  if (flower.key !== FLOWER_OPTIONS[0].key) {
    dispatch({ type, data: { flower } });
  }
};

export const addCharm = (dispatch: React.Dispatch<any>) => () => {
  dispatch({ type: ADD_CHARM, data: { charm: CHARM_OPTIONS[0] } });
};

export const removeCharm = (dispatch: React.Dispatch<any>) => () => {
  dispatch({ type: REMOVE_CHARM });
};
