import { ReactChild, useEffect, useRef, useState } from 'react';
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

const InfiniteItem = styled.li`
  cursor: pointer;
  padding: 4px;
  ${(props: { isSelected: boolean }) =>
    props.isSelected &&
    css`
      border: 1px solid gray;
      border-radius: 20px;
    `}
`;

export const Container = styled.div`
  position: relative;

  .sensor {
    position: absolute;
    width: 100%;
    height: 30px;
    bottom: 0;
    pointer-events: none;
  }
`;

export default function InfiniteList(props: {
  layout: string;
  tableName: string;
  updateSelect: (item: SelectedItem) => void;
  openSelect?: boolean;
}) {
  const { layout, tableName, openSelect, updateSelect } = props;
  const [selected, setSelected] = useState<SelectedItem>(new SelectedItem());
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
  const [mutationElement, setMutationElement] = useState<HTMLUListElement | null>(null);
  const list = useInfiniteList(tableName, anchor, viewport, mutationElement);

  useEffect(() => {
    if (list.length && openSelect) {
      updateSelectItem(list[0]);
    }
  }, [list]);

  const updateSelectItem = (item: SelectedItem) => {
    setSelected(item);
    updateSelect(item);
  };

  return (
    <div className="h-full overflow-auto" ref={setViewport}>
      <Container>
        <InfiniteLayout layout={layout} ref={setMutationElement}>
          {list.map((item) => (
            <InfiniteItem
              key={item.key}
              onClick={() => updateSelectItem(item)}
              isSelected={!!openSelect && item.key === selected.key}
            >
              <img src={item.url} />
            </InfiniteItem>
          ))}
        </InfiniteLayout>
        <div className="sensor" ref={setAnchor}></div>
      </Container>
    </div>
  );
}
