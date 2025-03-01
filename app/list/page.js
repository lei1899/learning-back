'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { RowContainer, ListContainer } from './style.js';
import { Container } from '../style/Container.js';

const contentDetailMap = {
    "listenFillAnswer": "listenFillAnswer"
}

function _createNewsRow(data) {
    return (
        <RowContainer 
            key={data.id} 
            href={`/${contentDetailMap[data.type]}?id=${data.id}`}
        >
            <div>
                <h4>{new Date(data.createdAt).toDateString()}</h4>
                <p>{data.title}</p>
            </div>
        </RowContainer>
    );
}

export default function List() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [data, setData] = useState(null);
    console.log("list id", id);
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`/api/list?id=${id}`, {
                    cache: 'no-store',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        if (id) {
            fetchData();
        }
    }, [id]);

    if (!data) {
        return <> </>;
    }

    return (
        <Container>
            <ListContainer>
                {data.map((e) => _createNewsRow(e))}
            </ListContainer>
        </Container>
    );
}