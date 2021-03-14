import Selection from '../core/models/selection';

export default function RadioGroup(props: { list: Selection[]; groupName: string }) {
  const { groupName, list } = props;

  const RadioItem = (props: { item: Selection }) => {
    const { item } = props;
    return (
      <label
        htmlFor={item.key}
        className="shadow border border-gray-300 h-8 w-32 flex items-center p-2 cursor-pointer space-x-2"
      >
        <input type="radio" id={item.key} value={item.value} name={groupName} />
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
