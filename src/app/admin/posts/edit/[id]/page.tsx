"use client"
import React, { useState, useEffect } from 'react'
import AdminNav from '../../../../admin/components/AdminNav';
import Container from '../../../../admin/components/Container';
import Footer from '../../../../admin/components/Footer';
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

function EditPage({ params }) {

    const { data: session } = useSession();
    const router = useRouter();

    if (!session) {
        redirect('/login');
    }

    const { id } = params;
    const [postData, setPostsData] = useState({});

    // New data of post
    const [newTitle, setNewTitle] = useState('');
    const [newImg, setNewImg] = useState('');
    const [newContent, setNewContent] = useState('');

    const getPostById = async (id) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`, {
                method: 'GET',
                cache: 'no-store'
            });

            if (!res.ok) {
                throw new Error('Failed to fetch posts');
            }

            const data = await res.json();
            setPostsData(data.post);
            setNewTitle(data.post.title);
            setNewImg(data.post.img);
            setNewContent(data.post.content);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPostById(id);
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: newTitle, img: newImg, content: newContent })
            });

            if (!res.ok) {
                throw new Error('Failed to edit post');
            }

            router.push('/admin/posts');

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <AdminNav session={session} />
            <div className='flex-grow'>
                <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                    <Link href="/welcome" className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 my-2 mr-2 text-sm rounded-md'>
                        กลับ
                    </Link>
                    <hr className='my-3' />
                    <h3 className='text-3xl'>แก้ไขโพส</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className='w-[400px] block py-3 rounded my-2 border px-3 bg-gray-50'
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Title"
                            value={newTitle}
                        />
                        <input
                            type="text"
                            className='w-[400px] block py-3 rounded my-2 border px-3 bg-gray-50'
                            onChange={(e) => setNewImg(e.target.value)}
                            placeholder="Image URL"
                            value={newImg}
                        />
                        <textarea
                            className='w-[400px] block py-3 rounded my-2 border px-3 bg-gray-50'
                            onChange={(e) => setNewContent(e.target.value)}
                            placeholder="Content"
                            value={newContent}
                        />
                        <button
                            type='submit'
                            name='update'
                            className='w-[400px] block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-2 mr-2 text-sm rounded-md'
                        >
                            อัปเดต
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </Container>
    );
}

export default EditPage;
