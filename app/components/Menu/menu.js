'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hook/useAuth';
import { DesktopMenuItem, DesktopNavBar, DesktopMenu, UserName, LogoutButton } from './style.js';

function Menu() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [list, setList] = useState([]);

    useEffect(() => {
        if (!user) {
            router.push('/pages/login');
            return;
        }
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
    }, [router, user]);

    const handleLogout = () => {
        logout();
        router.push('/pages/login');
    };

    if (!user) {
        return null;
    }

    return (
        <>
            <DesktopNavBar>
                <DesktopMenu>                    
                    {list.map((item) => (
                    <DesktopMenuItem key={item.id} href={`/pages/list?id=${item.id}`}>
                        {item.name}
                    </DesktopMenuItem>
                ))}
            </DesktopMenu>
        </DesktopNavBar>
        {user && (
                <div style={{ position: 'relative' }}>
                    <UserName 
                        onClick={() => {
                            const dropdown = document.getElementById('userDropdown');
                            if (dropdown) {
                                dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
                            }
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        {user.username}
                    </UserName>
                    <div 
                        id="userDropdown"
                        style={{
                            display: 'none',
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            backgroundColor: 'white',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                            borderRadius: '4px',
                            zIndex: 1000
                        }}
                    >
                        <LogoutButton 
                            onClick={handleLogout}
                            style={{
                                width: '100%',
                                padding: '8px 16px',
                                textAlign: 'left'
                            }}
                        >
                            logout
                        </LogoutButton>
                    </div>
                </div>
            )}
        </>
    );
}

export default Menu;