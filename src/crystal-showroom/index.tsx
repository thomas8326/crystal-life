import ControlPanel from './control-panel';
import Product from './product';
import styled from 'styled-components';
import { useReducer, useState } from 'react';
import React from 'react';

import {
  crystalShowroomContext,
  CrystalShowroomContextProps,
  crystalShowroomReducer,
} from '../core/contexts/selected-list.context';
import Selection from '../core/models/selection';

const Showroom = styled.div`
  display: flex;
  height: 100%;
`;

function CrystalShowroom() {
  const [state, dispatch] = useReducer(crystalShowroomReducer, new CrystalShowroomContextProps());

  return (
    <Showroom className="App">
      <div className="flex flex-grow justify-center items-center">
        <Product selectedList={state.selectedList} handSize={state.handSize} />
      </div>
      <div className="bg-gray-50 h-full border-l border-gray-500" style={{ flex: '0 0 385px' }}>
        <crystalShowroomContext.Provider
          value={{ selectedList: state.selectedList, handSize: state.handSize, dispatch }}
        >
          <ControlPanel />
        </crystalShowroomContext.Provider>
      </div>
    </Showroom>
  );
}
export default CrystalShowroom;
