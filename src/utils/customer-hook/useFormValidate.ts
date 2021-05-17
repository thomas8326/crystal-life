import { useEffect, useState } from 'react';

export function useFormValidate(form: HTMLFormElement | null, ...dependency: any[]) {
  const [validate, setValidate] = useState<boolean>(false);

  useEffect(() => {
    if (form) {
      setValidate(form.checkValidity() ?? false);
    }
  }, [form, ...dependency]);

  return validate;
}
