export default function useImageReader() {
  const readFile = (file: File) =>
    new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    });

  return readFile;
}
