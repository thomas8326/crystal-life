import { useContext } from 'react';
import { CRYSTAL_TYPE, HAND_SIZE } from '../core/constants/constants';
import {
  crystalShowroomContext,
  SELECT_HAND_SIZE,
  UPDATED_SELECTED_LIST,
} from '../core/contexts/selected-list.context';
import Selection, { HandSize } from '../core/models/selection';
import RadioGroup from '../shared/redio-group';
import SlideList from '../shared/slider-list';

export default function ControlPanel() {
  const { handSize, selectedList, dispatch } = useContext(crystalShowroomContext);
  const updateSelectedCrystal = (item: Selection) => {
    if (selectedList.length < handSize.crystalCount) {
      dispatch({ type: UPDATED_SELECTED_LIST, data: { selectedItem: item } });
    }
  };

  const updateSelectHandSize = (item: HandSize) => {
    dispatch({ type: SELECT_HAND_SIZE, data: { selectedItem: item } });
  };

  return (
    <div className="h-full divide-y-2 divide-black space-y-4 py-16 mx-10">
      <h4 className="text-left text-2xl font-bold">NOVUS LIFE</h4>
      <div className="w-full flex flex-col p-2">
        <label className="text-left text-lg">手圍</label>
        <RadioGroup list={HAND_SIZE} groupName="handSize" updateRadio={updateSelectHandSize} />
      </div>
      <div className="h-20 w-full flex flex-col p-2">
        <label className="text-left text-lg">銀鍊</label>
      </div>
      <div className="h-20 w-full flex flex-col p-2">
        <label className="text-left text-lg">水晶</label>
        <SlideList list={CRYSTAL_TYPE} updateSelect={updateSelectedCrystal} />
      </div>
      <div className=" h-20 w-full flex flex-col p-2">
        <label className="text-left text-lg">花</label>
      </div>
      <div className=" h-20 w-full flex flex-col p-2">
        <label className="text-left text-lg">吊飾</label>
      </div>
    </div>
  );
}
