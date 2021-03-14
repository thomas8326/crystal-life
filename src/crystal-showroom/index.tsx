import ControlPanel from './control-panel';
import Product from './product';
import styled from 'styled-components';
import { useState } from 'react';
import React from 'react';

import { SlideListContext } from '../core/contexts/selected-list.context';
import Selection from '../core/models/selection';

const Showroom = styled.div`
  display: flex;
  height: 100%;
`;

function CrystalShowroom() {
  const [selectedList, setSelectedList] = useState<Selection[]>([]);
  const updateSelectedList = (item: Selection) => {
    setSelectedList((preState: Selection[]) =>
      item.isSelected ? preState.concat(item) : preState.filter((selection) => selection.key !== item.key),
    );
  };

  return (
    <Showroom className="App">
      <div className="flex flex-grow justify-center items-center">
        <Product selectedList={selectedList} />
      </div>
      <div className="bg-gray-50 h-full border-l border-gray-500" style={{ flex: '0 0 385px' }}>
        <SlideListContext.Provider value={{ setSelectedList: updateSelectedList }}>
          <ControlPanel />
        </SlideListContext.Provider>
      </div>
    </Showroom>
  );
}
export default CrystalShowroom;
