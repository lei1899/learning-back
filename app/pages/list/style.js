import styled from "styled-components";
import Link from 'next/link';

export const Container = styled.div`
    padding: 2rem 4rem;
    @media screen and (max-width:769px) {
        padding: 2rem 2rem;
    }
`

export const HeaderRow = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    flex-direction:row;
    padding: 1rem 0;
    @media screen and (max-width:1025px) {
        flex-wrap:wrap;
    }
`
export const SectionTitle = styled.p`
    font-size:3rem;
    font-weight:800;
    margin-bottom: 1rem;
    color: #192e44;
    @media screen and (max-width:769px) {
        font-size:2.5rem;
    }
`

export const ListContainer = styled.ul`
    margin-right: 30px;
    display:flex;
    flex-direction:column;
    min-width: 80%;
    flex-wrap:wrap;

`
export const RowContainer = styled(Link)`
    color: inherit;
    text-decoration: none;
    border-radius: 8px;
    border: 1px solid #82c341;
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items: center;
    padding: 10px;
    background-color: white;
    margin-bottom:1rem;
    &:hover {
        background-color: #82c341;
    }

    div {
        display:flex;
        flex-direction:row;
        align-items: center;
        h4 {
            color:#646E7B;
            font-weight:500;
            padding-right:2rem;
        }
        p {
            max-width: 800px;
        }

    }
    @media screen and (max-width:1025px) {
        div {
            flex-direction:column;
        }
    }

    @media screen and (max-width:769px) {
        flex-direction:column;
        align-items:start;
        &:hover {
        background-color: white;
    }
        a {
            margin-left:0;
            padding:0.5rem;
            border:none;
        }
    }

`