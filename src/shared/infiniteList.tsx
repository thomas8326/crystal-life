import SelectedItem from 'src/core/models/selection';
import styled, { css } from 'styled-components';

export const InfiniteLayout = styled.ul`
  ${(props: { layout: string }) =>
    props.layout === 'grid' &&
    css`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
      gap: 14px;
      width: 100%;
    `}

  li {
    cursor: pointer;
  }
`;

export default function InfiniteList(props: {
  layout: string;
  list: SelectedItem[];
  updateSelect: (item: SelectedItem) => void;
}) {
  const { layout, list, updateSelect } = props;

  return (
    <div className="flex flex-row items-center">
      <InfiniteLayout layout={layout}>
        {list.map((item) => (
          <li key={item.key} onClick={() => updateSelect(item)}>
            <img src={item.url} />
          </li>
        ))}
      </InfiniteLayout>
    </div>
  );
}
