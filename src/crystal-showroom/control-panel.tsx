import { CRYSTAL_TYPE, HAND_SIZE } from "../core/constants/constants";
import Selection from "../core/models/selection";
import SlideList from "../shared/slider-list";

export default function ControlPanel() {
  return (
    <div className="h-full divide-y-2 divide-black space-y-4 py-16 mx-10">
      <h4 className="text-left text-2xl font-bold">NOVUS LIFE</h4>
      <div className="h-20 w-full flex flex-col p-2">
        <label className="text-left text-lg">手圍</label>
        <select className="border-gray-200 border bg-gray-50 h-10">
          {HAND_SIZE.map((size: Selection) => (
            <option key={size.key}>{size.value}</option>
          ))}
        </select>
      </div>
      <div className="h-20 w-full flex flex-col p-2">
        <label className="text-left text-lg">銀鍊</label>
        <div>
          <input type="radio" />
          <label>是</label>
          <input type="radio" />
          <label>否</label>
        </div>
      </div>
      <div className="h-20 w-full flex flex-col p-2">
        <label className="text-left text-lg">水晶</label>
        <SlideList list={CRYSTAL_TYPE} />
      </div>
      <div className=" h-20 w-full flex flex-col p-2">
        <label className="text-left text-lg">花</label>
      </div>
      <div className=" h-20 w-full flex flex-col p-2">
        <label className="text-left text-lg">吊飾</label>
      </div>
    </div>
  );
}
