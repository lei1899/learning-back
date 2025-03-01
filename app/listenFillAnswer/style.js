import styled from "styled-components";

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 100px;
  @media screen and (max-width: 769px) {
    margin-bottom: 0;
  }
  h1 {
    margin-bottom: 1rem;
  }
  h4 {
    padding-left: 1rem;
  }
`;

export const StyledImage = styled.img`
    width: 400px;
`;

export const BlanksContainer = styled.div`
    padding-left: 100px;
    padding-right: 100px;
    font-size: 20px;
    line-height: 2;
    span {
      display: inline;
    }

    input {
      display: inline;
    }

    button {
      font-size: 20px;
      display: block;
      margin: 30px auto 0;
      padding: 10px;
    }
`;

export const FlexRowCenter = styled.div`
    display: flex;
    gap: 1rem;
`;