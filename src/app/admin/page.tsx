"use client";
import React, { useState, useEffect } from 'react';
import AdminNav from './components/AdminNav';
import Container from './components/Container';
import Footer from './components/Footer';
import SideNav from './components/SideNav';
import Content from './components/Content';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [totalUsersData, setTotalUsersData] = useState([]);
    const [totalPostsData, setTotalPostsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'loading') {
            setLoading(true); // Set loading to true while session is loading
        } else {
            setLoading(false); // Set loading to false once session status is determined
        }
    }, [status]);

    useEffect(() => {
        if (status === 'loading') return; // Do nothing while session is loading
        if (!session) {
            router.push('/login'); // Redirect if no session
        } else if (session.user?.role !== 'admin') {
            router.push('/welcome'); // Redirect if not an admin
        }
    }, [session, status, router]);

    const getTotalUsers = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/totalusers`, {
                cache: 'no-store'
            });

            if (!res.ok) {
                throw new Error('Failed to fetch total users');
            }

            const data = await res.json();
            setTotalUsersData(data.totalUsers);

        } catch (error) {
            console.error('Error fetching total users:', error);
        }
    }

    const getTotalPosts = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/totalposts`, {
                cache: 'no-store'
            });

            if (!res.ok) {
                throw new Error('Failed to fetch total posts');
            }

            const data = await res.json();
            setTotalPostsData(data.totalPosts);

        } catch (error) {
            console.error('Error fetching total posts:', error);
        }
    }

    useEffect(() => {
        if (!loading) {
            getTotalUsers();
            getTotalPosts();
        }
    }, [loading]);

    if (status === 'loading' || loading) {
        return <p>กำลังโหลด...</p>; // Show loading state while session and data are loading
    }

    return (
        <Container>
            <AdminNav session={session} />
            <div className='flex-grow'>
                <div className='container mx-auto'>
                    <div className='flex mt-10 my-10 mx-10'>
                        <SideNav />
                        <Content totalUsersData={totalUsersData} totalPostsData={totalPostsData} />
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    )
}

export default AdminPage;
