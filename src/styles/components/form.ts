import styled from 'styled-components';

export const FormField = styled.label`
  .title {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.54);
    font-weight: bold;
  }

  width: 192px;
  &: focus-within {
    .title {
      color: #3f51b5;
    }

    input: not([type= 'button' ]) {
      border-bottom: 1px solid #3f51b5;
    }
  }

  input[type='text'] {
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.54);

    &:focus-visible {
      outline: none;
    }
  }
`;

export const Form1 = styled.form<any>`
  display: flex;
  flex-direction: ${(props: { direction?: string }) => props?.direction || 'row'};
  justify-content: space-around;
  padding: 10px;
  border: 1px solid ${(props: { borderColor: string }) => props?.borderColor ?? '#dadada'};
  margin: 12px;
  box-shadow: 1px 1px 2px 0px #dadada, -1px -1px 2px 0px #dadada;

  & > * {
    margin-top: 4px;
    margin-bottom: 4px;
  }

  input[type='button'] {
    background: transparent;
    cursor: pointer;
  }

  input: not([type= 'button' ], [type= 'radio' ]) {
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.54);

    &:focus-visible {
      outline: none;
    }
  }
`;
