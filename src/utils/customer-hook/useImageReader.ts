import { FileLink } from 'src/core/models/file-link';

export default function useImageReader() {
  const readFile = (file: File) =>
    new Promise<FileLink>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(new FileLink(e.target.result as string));
        }
      };

      reader.readAsDataURL(file);
    });

  return readFile;
}
