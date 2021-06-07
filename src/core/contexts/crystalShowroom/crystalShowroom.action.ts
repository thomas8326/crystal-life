import {
  UPDATED_SELECTED_BEAD,
  SELECT_HAND_SIZE,
  SELECT_SLIVER_PIPE,
  ADD_CHARM,
  REMOVE_CHARM,
  INIT_CRYSTAL_SHOWROOM,
  REMOVE_FLOWER,
} from 'src/core/contexts/crystalShowroom/selected-list.context';
import SelectedItem, { HandSize, SliverPipe } from 'src/core/models/selection';
import { FileInfo } from 'src/core/models/file-info';

export const updateSelectedCrystal = (dispatch: React.Dispatch<any>) => (bead: SelectedItem) => {
  dispatch({ type: UPDATED_SELECTED_BEAD, data: { bead } });
};

export const updateSelectHandSize = (dispatch: React.Dispatch<any>, sliverPipe: SliverPipe) => (handSize: HandSize) => {
  dispatch({ type: SELECT_HAND_SIZE, data: { handSize, sliverPipe } });
};

export const updateSelectSliverHand = (dispatch: React.Dispatch<any>) => (item: SelectedItem) => {
  dispatch({ type: SELECT_SLIVER_PIPE, data: { sliverPipe: item } });
};

export const updateFlowerCover = (type: string, dispatch: React.Dispatch<any>) => (flower: FileInfo) => {
  dispatch({ type, data: { flower } });
};

export const removeFlowerCover = (dispatch: React.Dispatch<any>) => () => {
  dispatch({ type: REMOVE_FLOWER });
};

export const updateCharm = (dispatch: React.Dispatch<any>) => (charm: FileInfo) => {
  dispatch({ type: ADD_CHARM, data: { charm } });
};

export const removeCharm = (dispatch: React.Dispatch<any>) => () => {
  dispatch({ type: REMOVE_CHARM });
};

export const initCrystalRing = (dispatch: React.Dispatch<any>) => (handSize: HandSize) => {
  dispatch({ type: INIT_CRYSTAL_SHOWROOM, data: { handSize } });
};
