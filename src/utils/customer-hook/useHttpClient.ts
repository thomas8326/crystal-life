import { useEffect, useRef, useState } from 'react';
import { realtimeDB } from 'src/core/config/firebase.config';
import { OrderBy } from 'src/core/enums/orderby.enum';
import { Sort } from 'src/core/models/sort';
import { v4 as uuidv4 } from 'uuid';

export default function useHttpClient<T extends { id?: string }>(tableName: string, isReadData = true, sort?: Sort) {
  const [isLoading, setIsLoading] = useState(false);
  const tableRef = useRef(realtimeDB.ref(tableName));

  const [list, setList] = useState<T[]>([]);
  const listRef = useRef<T[]>([]);

  const getList = (id?: string, limitCount?: number, sort?: Sort): Promise<boolean> => {
    setIsLoading(true);
    const currentList = listRef.current;
    let filterRef: firebase.default.database.Query | firebase.default.database.Reference = id
      ? tableRef.current.child(id)
      : tableRef.current;

    if (!!limitCount) {
      const sortColumn = sort?.path ?? 'id';
      const lastData = (currentList[currentList.length - 1] as any)[sortColumn] ?? 0;
      filterRef = filterRef.orderByChild(sortColumn).startAfter(lastData).limitToFirst(limitCount);
    }

    return new Promise((resolve) => {
      filterRef.once('value', (snapshot) => {
        if (snapshot.exists()) {
          let dataList: T[] = [];
          Object.entries<any>(snapshot.val()).forEach((entries) => {
            const entry: T = { id: entries[0], ...entries[1] };
            dataList = dataList.concat(entry);
          });

          listRef.current = limitCount ? currentList.concat(dataList) : dataList;
          sort?.by === OrderBy.Desc ? setList(listRef.current.reverse()) : setList(listRef.current);
          setIsLoading(false);
          resolve(false);
        } else {
          !limitCount && setList([]);
          setIsLoading(false);
          resolve(true);
        }

        filterRef.off();
      });
    });
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
    setIsLoading(true);
    const ref = sort ? tableRef.current.orderByChild(sort.path) : tableRef.current;

    if (isReadData) {
      ref.on('value', (snapshot) => {
        let list: T[] = [];
        snapshot.forEach((childSnapshot) => {
          const object: T = { id: childSnapshot.key, ...childSnapshot.val() };
          list = list.concat(object);
        });

        setIsLoading(false);
        sort?.by === OrderBy.Desc ? setList(list.reverse()) : setList(list);
      });
    }

    return () => ref.off('value');
  }, []);

  return { list, isLoading, getList, post, remove, patch };
}
