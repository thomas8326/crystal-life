import { useContext } from 'react';
import { crystalShowroomContext } from 'src/core/contexts/crystalShowroom/selected-list.context';
import Product from 'src/shared/product';

export default function ProductContainer() {
  const { crystalRing, dispatch } = useContext(crystalShowroomContext);

  return <Product crystalRing={crystalRing} dispatch={dispatch}></Product>;
}
