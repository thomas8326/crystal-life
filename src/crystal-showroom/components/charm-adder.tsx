import { useState } from 'react';
import { FileInfo } from 'src/core/models/file-info';
import InfiniteList from 'src/shared/infinite-list';

export default function CharmAdder(props: { removeCharm: () => void; addCharm: (charm: FileInfo) => void }) {
  const { addCharm, removeCharm } = props;
  const [selected, setSelected] = useState<FileInfo>(new FileInfo());

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-row justify-around">
        <button onClick={() => addCharm(selected)} className="text-blue-500">
          加吊飾
        </button>
        <button onClick={() => removeCharm()} className="text-blue-500">
          移除吊飾
        </button>
      </div>
      <div className="mt-6 flex-1 h-full main-scroll">
        <InfiniteList
          layout="grid"
          tableName="codeList/charms"
          openSelect={true}
          updateSelect={(selected) => setSelected(selected)}
        />
      </div>
    </div>
  );
}
