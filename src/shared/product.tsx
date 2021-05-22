import React from 'react';
import Crystal from 'src/core/models/crystal';
import CrystalRing from 'src/core/models/crystal-ring';
import { HandSize } from 'src/core/models/selection';
import Bead from 'src/shared/bead';
import styled, { css } from 'styled-components';

const ProductDisplay = styled.div<any>`
  width: ${(props: { radius: number; beadSize: number }) => `${props.radius * 2 + props.beadSize}px`};
  height: ${(props: { radius: number; beadSize: number }) => `${props.radius * 2 + props.beadSize}px`};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props: { disabledEvent: number }) =>
    props.disabledEvent &&
    css`
      pointer-events: none;
    `};
`;

const ProductInnerBorder = styled.div`
  width: ${(props: { beadSize: number }) => `calc(100% - ${props.beadSize}px)`};
  height: ${(props: { beadSize: number }) => `calc(100% - ${props.beadSize}px)`};
  border: 4px solid #d1d5db;
  border-radius: 50%;
`;

export default function Product(props: {
  crystalRing: CrystalRing;
  dispatch?: React.Dispatch<any>;
  disabled?: boolean;
}) {
  const { crystalRing, disabled, dispatch } = props;
  const { beads, handSize } = crystalRing;

  if (!handSize) {
    return <></>;
  }

  const itemPosition = generateCrystalBeads(beads, handSize);

  return (
    <ProductDisplay radius={handSize.radiusWidth} beadSize={handSize.beadSize} disabledEvent={!!disabled}>
      <ProductInnerBorder beadSize={handSize.beadSize}>
        {itemPosition.map((data, index) => (
          <Bead
            key={data.item.key}
            top={data.top}
            left={data.left}
            item={data.item}
            dispatch={dispatch}
            beadSize={handSize.beadSize}
            angular={data.angular * index * -1}
          />
        ))}
      </ProductInnerBorder>
    </ProductDisplay>
  );
}

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
