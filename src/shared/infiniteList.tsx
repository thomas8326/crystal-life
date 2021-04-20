import SelectedItem from 'src/core/models/selection';

export default function InfiniteList(props: { list: SelectedItem[]; updateSelect: (item: Selection) => void }) {
  const { list } = props;

  return (
    <div className="flex flex-row items-center">
      <ul className="flex flex-row flex-1">
        {list.map((item) => (
          <li>
            <img src={item.url} />
          </li>
        ))}
      </ul>
    </div>
  );
}
