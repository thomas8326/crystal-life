import firebase from 'firebase';
import React, { useEffect, useRef, useState } from 'react';
import { realtimeDB, storageRef } from 'src/core/config/firebase.config';
import { FileInfo } from 'src/core/models/file-info';
import { FileLink } from 'src/core/models/fileLink';
import SelectedItem from 'src/core/models/selection';
import ProgressBar from 'src/shared/progress-bar';
import { Button1 } from 'src/styles/components/button';
import { Grid } from 'src/styles/layout/grid';
import useDragFiles from 'src/utils/customer-hook/useDragFile';
import useHttpClient from 'src/utils/customer-hook/useHttpClient';
import useImageReader from 'src/utils/customer-hook/useImageReader';
import useUploadFileStatus, {
  FileUploadStatusType,
  startUpload,
  uploading,
} from 'src/utils/customer-hook/useUploadFileStatus';
import fillUUIDToArray from 'src/utils/transofrm/list-utilis';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

export const Uploader = styled.label`
  border: 1px dashed #406fbb;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;

  .icon {
    width: 32px;
    height: 32px;
    margin: auto;
  }

  input {
    display: none;
  }
`;

export const UploaderOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #a3c9eb52;
  pointer-events: none;
`;

const EmptyCell = styled.div`
  background: #cccccc;
  margin: 3px;
`;

const WhiteBoard = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;
const GridItem = styled.div`
  ${(props: { isSelected: boolean }) =>
    props.isSelected &&
    css`
      border: 1px solid;
    `}
  margin: 3px;
  cursor: pointer;
`;

const MAX_ARRAY_LENGTH = 32;

export function UploadArea(props: { tableName: string }) {
  const { tableName } = props;
  const uploadedFilesRef = useRef<HTMLInputElement>(null);

  const [gridWidth] = useState<number>(300);
  const [gridHeight] = useState<number>(400);
  const [emptyList, setEmptyList] = useState<string[]>(fillUUIDToArray(MAX_ARRAY_LENGTH));
  const [imageUrls, setImageUrls] = useState<FileLink[]>([]);
  const [selectedImage, setSelectedImage] = useState<FileLink | null>();
  const [uploadAreaRef, setUploadAreaRef] = useState<HTMLLabelElement | null>(null);
  const { post } = useHttpClient(`codeList/${tableName}`);

  const { isDragging, files } = useDragFiles(uploadAreaRef);
  const readFile = useImageReader();

  const [uploadStatus, setUploadStatus] = useUploadFileStatus();

  const onUploadFile = (files: File[]) => {
    if (!files.length) {
      return;
    }

    setUploadStatus(startUpload(files));
    for (const file of files) {
      const task = storageRef.child(`${tableName}/${file.name}`).put(file, { contentType: 'image/jpeg' });
      task.on('state_changed', null, null, () => {
        const fileRef = task.snapshot.ref;
        fileRef.getDownloadURL().then((url) => {
          post(new FileInfo({ name: fileRef.name, url, createdAt: firebase.database.ServerValue.TIMESTAMP }));
          setUploadStatus(uploading(url));
        });
      });
    }
  };

  const readImage = (files: FileList | null) => {
    if (files && files.length) {
      Array.from(files).map((file) => {
        readFile(file).then((image) => {
          setImageUrls((urls) => urls.concat(image));
          !selectedImage && setSelectedImage(image);
        });
      });

      emptyList.length > 0 && setEmptyList((list) => fillUUIDToArray(list.length - files.length));
    }
  };

  const uploadImage = () => {
    const dragFiles = Array.from(files ?? []);
    const normalFiles = Array.from(uploadedFilesRef?.current?.files ?? []);
    onUploadFile(normalFiles.concat(dragFiles));
  };

  const removeUploadImage = (file: FileLink) => {
    setImageUrls((prev) => {
      const newImages = prev.filter((imageUrl) => imageUrl.id !== file.id);
      file.id === selectedImage?.id && setSelectedImage(null);
      !!newImages.length && setSelectedImage(newImages[0]);
      return newImages;
    });
    setEmptyList((empty) => empty.concat(uuidv4()));
  };

  useEffect(() => {
    if (uploadStatus.isCompleted) {
      setImageUrls([]);
      setEmptyList(fillUUIDToArray(MAX_ARRAY_LENGTH));
      setSelectedImage(null);
    }
  }, [uploadStatus]);

  useEffect(() => {
    if (files?.length) {
      readImage(files);
    }
  }, [files]);

  return (
    <div className="flex" style={{ height: gridHeight }}>
      <Uploader className="flex-1 relative" ref={setUploadAreaRef}>
        <div className="m-auto pointer-events-none">
          <i className="icon icon-upload-image" />
          <span>Upload Images</span>
        </div>
        <input
          type="file"
          ref={uploadedFilesRef}
          multiple
          onChange={() => readImage(uploadedFilesRef?.current?.files ?? null)}
        />
        {selectedImage && (
          <WhiteBoard>
            <img src={selectedImage.url} />
          </WhiteBoard>
        )}
        {isDragging && <UploaderOverlay></UploaderOverlay>}
      </Uploader>
      <div className="flex justify-center flex-col border">
        <Grid className="main-scroll" style={{ width: gridWidth }}>
          {imageUrls.map((file: FileLink, index: number) => (
            <GridItem
              key={file.id}
              className="relative"
              isSelected={file.id === selectedImage?.id}
              onClick={() => setSelectedImage(file)}
            >
              <img src={file.url} />
              <i
                className="icon icon-x-mark absolute"
                style={{ top: 0, right: 0 }}
                onClick={() => removeUploadImage(file)}
              />
            </GridItem>
          ))}
          {emptyList.map((key) => (
            <EmptyCell key={key} />
          ))}
        </Grid>
        {!uploadStatus.isUploading && (
          <Button1 type="button" onClick={uploadImage} disabled={!imageUrls.length}>
            開始上傳
          </Button1>
        )}
        {uploadStatus.isUploading && <ProgressBar percent={uploadStatus.progress ?? 0}></ProgressBar>}
      </div>
    </div>
  );
}
