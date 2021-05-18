import { useReducer } from 'react';
import { FormControlType, FormErrorType } from 'src/core/enums/form.enum';
import { FormAction } from 'src/core/models/action';
import { FormControl } from 'src/core/models/form';

export function checkFormat(e: React.FormEvent<HTMLInputElement>) {
  return {
    type: FormErrorType.Format,
    fieldName: FormControlType.Phone,
    isError: e.currentTarget.validity.patternMismatch,
  };
}

export function checkRequired(e: React.FormEvent<HTMLInputElement>) {
  return {
    type: FormErrorType.Required,
    fieldName: e.currentTarget.name,
    isError: e.currentTarget.validity.valueMissing,
  };
}

export function checkInteger(e: React.FormEvent<HTMLInputElement>) {
  return {
    type: FormErrorType.Integer,
    fieldName: e.currentTarget.name,
    isError: e.currentTarget.validity.stepMismatch,
  };
}

export default function useFormError(initialState = new FormControl()) {
  const reducer = (state: FormControl, action: FormAction): FormControl => {
    const fieldName = (action.fieldName as FormControlType) ?? FormControlType.NotAssign;
    switch (action?.type) {
      case FormErrorType.Format:
        return { ...state, [fieldName]: { ...state[fieldName], [FormErrorType.Format]: action.isError } };
      case FormErrorType.Required:
        return { ...state, [fieldName]: { ...state[fieldName], [FormErrorType.Required]: action.isError } };
      case FormErrorType.Integer:
        return { ...state, [fieldName]: { ...state[fieldName], [FormErrorType.Integer]: action.isError } };
      default:
        return state;
    }
  };

  return useReducer(reducer, initialState);
}
