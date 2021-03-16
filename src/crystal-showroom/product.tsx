import styled, { css } from 'styled-components';
import StyledCss from '../core/models/css';
import Selection, { HandSize } from '../core/models/selection';
import '../styles/animation.css';

const ProductDisplay = styled.div`
  position: relative;
  width: 360px;
  height: 360px;
`;

const Bead = styled.img<any>`
  position: absolute;
  top: ${(props: { top: number }) => `${props.top}px`};
  left: ${(props: { left: number }) => `${props.left}px`};
  display: flex;
  width: 50px;
  height: 50px;
  ${(props: { isEmpty: boolean }) =>
    props.isEmpty &&
    css`
      background-color: #fffbe0;
      border: 1px dashed rgb(234 146 82 / 50%);
    `};
  border-radius: 50%;
`;

function generateCrystalBeads(radius: number, count: number): { top: number; left: number }[] {
  const containerX = 150;
  const containerY = 150;
  const circleAngular = 360 / count;
  const circleHeight = (circleAngular * Math.PI) / 180;

  return new Array(count).fill(-1).map((dom, index) => {
    const left = Math.sin(circleHeight * index) * radius + containerX;
    const top = Math.cos(circleHeight * index) * radius + containerY;

    return { top, left };
  });
}

export default function Product(props: { selectedList: Selection[]; handSize: HandSize }) {
  const { selectedList, handSize } = props;
  const itemPosition = generateCrystalBeads(handSize.radiusWidth, handSize.crystalCount);

  return (
    <ProductDisplay>
      {itemPosition.map((item, index) => (
        <Bead
          key={selectedList[index]?.key}
          top={item.top}
          left={item.left}
          src={selectedList[index]?.url}
          isEmpty={!selectedList[index]?.url}
        ></Bead>
      ))}
    </ProductDisplay>
  );
}
