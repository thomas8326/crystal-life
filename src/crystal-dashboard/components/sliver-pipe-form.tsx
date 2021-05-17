import React, { useEffect, useRef, useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { realtimeDB } from 'src/core/config/firebase.config';
import SelectedItem, { HandSize, SliverPipe } from 'src/core/models/selection';
import FormErrorMsg from 'src/shared/form-error-msg';
import { Form1 } from 'src/styles/components/form';
import { Table } from 'src/styles/components/table';
import useFormError, { checkInteger, checkRequired, FormControlType } from 'src/utils/customer-hook/useFormError';
import { useFormValidate } from 'src/utils/customer-hook/useFormValidate';

export default function SliverPipeForm() {
  const dataTable = realtimeDB.ref('sliverPipe');
  const [values] = useListVals<SliverPipe>(dataTable);

  const [name, setName] = useState('');
  const [crystalSize, setCrystalSize] = useState<number>(8);
  const [crystalCount, setCrystalCount] = useState<number>(0);

  // validation
  const formRef = useRef<HTMLFormElement | null>(null);
  const validate = useFormValidate(formRef.current, name, crystalCount);
  const [errMsg, setErrMsg] = useFormError();

  const post = () => {
    const newPost = dataTable.push();
    const sliverPipe = new SliverPipe(name, crystalSize, crystalCount);
    newPost.set(sliverPipe);
  };

  return (
    <>
      <Form1 ref={formRef}>
        <div className="field">
          <div className="title">名稱: </div>
          <input
            type="text"
            className="px-1"
            name={FormControlType.Name}
            onInput={(e) => {
              setErrMsg(checkRequired(e));
              setName(e.currentTarget.value);
            }}
            required
          ></input>
          <FormErrorMsg errMsg={errMsg} name={FormControlType.Name}></FormErrorMsg>
        </div>
        <div className="field">
          <div className="title">大小: </div>
          <div className="flex justify-around">
            <label>
              <input
                type="radio"
                value={8}
                name="crystalSize"
                onChange={(e) => setCrystalSize(parseInt(e.currentTarget.value))}
                checked={crystalSize === 8}
              ></input>
              8nm
            </label>
            <label>
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
        </div>
        <div className="field">
          <div className="title">數量: </div>
          <input
            type="number"
            className="px-1"
            step="1"
            name={FormControlType.CrystalCount}
            required
            onInput={(e) => {
              setErrMsg(checkInteger(e));
              setErrMsg(checkRequired(e));
              setCrystalCount(parseInt(e.currentTarget.value));
            }}
          ></input>
          <FormErrorMsg errMsg={errMsg} name={FormControlType.CrystalCount}></FormErrorMsg>
        </div>
        <input type="button" value="新增" onClick={post} disabled={!validate} />
      </Form1>
      <Table className="table">
        <div className="table-header-group">
          <div className="table-cell">編號</div>
          <div className="table-cell">名稱</div>
          <div className="table-cell">圓珠大小</div>
          <div className="table-cell">佔圓珠數量</div>
        </div>
        <div className="table-row-group">
          {values &&
            values?.map((v: SliverPipe, index: number) => (
              <div key={v.key} className="table-row">
                <div className="table-cell">{index + 1}</div>
                <div className="table-cell">{v.text}</div>
                <div className="table-cell">{v.value}</div>
                <div className="table-cell">{v.crystalCount}</div>
              </div>
            ))}
        </div>
      </Table>
    </>
  );
}
