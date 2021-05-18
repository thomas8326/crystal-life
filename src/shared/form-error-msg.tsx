import { FormControlType, FormErrorType } from 'src/core/enums/form.enum';
import { FormControl } from 'src/core/models/form';
import styled from 'styled-components';

const Warning = styled.div`
  color: red;
  font-size: 12px;
`;

export default function FormErrorMsg(props: { errMsg: FormControl; name: FormControlType }) {
  const { errMsg, name } = props;

  return (
    <>
      {errMsg[name]?.[FormErrorType.Format] && <Warning>格式錯誤</Warning>}
      {errMsg[name]?.[FormErrorType.Required] && <Warning>請填寫此項目</Warning>}
      {errMsg[name]?.[FormErrorType.Integer] && <Warning>請輸入正整數</Warning>}
    </>
  );
}
