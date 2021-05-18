import { useState } from 'react';
import SelectedItem from 'src/core/models/selection';
import InfiniteList from 'src/shared/infiniteList';

export default function FlowerAdder(props: {
  list: SelectedItem[];
  updateLeft: (flower: SelectedItem) => void;
  updateRight: (flower: SelectedItem) => void;
}) {
  const { list, updateLeft, updateRight } = props;
  const [selected, setSelected] = useState<SelectedItem>(list[0]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-around">
        <button onClick={() => updateLeft(selected)} className="text-blue-500">
          + Add Left
        </button>
        <button onClick={() => updateRight(selected)} className="text-blue-500">
          + Add Right
        </button>
      </div>
      <div className="flex-1">
        <InfiniteList
          layout="grid"
          tableName="flowerCovers"
          selected={selected}
          updateSelect={(flower) => setSelected(flower)}
        ></InfiniteList>
      </div>
    </div>
  );
}
