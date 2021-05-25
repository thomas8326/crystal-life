import React, { useRef, useState } from 'react';
import { FormControlType } from 'src/core/enums/form.enum';
import { SliverPipe } from 'src/core/models/selection';
import FormErrorMsg from 'src/shared/form-error-msg';
import { Button1 } from 'src/styles/components/button';
import { Form1, FormField } from 'src/styles/components/form';
import { Table } from 'src/styles/components/table';
import useFormErrorMsg, { checkInteger, checkRequired } from 'src/utils/customer-hook/useFormError';
import { useFormCheckValidate } from 'src/utils/customer-hook/useFormValidate';
import useHttpClient from 'src/utils/customer-hook/useHttpClient';

export default function SliverPipeForm() {
  const { list, post, remove } = useHttpClient<SliverPipe>('sliverPipe');

  const [name, setName] = useState('');
  const [crystalSize, setCrystalSize] = useState<number>(8);
  const [crystalCount, setCrystalCount] = useState<number>(0);

  // validation
  const [errMsg, setErrMsg] = useFormErrorMsg();
  const { validate } = useFormCheckValidate(errMsg, FormControlType.Name, FormControlType.CrystalCount);

  const createNewPipe = () => {
    post(new SliverPipe(name, crystalSize, crystalCount)).then(() => {
      setName('');
      setCrystalSize(8);
      setCrystalCount(0);
    });
  };

  return (
    <>
      <Form1>
        <FormField>
          <div className="title">名稱: </div>
          <input
            type="text"
            className="px-1"
            name={FormControlType.Name}
            value={name}
            onInput={(e) => {
              setErrMsg(checkRequired(e));
              setName(e.currentTarget.value);
            }}
            required
          ></input>
          <FormErrorMsg errMsg={errMsg} name={FormControlType.Name}></FormErrorMsg>
        </FormField>
        <FormField>
          <div className="title">大小: </div>
          <div className="flex justify-around">
            <label className="cursor-pointer">
              <input
                type="radio"
                value={8}
                name="crystalSize"
                onChange={(e) => setCrystalSize(parseInt(e.currentTarget.value))}
                checked={crystalSize === 8}
              ></input>
              8nm
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                value={10}
                name="crystalSize"
                onChange={(e) => setCrystalSize(parseInt(e.currentTarget.value))}
                checked={crystalSize === 10}
              ></input>
              10nm
            </label>
          </div>
        </FormField>
        <FormField>
          <div className="title">數量: </div>
          <input
            type="number"
            className="px-1"
            step="1"
            name={FormControlType.CrystalCount}
            value={crystalCount}
            required
            onInput={(e) => {
              setErrMsg(checkInteger(e));
              setErrMsg(checkRequired(e));
              setCrystalCount(parseInt(e.currentTarget.value));
            }}
          ></input>
          <FormErrorMsg errMsg={errMsg} name={FormControlType.CrystalCount}></FormErrorMsg>
        </FormField>
        <input type="button" value="新增" onClick={createNewPipe} disabled={!validate} />
      </Form1>
      <Table className="table">
        <div className="table-header-group">
          <div className="table-cell">編號</div>
          <div className="table-cell">名稱</div>
          <div className="table-cell">圓珠大小</div>
          <div className="table-cell">佔圓珠數量</div>
          <div className="table-cell"></div>
        </div>
        <div className="table-row-group">
          {list?.map((v: SliverPipe, index: number) => (
            <div key={v.key} className="table-row">
              <div className="table-cell">{index + 1}</div>
              <div className="table-cell">{v.text}</div>
              <div className="table-cell">{v.value}</div>
              <div className="table-cell">{v.crystalCount}</div>
              <div className="table-cell">
                <Button1 onClick={() => remove(v.id)}>刪除</Button1>
              </div>
            </div>
          ))}
        </div>
      </Table>
    </>
  );
}
