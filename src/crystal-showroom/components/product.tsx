// prettier ignore
import { useContext, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  crystalShowroomContext,
  REMOVE_DISPLAY_SELECTED_CRYSTAL_BEAD,
  SELECT_DISPLAY_CRYSTAL_BEAD,
} from 'src/core/contexts/crystalShowroom/selected-list.context';
import Crystal from 'src/core/models/crystal';
import SelectedItem, { HandSize } from 'src/core/models/selection';

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

const Flower = styled.img.attrs((props: { isLeft: boolean }) => ({ isLeft: props.isLeft ?? true }))`
  position: absolute;
  ${(props) => (props.isLeft ? `left: -25%` : `right: -25%`)};
  width: 100%;
  height: 100%;
  content: '';
  ${(props) => props.isLeft && `transform: rotate(180deg)`};
`;

const Charm = styled.div`
  width: 2px;
  background-color: red;
  height: 100px;
  position: absolute;
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
    const left = Math.sin(circleHeight * index) * containerX + containerX;
    const top = Math.cos(circleHeight * index) * containerY + containerY;

    return { item, top, left, angular: circleAngular };
  });
}

function BeadContainer(props: {
  top: number;
  left: number;
  item: Crystal;
  angular: number;
  beadSize: number;
  dispatch: React.Dispatch<any>;
}) {
  const { top, left, item, angular, beadSize, dispatch } = props;
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    setIsClicked(false);
  }, [item]);

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
    <>
      <Bead
        top={top}
        left={left}
        isEmpty={!item?.url}
        isClicked={isClicked}
        radius={beadSize}
        angular={angular}
        onClick={() => onSelectBead(item)}
      >
        {item?.charm && <Charm />}
        {item?.leftFlower?.url && <Flower src={item?.leftFlower.url} />}
        {item?.url && <img src={item?.url} className="w-full h-full" />}
        {item?.rightFlower?.url && <Flower src={item?.rightFlower.url} isLeft={false} />}
      </Bead>
    </>
  );
}

export default function Product() {
  const { crystalRing, dispatch } = useContext(crystalShowroomContext);
  const { beads, handSize } = crystalRing;

  if (!handSize) {
    return <></>;
  }

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
            dispatch={dispatch}
            beadSize={crystalRing.handSize.beadSize}
            angular={data.angular * index * -1}
          />
        ))}
      </ProductInnerBorder>
    </ProductDisplay>
  );
}
