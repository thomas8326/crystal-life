// prettier ignore
import { useContext, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import SelectedItem, { HandSize } from '../core/models/selection';
import '../styles/animation.css';
import {
  crystalShowroomContext,
  REMOVE_DISPLAY_SELECTED_CRYSTAL_BEAD,
  SELECT_DISPLAY_CRYSTAL_BEAD,
} from 'src/core/contexts/selected-list.context';
import Crystal from 'src/core/models/crystal';

const ProductDisplay = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props: { radius: number; beadSize: number }) => `${props.radius * 2 + props.beadSize}px`};
  height: ${(props: { radius: number; beadSize: number }) => `${props.radius * 2 + props.beadSize}px`};
`;

const ProductInnerBorder = styled.div`
  width: ${(props: { beadSize: number }) => `calc(100% - ${props.beadSize}px)`};
  height: ${(props: { beadSize: number }) => `calc(100% - ${props.beadSize}px)`};
  border: 4px solid #d1d5db;
  border-radius: 50%;
`;

const Bead = styled.div<any>`
  position: absolute;
  top: ${(props: { top: number }) => `${props.top}px`};
  left: ${(props: { left: number }) => `${props.left}px`};
  display: flex;
  width: ${(props: { radius: number }) => `${props.radius}px`};
  height: ${(props: { radius: number }) => `${props.radius}px`};
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  transform: rotate(${(props: { angular: number }) => `${props.angular}deg`});

  &: hover {
    background-color: #f7f0c0;
  }

  ${(props: { leftFlower: boolean }) =>
    props.leftFlower &&
    css`
      &:: before {
        position: absolute;
        left: 0;
        width: 22px;
        height: 22px;
        background-color: red;
        content: '';
      }
    `}

  ${(props: { rightFlower: boolean }) =>
    props.rightFlower &&
    css`
      &::after {
        position: absolute;
        right: 0;
        width: 22px;
        height: 22px;
        background-color: red;
        content: '';
      }
    `}


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
  selectedList: Crystal[],
  handSize: HandSize,
): { item: Crystal; top: number; left: number; angular: number }[] {
  const containerX = handSize.radiusWidth;
  const containerY = handSize.radiusWidth;
  const circleAngular = 360 / handSize.crystalCount;
  const circleHeight = (circleAngular * Math.PI) / 180;

  return selectedList.map((item, index) => {
    const left = Math.sin(circleHeight * index) * handSize.radiusWidth + containerX;
    const top = Math.cos(circleHeight * index) * handSize.radiusWidth + containerY;

    return { item, top, left, angular: circleAngular };
  });
}

function BeadContainer(props: { top: number; left: number; item: Crystal; angular: number }) {
  const { crystalRing, dispatch } = useContext(crystalShowroomContext);
  const { top, left, item, angular } = props;
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => setIsClicked(false), [item]);

  const onSelectBead = (item: SelectedItem) => {
    setIsClicked((preState: boolean) => {
      const newState = !preState;

      newState
        ? dispatch({ type: SELECT_DISPLAY_CRYSTAL_BEAD, data: { selectedDisplayCrystal: item.key } })
        : dispatch({ type: REMOVE_DISPLAY_SELECTED_CRYSTAL_BEAD, data: { selectedDisplayCrystal: item.key } });

      return newState;
    });
  };

  return (
    <Bead
      top={top}
      left={left}
      isEmpty={!item?.url}
      isClicked={isClicked}
      radius={crystalRing.handSize.beadSize}
      angular={angular}
      onClick={() => onSelectBead(item)}
      leftFlower={item.hasLeftFlower}
      rightFlower={item.hasRightFlower}
    >
      {item?.url && <img src={item?.url} className="w-full h-full" />}
    </Bead>
  );
}

export default function Product() {
  const { crystalRing } = useContext(crystalShowroomContext);
  const { beads, handSize } = crystalRing;

  const itemPosition = generateCrystalBeads(beads, handSize);

  return (
    <ProductDisplay radius={handSize.radiusWidth} beadSize={handSize.beadSize}>
      <ProductInnerBorder beadSize={handSize.beadSize}>
        {itemPosition.map((data, index) => (
          <BeadContainer
            key={data.item.key}
            top={data.top}
            left={data.left}
            item={data.item}
            angular={data.angular * index * -1}
          />
        ))}
      </ProductInnerBorder>
    </ProductDisplay>
  );
}
