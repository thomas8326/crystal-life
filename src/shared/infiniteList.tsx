// prettier-ignore
import { ReactChild, useEffect, useRef, useState } from 'react';
import { storageRef } from 'src/core/config/firebase.config';
import { FileInfo } from 'src/core/models/file-info';
import SelectedItem from 'src/core/models/selection';
import { useInfiniteList } from 'src/utils/customer-hook/useInfiniteList';
import styled, { css } from 'styled-components';

export const InfiniteLayout = styled.ul`
  ${(props: { layout: string }) =>
    props.layout === 'grid' &&
    css`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
      grid-template-rows: 60px;
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
  position: relative;
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
  openSelect?: boolean;
  openRemove?: boolean;
  updateSelect?: (item: SelectedItem) => void;
  removeSelect?: (item: FileInfo) => void;
}) {
  const { layout, tableName, openSelect, openRemove, updateSelect, removeSelect } = props;
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
    updateSelect && updateSelect(item);
  };

  const removeSelectedItem = (item: FileInfo) => {
    removeSelect && removeSelect(item);
  };

  return (
    <div className="h-full overflow-auto" ref={setViewport}>
      <Container>
        <InfiniteLayout layout={layout} ref={setMutationElement}>
          {list.map((item) => (
            <InfiniteItem
              key={item.id}
              onClick={() => updateSelectItem(item)}
              isSelected={!!openSelect && item.key === selected.key}
            >
              <img src={item.url} />
              {openRemove && (
                <i className="icon-sm icon-x-mark absolute top-0 right-0" onClick={() => removeSelectedItem(item)} />
              )}
            </InfiniteItem>
          ))}
        </InfiniteLayout>
        <div className="sensor" ref={setAnchor}></div>
      </Container>
    </div>
  );
}
