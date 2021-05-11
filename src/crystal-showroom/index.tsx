import ControlPanel from './components/control-panel';
import Product from './components/product';
import styled from 'styled-components';
import { useReducer, useState } from 'react';
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

function CrystalShowroom() {
  const [state, dispatch] = useReducer(crystalShowroomReducer, crystalShowroomInitState);

  return (
    <Showroom className="App">
      <div className="flex flex-grow justify-center items-center">
        <crystalShowroomContext.Provider
          value={{
            crystalRing: state.crystalRing,
            selectedDisplayCrystal: state.selectedDisplayCrystal,
            dispatch,
          }}
        >
          <Product />
        </crystalShowroomContext.Provider>
      </div>
      <div className="bg-gray-50 h-full border-l border-gray-500" style={{ flex: '0 0 385px' }}>
        <crystalShowroomContext.Provider
          value={{
            crystalRing: state.crystalRing,
            selectedDisplayCrystal: state.selectedDisplayCrystal,
            dispatch,
          }}
        >
          <ControlPanel />
        </crystalShowroomContext.Provider>
      </div>
    </Showroom>
  );
}
export default CrystalShowroom;
