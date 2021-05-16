import { useCallback, useEffect, useState } from 'react';

export default function useDragFiles(targetElement: HTMLElement | null) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<FileList>();

  const handlerDragEnter = useCallback((event: MouseEvent) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handlerDragLeave = useCallback((event: MouseEvent) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handlerDragOver = useCallback((event: MouseEvent) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handlerFileDrop = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer?.files && setFiles(event.dataTransfer?.files);
    setIsDragging(false);
  }, []);

  useEffect(() => {
    console.log(targetElement);
    if (targetElement) {
      targetElement.addEventListener('drop', handlerFileDrop);
      targetElement.addEventListener('dragenter', handlerDragEnter);
      targetElement.addEventListener('dragleave', handlerDragLeave);
      targetElement.addEventListener('dragover', handlerDragOver);
    }

    return () => {
      if (targetElement) {
        targetElement.removeEventListener('drop', handlerFileDrop);
        targetElement.removeEventListener('dragenter', handlerDragEnter);
        targetElement.removeEventListener('dragleave', handlerDragLeave);
        targetElement.removeEventListener('dragleave', handlerDragOver);
      }
    };
  }, [targetElement]);

  return { files, isDragging };
}
