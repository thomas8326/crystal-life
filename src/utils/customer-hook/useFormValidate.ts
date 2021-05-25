import { useEffect, useState } from 'react';
import { FormControlType } from 'src/core/enums/form.enum';
import { FormControl } from 'src/core/models/form';
import { isNotEmptyOrNil } from 'src/utils/transofrm/ramda-utilis';

export function useFormCheckValidate(error: FormControl, ...dependencies: FormControlType[]) {
  const [validate, setValidate] = useState<boolean>(false);

  useEffect(() => {
    let valid = true;
    dependencies.forEach((field) => {
      if (isNotEmptyOrNil(error[field])) {
        const copy = Object.assign({}, error[field]);
        valid = valid && Object.values(copy).every((value) => !value);
      }
    });

    setValidate(valid);
  }, [error]);

  return { validate, setValidate };
}
