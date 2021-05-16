import { useReducer } from 'react';
import Action, { FormAction } from 'src/core/models/action';

export enum FormControlType {
  Phone = 'phone',
}

export enum FormErrorType {
  FormatError = 'formatError',
}

export class FromError {
  [FormErrorType.FormatError]: boolean;
}

export class FormControl {
  [FormControlType.Phone]?: FromError;
}

export default function useFormValidation(initialState = new FormControl()) {
  const reducer = (state: FormControl, action: FormAction) => {
    switch (action?.type) {
      case FormErrorType.FormatError:
        return { ...state, [action.fieldName ?? 'Not Assign']: { [FormErrorType.FormatError]: action.isError } };

      default:
        return { ...state, ...action?.data };
    }
  };

  return useReducer(reducer, initialState);
}
