import React, { useEffect, useState } from 'react';
import { storageRef } from 'src/core/config/firebase.config';
import SelectedItem from 'src/core/models/selection';
import InfiniteList from 'src/shared/infiniteList';
import { UploadArea } from 'src/shared/upload-area';

export default function CrystalBeadForm() {
  const [items, setItems] = useState<SelectedItem[]>([]);

  const onUploadFile = (current: HTMLInputElement) => {
    if (!current || !current.files) {
      return;
    }

    for (const file of Array.from(current.files)) {
      storageRef.child(`crystalImages/${file.name}`).put(file, { contentType: 'image/jpeg' });
    }
  };

  useEffect(() => {
    storageRef
      .child('crystalImages')
      .listAll()
      .then(({ items }) =>
        items.forEach((item) =>
          item.getDownloadURL().then((url) => setItems((preItems) => preItems.concat(new SelectedItem(url)))),
        ),
      );
  }, []);

  return (
    <>
      <UploadArea upload={onUploadFile}></UploadArea>
      <InfiniteList layout="grid" list={items} updateSelect={() => {}}></InfiniteList>
    </>
  );
}
