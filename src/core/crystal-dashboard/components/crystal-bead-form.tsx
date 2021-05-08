import React, { useEffect, useRef, useState } from 'react';
import { storageRef } from 'src/core/config/firebase.config';
import SelectedItem from 'src/core/models/selection';
import InfiniteList from 'src/shared/infiniteList';

export default function CrystalBeadForm() {
  const uploadedFilesRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<SelectedItem[]>([]);

  const onUploadFile = (current: HTMLInputElement | null) => {
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
      <InfiniteList layout="grid" list={items} updateSelect={() => {}}></InfiniteList>
      <div>
        <input type="file" ref={uploadedFilesRef} onChange={() => onUploadFile(uploadedFilesRef.current)} multiple />
      </div>
    </>
  );
}
