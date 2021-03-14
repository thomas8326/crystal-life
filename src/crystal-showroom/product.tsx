import styled from "styled-components";
import StyledCss from "../core/models/css";
import "../styles/animation.css";

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
  background-color: green;
  border-radius: 50%;
`;

function generateCrystalBeads(length: number): any[] {
  const containerX = 150;
  const containerY = 150;
  const radius = 150;
  const circleAngular = 360 / length;
  const circleHeight = (circleAngular * Math.PI) / 180;

  return new Array(length).fill(-1).map((dom, index) => {
    const left = Math.sin(circleHeight * index) * radius + containerX;
    const top = Math.cos(circleHeight * index) * radius + containerY;

    return <Bead key={index} top={top} left={left} />;
  });
}

export default function Product() {
  return (
    <ProductDisplay>
      {generateCrystalBeads(12).map((bead) => bead)}
    </ProductDisplay>
  );
}
