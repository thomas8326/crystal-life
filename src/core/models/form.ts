import { FormControlType, FormErrorType } from 'src/core/enums/form.enum';

export class FromError {
  [FormErrorType.Format]: boolean;
  [FormErrorType.Required]: boolean;
  [FormErrorType.Integer]: boolean;
}

export class FormControl {
  [FormControlType.Phone]?: FromError;
  [FormControlType.Name]?: FromError;
  [FormControlType.CrystalCount]?: FromError;
  [FormControlType.NotAssign]: FromError;
}
