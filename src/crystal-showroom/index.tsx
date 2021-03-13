import ControlPanel from "./control-panel";
import Product from "./product";
import styled from "styled-components";

const Showroom = styled.div`
  display: flex;
  height: 100%;
`;

function CrystalShowroom() {
  return (
    <Showroom className="App">
      <div className="flex flex-grow justify-center items-center">
        <Product />
      </div>
      <div
        className="bg-gray-50 h-full border-l border-gray-500"
        style={{ flex: "0 0 385px" }}
      >
        <ControlPanel />
      </div>
    </Showroom>
  );
}
export default CrystalShowroom;
