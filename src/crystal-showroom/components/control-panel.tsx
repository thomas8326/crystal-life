import firebase from 'firebase';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { USER } from 'src/core/constants/storage.constants';
import {
  updateCharm,
  initCrystalRing,
  removeCharm,
  removeFlowerCover,
  updateFlowerCover,
  updateSelectedCrystal,
  updateSelectHandSize,
  updateSelectSliverHand,
} from 'src/core/contexts/crystalShowroom/crystalShowroom.action';
import { ControlPanelState } from 'src/core/enums/control-panel';
import { MainPath } from 'src/core/enums/main-path';
import User from 'src/core/models/allow-user';
import CrystalRing from 'src/core/models/crystal-ring';
import CharmAdder from 'src/crystal-showroom/components/charm-adder';
import FlowerAdder from 'src/crystal-showroom/components/flower-adder';
import InfiniteList from 'src/shared/infiniteList';
import { useAuth } from 'src/utils/customer-hook/useAuth';
import useHttpClient from 'src/utils/customer-hook/useHttpClient';
import useStorage from 'src/utils/customer-hook/useStroage';
import {
  ADD_FLOWER_COVER_ON_LEFT,
  ADD_FLOWER_COVER_ON_RIGHT,
  crystalShowroomContext,
} from '../../core/contexts/crystalShowroom/selected-list.context';
import SelectedItem, { HandSize, SliverPipe } from '../../core/models/selection';
import RadioGroup from '../../shared/redio-group';

const EMPTY_SLIVER_PIPE: SliverPipe = new SliverPipe('無銀管', 0, 0);

export default function ControlPanel() {
  const [currentState, setCurrentState] = useState<ControlPanelState>(ControlPanelState.HandSize);
  const { crystalRing, isFillCrystal, dispatch } = useContext(crystalShowroomContext);
  const { list: handSizes } = useHttpClient<HandSize>('handSize');
  const { list: sliverPipes } = useHttpClient<HandSize>('sliverPipe');
  const { getSession } = useStorage();
  const { userLogout } = useAuth();
  const { post } = useHttpClient<CrystalRing>(`crystalProducts/${getSession<User>(USER)?.phone ?? ''}`);
  const history = useHistory();

  useEffect(() => {
    if (!!handSizes && !!handSizes.length) {
      initCrystalRing(dispatch)(handSizes[0]);
    }
  }, [handSizes]);

  const disableNextBtn = () =>
    currentState == ControlPanelState.Charm || (currentState == ControlPanelState.Crystal && !isFillCrystal);

  const prevState = () => {
    setCurrentState((prevState) => prevState - 1);
  };

  const nextState = () => {
    setCurrentState((prevState) => prevState + 1);
  };

  const onSubmit = () => {
    crystalRing.setCreatedTime(firebase.database.ServerValue.TIMESTAMP);
    post(crystalRing).then(() => userLogout());
  };

  return (
    <div className="flex flex-col w-full h-full divide-y-2 divide-black space-y-4 py-16 mx-10 z-10">
      <h4 className="text-left text-3xl font-bold">Crystal Life</h4>
      <div className="flex-1 max-h-full overflow-hidden">
        {currentState === ControlPanelState.HandSize && (
          <div className="w-full h-full flex flex-col p-2">
            <label className="text-left text-lg">手圍</label>
            <small className="text-left text-xs">選擇適合你的手圍長度</small>
            <div className="flex-1 h-full overflow-auto">
              <RadioGroup
                list={handSizes}
                defaultValue={crystalRing.handSize}
                groupName="handSize"
                updateRadio={updateSelectHandSize(dispatch, EMPTY_SLIVER_PIPE)}
              />
            </div>
          </div>
        )}
        {currentState === ControlPanelState.SliverPipe && (
          <div className="w-full h-full flex flex-col p-2">
            <label className="text-left text-lg">銀管</label>
            <small className="text-left text-xs">選擇適合你的銀圍長度</small>
            <div className="flex-1 h-full overflow-auto">
              <RadioGroup
                list={
                  sliverPipes && sliverPipes.filter((item: SelectedItem) => item.value === crystalRing.handSize.value)
                }
                defaultValue={crystalRing.sliverPipe ?? EMPTY_SLIVER_PIPE}
                groupName="sliverPipe"
                updateRadio={updateSelectSliverHand(dispatch)}
                emptyOption={EMPTY_SLIVER_PIPE}
              />
            </div>
          </div>
        )}
        {currentState === ControlPanelState.Crystal && (
          <div className="w-full h-full flex flex-col p-2">
            <label className="text-left text-lg">水晶</label>
            <small className="text-left text-xs">在左邊產品中選取圓珠，在右邊選擇想要的水晶</small>
            <div className="mt-6 flex-1 h-full overflow-auto">
              <InfiniteList
                layout="grid"
                tableName="codeList/crystalImages"
                updateSelect={updateSelectedCrystal(dispatch)}
              />
            </div>
          </div>
        )}
        {currentState === ControlPanelState.FlowerCover && (
          <div className="w-full h-full flex flex-col p-2">
            <label className="text-left text-lg">花蓋</label>
            <small className="text-left text-xs">在左邊產品中選取圓珠，在右邊選擇想要的花蓋，按下加在左邊或右邊</small>
            <div className="mt-6 flex-1 h-full overflow-auto">
              <FlowerAdder
                removeFlower={removeFlowerCover(dispatch)}
                updateLeft={updateFlowerCover(ADD_FLOWER_COVER_ON_LEFT, dispatch)}
                updateRight={updateFlowerCover(ADD_FLOWER_COVER_ON_RIGHT, dispatch)}
              />
            </div>
          </div>
        )}
        {currentState === ControlPanelState.Charm && (
          <div className="h-full w-full flex flex-col p-2">
            <label className="text-left text-lg">吊飾</label>
            <small className="text-left text-xs">在左邊產品中選取圓珠，按下加吊飾，會在該圓珠左邊加入</small>
            <div className="mt-6 flex-1 h-full overflow-auto">
              <CharmAdder addCharm={updateCharm(dispatch)} removeCharm={removeCharm(dispatch)}></CharmAdder>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-evenly pt-2">
        <button onClick={() => prevState()} disabled={currentState == 0}>
          上一步
        </button>
        {currentState !== ControlPanelState.Charm && (
          <button onClick={() => nextState()} disabled={disableNextBtn()}>
            下一步
          </button>
        )}
        {currentState == ControlPanelState.Charm && <button onClick={() => onSubmit()}>提交</button>}
      </div>
    </div>
  );
}
