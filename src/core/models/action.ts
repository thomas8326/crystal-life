import { FormControl } from 'src/utils/customer-hook/useFormValidation';
export default class Action<T = any> {
  type?: string;
  data!: T;
}

export class FormAction {
  type?: string;
  data?: FormControl;
  fieldName?: string;
  isError?: boolean;
}
