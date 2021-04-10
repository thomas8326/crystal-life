import { useState } from 'react';
import Selection from '../core/models/selection';

export default function RadioGroup<T extends Selection>(props: {
  list: T[];
  defaultValue: Selection;
  groupName: string;
  updateRadio: (item: T) => void;
}) {
  const { groupName, list, defaultValue, updateRadio } = props;

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
          checked={item.key === defaultValue.key}
          onChange={() => {
            updateRadio(item);
          }}
        />
        <span>{item.text}</span>
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
