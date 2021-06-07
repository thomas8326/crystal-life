import { useEffect, useMemo, useState } from 'react';
import { storageRef } from 'src/core/config/firebase.config';
import SelectedItem from 'src/core/models/selection';

export function useListUrl(tableName: string): SelectedItem[] {
  const [list, setList] = useState<SelectedItem[]>([]);

  useEffect(() => {
    storageRef
      .child(tableName)
      .listAll()
      .then(({ items }) => Promise.all(items.map((item) => item.getDownloadURL())))
      .then((urls) => {
        const result = urls.map((url) => new SelectedItem(url));
        setList(result);
      });
  }, []);

  return useMemo(() => list, [list]);
}
