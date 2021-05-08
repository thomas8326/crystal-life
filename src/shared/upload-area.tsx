import { useRef } from 'react';
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

export function UploadArea(props: { upload: (current: HTMLInputElement) => void }) {
  const uploadedFilesRef = useRef<HTMLInputElement>(null);
  const { upload } = props;

  return (
    <Uploader>
      <img className="icon" src={`${process.env.PUBLIC_URL}/assets/icon/upload-image-icon.svg`} alt="upload" />
      <span>Upload Images</span>
      <input
        type="file"
        ref={uploadedFilesRef}
        onChange={() => uploadedFilesRef.current && upload(uploadedFilesRef.current)}
        multiple
      />
    </Uploader>
  );
}
