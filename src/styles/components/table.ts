import styled from 'styled-components';

export const Table = styled.div`
  display: table;

  .table-cell {
    padding: 7px;
    text-align: center;
  }

  .table-header-group {
    .table-cell {
      font-weight: bold;
      background-color: #ebd494;
      border-bottom: 3px double black;
    }
  }

  .table-row-group {
    .table-row:nth-child(even) {
      background-color: #fff4db;
    }
  }
`;
