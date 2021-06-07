import { useContext, useState } from 'react';
import {
  crystalShowroomContext,
  SELECT_DISPLAY_CRYSTAL_BEAD,
  REMOVE_DISPLAY_SELECTED_CRYSTAL_BEAD,
} from 'src/core/contexts/crystal-showroom/crystal-showroom.context';
import styled from 'styled-components';

export const ProductHelperContainer = styled.div`
  right: 30px;
  top: 20px;
  position: absolute;
  width: 150px;
  height: auto;
  max-height: 265px;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 4px 1px #b9b9b9;
  cursor: pointer;
`;

const ProductHelperHeader = styled.div`
  width: 150px;
  height: 25px;
  flex: 0 0 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  user-select: none;
  background: #f9fafb;
`;

const ProductHelperContent = styled.div<any>`
  flex: 1;
  background: #f9fafb;
  flex-direction: column;

  display: ${(props: { isVisible: boolean }) => (props.isVisible ? 'flex' : 'none')};
`;

const ProductHelperSelector = styled.label`
  text-align: center;
  padding: 5px 0;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
  }

  & + & {
    border-top: 1px solid #cac6c6;
  }

  span {
    display: inline-block;
    width: 55%;
  }
`;

export function ProductHelper() {
  const { crystalRing, selectedDisplayCrystal, dispatch } = useContext(crystalShowroomContext);
  const { beads } = crystalRing;
  const [visibility, setVisibility] = useState<boolean>(true);

  const selectBead = (key: string[], checked: boolean) => {
    checked
      ? dispatch({ type: SELECT_DISPLAY_CRYSTAL_BEAD, data: { selectedDisplayCrystal: key } })
      : dispatch({ type: REMOVE_DISPLAY_SELECTED_CRYSTAL_BEAD, data: { selectedDisplayCrystal: key } });
  };

  return (
    <ProductHelperContainer>
      <ProductHelperHeader onClick={() => setVisibility((prev) => !prev)}>
        <span>圓珠選項控制器</span>
        {visibility ? <i className="icon-xs icon-up-open-arrow" /> : <i className="icon-xs icon-down-open-arrow" />}
      </ProductHelperHeader>
      <ProductHelperContent isVisible={visibility} className="main-scroll">
        {!!beads.length && (
          <ProductHelperSelector>
            <input
              type="checkbox"
              onChange={(e) =>
                selectBead(
                  beads.map((bead) => bead.key),
                  e.currentTarget.checked,
                )
              }
            />
            <span>全選</span>
          </ProductHelperSelector>
        )}
        {beads.map((bead, index) => (
          <ProductHelperSelector key={bead.key}>
            <input
              type="checkbox"
              onChange={(e) => selectBead([bead.key], e.currentTarget.checked)}
              checked={selectedDisplayCrystal.includes(bead.key)}
            />
            <span>圓珠{index + 1}</span>
          </ProductHelperSelector>
        ))}
      </ProductHelperContent>
    </ProductHelperContainer>
  );
}
