'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { RootState } from '@/store/store';


export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const router = useRouter();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    return <>{children}</>;
}
