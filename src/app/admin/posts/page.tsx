"use client";
import React, { useState, useEffect } from 'react';
import AdminNav from '../components/AdminNav';
import Container from '../components/Container';
import Footer from '../components/Footer';
import SideNav from '../components/SideNav';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '../components/LoadingSpinner';
import DeleteBtn from './DeleteBtn';

interface Post {
    _id: string;
    title: string;
    img: string;
    content: string;
}

function AdminPostManagePage() {
    const { data: session, status } = useSession();
    const [allPostsData, setAllPostsData] = useState<Post[]>([]);
    const [loadingSession, setLoadingSession] = useState(true);

    useEffect(() => {
        if (status === 'loading') {
            setLoadingSession(true);
        } else {
            setLoadingSession(false);
            if (!session) {
                window.location.href = '/login';
            } else if (session?.user?.role !== 'admin') {
                window.location.href = '/welcome';
            }
        }
    }, [session, status]);

    useEffect(() => {
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

        getAllPostsData();
    }, []);

    if (status === 'loading' || loadingSession) {
        return <LoadingSpinner />;
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
                                จัดการโพสต์
                            </h3>
                            <p>รายการโพสต์</p>

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
                                        {allPostsData.map((post, index) => (
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

