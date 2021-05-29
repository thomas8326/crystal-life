import { useState } from "react";
import styled from "styled-components";

const InfoContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 12px;
  font-size: 12px;
  border-radius: 5px;
`;

const InfoTemplate = styled.span`
  position: absolute;
`




export function MoreInfo(props: {children: JSX.Element | JSX.Element[]}) {
  const {children} = props;
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <InfoContainer>
      <div className="relative inline-block">
      <i className="icon icon-more-info relative" onClick={e => {setVisible(true)}}>
      </i>
      {visible &&
      <InfoTemplate>
        {children}
      </InfoTemplate>}

      </div>
  </InfoContainer>
  )
}
