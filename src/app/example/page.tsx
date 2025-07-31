'use client';

import { useQuery } from '@tanstack/react-query';

interface ApiResponse {
    success: boolean;
    message: string;
    error?: string;
}

const fetchTestApi = async (): Promise<ApiResponse> => {
    const res = await fetch('/api/test-db');
    if (!res.ok) throw new Error('Failed to connect to API');
    return res.json();
};


export default function ExamplePage() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: fetchTestApi,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error!</div>;

    return (
        <div>
            <div className="p-4">
                <h1 className="text-xl font-bold mb-2">API Response</h1>
                <p>Status: {data?.success ? '✅ Success' : '❌ Failed'}</p>
                <p>Message: {data?.message}</p>
            </div>
        </div>
    );
}