import { useState } from 'react';
import Selection from '../core/models/selection';

export default function RadioGroup<T extends Selection>(props: {
  list: T[];
  groupName: string;
  updateRadio: (item: T) => void;
}) {
  const { groupName, list, updateRadio } = props;
  const [selectedItem, setSelectedItem] = useState(list[0]);

  const RadioItem = (props: { item: T }) => {
    const { item } = props;
    return (
      <label
        htmlFor={item.key}
        className="shadow border border-gray-300 h-8 w-32 flex items-center p-2 cursor-pointer space-x-2"
      >
        <input
          type="radio"
          id={item.key}
          value={item.value}
          name={groupName}
          checked={item.key === selectedItem.key}
          onChange={() => {
            updateRadio(item);
            setSelectedItem(item);
          }}
        />
        <span>{item.value}</span>
      </label>
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {list.map((item) => (
        <RadioItem key={item.key} item={item} />
      ))}
    </div>
  );
}
