import { useEffect, useRef, useState } from 'react';
import { storageRef } from 'src/core/config/firebase.config';
import SelectedItem from 'src/core/models/selection';
import { useInfiniteList } from 'src/utils/customer-hook/useInfiniteList';
import styled, { css } from 'styled-components';

export const InfiniteLayout = styled.ul`
  ${(props: { layout: string }) =>
    props.layout === 'grid' &&
    css`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
      gap: 14px;
      width: 100%;
      height: 100%;
      position: relative;
    `}

  li {
    cursor: pointer;
  }
`;

export const Container = styled.div`
  position: relative;

  .sensor {
    position: absolute;
    width: 100%;
    height: 30px;
    background: red;
    bottom: 0;
  }
`;

export default function InfiniteList(props: {
  layout: string;
  tableName: string;
  updateSelect: (item: SelectedItem) => void;
}) {
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
  const [mutationElement, setMutationElement] = useState<HTMLUListElement | null>(null);

  const { layout, tableName, updateSelect } = props;
  const list = useInfiniteList(tableName, anchor, viewport, mutationElement);

  return (
    <div className="h-full overflow-auto" ref={setViewport}>
      <Container>
        <InfiniteLayout layout={layout} ref={setMutationElement}>
          {list.map((item) => (
            <li key={item.key} onClick={() => updateSelect(item)}>
              <img src={item.url} />
            </li>
          ))}
        </InfiniteLayout>
        <div className="sensor" ref={setAnchor}></div>
      </Container>
    </div>
  );
}
