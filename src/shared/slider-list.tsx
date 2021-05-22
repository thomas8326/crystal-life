import React from 'react';
import { useContext, useState } from 'react';
import { SlideButton } from 'src/styles/components/button';
import styled, { css } from 'styled-components';
import {
  crystalShowroomContext,
  CrystalShowroomContextProps,
  UPDATED_SELECTED_BEAD,
} from '../core/contexts/crystalShowroom/selected-list.context';
import Action from '../core/models/action';
import SelectedItem from '../core/models/selection';
import use2DArray from '../utils/customer-hook/use2DArray';

const Item = styled.img<any>`
  width: 50px;
  height: 50px;
  margin: 0 4px;
  cursor: pointer;

  ${(props: { isSelected: boolean }) =>
    props.isSelected &&
    css`
      border: 1px solid blue;
    `};
`;

export default function SlideList(props: { list: SelectedItem[]; updateSelect: (item: SelectedItem) => void }) {
  const { list, updateSelect } = props;
  const slideList = use2DArray<SelectedItem>(list, 4);
  const [slideIndex, setSlideIndex] = useState(0);

  const slideRoom = (showOnIndex: number) => {
    const onSelected = (item: SelectedItem) => {
      updateSelect(item);
    };

    return slideList.map(
      (room: SelectedItem[], index: number) =>
        showOnIndex === index && (
          <li key={index} className="flex flex-row w-full">
            {room.map((item: SelectedItem) => (
              <Item key={item.key} isOdd={index % 2 !== 0} onClick={() => onSelected(item)} src={item.url}></Item>
            ))}
          </li>
        ),
    );
  };

  const slide = (duration: number) => {
    setSlideIndex((prevState: number) => {
      const newState = prevState + duration;
      if (newState === slideList.length) {
        return 0;
      }

      if (newState === -1) {
        return slideList.length - 1;
      }

      return newState;
    });
  };

  return (
    <div className="flex flex-row items-center">
      <SlideButton isLeft={true} onClick={() => slide(-1)} />
      <ul className="flex flex-row flex-1">{slideRoom(slideIndex)}</ul>
      <SlideButton onClick={() => slide(1)} />
    </div>
  );
}
