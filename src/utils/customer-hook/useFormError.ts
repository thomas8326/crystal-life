import { useReducer } from 'react';
import { FormControlType, FormErrorType } from 'src/core/enums/form.enum';
import { FormAction } from 'src/core/models/action';
import { FormControl } from 'src/core/models/form';

export function checkAccount(isAccountError: boolean) {
  return {
    type: FormErrorType.Account,
    fieldName: FormControlType.Account,
    isError: isAccountError,
  };
}

export function checkAuth(isAuthError: boolean) {
  return {
    type: FormErrorType.Auth,
    fieldName: FormControlType.Account,
    isError: isAuthError,
  };
}

export function checkFormat(e: React.FormEvent<HTMLInputElement>) {
  return {
    type: FormErrorType.Format,
    fieldName: e.currentTarget.name,
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

export default function useFormErrorMsg(initialState = new FormControl()) {
  const reducer = (state: FormControl, action: FormAction): FormControl => {
    const fieldName = (action.fieldName as FormControlType) ?? FormControlType.NotAssign;

    if (action.type) {
      return { ...state, [fieldName]: { ...state[fieldName], [action.type]: action.isError } };
    }

    return state;
  };

  return useReducer(reducer, initialState);
}
