import { FileInfo } from 'src/core/models/file-info';
import SelectedItem from 'src/core/models/selection';

export default class Crystal extends SelectedItem {
  key!: string;

  text?: string;

  value?: number | string;

  url?: string;

  isSelected?: boolean;

  leftFlower!: FileInfo;

  rightFlower!: FileInfo;

  charm?: FileInfo;

  constructor(key?: string, url?: string) {
    super(key);
    this.key = key ?? '';
    this.url = url ?? '';
  }
}
