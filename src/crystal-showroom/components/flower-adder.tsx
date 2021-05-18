import { useState } from 'react';
import SelectedItem from 'src/core/models/selection';
import InfiniteList from 'src/shared/infiniteList';

export default function FlowerAdder(props: {
  removeFlower: () => void;
  updateLeft: (flower: SelectedItem) => void;
  updateRight: (flower: SelectedItem) => void;
}) {
  const { updateLeft, updateRight, removeFlower } = props;
  const [selected, setSelected] = useState<SelectedItem>(new SelectedItem());

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-around">
        <button onClick={() => updateLeft(selected)} className="text-blue-500">
          + 加在左邊
        </button>
        <button onClick={() => removeFlower()} className="text-blue-500">
          - 移除
        </button>
        <button onClick={() => updateRight(selected)} className="text-blue-500">
          + 加在右邊
        </button>
      </div>
      <div className="flex-1">
        <InfiniteList
          layout="grid"
          tableName="flowerCovers"
          openSelect={true}
          updateSelect={(flower) => setSelected(flower)}
        ></InfiniteList>
      </div>
    </div>
  );
}
