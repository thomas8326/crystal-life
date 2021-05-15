import React, { useEffect, useRef, useState } from 'react';
import { Button1 } from 'src/styles/components/button';
import { Grid } from 'src/styles/layout/grid';
import useImageReader from 'src/utils/customer-hook/useImageReader';
import styled from 'styled-components';

export const Uploader = styled.label`
  border: 1px dashed #406fbb;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  .icon {
    width: 32px;
    height: 32px;
    margin: auto;
  }

  input {
    display: none;
  }
`;

const EmptyCell = styled.div`
  background: #cccccc;
  margin: 3px;
`;

const MAX_ARRAY_LENGTH = 32;

export function UploadArea(props: { upload: (current: HTMLInputElement) => void }) {
  const [gridWidth, setGridWidth] = useState<number>(300);
  const [gridHeight, setGridHeight] = useState<number>(400);
  const [emptyList, setEmptyList] = useState<any[]>(new Array(MAX_ARRAY_LENGTH).fill(<EmptyCell />));

  const uploadedFilesRef = useRef<HTMLInputElement>(null);
  const readFile = useImageReader();
  const { upload } = props;
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const readImage = () => {
    const fileList = uploadedFilesRef.current?.files;
    if (fileList?.length) {
      Array.from(fileList).map((file) => {
        readFile(file).then((url) => setImageUrls((urls) => urls.concat(url)));
      });

      emptyList.length > 0 && setEmptyList((list) => new Array(list.length - fileList.length).fill(<EmptyCell />));
    }
  };

  return (
    <div className="flex" style={{ height: gridHeight }}>
      <Uploader className="flex-1">
        <div className="m-auto">
          <img className="icon" src={`${process.env.PUBLIC_URL}/assets/icon/upload-image-icon.svg`} alt="upload" />
          <span>Upload Images</span>
        </div>
        <input type="file" ref={uploadedFilesRef} multiple onChange={readImage} />
      </Uploader>
      <div className="flex justify-center flex-col border">
        <Grid style={{ width: gridWidth }}>
          {imageUrls.map((url) => (
            <div>
              <img src={url} />
            </div>
          ))}
          {emptyList}
        </Grid>
        <Button1 type="button" onClick={() => uploadedFilesRef.current && upload(uploadedFilesRef.current)}>
          上傳
        </Button1>
      </div>
    </div>
  );
}
