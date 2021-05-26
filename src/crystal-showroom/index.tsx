import ControlPanel from './components/control-panel';
import ProductContainer from './components/product-container';
import styled from 'styled-components';
import { useReducer } from 'react';
import React from 'react';

import {
  crystalShowroomContext,
  crystalShowroomInitState,
  crystalShowroomReducer,
} from '../core/contexts/crystalShowroom/selected-list.context';

const Showroom = styled.div`
  display: flex;
  height: 100%;
`;

const ControlPanelContainer = styled.div`
  height: 100%;
  border-left: 1px solid;
  flex: 0 0 385px;
  display: flex;
`;

function CrystalShowroom() {
  const [state, dispatch] = useReducer(crystalShowroomReducer, crystalShowroomInitState);
  return (
    <crystalShowroomContext.Provider
      value={{
        crystalRing: state.crystalRing,
        selectedDisplayCrystal: state.selectedDisplayCrystal,
        isFillCrystal: state.isFillCrystal,
        dispatch,
      }}
    >
      <Showroom className="App">
        <div className="flex flex-grow justify-center items-center">
          <ProductContainer />
        </div>
        <ControlPanelContainer className="bg-gray-50 relative">
          <div className="absolute w-full h-full novus-no-border-logo opacity-30 z-0" />
          <ControlPanel />
        </ControlPanelContainer>
      </Showroom>
    </crystalShowroomContext.Provider>
  );
}
export default CrystalShowroom;
