import styled from 'styled-components';
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(60px, 1fr));
  grid-auto-rows: 60px;
  width: 100%;
  height: 100%;
`;
