'use client';

import { useState, useEffect } from 'react';

import { DesktopMenuItem, DesktopNavBar, DesktopMenu } from './style.js';

export default function Menu() {
    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/list');
                const data = await res.json();
                console.log('data', data);
                setList(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <DesktopNavBar>
            <DesktopMenu>                    
                {list.map((item) => (
                    <DesktopMenuItem key={item.id} href={`/pages/list?id=${item.id}`}>
                        {item.name}
                    </DesktopMenuItem>
                ))}
            </DesktopMenu>
        </DesktopNavBar>
    );
} 