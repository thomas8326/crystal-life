import { useState } from 'react';
import { FLOWER_OPTIONS } from 'src/core/constants/constants';
import SelectedItem from 'src/core/models/selection';
import { InfiniteLayout } from 'src/shared/infiniteList';
import styled, { css } from 'styled-components';

const FlowerItem = styled.li`
  cursor: pointer;
  padding: 8px;
  ${(props: { isSelected: boolean }) =>
    props.isSelected &&
    css`
      border: 1px solid gray;
      border-radius: 20px;
    `}
`;

export default function FlowerAdder(props: {
  updateLeft: (flower: SelectedItem) => void;
  updateRight: (flower: SelectedItem) => void;
}) {
  const { updateLeft, updateRight } = props;
  const [selected, setSelected] = useState<SelectedItem>(FLOWER_OPTIONS[0]);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-around">
        <button onClick={() => updateLeft(selected)} className="text-blue-500">
          + Add Left
        </button>
        <button onClick={() => updateRight(selected)} className="text-blue-500">
          + Add Right
        </button>
      </div>
      <div className="flex-1">
        <InfiniteLayout layout="grid">
          {FLOWER_OPTIONS.map((flower) => (
            <FlowerItem key={flower.key} isSelected={flower.key === selected.key} onClick={() => setSelected(flower)}>
              <img src={flower.url} />
            </FlowerItem>
          ))}
        </InfiniteLayout>
      </div>
    </div>
  );
}
