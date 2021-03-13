import styled from "styled-components";

const Item = styled.li`
  width: 50px;
  height: 50px;
`;

const GoLeftButton = styled.button`
  width: 50px;
  height: 60px;
`;

const GoRightButton = styled.button`
  width: 50px;
  height: 60px;
`;

export default function SlideList(props: { list: any[] }) {
  const { list } = props;

  return (
    <>
      <GoLeftButton />
      <ul>
        {list.map((item) => (
          <Item></Item>
        ))}
      </ul>
      <GoRightButton />
    </>
  );
}
