'use client';

import { Container, ItemContainer, itemRow } from './module.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function _createNewsRow(data) {
    console.log("data", data);
    return (
        <div className={itemRow}
            key={data.id} 
            to={`/${data.type}/${data.id}`}
        >
            <div>
                <h4>{new Date(data.createdAt).toDateString()}</h4>
                <p>{data.title}</p>
            </div>
        </div>
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
                console.log("fetching data");
                const res = await fetch(`/api/list?id=${id}`, {
                    cache: 'no-store',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                console.log("data", data);
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
        <div className={Container}>
            <div className={ItemContainer}>
                {data.map((e) => _createNewsRow(e))}
            </div>
        </div>
    );
}