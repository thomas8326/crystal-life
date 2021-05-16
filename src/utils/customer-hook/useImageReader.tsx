import { FileLink } from 'src/core/models/fileLink';

export default function useImageReader() {
  const readFile = (file: File) =>
    new Promise<FileLink>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          console.log(new FileLink(e.target.result as string));
          resolve(new FileLink(e.target.result as string));
        }
      };

      reader.readAsDataURL(file);
    });

  return readFile;
}
