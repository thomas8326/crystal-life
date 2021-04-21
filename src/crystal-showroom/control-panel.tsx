import React, { useContext, useState } from 'react';
import { ControlPanelState } from 'src/core/enums/control-panel';
import FlowerAdder from 'src/crystal-showroom/flowerAdder';
import InfiniteList from 'src/shared/infiniteList';
import {
  CRYSTAL_TYPE,
  EIGHT_MM_SLIVER_PIPE,
  FLOWER_OPTIONS,
  HAND_SIZE,
  TEN_MM_SLIVER_PIPE,
} from '../core/constants/constants';
import {
  ADD_FLOWER_COVER_ON_LEFT,
  ADD_FLOWER_COVER_ON_RIGHT,
  crystalShowroomContext,
  SELECT_HAND_SIZE,
  SELECT_SLIVER_PIPE,
  UPDATED_SELECTED_BEAD,
} from '../core/contexts/selected-list.context';
import SelectedItem, { HandSize } from '../core/models/selection';
import RadioGroup from '../shared/redio-group';
import SlideList from '../shared/slider-list';

export default function ControlPanel() {
  const [currentState, setCurrentState] = useState<ControlPanelState>(ControlPanelState.HandSize);

  const { crystalRing, dispatch } = useContext(crystalShowroomContext);
  const updateSelectedCrystal = (bead: SelectedItem) => {
    dispatch({ type: UPDATED_SELECTED_BEAD, data: { bead } });
  };

  const updateSelectHandSize = (handSize: HandSize) => {
    dispatch({ type: SELECT_HAND_SIZE, data: { handSize } });
  };

  const updateSelectSliverHand = (item: SelectedItem) => {
    dispatch({ type: SELECT_SLIVER_PIPE, data: { sliverPipe: item } });
  };

  const updateFlowerCover = (type: string) => (flower: SelectedItem) => {
    if (flower.key !== FLOWER_OPTIONS[0].key) {
      dispatch({ type, data: { flower } });
    }
  };

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
            <small className="text-left text-sm">選擇適合你的手圍長度</small>
            <RadioGroup
              list={HAND_SIZE}
              defaultValue={crystalRing.handSize}
              groupName="handSize"
              updateRadio={updateSelectHandSize}
            />
          </div>
        )}
        {currentState === ControlPanelState.SliverPipe && (
          <div className="w-full h-full flex flex-col p-2">
            <label className="text-left text-lg">銀管</label>
            <RadioGroup
              list={getSliverPipeList()}
              defaultValue={crystalRing.sliverPipe}
              groupName="sliverPipe"
              updateRadio={updateSelectSliverHand}
            />
          </div>
        )}
        {currentState === ControlPanelState.Crystal && (
          <div className="w-full h-full flex flex-col p-2">
            <label className="text-left text-lg">水晶</label>
            <InfiniteList layout="grid" list={CRYSTAL_TYPE} updateSelect={updateSelectedCrystal} />
          </div>
        )}
        {currentState === ControlPanelState.FlowerCover && (
          <div className="w-full h-full flex flex-col p-2">
            <label className="text-left text-lg">花蓋</label>
            <FlowerAdder
              updateLeft={updateFlowerCover(ADD_FLOWER_COVER_ON_LEFT)}
              updateRight={updateFlowerCover(ADD_FLOWER_COVER_ON_RIGHT)}
            />
          </div>
        )}
      </div>
      <div className="flex justify-evenly">
        <button onClick={() => prevState()}>Previous</button>
        <button onClick={() => nextState()}>Next</button>
      </div>

      {/*
      <div className="h-20 w-full flex flex-col p-2">
        <label className="text-left text-lg">水晶</label>
        <SlideList list={CRYSTAL_TYPE} updateSelect={updateSelectedCrystal} />
      </div>
      <div className=" h-20 w-full flex flex-col p-2">
        <label className="text-left text-lg">花蓋</label>
        <RadioGroup
          list={FLOWER_OPTION}
          defaultValue={{ key: 'FLOWER_OPTION_NONE', text: 'None' }}
          groupName="flowerClover"
          updateRadio={() => {}}
        />
      </div>
      <div className=" h-20 w-full flex flex-col p-2">
        <label className="text-left text-lg">吊飾</label>
      </div> */}
    </div>
  );
}
