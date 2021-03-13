import styled from "styled-components";

const Item = styled.li`
  width: 50px;
  height: 60px;
`;

export default function Option(list: any[] = []) {
  return;
  {
    list.map((item) => <Item></Item>);
  }
}
