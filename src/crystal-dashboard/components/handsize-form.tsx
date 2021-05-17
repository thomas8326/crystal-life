import React, { useEffect, useRef, useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { realtimeDB } from 'src/core/config/firebase.config';
import { HandSize } from 'src/core/models/selection';
import FormErrorMsg from 'src/shared/form-error-msg';
import { Form1 } from 'src/styles/components/form';
import { Table } from 'src/styles/components/table';
import useFormError, { checkInteger, checkRequired, FormControlType } from 'src/utils/customer-hook/useFormError';
import { useFormValidate } from 'src/utils/customer-hook/useFormValidate';

export default function HandSizeForm() {
  const dataTable = realtimeDB.ref('handSize');
  const [values] = useListVals<HandSize>(dataTable);

  const [name, setName] = useState('');
  const [crystalSize, setCrystalSize] = useState(8);
  const [crystalCount, setCrystalCount] = useState<number>(0);

  // validation
  const formRef = useRef<HTMLFormElement | null>(null);
  const validate = useFormValidate(formRef.current, name, crystalCount);
  const [errMsg, setErrMsg] = useFormError();

  const post = () => {
    const newPost = dataTable.push();
    const handSize = new HandSize(name, crystalSize, crystalCount);
    newPost.set(handSize);
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
            <div className="flex items-center">
              <input
                id="8mm"
                type="radio"
                value={8}
                name="crystalSize"
                checked={crystalSize === 8}
                onChange={(e) => setCrystalSize(parseInt(e.currentTarget.value))}
              ></input>
              <label htmlFor="8mm">8nm</label>
            </div>

            <div className="flex items-center">
              <input
                id="10mm"
                type="radio"
                value={10}
                name="crystalSize"
                checked={crystalSize === 10}
                onChange={(e) => setCrystalSize(parseInt(e.currentTarget.value))}
              ></input>
              <label htmlFor="10mm">10nm</label>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="title">數量: </div>
          <input
            type="number"
            className="px-1"
            name={FormControlType.CrystalCount}
            step="1"
            required
            onInput={(e) => {
              setErrMsg(checkInteger(e));
              setErrMsg(checkRequired(e));
              setCrystalCount(Number(e.currentTarget.value));
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
          <div className="table-cell">圓珠數量</div>
        </div>
        <div className="table-row-group">
          {values &&
            values?.map((v: HandSize, index: number) => (
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
