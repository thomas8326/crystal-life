import { useEffect, useMemo, useState } from 'react';
import { realtimeDB } from 'src/core/config/firebase.config';
import SelectedItem from 'src/core/models/selection';

export function useDBList<T extends SelectedItem>(tableName: string): T[] {
  const [list, setList] = useState<T[]>([]);

  const dbRef = realtimeDB.ref();

  useEffect(() => {
    dbRef
      .child(tableName)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const arrayData: T[] = Object.values(snapshot.val());
          setList(arrayData);
        }
      });
  }, []);

  return useMemo(() => list, [list]);
}
