import { useContext } from 'react';
import { CRYSTAL_TYPE, EIGHT_MM_SLIVER_PIPE, HAND_SIZE, TEN_MM_SLIVER_PIPE } from '../core/constants/constants';
import {
  crystalShowroomContext,
  SELECT_HAND_SIZE,
  SELECT_SLIVER_PIPE,
  UPDATED_SELECTED_LIST,
} from '../core/contexts/selected-list.context';
import Selection, { HandSize } from '../core/models/selection';
import RadioGroup from '../shared/redio-group';
import SlideList from '../shared/slider-list';

export default function ControlPanel() {
  const { handSize, selectedSliverPipe, dispatch } = useContext(crystalShowroomContext);
  const updateSelectedCrystal = (item: Selection) => {
    dispatch({ type: UPDATED_SELECTED_LIST, data: { selectedItem: item } });
  };

  const updateSelectHandSize = (item: HandSize) => {
    dispatch({ type: SELECT_HAND_SIZE, data: { selectedItem: item } });
  };

  const updateSelectSliverHand = (item: Selection) => {
    dispatch({ type: SELECT_SLIVER_PIPE, data: { selectedItem: item } });
  };

  const getSliverPipeList = (): Selection[] => {
    console.log(handSize);
    return handSize.value === 8 ? EIGHT_MM_SLIVER_PIPE : TEN_MM_SLIVER_PIPE;
  };

  return (
    <div className="h-full divide-y-2 divide-black space-y-4 py-16 mx-10">
      <h4 className="text-left text-2xl font-bold">NOVUS LIFE</h4>
      <div className="w-full flex flex-col p-2">
        <label className="text-left text-lg">手圍</label>
        <RadioGroup list={HAND_SIZE} defaultValue={handSize} groupName="handSize" updateRadio={updateSelectHandSize} />
      </div>
      <div className="w-full flex flex-col p-2">
        <label className="text-left text-lg">銀管</label>
        <RadioGroup
          list={getSliverPipeList()}
          defaultValue={selectedSliverPipe}
          groupName="sliverPipe"
          updateRadio={updateSelectSliverHand}
        />
      </div>
      <div className="h-20 w-full flex flex-col p-2">
        <label className="text-left text-lg">水晶</label>
        <SlideList list={CRYSTAL_TYPE} updateSelect={updateSelectedCrystal} />
      </div>
      <div className=" h-20 w-full flex flex-col p-2">
        <label className="text-left text-lg">花蓋</label>
      </div>
      <div className=" h-20 w-full flex flex-col p-2">
        <label className="text-left text-lg">吊飾</label>
      </div>
    </div>
  );
}
