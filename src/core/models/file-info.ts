export class FileInfo {
  id?: string;
  name?: string;
  url?: string;
  createdAt?: number | Object;

  constructor(fileInfo?: FileInfo) {
    this.name = fileInfo?.name ?? '';
    this.url = fileInfo?.url ?? '';
    this.createdAt = fileInfo?.createdAt ?? undefined;
  }
}
