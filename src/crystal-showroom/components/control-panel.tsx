import React, { useContext, useEffect, useState } from 'react';
import {
  addCharm,
  initCrystalRing,
  removeCharm,
  updateFlowerCover,
  updateSelectedCrystal,
  updateSelectHandSize,
  updateSelectSliverHand,
} from 'src/core/contexts/crystalShowroom/crystalShowroom.action';
import { ControlPanelState } from 'src/core/enums/control-panel';
import FlowerAdder from 'src/crystal-showroom/components/flower-adder';
import InfiniteList from 'src/shared/infiniteList';
import { useDBList } from 'src/utils/customer-hook/useDBList';
import { useListUrl } from 'src/utils/customer-hook/useListUrl';
import {
  ADD_FLOWER_COVER_ON_LEFT,
  ADD_FLOWER_COVER_ON_RIGHT,
  crystalShowroomContext,
} from '../../core/contexts/crystalShowroom/selected-list.context';
import SelectedItem, { HandSize } from '../../core/models/selection';
import RadioGroup from '../../shared/redio-group';

export default function ControlPanel() {
  const [currentState, setCurrentState] = useState<ControlPanelState>(ControlPanelState.HandSize);
  const { crystalRing, dispatch } = useContext(crystalShowroomContext);
  const handSizes = useDBList<HandSize>('handSize');
  const sliverPipes = useDBList('sliverPipe');
  const flowerCovers = useListUrl('flowerCovers');

  useEffect(() => {
    if (!!handSizes && !!handSizes.length) {
      initCrystalRing(dispatch)(handSizes[0]);
    }
  }, [handSizes]);

  const prevState = () => {
    setCurrentState((prevState) => prevState - 1);
  };

  const nextState = () => {
    setCurrentState((prevState) => prevState + 1);
  };

  return (
    <div className="flex flex-col w-full h-full divide-y-2 divide-black space-y-4 py-16 mx-10">
      <h4 className="text-left text-2xl font-bold">NOVUS LIFE</h4>
      <div className="flex-1 max-h-full overflow-hidden">
        {currentState === ControlPanelState.HandSize && (
          <div className="w-full h-full flex flex-col p-2">
            <label className="text-left text-lg">手圍</label>
            <small className="text-left text-xs">選擇適合你的手圍長度</small>
            <RadioGroup
              list={handSizes}
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
              list={
                sliverPipes && sliverPipes.filter((item: SelectedItem) => item.value === crystalRing.handSize.value)
              }
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
            <div className="mt-6" style={{ maxHeight: '88%' }}>
              <InfiniteList layout="grid" tableName="crystalImages" updateSelect={updateSelectedCrystal(dispatch)} />
            </div>
          </div>
        )}
        {currentState === ControlPanelState.FlowerCover && (
          <div className="w-full h-full flex flex-col p-2">
            <label className="text-left text-lg">花蓋</label>
            <small className="text-left text-xs">在左邊產品中選取圓珠，在右邊選擇想要的花蓋，按下加在左邊或右邊</small>
            <div className="mt-6">
              <FlowerAdder
                list={flowerCovers}
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
