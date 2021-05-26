import React from 'react';
import { storageRef } from 'src/core/config/firebase.config';
import SelectedItem from 'src/core/models/selection';
import InfiniteList from 'src/shared/infiniteList';
import { UploadArea } from 'src/shared/upload-area';

export default function UploadImageForm(props: { tableName: string }) {
  const { tableName } = props;

  const removeImage = (item: SelectedItem) => {
    storageRef.child(`crystalImages/${item.text}`).delete();
  };

  return (
    <>
      <UploadArea tableName={tableName}></UploadArea>
      <hr></hr>
      <div className="text-2xl">已有產品圖</div>
      <div className="max-h-full overflow-hidden">
        <InfiniteList layout="grid" openRemove={true} tableName={tableName} removeSelect={removeImage}></InfiniteList>
      </div>
    </>
  );
}
