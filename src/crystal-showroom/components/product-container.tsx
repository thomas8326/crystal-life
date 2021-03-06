import { useContext } from 'react';
import { crystalShowroomContext } from 'src/core/contexts/crystal-showroom/crystal-showroom.context';
import Product from 'src/shared/product';

export default function ProductContainer() {
  const { crystalRing, selectedDisplayCrystal, dispatch } = useContext(crystalShowroomContext);

  return <Product crystalRing={crystalRing} selectedBeads={selectedDisplayCrystal} dispatch={dispatch}></Product>;
}
