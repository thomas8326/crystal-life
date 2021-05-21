import React, { useEffect, useState } from 'react';
import AllowUser from 'src/core/models/allow-user';
import CrystalRing from 'src/core/models/crystal-ring';
import ProductContainer from 'src/crystal-showroom/components/product-container';
import Product from 'src/shared/product';
import useHttpClient from 'src/utils/customer-hook/useHttpClient';

export default function CrystalProductList() {
  const { list: allowList } = useHttpClient<AllowUser>('allowList');
  const { list: products, getList } = useHttpClient<CrystalRing>('crystalProducts', false);
  const [activeId, setActiveId] = useState<string>('');

  const selectUser = (value: string) => {
    if (allowList.find((user) => user.id === value)) {
      setActiveId(value);
    }
  };

  useEffect(() => {
    if (allowList.length) {
      setActiveId(allowList[0].id);
    }
  }, [allowList]);

  useEffect(() => {
    if (activeId) {
      console.log(activeId);
      getList(activeId);
    }
  }, [activeId]);

  useEffect(() => {
    // console.log(products);
  }, [products]);

  return (
    <div className="flex">
      <div>
        <label htmlFor="chooseUser">
          <input
            list="allowList"
            name="chooseUser"
            id="chooseUser"
            onChange={(e) => selectUser(e.currentTarget.value)}
          />
          <datalist id="allowList" onChange={(e) => console.log('select')}>
            {allowList.map((user) => (
              <option key={user.id} value={user.phone} />
            ))}
          </datalist>
        </label>
        {!!products.length && <Product crystalRing={products[0]}></Product>}
      </div>
    </div>
  );
}
