import styled, { keyframes } from 'styled-components';

const bounceDelay = keyframes`
0%,
80%,
100% {
  transform: scale(0);
}

40% {
  transform: scale(1);
}
`;

const LoadingAnimation = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;

  transform: ${(props: { scale?: number }) => `scale(${props?.scale ?? 1})`};

  .bounce1 {
    animation-delay: -0.64s;
  }

  .bounce2 {
    animation-delay: -0.48s;
  }

  .bounce3 {
    animation-delay: -0.32s;
  }

  .bounce4 {
    animation-delay: -0.16s;
  }

  div {
    display: inline-block;
    width: 18px;
    height: 18px;
    background-color: #277fd3;
    border-radius: 100%;
    margin: 0 5px;
    animation: ${bounceDelay} 1.4s infinite ease-in-out both;
  }
`;

export default function LoadingBar(props: { scale?: number }) {
  const { scale } = props;

  return (
    <LoadingAnimation scale={scale}>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
      <div className="bounce4"></div>
      <div className="bounce5"></div>
    </LoadingAnimation>
  );
}
