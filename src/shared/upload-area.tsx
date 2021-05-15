import React, { useEffect, useRef, useState } from 'react';
import { Button1 } from 'src/styles/components/button';
import { Grid } from 'src/styles/layout/grid';
import useImageReader from 'src/utils/customer-hook/useImageReader';
import styled, { css } from 'styled-components';

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

const WhiteBoard = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
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

export function UploadArea(props: { upload: (current: HTMLInputElement) => void }) {
  const [gridWidth] = useState<number>(300);
  const [gridHeight] = useState<number>(400);
  const [emptyList, setEmptyList] = useState<any[]>(new Array(MAX_ARRAY_LENGTH).fill(<EmptyCell />));
  const [selectedImage, setSelectedImage] = useState<string>();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const uploadedFilesRef = useRef<HTMLInputElement>(null);
  const readFile = useImageReader();
  const { upload } = props;

  const readImage = () => {
    const fileList = uploadedFilesRef.current?.files;
    if (fileList?.length) {
      Array.from(fileList).map((file) => {
        readFile(file).then((url) => {
          setImageUrls((urls) => urls.concat(url));
          !selectedImage && setSelectedImage(url);
        });
      });

      emptyList.length > 0 && setEmptyList((list) => new Array(list.length - fileList.length).fill(<EmptyCell />));
    }
  };

  const uploadImage = () => {
    if (uploadedFilesRef?.current) {
      upload(uploadedFilesRef.current);
      setSelectedImage('');
      setImageUrls([]);
      setEmptyList(new Array(MAX_ARRAY_LENGTH).fill(<EmptyCell />));
    }
  };

  const removeUploadImage = (url: string) => {
    setImageUrls((prev) => {
      const newImages = prev.filter((imageUrl) => imageUrl !== url);
      !!newImages.length && setSelectedImage(newImages[0]);
      return newImages;
    });
    setEmptyList((empty) => empty.concat(<EmptyCell />));
  };

  return (
    <div className="flex" style={{ height: gridHeight }}>
      <Uploader className="flex-1 relative">
        <div className="m-auto">
          <img className="icon" src={`${process.env.PUBLIC_URL}/assets/icon/upload-image-icon.svg`} alt="upload" />
          <span>Upload Images</span>
        </div>
        <input type="file" ref={uploadedFilesRef} multiple onChange={readImage} />
        {selectedImage && (
          <WhiteBoard>
            <img src={selectedImage} />
          </WhiteBoard>
        )}
      </Uploader>
      <div className="flex justify-center flex-col border">
        <Grid style={{ width: gridWidth }}>
          {imageUrls.map((url) => (
            <GridItem
              key={url}
              className="relative"
              isSelected={url === selectedImage}
              onClick={() => setSelectedImage(url)}
            >
              <img src={url} />
              <i
                className="icon icon-x-mark absolute"
                style={{ top: 0, right: 0 }}
                onClick={() => removeUploadImage(url)}
              />
            </GridItem>
          ))}
          {emptyList}
        </Grid>
        <Button1 type="button" onClick={uploadImage}>
          開始上傳
        </Button1>
      </div>
    </div>
  );
}
