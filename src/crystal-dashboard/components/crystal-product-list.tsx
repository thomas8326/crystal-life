import React, { useEffect, useState } from 'react';
import { OrderBy } from 'src/core/enums/orderby';
import AllowUser from 'src/core/models/allow-user';
import CrystalRing from 'src/core/models/crystal-ring';
import Product from 'src/shared/product';
import { SlideButton } from 'src/styles/components/button';
import { FormField } from 'src/styles/components/form';
import useHttpClient from 'src/utils/customer-hook/useHttpClient';
import styled from 'styled-components';

const CreateDate = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: #dce7f5;
  padding: 12px;
  font-size: 12px;
  border: 1px solid;
  border-radius: 5px;
`;

const SORT = { path: 'createdAt', by: OrderBy.Desc };

export default function CrystalProductList() {
  const { list: allowList } = useHttpClient<AllowUser>('allowList');
  const { list: products, getList } = useHttpClient<CrystalRing>('crystalProducts', false, SORT);
  const [activeId, setActiveId] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const selectUser = (value: string) => {
    if (allowList.find((user) => user.id === value)) {
      setActiveId(value);
    }
  };

  const getTime = (time: number | Object) => (time ? new Date(time as number).toLocaleString() : '無時間資料');

  useEffect(() => {
    if (allowList.length) {
      setActiveId(allowList[0].id);
    }
  }, [allowList]);

  useEffect(() => {
    if (activeId) {
      getList(activeId);
    }
  }, [activeId]);

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
          onChange={(e) => selectUser(e.currentTarget.value)}
        />
        <datalist id="allowList" onChange={(e) => console.log('select')}>
          {allowList.map((user) => (
            <option key={user.id} value={user.phone} />
          ))}
        </datalist>
      </FormField>
      <div className="m-16 flex justify-center items-center relative" style={{ width: 500, height: 500 }}>
        {!!products.length && (
          <>
            <SlideButton isLeft={true} onClick={() => slide(-1)} disabled={products.length <= 1 || activeIndex === 0} />
            <Product crystalRing={products[activeIndex]} disabled={true}></Product>
            <CreateDate>
              <div>{getTime(products[activeIndex].createdAt)}</div>
            </CreateDate>
            <SlideButton
              disabled={products.length <= 1 || activeIndex >= products.length - 1}
              onClick={() => slide(1)}
            />
          </>
        )}
        {!products.length && (
          <div className="w-full h-full flex rounded flex-col justify-center items-center border-4 border-dashed">
            <i className="icon-2xl icon-empty-box" />
            查無資料
          </div>
        )}
      </div>
    </div>
  );
}
