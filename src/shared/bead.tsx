import React, { useState, useEffect } from 'react';
import {
  SELECT_DISPLAY_CRYSTAL_BEAD,
  REMOVE_DISPLAY_SELECTED_CRYSTAL_BEAD,
} from 'src/core/contexts/crystalShowroom/selected-list.context';
import Crystal from 'src/core/models/crystal';
import SelectedItem from 'src/core/models/selection';
import styled, { css } from 'styled-components';

const BeadDisplay = styled.div<any>`
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

  ${(props: { isEmpty: boolean; isClicked: boolean }) =>
    props.isEmpty &&
    css`
      background-color: #fffbe0;
      border: 1px dashed rgb(234 146 82 / 80%);
    `}

  ${(props: { isClicked: boolean }) =>
    props.isClicked &&
    css`
      border: 2px dashed #ea7e30;
    `}

  &: hover {
    background-color: #f7f0c0;
  }
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
  height: 100px;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: -40%;
  top: 100%;
  z-index: 10;
  i {
    flex: 0 0 30px;
  }

  .charm-image {
    width: 50px;
    height: 50px;
  }
`;

export default function Bead(props: {
  top: number;
  left: number;
  item: Crystal;
  angular: number;
  beadSize: number;
  dispatch?: React.Dispatch<any>;
}) {
  const { top, left, item, angular, beadSize, dispatch } = props;
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    setIsClicked(false);
  }, [item]);

  const onSelectBead = (item: SelectedItem) => {
    setIsClicked((preState: boolean) => {
      const newState = !preState;

      if (dispatch) {
        newState
          ? dispatch({ type: SELECT_DISPLAY_CRYSTAL_BEAD, data: { selectedDisplayCrystal: item.key } })
          : dispatch({ type: REMOVE_DISPLAY_SELECTED_CRYSTAL_BEAD, data: { selectedDisplayCrystal: item.key } });
      }

      return newState;
    });
  };

  return (
    <>
      <BeadDisplay
        top={top}
        left={left}
        isEmpty={!item?.url}
        isClicked={isClicked}
        radius={beadSize}
        angular={angular}
        onClick={() => onSelectBead(item)}
      >
        {item?.charm && (
          <Charm>
            <i className="icon-xl icon-up-arrow" />
            <div className="charm-image">
              <img src={`${process.env.PUBLIC_URL}/assets/01-removebg-preview.png`}></img>
            </div>
          </Charm>
        )}
        {item?.leftFlower?.url && <Flower src={item?.leftFlower.url} />}
        <div>{item?.url && <img src={item?.url} className="w-full h-full" />}</div>
        {item?.rightFlower?.url && <Flower src={item?.rightFlower.url} isLeft={false} />}
      </BeadDisplay>
    </>
  );
}
