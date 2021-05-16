import styled from 'styled-components';

const Warning = styled.div`
  color: red;
  font-size: 12px;
`;

export default function FormErrorMsg(props: { format?: boolean }) {
  const { format } = props;

  return <>{format && <Warning>格式錯誤</Warning>}</>;
}
