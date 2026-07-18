'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function AuthGate() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = typeof window !== 'undefined' && localStorage.getItem('nsug_logged_in');
    if (!loggedIn) {
      router.replace('/');
    }
  }, [router]);

  return null;
}
