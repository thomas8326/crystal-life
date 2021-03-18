import { useContext, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Selection from '../core/models/selection';
import '../styles/animation.css';
import {
  crystalShowroomContext,
  REMOVE_SELECTED_CRYSTAL_BEAD,
  SELECT_CRYSTAL_BEAD,
} from 'src/core/contexts/selected-list.context';

const ProductDisplay = styled.div`
  position: relative;
  width: 360px;
  height: 360px;
`;

const Bead = styled.div<any>`
  position: absolute;
  top: ${(props: { top: number }) => `${props.top}px`};
  left: ${(props: { left: number }) => `${props.left}px`};
  display: flex;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;

  &: hover {
    background-color: #f7f0c0;
  }

  ${(props: { isEmpty: boolean; isClicked: boolean }) =>
    props.isEmpty &&
    css`
      background-color: #fffbe0;
      border: 1px dashed rgb(234 146 82 / 50%);
    `};

  ${(props: { isClicked: boolean }) =>
    props.isClicked &&
    css`
      border: 2px dashed #ea7e30;
    `};
`;

function generateCrystalBeads(
  selectedList: Selection[],
  radius: number,
  count: number,
): { item: Selection; top: number; left: number }[] {
  const containerX = 150;
  const containerY = 150;
  const circleAngular = 360 / count;
  const circleHeight = (circleAngular * Math.PI) / 180;

  return selectedList.map((item, index) => {
    const left = Math.sin(circleHeight * index) * radius + containerX;
    const top = Math.cos(circleHeight * index) * radius + containerY;

    return { item, top, left };
  });
}

function BeadContainer(props: { top: number; left: number; item: Selection }) {
  const { dispatch } = useContext(crystalShowroomContext);
  const { top, left, item } = props;
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => setIsClicked(false), [item]);

  const onSelectBead = (item: Selection) => {
    setIsClicked((preState: boolean) => {
      const newState = !preState;

      newState
        ? dispatch({ type: SELECT_CRYSTAL_BEAD, data: { selectedBead: item.key } })
        : dispatch({ type: REMOVE_SELECTED_CRYSTAL_BEAD, data: { selectedBead: item.key } });

      return newState;
    });
  };

  return (
    <Bead top={top} left={left} isEmpty={!item?.url} isClicked={isClicked} onClick={() => onSelectBead(item)}>
      {item?.url && <img src={item?.url} className="w-full h-full" />}
    </Bead>
  );
}

export default function Product() {
  const { selectedSliverPipe, handSize, selectedList } = useContext(crystalShowroomContext);
  const itemPosition = generateCrystalBeads(selectedList, handSize.radiusWidth, handSize.crystalCount);

  return (
    <ProductDisplay>
      {itemPosition.map((data) => (
        <BeadContainer key={data.item.key} top={data.top} left={data.left} item={data.item} />
      ))}
    </ProductDisplay>
  );
}
