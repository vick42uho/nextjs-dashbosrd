"use client"

import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import DeleteBtn from './DeleteBtn'

function WelcomePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [postData, setPostsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'loading') return; // Do nothing while loading
        if (!session) router.push('/login'); // Redirect if no session
        if (session?.user?.role === 'admin') router.push('/admin');
    }, [session, status, router]);

    const userEmail = session?.user?.email;

    const getPosts = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?Email=${userEmail}`, {
                cache: 'no-store'
            });

            if (!res.ok) {
                throw new Error('Failed to fetch posts');
            }

            const data = await res.json();
            setPostsData(data.posts);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (session) getPosts();
    }, [session]);

    if (status === 'loading' || loading) {
        return <p>กำลังโหลด...</p>; // Show loading state
    }

    return (
        <Container>
            <Navbar session={session} />
            <div className='flex-grow'>
                <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='text-5xl'>โปรไฟล์</h3>
                            <p>สวัสดี, {session?.user?.name}</p>
                            <p>อีเมล, {session?.user?.email}</p>
                        </div>
                        <div>
                            <Link href='/create'>
                                <button className='w-full py-2 rounded my-2 border px-3 bg-green-500 text-white text-md font-bold'>
                                    สร้างโพส
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* User Posts Data */}
                    <div>
                        {postData && postData.length > 0 ? (
                            postData.map(val => (
                                <div key={val._id} className='shadow-xl my-10 p-10 rounded-xl'>
                                    <h4 className='text-3xl'>{val.title}</h4>
                                    <Image src={val.img} width={300} height={0} alt="post image" />
                                    <p>{val.content}</p>
                                    <div className='mt-5'>
                                        <Link href={`/edit/${val._id}`} className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 my-2  mr-2 text-sm rounded-md'>
                                            แก้ไขโพส
                                        </Link>
                                        <DeleteBtn id={val._id} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 my-2 mr-2 text-sm rounded-md'>
                                ยังไม่มีโพส
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    );
}

export default WelcomePage;
