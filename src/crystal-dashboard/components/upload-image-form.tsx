import React, { useEffect, useState } from 'react';
import { storageRef } from 'src/core/config/firebase.config';
import SelectedItem from 'src/core/models/selection';
import InfiniteList from 'src/shared/infiniteList';
import { UploadArea } from 'src/shared/upload-area';

export default function UploadImageForm(props: { tableName: string }) {
  const { tableName } = props;

  const onUploadFile = (current: HTMLInputElement) => {
    if (!current || !current.files) {
      return;
    }

    for (const file of Array.from(current.files)) {
      storageRef.child(`${tableName}/${file.name}`).put(file, { contentType: 'image/jpeg' });
    }
  };

  return (
    <>
      <UploadArea upload={onUploadFile}></UploadArea>
      <InfiniteList layout="grid" tableName={tableName} updateSelect={() => {}}></InfiniteList>
    </>
  );
}
