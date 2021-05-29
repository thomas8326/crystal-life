import styled, { css } from 'styled-components';
export const Button1 = styled.button`
  border: 1px solid #417deb;
  border-radius: 5px;
  padding: 4px;
  background: #417deb;
  color: white;
  font-size: 14px;
`;


export const SlideButton = styled.button`
  flex: 0 0 60px;
  height: 60px;
  background-image: url(/assets/icon/chevron.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60px;
  ${(props: { isLeft?: boolean }) =>
    props.isLeft &&
    css`
      transform: scaleX(-1);
    `}
`;
