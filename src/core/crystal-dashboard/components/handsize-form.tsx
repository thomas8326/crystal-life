import React, { useState } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { realtimeDB } from 'src/core/config/firebase.config';
import { HandSize } from 'src/core/models/selection';
import { Form1 } from 'src/styles/components/form';
import { Table } from 'src/styles/components/table';

export default function HandSizeForm() {
  const dataTable = realtimeDB.ref('handSize');
  const [values] = useListVals<HandSize>(dataTable);
  const [editable, setEditable] = useState(false);

  const [name, setName] = useState('');
  const [crystalSize, setCrystalSize] = useState(8);
  const [crystalCount, setCrystalCount] = useState<number>(0);

  const post = () => {
    const newPost = dataTable.push();
    const handSize = new HandSize(name, crystalSize, crystalCount);
    newPost.set(handSize);
  };

  return (
    <>
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
      <Form1>
        <div className="field">
          <div className="title">名稱: </div>
          <input type="text" className="px-1" onInput={(e) => setName(e.currentTarget.value)}></input>
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
              ></input>
              8nm
            </label>
            <label>
              <input
                type="radio"
                value={10}
                name="crystalSize"
                onChange={(e) => setCrystalSize(parseInt(e.currentTarget.value))}
              ></input>
              10nm
            </label>
          </div>
        </div>
        <div className="field">
          <div className="title">數量: </div>
          <input type="text" className="px-1" onInput={(e) => setCrystalCount(parseInt(e.currentTarget.value))}></input>
        </div>
        <input type="button" value="新增" onClick={post} />
      </Form1>
    </>
  );
}
