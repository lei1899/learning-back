'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './module.css';

export default function Menu() {
    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/list');
                const data = await res.json();
                setList(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className={styles.desktopNavBar}>
            <div className={styles.desktopMenu}>                    
                {list.map((item) => (
                    <Link className={styles.desktopMenuItem} key={item.id} href={`/list?id=${item.id}`}>
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
} 