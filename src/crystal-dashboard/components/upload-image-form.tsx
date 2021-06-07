import React from 'react';
import { realtimeDB, storageRef } from 'src/core/config/firebase.config';
import { FileInfo } from 'src/core/models/file-info';
import InfiniteList from 'src/shared/infinite-list';
import { UploadArea } from 'src/shared/upload-area';
import useHttpClient from 'src/utils/customer-hook/useHttpClient';

export default function UploadImageForm(props: { tableName: string }) {
  const { tableName } = props;
  const { remove } = useHttpClient('codeList');

  const removeImage = (item: FileInfo) => {
    storageRef.child(`${tableName}/${item.name}`).delete();
    remove(`${tableName}/${item.id}`);
  };

  return (
    <>
      <UploadArea tableName={tableName}></UploadArea>
      <hr></hr>
      <div className="text-2xl mb-2">已有產品圖</div>
      <div className="max-h-full overflow-hidden">
        <InfiniteList
          layout="grid"
          openRemove={true}
          tableName={`codeList/${tableName}`}
          removeSelect={removeImage}
        ></InfiniteList>
      </div>
    </>
  );
}
