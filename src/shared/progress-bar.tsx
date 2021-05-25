import styled from 'styled-components';

export const ProgressAnimation = styled.div`
  transition: width 1s ease-in-out;
  width: 100px;
  height: 100%;
  border-radius: inherit;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;

  span {
    font-weight: bold;
    color: white;
  }
`;

export const Bar = styled.div`
  width: 100%;
  height: 20px;
  border: 1px solid;
  border-radius: 20px;
`;

export default function ProgressBar(props: { percent: number }) {
  const { percent } = props;
  return (
    <Bar>
      <ProgressAnimation className="bg-blue-600" style={{ width: `${percent}%` }}>
        <span>{`${percent}%`}</span>
      </ProgressAnimation>
    </Bar>
  );
}
