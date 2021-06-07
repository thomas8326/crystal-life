import ControlPanel from './components/control-panel';
import ProductContainer from './components/product-container';
import styled from 'styled-components';
import { useReducer } from 'react';
import React from 'react';

import {
  crystalShowroomContext,
  crystalShowroomInitState,
  crystalShowroomReducer,
} from '../core/contexts/crystal-showroom/crystal-showroom.context';
import { ProductHelper } from 'src/crystal-showroom/components/product-helpler';
import { useAuth } from 'src/utils/customer-hook/useAuth';

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
  const { userLogout } = useAuth();

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
        <div className="flex flex-grow justify-center items-center relative">
          <ProductHelper />
          <ProductContainer />
          <button className="flex absolute top-4 left-4 text-sm" onClick={userLogout}>
            <i className="icon-sm icon-leave"></i>
            離開
          </button>
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
