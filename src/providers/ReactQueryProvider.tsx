// src/providers/ReactQueryProvider.tsx
'use client';

import { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@lib/react-query-client';

interface Props {
    children: ReactNode;
}

export default function ReactQueryProvider({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}