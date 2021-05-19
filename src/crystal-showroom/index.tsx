import ControlPanel from './components/control-panel';
import Product from './components/product';
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
          <Product />
        </div>
        <div className="bg-gray-50 h-full border-l border-gray-500 flex" style={{ flex: '0 0 385px' }}>
          <ControlPanel />
        </div>
      </Showroom>
    </crystalShowroomContext.Provider>
  );
}
export default CrystalShowroom;
