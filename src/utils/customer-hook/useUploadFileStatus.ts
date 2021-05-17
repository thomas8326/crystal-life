import firebase from 'firebase';
import { useReducer } from 'react';
import Action from 'src/core/models/action';

export function startUpload(list: File[]): Action<FileUploadStatus, FileUploadStatusType> {
  return { type: FileUploadStatusType.Start, data: { list } };
}

export function uploading(completeFile: string): Action<FileUploadStatus, FileUploadStatusType> {
  return { type: FileUploadStatusType.Running, data: { completedList: [completeFile] } };
}
export function complete(completeFile: string): Action<FileUploadStatus, FileUploadStatusType> {
  return { type: FileUploadStatusType.Running, data: { completedList: [completeFile] } };
}

export enum FileUploadStatusType {
  Start = 'start',
  Running = 'running',
  Completed = 'completed',
  Pause = 'Pause',
}

class FileUploadStatus {
  isStart?: boolean = true;
  isUploading?: boolean = false;
  isCompleted?: boolean = false;

  progress? = 0;
  list?: File[] = [];
  completedList?: string[] = [];
  failList?: string[] = [];

  constructor(uploadStatus?: FileUploadStatus) {
    this.progress = uploadStatus?.progress ?? 0;
    this.list = uploadStatus?.list ?? [];
    this.completedList = uploadStatus?.completedList ?? [];
    this.failList = uploadStatus?.failList ?? [];
  }
}

export default function useUploadFileStatus() {
  const reducer = (state: FileUploadStatus, action: Action<FileUploadStatus, FileUploadStatusType>) => {
    switch (action.type) {
      case FileUploadStatusType.Start:
        return { ...state, isStart: true, list: action.data.list, completedList: [] };
      case FileUploadStatusType.Running:
        if (!state.list?.length) {
          return state;
        }

        const data = action.data;
        const stateCompletedList = state.completedList ?? [];
        const actionCompletedList = data.completedList ?? [];
        const newCompletedList = stateCompletedList.concat(actionCompletedList);
        const progress = (newCompletedList.length / state.list.length) * 100;
        const percent = Math.round(progress);

        const status =
          newCompletedList.length === state.list.length
            ? { isCompleted: true, isUploading: false }
            : { isUploading: true, isCompleted: false };
        console.log(status);
        console.log({ ...state, ...status, isStart: false, progress: percent, completedList: newCompletedList });

        return { ...state, ...status, isStart: false, progress: percent, completedList: newCompletedList };
      default:
        return state;
    }
  };

  return useReducer(reducer, new FileUploadStatus());
}
