import React, { useContext, useState } from 'react';
import {
  addCharm,
  removeCharm,
  updateFlowerCover,
  updateSelectedCrystal,
  updateSelectHandSize,
  updateSelectSliverHand,
} from 'src/core/contexts/crystalShowroom/crystalShowroom.action';
import { ControlPanelState } from 'src/core/enums/control-panel';
import FlowerAdder from 'src/crystal-showroom/components/flower-adder';
import InfiniteList from 'src/shared/infiniteList';
import { CRYSTAL_TYPE, EIGHT_MM_SLIVER_PIPE, HAND_SIZE, TEN_MM_SLIVER_PIPE } from '../../core/constants/constants';
import {
  ADD_FLOWER_COVER_ON_LEFT,
  ADD_FLOWER_COVER_ON_RIGHT,
  crystalShowroomContext,
} from '../../core/contexts/crystalShowroom/selected-list.context';
import SelectedItem from '../../core/models/selection';
import RadioGroup from '../../shared/redio-group';

export default function ControlPanel() {
  const [currentState, setCurrentState] = useState<ControlPanelState>(ControlPanelState.HandSize);

  const { crystalRing, dispatch } = useContext(crystalShowroomContext);

  const getSliverPipeList = (): SelectedItem[] => {
    return crystalRing.handSize.value === 8 ? EIGHT_MM_SLIVER_PIPE : TEN_MM_SLIVER_PIPE;
  };

  const prevState = () => {
    setCurrentState((prevState) => prevState - 1);
  };

  const nextState = () => {
    setCurrentState((prevState) => prevState + 1);
  };

  return (
    <div className="flex flex-col h-full divide-y-2 divide-black space-y-4 py-16 mx-10">
      <h4 className="text-left text-2xl font-bold">NOVUS LIFE</h4>
      <div className="flex-1">
        {currentState === ControlPanelState.HandSize && (
          <div className="w-full h-full flex flex-col p-2">
            <label className="text-left text-lg">手圍</label>
            <small className="text-left text-xs">選擇適合你的手圍長度</small>
            <RadioGroup
              list={HAND_SIZE}
              defaultValue={crystalRing.handSize}
              groupName="handSize"
              updateRadio={updateSelectHandSize(dispatch)}
            />
          </div>
        )}
        {currentState === ControlPanelState.SliverPipe && (
          <div className="w-full h-full flex flex-col p-2">
            <label className="text-left text-lg">銀管</label>
            <small className="text-left text-xs">選擇適合你的銀圍長度</small>
            <RadioGroup
              list={getSliverPipeList()}
              defaultValue={crystalRing.sliverPipe}
              groupName="sliverPipe"
              updateRadio={updateSelectSliverHand(dispatch)}
            />
          </div>
        )}
        {currentState === ControlPanelState.Crystal && (
          <div className="w-full h-full flex flex-col p-2">
            <label className="text-left text-lg">水晶</label>
            <small className="text-left text-xs">在左邊產品中選取圓珠，在右邊選擇想要的水晶</small>
            <div className="mt-6">
              <InfiniteList layout="grid" list={CRYSTAL_TYPE} updateSelect={updateSelectedCrystal(dispatch)} />
            </div>
          </div>
        )}
        {currentState === ControlPanelState.FlowerCover && (
          <div className="w-full h-full flex flex-col p-2">
            <label className="text-left text-lg">花蓋</label>
            <small className="text-left text-xs">在左邊產品中選取圓珠，在右邊選擇想要的花蓋，按下加在左邊或右邊</small>
            <div className="mt-6">
              <FlowerAdder
                updateLeft={updateFlowerCover(ADD_FLOWER_COVER_ON_LEFT, dispatch)}
                updateRight={updateFlowerCover(ADD_FLOWER_COVER_ON_RIGHT, dispatch)}
              />
            </div>
          </div>
        )}
        {currentState === ControlPanelState.Charm && (
          <div className=" h-20 w-full flex flex-col p-2">
            <label className="text-left text-lg">吊飾</label>
            <small className="text-left text-xs">在左邊產品中選取圓珠，按下加吊飾，會在該圓珠左邊加入</small>
            <div className="mt-6 flex flex-row justify-around">
              <button onClick={addCharm(dispatch)} className="text-blue-500">
                加吊飾
              </button>
              <button onClick={removeCharm(dispatch)} className="text-blue-500">
                移除吊飾
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-evenly">
        <button onClick={() => prevState()} disabled={currentState == 0}>
          Previous
        </button>
        <button onClick={() => nextState()} disabled={currentState == ControlPanelState.Charm}>
          Next
        </button>
      </div>
    </div>
  );
}
