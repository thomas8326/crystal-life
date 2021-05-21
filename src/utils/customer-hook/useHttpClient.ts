import { useEffect, useRef, useState } from 'react';
import { realtimeDB } from 'src/core/config/firebase.config';
import { v4 as uuidv4 } from 'uuid';

export default function useHttpClient<T extends { id: string }>(tableName: string, isReadData = true) {
  const tableRef = useRef(realtimeDB.ref(tableName));

  const [list, setList] = useState<T[]>([]);
  const [childName, setChildName] = useState<string>('');
  const [isReadList, setIsReadList] = useState<boolean>(isReadData);

  const getList = (id?: string) => {
    setIsReadList(true);
    id && setChildName(id);
  };

  const post = (object: T, path?: string) => {
    const apiPath = path ?? tableRef.current.push().key ?? uuidv4();
    const newObject = JSON.parse(JSON.stringify(object));

    return new Promise((resolve) => tableRef.current.child(apiPath).set(newObject, resolve));
  };

  const remove = (id: string) => {
    return new Promise((resolve) => tableRef.current.child(id).remove(resolve));
  };

  const patch = (id: string, object: object) => {
    return new Promise((resolve) => tableRef.current.child(id).update(object, resolve));
  };

  useEffect(() => {
    const ref = childName ? tableRef.current.child(childName) : tableRef.current;

    if (isReadList) {
      ref.on('value', (snapshot) => {
        let list: T[] = [];
        snapshot.forEach((childSnapshot) => {
          const object = { id: childSnapshot.key, ...childSnapshot.val() };
          list = list.concat(object);
        });
        setList(list);
      });
    }

    return () => ref.off('value');
  }, [isReadList, childName]);

  useEffect(() => {});

  return { list, getList, post, remove, patch };
}
