import { useEffect, useState } from 'react';
import AllowUser from 'src/core/models/allow-user';
import CrystalRing from 'src/core/models/crystal-ring';
import ProductContainer from 'src/crystal-showroom/components/product-container';
import useHttpClient from 'src/utils/customer-hook/useHttpClient';

export default function CrystalProductList() {
  const { list: allowList } = useHttpClient<AllowUser>('allowList');
  const { list: products, getList } = useHttpClient<CrystalRing>('crystalProduct', false);
  const [activeId, setActiveId] = useState<string>(allowList[0].id);

  useEffect(() => {
    if (activeId) {
      getList(activeId);
    }
  }, [activeId]);

  console.log(allowList);

  return (
    <div className="flex">
      <div>
        {allowList.map((user) => (
          <div onClick={() => setActiveId(user.id)}>{user.phone}</div>
        ))}
        {/* {products.length && <Product crystalRing={products[0]}></Product>} */}
      </div>
    </div>
  );
}
