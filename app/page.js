'use client'

import { useRouter } from 'next/navigation';
import { useAuth } from './hook/useAuth';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/pages/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          
每周计划：<br></br>

1. listenFillAnswer页面可用<br></br>
2. 可以next<br></br>
          
        </main>
      </div>
  );
}
