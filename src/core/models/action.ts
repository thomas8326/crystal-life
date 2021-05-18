import { FormControl } from 'src/core/models/form';

export default class Action<T = any, U = string> {
  type?: U;
  data!: T;
}

export class FormAction {
  type?: string;
  data?: FormControl;
  fieldName?: string;
  isError?: boolean;
}

export class FirebaseUploadAction {
  type?: string;
  data?: FormControl;
  fieldName?: string;
  isError?: boolean;
}
