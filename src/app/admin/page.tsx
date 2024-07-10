"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminNav from './components/AdminNav';
import Container from './components/Container';
import Footer from './components/Footer';
import SideNav from './components/SideNav';
import Content from './components/Content';
import LoadingSpinner from './components/LoadingSpinner';

type DataType = {
    users: string | number;
    posts: string | number;
};

function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [data, setData] = useState<DataType>({ users: 0, posts: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (endpoint: 'users' | 'posts') => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/total${endpoint}`, {
                cache: 'no-store'
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch ${endpoint}`);
            }

            const result = await res.json();
            return result[`total${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`];
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            setError(`Failed to load ${endpoint}. Please try again later.`);
            return 0;
        }
    }, []);

    useEffect(() => {
        if (status === 'loading') return;

        if (!session) {
            router.push('/login');
        } else if (session.user?.role !== 'admin') {
            router.push('/welcome');
        } else {
            const loadData = async () => {
                setLoading(true);
                const [users, posts] = await Promise.all([
                    fetchData('users'),
                    fetchData('posts')
                ]);
                setData({ users, posts });
                setLoading(false);
            };
            loadData();
        }
    }, [session, status, router, fetchData]);

    if (status === 'loading' || loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <Container>
            <AdminNav session={session} />
            <div className='flex-grow'>
                <div className='container mx-auto'>
                    <div className='flex mt-10 my-10 mx-10'>
                        <SideNav />
                        <Content totalUsersData={data.users} totalPostsData={data.posts} />
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    );
}

export default AdminPage;
