import { useState } from 'react';
import { FileInfo } from 'src/core/models/file-info';
import InfiniteList from 'src/shared/infiniteList';

export default function FlowerAdder(props: {
  removeFlower: () => void;
  updateLeft: (flower: FileInfo) => void;
  updateRight: (flower: FileInfo) => void;
}) {
  const { updateLeft, updateRight, removeFlower } = props;
  const [selected, setSelected] = useState<FileInfo>(new FileInfo());

  return (
    <div className="h-full flex flex-col">
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
          tableName="codeList/flowerCovers"
          openSelect={true}
          updateSelect={(flower) => setSelected(flower)}
        ></InfiniteList>
      </div>
    </div>
  );
}
