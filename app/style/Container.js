import styled from "styled-components";
import Image from 'next/image';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - 40px);
  margin-left: 20px;
  margin-right: 20px; // 右边距 20px
`
export const FlexColumnCenter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

export const ListenImage = styled.img`
    width: 400px;
`;