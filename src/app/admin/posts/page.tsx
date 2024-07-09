"use client";

import React, { useState, useEffect } from 'react';
import AdminNav from '../components/AdminNav';
import Container from '../components/Container';
import Footer from '../components/Footer';
import SideNav from '../components/SideNav';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';  // Import useRouter for client-side navigation
import DeleteBtn from './DeleteBtn';

function AdminPostManagePage() {
    const { data: session, status } = useSession();
    const router = useRouter();  // Initialize useRouter hook

    const [allPostsData, setAllPostsData] = useState([]);
    const [loadingSession, setLoadingSession] = useState(true);  // Add loadingSession state

    // Handle session loading and redirection
    useEffect(() => {
        if (status === 'loading') {
            setLoadingSession(true);  // Set loadingSession to true while session is loading
        } else {
            setLoadingSession(false);  // Set loadingSession to false when session loading is complete
            if (!session) {
                router.push('/login');  // Redirect to login if session is not available
            } else if (session?.user?.role !== 'admin') {
                router.push('/welcome');  // Redirect to welcome page if user is not admin
            }
        }
    }, [session, status, router]);

    // Fetch all posts data
    const getAllPostsData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/totalposts`, {
                cache: 'no-store'
            });

            if (!res.ok) {
                throw new Error('Failed to fetch posts');
            }

            const data = await res.json();
            setAllPostsData(data.totalPosts);

        } catch (error) {
            console.log(error);
        }
    };

    // Fetch posts data on component mount
    useEffect(() => {
        getAllPostsData();
    }, []);

    // Render loading state while session is loading or not available
    if (status === 'loading' || loadingSession) {
        return <p>กำลังโหลด...</p>;
    }

    return (
        <Container>
            <AdminNav session={session} />
            <div className='flex-grow'>
                <div className='container mx-auto'>
                    <div className='flex mt-10 my-10 mx-10'>
                        <SideNav />
                        <div className='p-10'>
                            <h3 className='text-3xl md-3'>
                                จัดการโพส
                            </h3>
                            <p>รายการโพส</p>

                            <div className='shadow-lg overflow-x-auto'>
                                <table className='text-left rounded-md mt-3 table-fixed w-full'>
                                    <thead>
                                        <tr className='bg-gray-400'>
                                            <th className='p-5'>#</th>
                                            <th className='p-5'>หัวข้อ</th>
                                            <th className='p-5'>รูปภาพ</th>
                                            <th className='p-5'>เนื้อหา</th>
                                            <th className='p-5'>จัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allPostsData?.map((post, index) => (
                                            <tr key={index}>
                                                <td className='p-5'>{index + 1}</td>
                                                <td className='p-5'>{post.title}</td>
                                                <td className='p-5'>
                                                    <Image src={post.img} width={100} height={100} alt={post.title} />
                                                </td>
                                                <td className='p-5'>{post.content}</td>
                                                <td className='p-5'>
                                                    <Link href={`/admin/posts/edit/${post._id}`} className='bg-orange-500 text-white border px-2 py-1 rounded-md text-md my-2 ml-2 cursor-pointer'>

                                                        แก้ไข

                                                    </Link>
                                                    <DeleteBtn id={post._id} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    );
}

export default AdminPostManagePage;
