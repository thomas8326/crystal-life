export default function FlowerAdder(props: { updateLeft: () => {}; updateRight: () => {} }) {
  const { updateLeft, updateRight } = props;
  return (
    <div>
      <div>
        <button onClick={() => updateLeft()} className="text-blue-500">
          + Add Left
        </button>
      </div>
      <div>
        <button onClick={() => updateRight()} className="text-blue-500">
          + Add Right
        </button>
      </div>
    </div>
  );
}
