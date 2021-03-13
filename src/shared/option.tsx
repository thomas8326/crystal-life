import styled from "styled-components";

const OptionContainer = styled.div`
  display: flex;
  height: 100%;
`;

export default function Option(text: string) {
  return (
    <OptionContainer>
      <option>{text}</option>
    </OptionContainer>
  );
}
