import { useEffect, useRef, useState } from 'react';
import { realtimeDB } from 'src/core/config/firebase.config';
import { v4 as uuidv4 } from 'uuid';

export default function useHttpClient<T extends { id: string }>(tableName: string) {
  const [list, setList] = useState<T[]>([]);
  const tableRef = useRef(realtimeDB.ref(tableName));

  const post = (object: T, child?: string) => {
    const key = child ?? tableRef.current.push().key ?? uuidv4();
    let newObject = {};

    Object.entries(object).forEach((entry) => {
      if (entry[1] === undefined || entry[1] === null) {
        return;
      }

      newObject = { ...newObject, ...{ [entry[0]]: entry[1] } };
    });

    return new Promise((resolve) => tableRef.current.child(key).set(newObject, resolve));
  };

  const remove = (id: string) => {
    return new Promise((resolve) => tableRef.current.child(id).remove(resolve));
  };

  const patch = (id: string, object: object) => {
    return new Promise((resolve) => tableRef.current.child(id).update(object, resolve));
  };

  useEffect(() => {
    tableRef.current.on('value', (snapshot) => {
      let list: T[] = [];
      snapshot.forEach((childSnapshot) => {
        const object = { id: childSnapshot.key, ...childSnapshot.val() };
        list = list.concat(object);
      });
      console.log(list);
      setList(list);
    });

    return () => tableRef.current.off('value');
  }, [tableName]);

  return { list, post, remove, patch };
}
