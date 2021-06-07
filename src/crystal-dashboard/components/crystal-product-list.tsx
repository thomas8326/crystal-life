import React, { useEffect, useState } from 'react';
import { CREATED_SORT } from 'src/core/constants/sort.constants';
import User from 'src/core/models/allow-user';
import CrystalRing from 'src/core/models/crystal-ring';
import Product from 'src/shared/product';
import { SlideButton } from 'src/styles/components/button';
import { FormField } from 'src/styles/components/form';
import useHttpClient from 'src/utils/customer-hook/useHttpClient';

export default function CrystalProductList() {
  const { list: allowList } = useHttpClient<User>('allowList');
  const { list: products, getList } = useHttpClient<CrystalRing>('crystalProducts', false);

  const [activeUser, setActiveUser] = useState<User | undefined>();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const selectUser = (value: string) => {
    const user = allowList.find((user) => user.id === value);
    setActiveUser(user);
  };

  const getTime = (time: number | Object) => (time ? new Date(time as number).toLocaleString() : '無時間資料');

  useEffect(() => {
    if (activeUser?.id) {
      getList(activeUser.id, 0, CREATED_SORT);
    }
  }, [activeUser]);

  const slide = (step: number) => setActiveIndex((prev) => prev + step);

  return (
    <div className="flex flex-col p-11 justify-center items-center">
      <FormField htmlFor="chooseUser">
        <div className="title">選擇使用者電話:</div>
        <input
          list="allowList"
          type="text"
          name="chooseUser"
          id="chooseUser"
          value={activeUser?.id}
          onChange={(e) => selectUser(e.currentTarget.value)}
        ></input>
        <datalist id="allowList">
          {allowList.map((user) => (
            <option key={user.id} value={user.phone} />
          ))}
        </datalist>
      </FormField>
      <div className="m-16 flex justify-center items-center" style={{ width: 800, height: 500 }}>
        {!!products.length && (
          <div className="flex w-full items-center justify-center relative">
            <div className="absolute flex flex-col items-center">
              <span>{activeUser?.name ?? '顧客'}</span>
              <span>{getTime(products[activeIndex]?.createdAt)}</span>
            </div>
            <SlideButton isLeft={true} onClick={() => slide(-1)} disabled={products.length <= 1 || activeIndex === 0} />
            <div className="flex-1 flex items-center">
              {<Product crystalRing={products[activeIndex]} disabled={true}></Product>}
            </div>
            <SlideButton
              disabled={products.length <= 1 || activeIndex >= products.length - 1}
              onClick={() => slide(1)}
            />
          </div>
        )}

        {!products.length && (
          <div className="w-full h-full flex rounded flex-col justify-center items-center border-4 border-dashed">
            <i className="icon-5xl icon-empty-box" />
            查無資料
          </div>
        )}
      </div>
    </div>
  );
}
