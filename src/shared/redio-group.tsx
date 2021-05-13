import { useState } from 'react';
import SelectedItem from '../core/models/selection';

export default function RadioGroup<T extends SelectedItem>(props: {
  list: T[];
  defaultValue: SelectedItem;
  groupName: string;
  updateRadio: (item: T) => void;
}) {
  const { groupName, list, defaultValue, updateRadio } = props;
  const RadioItem = (props: { item: T }) => {
    const { item } = props;
    return (
      <label
        htmlFor={item.key}
        className="shadow border border-gray-300 h-12 flex items-center p-4 cursor-pointer space-x-2"
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
    <div className="flex flex-col space-y-4 mt-6">
      {!!list?.length && list?.map((item) => <RadioItem key={item.key} item={item} />)}
    </div>
  );
}
