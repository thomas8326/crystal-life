import firebase from 'firebase';
import React from 'react';
import { storageRef } from 'src/core/config/firebase.config';
import InfiniteList from 'src/shared/infiniteList';
import { UploadArea } from 'src/shared/upload-area';
import useUploadFileStatus, { startUpload, uploading } from 'src/utils/customer-hook/useUploadFileStatus';

export default function UploadImageForm(props: { tableName: string }) {
  const { tableName } = props;

  return (
    <>
      <UploadArea tableName={tableName}></UploadArea>
      <hr></hr>
      <div className="text-2xl">已有產品圖</div>
      <div className="max-h-full overflow-hidden">
        <InfiniteList layout="grid" tableName={tableName} updateSelect={() => {}}></InfiniteList>
      </div>
    </>
  );
}
