import { Children, cloneElement, ReactElement } from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { realtimeDB } from 'src/core/config/firebase.config';

export default function ControlItem(props: { children: ReactElement<any>; tableName: string }) {
  const { children, tableName } = props;
  const dataTable = realtimeDB.ref(tableName);

  const list = useListVals(dataTable);

  console.log(tableName);
  console.log(list);
  return (
    <>
      <label className="text-left text-lg">手圍</label>
      <small className="text-left text-xs">選擇適合你的手圍長度</small>
      {Children.map(children, (child) => {
        return cloneElement(child, { list });
      })}
    </>
  );
}
