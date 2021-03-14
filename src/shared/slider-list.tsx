import { useState } from "react";
import styled, { css } from "styled-components";
import StyledCss from "../core/models/css";
import Selection from "../core/models/selection";
import use2DArray from "../utils/customer-hook/use2DArray";

const Item = styled.div<any>`
  width: 50px;
  height: 50px;
  margin: 0 4px;
  background: ${(props: { isOdd: boolean }) =>
    `${props.isOdd ? "red" : "green"}`};

  ${(props: { isSelected: boolean }) =>
    props.isSelected &&
    css`
      border: 1px solid blue;
    `};
`;

const ChangeSlideButton = styled.button`
  flex: 0 0 30px;
  height: 30px;
`;

export default function SlideList(props: { list: Selection[] }) {
  const { list } = props;
  const slideList = use2DArray<Selection>(list, 4);
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedList, setSelectedList] = useState<Selection[]>([]);

  const slideRoom = (showOnIndex: number) => {
    const onSelected = (item: Selection) => {
      item.isSelected = !item.isSelected;
      setSelectedList((preState) =>
        item.isSelected
          ? preState.concat(item)
          : preState.filter((selection) => selection.key !== item.key)
      );
    };

    return slideList.map(
      (room: Selection[], index: number) =>
        showOnIndex === index && (
          <li key={index} className="flex flex-row w-full">
            {room.map((item: Selection) => (
              <Item
                key={item.key}
                isOdd={index % 2 !== 0}
                onClick={() => onSelected(item)}
                isSelected={item.isSelected}
              ></Item>
            ))}
          </li>
        )
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
      <ChangeSlideButton onClick={() => slide(-1)}>Left</ChangeSlideButton>
      <ul className="flex flex-row flex-1">{slideRoom(slideIndex)}</ul>
      <ChangeSlideButton onClick={() => slide(1)}>Right</ChangeSlideButton>
    </div>
  );
}
